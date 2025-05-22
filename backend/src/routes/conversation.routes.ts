import { Router } from 'express';
import conversationController from '../controllers/conversation.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { apiLimiter } from '../middleware/rateLimit.middleware';

const router = Router();

// All routes are protected
router.use(authenticateToken);

router.post('/', apiLimiter, conversationController.createConversation);
router.get('/', apiLimiter, conversationController.listConversations);
router.get('/:id', apiLimiter, conversationController.getConversation);
router.patch('/:id', apiLimiter, conversationController.updateTitle);
router.delete('/:id', apiLimiter, conversationController.deleteConversation);
router.get('/:id/messages', apiLimiter, conversationController.getMessages);

export default router;