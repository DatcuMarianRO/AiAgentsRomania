import { Router } from 'express';
import agentController from '../controllers/agent.controller';
import { authenticateToken, requireRole } from '../middleware/auth.middleware';
import { apiLimiter, agentRunLimiter } from '../middleware/rateLimit.middleware';

const router = Router();

// Public routes
router.get('/', apiLimiter, agentController.listAgents);
router.get('/categories', apiLimiter, agentController.getCategories);
router.get('/:id', apiLimiter, agentController.getAgent);

// Protected routes
router.post('/', authenticateToken, requireRole(['creator', 'admin']), apiLimiter, agentController.createAgent);
router.put('/:id', authenticateToken, apiLimiter, agentController.updateAgent);
router.delete('/:id', authenticateToken, apiLimiter, agentController.deleteAgent);
router.post('/:id/run', authenticateToken, agentRunLimiter, agentController.runAgent);
router.post('/:id/stream', authenticateToken, agentRunLimiter, agentController.streamAgentResponse);
router.post('/:id/purchase', authenticateToken, apiLimiter, agentController.purchaseAgent);
router.post('/:id/rate', authenticateToken, apiLimiter, agentController.rateAgent);

export default router;