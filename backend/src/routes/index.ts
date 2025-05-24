import { Router } from 'express';
import authRoutes from './auth.routes';
import agentRoutes from './agent.routes';
import conversationRoutes from './conversation.routes';
import paymentRoutes from './payment.routes';
import metricsController from '../controllers/metrics.controller';

const router = Router();

// Register all routes
router.use('/auth', authRoutes);
router.use('/agents', agentRoutes);
router.use('/conversations', conversationRoutes);
router.use('/payments', paymentRoutes);
router.use('/metrics', metricsController);

export default router;