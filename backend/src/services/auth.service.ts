import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../types/database';
import { AppError } from '../utils/errorHandler';
import userModel from '../models/user.model';
import { supabase, supabaseAdmin } from '../config/database';
import logger from '../utils/logger';

// Types for token payloads
interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

interface RefreshTokenPayload extends JwtPayload {
  tokenVersion: number;
}

class AuthService {
  // Register a new user
  async register(userData: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    const { email, password, first_name, last_name } = userData;

    try {
      // Check if user already exists
      const existingUser = await userModel.getByEmail(email);
      if (existingUser) {
        throw new AppError('Email already registered', 400);
      }

      // Create user in Supabase Auth
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true, // Auto confirm email for development
        user_metadata: {
          first_name,
          last_name
        }
      });

      if (authError) {
        logger.error('Auth registration error', { error: authError });
        throw new AppError(`Auth registration error: ${authError instanceof Error ? authError.message : 'Unknown error'}`, 500);
      }

      if (!authData.user || !authData.user.id) {
        throw new AppError('Failed to create user in auth system', 500);
      }

      // Create user in our database
      const user = await userModel.create({
        id: authData.user.id,
        email,
        first_name,
        last_name,
        role: 'user',
        subscription_tier: 'free',
        credits_available: 10, // Starter credits
        token_version: 1, // Initialize token version for refresh tokens
      });

      // Generate tokens
      const accessToken = this.generateAccessToken(user);
      const refreshToken = this.generateRefreshToken(user);

      return { user, accessToken, refreshToken };
    } catch (error) {
      logger.error('Registration error', { error, email });
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Registration failed', 500);
    }
  }

  // Login user
  async login(email: string, password: string): Promise<{ 
    user: User; 
    accessToken: string; 
    refreshToken: string 
  }> {
    try {
      // Sign in with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        logger.error('Login error', { error: authError, email });
        throw new AppError('Invalid email or password', 401);
      }

      if (!authData.user || !authData.user.id) {
        throw new AppError('Failed to authenticate', 500);
      }

      // Get user from our database
      const user = await userModel.getById(authData.user.id);
      
      if (!user) {
        // This should rarely happen - user exists in auth but not in our DB
        logger.warn('User exists in Supabase Auth but not in our database', { userId: authData.user.id });
        
        // Create user in our database as a recovery mechanism
        const newUser = await userModel.create({
          id: authData.user.id,
          email: authData.user.email || email,
          first_name: authData.user.user_metadata?.first_name || 'User',
          last_name: authData.user.user_metadata?.last_name || '',
          role: 'user',
          subscription_tier: 'free',
          credits_available: 10, // Starter credits
          token_version: 1,
        });
        
        // Generate tokens
        const accessToken = this.generateAccessToken(newUser);
        const refreshToken = this.generateRefreshToken(newUser);

        return { user: newUser, accessToken, refreshToken };
      }

      // Generate tokens
      const accessToken = this.generateAccessToken(user);
      const refreshToken = this.generateRefreshToken(user);

      return { user, accessToken, refreshToken };
    } catch (error) {
      logger.error('Login error', { error, email });
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Login failed', 500);
    }
  }

  // Refresh access token using refresh token
  async refreshToken(token: string): Promise<{ 
    accessToken: string; 
    user: User;
  }> {
    try {
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new AppError('JWT secret not configured', 500);
      }

      // Verify the refresh token
      const decoded = jwt.verify(token, jwtSecret) as RefreshTokenPayload;
      
      // Get the user
      const user = await userModel.getById(decoded.userId);
      if (!user) {
        throw new AppError('User not found', 404);
      }

      // Check if token has been invalidated (by comparing token versions)
      if (user.token_version !== decoded.tokenVersion) {
        throw new AppError('Token has been revoked', 401);
      }

      // Generate a new access token
      const accessToken = this.generateAccessToken(user);

      return { accessToken, user };
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new AppError('Invalid refresh token', 401);
      }
      if (error instanceof jwt.TokenExpiredError) {
        throw new AppError('Refresh token expired', 401);
      }
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to refresh token', 500);
    }
  }

  // Invalidate user's refresh tokens by incrementing token version
  async logout(userId: string): Promise<void> {
    try {
      // Get the user
      const user = await userModel.getById(userId);
      if (!user) {
        throw new AppError('User not found', 404);
      }

      // Increment token version to invalidate all existing refresh tokens
      await userModel.update(userId, {
        token_version: (user.token_version || 0) + 1
      });

      // Also sign out from Supabase Auth
      await supabase.auth.signOut();

    } catch (error) {
      logger.error('Logout error', { error, userId });
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Logout failed', 500);
    }
  }

  // Request password reset
  async requestPasswordReset(email: string): Promise<void> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.FRONTEND_URL}/auth/reset-password`,
      });

      if (error) {
        logger.error('Password reset request error', { error, email });
        throw new AppError(`Password reset error: ${error instanceof Error ? error.message : 'Unknown error'}`, 500);
      }
      
      // Don't indicate whether the email exists or not for security
    } catch (error) {
      // Log but don't expose whether the email exists
      logger.error('Password reset request error', { error, email });
      // Re-throw AppErrors but use generic message for other errors
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Password reset request failed', 500);
    }
  }

  // Reset password with token from email
  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      // The token here is from the email link that Supabase sends
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        logger.error('Password reset error', { error });
        throw new AppError(`Password update error: ${error instanceof Error ? error.message : 'Unknown error'}`, 400);
      }

      // Invalidate all refresh tokens by incrementing the token version
      // We need to get the user ID from the session since updateUser doesn't return it
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session?.user?.id) {
        await this.logout(sessionData.session.user.id);
      }
    } catch (error) {
      logger.error('Password reset error', { error });
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Password reset failed', 500);
    }
  }

  // Change password (when user is logged in)
  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    try {
      // Get user email
      const user = await userModel.getById(userId);
      if (!user) {
        throw new AppError('User not found', 404);
      }

      // Verify current password by attempting to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });

      if (signInError) {
        throw new AppError('Current password is incorrect', 401);
      }

      // Update password
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        throw new AppError(`Password update error: ${error instanceof Error ? error.message : 'Unknown error'}`, 400);
      }

      // Invalidate all previous refresh tokens
      await userModel.update(userId, {
        token_version: (user.token_version || 0) + 1
      });
    } catch (error) {
      logger.error('Change password error', { error, userId });
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Password change failed', 500);
    }
  }

  // Generate short-lived access token (15 minutes)
  private generateAccessToken(user: User): string {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new AppError('JWT secret not configured', 500);
    }

    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    return jwt.sign(payload, jwtSecret, { expiresIn: '15m' });
  }

  // Generate long-lived refresh token (7 days)
  private generateRefreshToken(user: User): string {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new AppError('JWT secret not configured', 500);
    }

    const payload: RefreshTokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      tokenVersion: user.token_version || 1,
    };

    return jwt.sign(payload, jwtSecret as Secret, {
      expiresIn: process.env.JWT_EXPIRY || '7d'
    } as SignOptions);
  }

  // Verify access token and return user ID
  verifyAccessToken(token: string): JwtPayload {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new AppError('JWT secret not configured', 500);
    }

    try {
      return jwt.verify(token, jwtSecret) as JwtPayload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new AppError('Access token expired', 401);
      }
      throw new AppError('Invalid access token', 401);
    }
  }
}

export default new AuthService();