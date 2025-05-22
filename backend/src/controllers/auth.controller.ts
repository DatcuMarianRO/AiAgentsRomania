import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { asyncHandler } from '../utils/errorHandler';
import authService from '../services/auth.service';
import userModel from '../models/user.model';
import logger from '../utils/logger';

/**
 * OpenAPI Documentation for AuthController
 * @openapi
 * tags:
 *   name: Authentication
 *   description: User authentication and management
 * 
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: User's unique identifier
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         first_name:
 *           type: string
 *           description: User's first name
 *         last_name:
 *           type: string
 *           description: User's last name
 *         avatar_url:
 *           type: string
 *           nullable: true
 *           description: URL to user's avatar image
 *         role:
 *           type: string
 *           enum: [user, creator, admin]
 *           description: User's role in the system
 *         subscription_tier:
 *           type: string
 *           enum: [free, basic, premium, enterprise]
 *           description: User's subscription level
 *         credits_available:
 *           type: integer
 *           description: Number of credits available to the user
 *       required:
 *         - id
 *         - email
 *         - first_name
 *         - last_name
 *         - role
 *         - subscription_tier
 *         - credits_available
 */

// Request validation schemas
const registerSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
});

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

const resetPasswordRequestSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: z.string().min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

const updateProfileSchema = z.object({
  first_name: z.string().min(1, 'First name is required').optional(),
  last_name: z.string().min(1, 'Last name is required').optional(),
  avatar_url: z.string().url('Must be a valid URL').optional().nullable(),
});

