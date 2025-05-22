import { Router } from 'express';
import paymentController from '../controllers/payment.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { apiLimiter } from '../middleware/rateLimit.middleware';

const router = Router();

// Public routes
router.post('/webhook', paymentController.handleWebhook);
router.get('/plans', apiLimiter, paymentController.getSubscriptionPlans);

// Protected routes
router.post('/checkout/credits', authenticateToken, apiLimiter, paymentController.createCreditCheckout);
router.post('/checkout/subscription', authenticateToken, apiLimiter, paymentController.createSubscriptionCheckout);
router.get('/transactions', authenticateToken, apiLimiter, paymentController.getUserTransactions);
router.get('/sessions/:sessionId', authenticateToken, apiLimiter, paymentController.checkSession);

export default router;