import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../types/database';
import { AppError } from '../utils/errorHandler';
import userModel from '../models/user.model';
import authService from '../services/auth.service';
import logger from '../utils/logger';

// Extend Express Request type to include user property
declare global {
  namespace Express {
    interface Request {
      user?: User;
      accessToken?: string;
      refreshToken?: string;
    }
  }
}

/**
 * Middleware to authenticate with JWT access token
 * This middleware will:
 * 1. Extract the access token from the Authorization header
 * 2. Verify the token
 * 3. Fetch the user from the database
 * 4. Attach the user to the request object
 */
export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

    if (!token) {
      return next(new AppError('Authentication required', 401));
    }

    // Verify token and extract payload
    const payload = authService.verifyAccessToken(token);
    
    // Fetch the user from database to get latest data
    const user = await userModel.getById(payload.userId);

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    // Attach user and token to request
    req.user = user;
    req.accessToken = token;
    
    next();
  } catch (error) {
    logger.debug('Authentication failed', { 
      error: error instanceof Error ? error.message : String(error),
      path: req.path
    });
    
    if (error instanceof AppError) {
      return next(error);
    }
    
    if (error instanceof jwt.TokenExpiredError) {
      return next(new AppError('Access token expired', 401));
    }
    
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new AppError('Invalid token', 401));
    }
    
    next(new AppError('Authentication failed', 401));
  }
};

/**
 * Middleware to refresh an expired access token using a refresh token
 * This middleware should be used after authenticateToken fails with a 401 error
 * It will:
 * 1. Extract the refresh token from cookie or header
 * 2. Verify the refresh token
 * 3. Generate a new access token
 * 4. Set the new access token in the response headers
 * 5. Attach the user to the request object
 */
export const refreshAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get refresh token from cookie or Authorization header
    let refreshToken = req.cookies?.refreshToken;
    
    if (!refreshToken && req.headers.refresh) {
      refreshToken = String(req.headers.refresh);
    }

    if (!refreshToken) {
      return next(new AppError('Refresh token required', 401));
    }

    // Refresh the token
    const { accessToken, user } = await authService.refreshToken(refreshToken);

    // Attach user and tokens to request
    req.user = user;
    req.accessToken = accessToken;
    req.refreshToken = refreshToken;

    // Set the new access token in response header
    res.setHeader('X-Access-Token', accessToken);

    next();
  } catch (error) {
    logger.debug('Token refresh failed', { 
      error: error instanceof Error ? error.message : String(error),
      path: req.path
    });
    
    if (error instanceof AppError) {
      return next(error);
    }
    
    next(new AppError('Failed to refresh token', 401));
  }
};

/**
 * Middleware to check if user has required role
 */
export const requireRole = (roles: string | string[]) => {
  const allowedRoles = Array.isArray(roles) ? roles : [roles];
  
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new AppError(
          `Access denied. Required role: ${allowedRoles.join(' or ')}`,
          403
        )
      );
    }

    next();
  };
};

/**
 * Middleware to check if user has sufficient credits
 */
export const requireCredits = (amount: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401));
    }

    if (req.user.credits_available < amount) {
      return next(
        new AppError(
          `Insufficient credits. Required: ${amount}, Available: ${req.user.credits_available}`,
          402
        )
      );
    }

    next();
  };
};

/**
 * Middleware to check if user owns a resource
 */
export const requireOwnership = (
  getResourceOwnerId: (req: Request) => Promise<string | null> | string | null
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401));
    }

    try {
      const ownerId = await getResourceOwnerId(req);
      
      if (!ownerId) {
        return next(new AppError('Resource not found', 404));
      }

      if (ownerId !== req.user.id && req.user.role !== 'admin') {
        return next(new AppError('You do not have permission to access this resource', 403));
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};