class AuthController {
  /**
   * Register a new user
   * @openapi
   * /api/v1/auth/register:
   *   post:
   *     summary: Register a new user
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *               password:
   *                 type: string
   *                 format: password
   *                 minLength: 8
   *               first_name:
   *                 type: string
   *               last_name:
   *                 type: string
   *             required:
   *               - email
   *               - password
   *               - first_name
   *               - last_name
   *     responses:
   *       201:
   *         description: User registered successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: success
   *                 data:
   *                   type: object
   *                   properties:
   *                     user:
   *                       $ref: '#/components/schemas/User'
   *                     accessToken:
   *                       type: string
   *                     refreshToken:
   *                       type: string
   */
  register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // Validate request body
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: result.error.format(),
      });
    }

    // Register user
    const { user, accessToken, refreshToken } = await authService.register(result.data);
    
    // Verify user registration was successful
    if (!user) {
      return res.status(500).json({
        status: 'error',
        message: 'Registration failed - user not created',
      });
    }

    // Set refresh token as HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send response
    res.status(201).json({
      status: 'success',
      data: {
        user: {
          id: user.id,
          email: user.email ?? '',
          first_name: user.first_name ?? '',
          last_name: user.last_name ?? '',
          role: user.role ?? 'user',
          subscription_tier: user.subscription_tier ?? 'free',
          credits_available: user.credits_available ?? 0,
          avatar_url: user.avatar_url ?? undefined,
        },
        accessToken,
      },
    });
  });

  /**
   * Login user
   * @openapi
   * /api/v1/auth/login:
   *   post:
   *     summary: Authenticate user and get token
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *               password:
   *                 type: string
   *                 format: password
   *             required:
   *               - email
   *               - password
   *     responses:
   *       200:
   *         description: User authenticated successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: success
   *                 data:
   *                   type: object
   *                   properties:
   *                     user:
   *                       $ref: '#/components/schemas/User'
   *                     accessToken:
   *                       type: string
   */
  login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // Validate request body
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: result.error.format(),
      });
    }

    // Login user
    const { user, accessToken, refreshToken } = await authService.login(
      result.data.email, 
      result.data.password
    );
    
    // Verify login was successful
    if (!user) {
      return res.status(500).json({
        status: 'error',
        message: 'Login failed - user data not available',
      });
    }

    // Set refresh token as HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Log the login
    logger.info('User login successful', {
      userId: user.id,
      email: user.email ?? '',
      role: user.role ?? 'user',
    });

    // Send response
    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: user.id,
          email: user.email ?? '',
          first_name: user.first_name ?? '',
          last_name: user.last_name ?? '',
          role: user.role ?? 'user',
          subscription_tier: user.subscription_tier ?? 'free',
          credits_available: user.credits_available ?? 0,
          avatar_url: user.avatar_url ?? undefined,
        },
        accessToken,
      },
    });
  });

  /**
   * Refresh access token
   * @openapi
   * /api/v1/auth/refresh-token:
   *   post:
   *     summary: Refresh access token using refresh token
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               refreshToken:
   *                 type: string
   *             required:
   *               - refreshToken
   *     responses:
   *       200:
   *         description: Token refreshed successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: success
   *                 data:
   *                   type: object
   *                   properties:
   *                     accessToken:
   *                       type: string
   *                     user:
   *                       $ref: '#/components/schemas/User'
   */
  refreshToken = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // Get refresh token from cookie or request body
    let refreshToken = req.cookies?.refreshToken;
    
    // If no cookie, check request body
    if (!refreshToken) {
      const result = refreshTokenSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          status: 'error',
          message: 'Refresh token is required',
          errors: result.error.format(),
        });
      }
      refreshToken = result.data.refreshToken;
    }

    // Refresh token
    const { accessToken, user } = await authService.refreshToken(refreshToken);
    
    // Verify refresh was successful
    if (!user) {
      return res.status(500).json({
        status: 'error',
        message: 'Token refresh failed - user data not available',
      });
    }

    // Send response
    res.status(200).json({
      status: 'success',
      data: {
        accessToken,
        user: {
          id: user.id,
          email: user.email ?? '',
          first_name: user.first_name ?? '',
          last_name: user.last_name ?? '',
          role: user.role ?? 'user',
          subscription_tier: user.subscription_tier ?? 'free',
          credits_available: user.credits_available ?? 0,
          avatar_url: user.avatar_url ?? undefined,
        },
      },
    });
  });

  /**
   * Logout user
   * @openapi
   * /api/v1/auth/logout:
   *   post:
   *     summary: Logout user and invalidate tokens
   *     tags: [Authentication]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: User logged out successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: success
   *                 message:
   *                   type: string
   *                   example: Logged out successfully
   */
  logout = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Not authenticated',
      });
    }

    // Logout user (invalidate refresh tokens)
    await authService.logout(req.user.id);

    // Clear refresh token cookie
    res.clearCookie('refreshToken');

    // Send response
    res.status(200).json({
      status: 'success',
      message: 'Logged out successfully',
    });
  });

  /**
   * Get current user profile
   * @openapi
   * /api/v1/auth/profile:
   *   get:
   *     summary: Get current user profile
   *     tags: [Authentication]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: User profile retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: success
   *                 data:
   *                   type: object
   *                   properties:
   *                     user:
   *                       $ref: '#/components/schemas/User'
   */
  getProfile = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Not authenticated',
      });
    }

    // Get fresh user data
    const user = await userModel.getById(req.user.id);
    
    // Check if user exists
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    // Send response
    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: user.id,
          email: user.email ?? '',
          first_name: user.first_name ?? '',
          last_name: user.last_name ?? '',
          role: user.role ?? 'user',
          subscription_tier: user.subscription_tier ?? 'free',
          credits_available: user.credits_available ?? 0,
          avatar_url: user.avatar_url ?? undefined,
        },
      },
    });
  });

  /**
   * Update user profile
   * @openapi
   * /api/v1/auth/profile:
   *   patch:
   *     summary: Update current user profile
   *     tags: [Authentication]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               first_name:
   *                 type: string
   *               last_name:
   *                 type: string
   *               avatar_url:
   *                 type: string
   *                 format: uri
   *                 nullable: true
   *     responses:
   *       200:
   *         description: User profile updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: success
   *                 data:
   *                   type: object
   *                   properties:
   *                     user:
   *                       $ref: '#/components/schemas/User'
   */
  updateProfile = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Not authenticated',
      });
    }

    // Validate request body
    const result = updateProfileSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: result.error.format(),
      });
    }

    // Prepare update data, converting null to undefined for avatar_url
    const updateData = {
      ...result.data,
      avatar_url: result.data.avatar_url === null ? undefined : result.data.avatar_url
    };
    
    // Update user
    const updatedUser = await userModel.update(req.user.id, updateData);
    
    // Check if user update was successful
    if (!updatedUser) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found or update failed',
      });
    }

    // Send response
    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: updatedUser.id,
          email: updatedUser.email ?? '',
          first_name: updatedUser.first_name ?? '',
          last_name: updatedUser.last_name ?? '',
          role: updatedUser.role ?? 'user',
          subscription_tier: updatedUser.subscription_tier ?? 'free',
          credits_available: updatedUser.credits_available ?? 0,
          avatar_url: updatedUser.avatar_url ?? undefined,
        },
      },
    });
  });

  /**
   * Change password
   * @openapi
   * /api/v1/auth/change-password:
   *   post:
   *     summary: Change user password when logged in
   *     tags: [Authentication]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               currentPassword:
   *                 type: string
   *                 format: password
   *               newPassword:
   *                 type: string
   *                 format: password
   *                 minLength: 8
   *             required:
   *               - currentPassword
   *               - newPassword
   *     responses:
   *       200:
   *         description: Password changed successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: success
   *                 message:
   *                   type: string
   *                   example: Password changed successfully
   */
  changePassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Not authenticated',
      });
    }

    // Validate request body
    const result = changePasswordSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: result.error.format(),
      });
    }

    // Change password
    await authService.changePassword(
      req.user.id,
      result.data.currentPassword,
      result.data.newPassword
    );

    // Send response
    res.status(200).json({
      status: 'success',
      message: 'Password changed successfully',
    });
  });

  /**
   * Request password reset
   * @openapi
   * /api/v1/auth/reset-password-request:
   *   post:
   *     summary: Request password reset email
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *             required:
   *               - email
   *     responses:
   *       200:
   *         description: Password reset email sent if email exists
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: success
   *                 message:
   *                   type: string
   */
  requestPasswordReset = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // Validate request body
    const result = resetPasswordRequestSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: result.error.format(),
      });
    }

    // Request password reset
    await authService.requestPasswordReset(result.data.email);

    // Send response (don't indicate if email exists for security)
    res.status(200).json({
      status: 'success',
      message: 'If your email is registered, you will receive a password reset link',
    });
  });

  /**
   * Reset password with token
   * @openapi
   * /api/v1/auth/reset-password:
   *   post:
   *     summary: Reset password using token from email
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               token:
   *                 type: string
   *               password:
   *                 type: string
   *                 format: password
   *                 minLength: 8
   *             required:
   *               - token
   *               - password
   *     responses:
   *       200:
   *         description: Password reset successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: success
   *                 message:
   *                   type: string
   *                   example: Password has been reset successfully
   */
  resetPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // Validate request body
    const result = resetPasswordSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: result.error.format(),
      });
    }

    // Reset password
    await authService.resetPassword(result.data.token, result.data.password);

    // Send response
    res.status(200).json({
      status: 'success',
      message: 'Password has been reset successfully',
    });
  });
}

export default new AuthController();