import { Router } from 'express';
import authController from '../controllers/auth.controller';
import { authenticateToken, refreshAccessToken } from '../middleware/auth.middleware';
import { authLimiter } from '../middleware/rateLimit.middleware';

const router = Router();

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

// Public routes
router.post('/register', authLimiter, authController.register);
router.post('/login', authLimiter, authController.login);
router.post('/refresh-token', authLimiter, authController.refreshToken);
router.post('/reset-password-request', authLimiter, authController.requestPasswordReset);
router.post('/reset-password', authLimiter, authController.resetPassword);

// Protected routes
router.get('/profile', authenticateToken, authController.getProfile);
router.patch('/profile', authenticateToken, authController.updateProfile);
router.post('/logout', authenticateToken, authController.logout);
router.post('/change-password', authenticateToken, authLimiter, authController.changePassword);

// Special route with token refresh attempt
router.get('/session', authenticateToken, (req, res) => {
  // If we reached here, authentication was successful
  res.status(200).json({
    status: 'success',
    message: 'Session is valid',
    data: {
      user: req.user
    }
  });
});

// Add token refresh fallback for session check
router.get('/session', refreshAccessToken, (req, res) => {
  // We only reach here if the first handler failed and the token was refreshed
  res.status(200).json({
    status: 'success',
    message: 'Session renewed with refresh token',
    data: {
      user: req.user,
      accessToken: req.accessToken
    }
  });
});

export default router;