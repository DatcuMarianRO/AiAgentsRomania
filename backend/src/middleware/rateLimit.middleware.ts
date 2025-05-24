import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import redisClient from '../utils/cache';
import { Request, Response } from 'express';
import logger from '../utils/logger';

// Helper function to create Redis store
const createRedisStore = (prefix: string) => new RedisStore({
  // Use our Redis instance
  sendCommand: async (...args: any[]) => redisClient.call(args[0], ...args.slice(1)) as Promise<any>,
  prefix: `ratelimit:${prefix}:`,
});

// Helper function to create rate limiters
export const createRateLimiter = (options: {
  windowMs?: number;
  max?: number;
  message?: string;
  keyGenerator?: (req: Request) => string;
  path?: string; // Path or resource name for logging
}) => {
  const {
    windowMs = 60 * 1000, // 1 minute
    max = 100, // limit each IP to 100 requests per windowMs
    message = 'Too many requests, please try again later.',
    keyGenerator,
    path = 'unknown',
  } = options;

  return rateLimit({
    windowMs,
    max,
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Don't send the `X-RateLimit-*` headers
    store: createRedisStore(path),
    message: {
      status: 'error',
      message,
    },
    keyGenerator: keyGenerator || ((req) => {
      // Use IP address as default key
      return req.ip || 'unknown';
    }),
    handler: (req: Request, res: Response) => {
      // Log rate limit hit
      logger.warn('Rate limit exceeded', { 
        path, 
        ip: req.ip, 
        userId: req.user?.id,
        userAgent: req.headers['user-agent'] 
      });
      
      // Respond with standardized JSON
      res.status(429).json({
        status: 'error',
        message,
      });
    },
    skip: (req) => {
      // Skip rate limiting for certain endpoints or in development
      if (process.env.NODE_ENV !== 'production' && process.env.DISABLE_RATE_LIMITS === 'true') {
        return true;
      }
      return false;
    },
  });
};

// General API rate limiter
export const apiLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  max: 200, // 200 requests per minute
  message: 'Too many API requests, please try again later.',
  path: 'api',
});

// Auth endpoints rate limiter (stricter)
export const authLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // 30 requests per 15 minutes
  message: 'Too many authentication attempts, please try again later.',
  path: 'auth',
});

// Agent run rate limiter
export const agentRunLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // 20 requests per minute
  message: 'Too many agent runs, please try again later.',
  path: 'agent-run',
  keyGenerator: (req) => {
    // Use user ID if authenticated, otherwise IP
    return req.user?.id ? `user:${req.user.id}` : `ip:${req.ip || 'unknown'}`;
  },
});

// Stricter agent run limiter for free tier users
export const freeTierAgentRunLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50, // 50 requests per hour for free tier
  message: 'Free tier usage limit reached. Please upgrade your subscription for more usage.',
  path: 'agent-run-free-tier',
  keyGenerator: (req) => {
    return req.user?.id ? `free:${req.user.id}` : `ip:${req.ip || 'unknown'}`;
  },
});

// Payment attempts limiter
export const paymentLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 payment attempts per hour
  message: 'Too many payment attempts. Please try again later.',
  path: 'payment',
  keyGenerator: (req) => {
    return req.user?.id ? `payment:${req.user.id}` : `ip:${req.ip || 'unknown'}`;
  },
});