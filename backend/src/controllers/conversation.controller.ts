import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { asyncHandler, AppError } from '../utils/errorHandler';
import conversationModel from '../models/conversation.model';

// Request validation schemas
const createConversationSchema = z.object({
  agent_id: z.string().uuid(),
  title: z.string().min(1).max(100),
});

const updateTitleSchema = z.object({
  title: z.string().min(1).max(100),
});

const getMessagesSchema = z.object({
  limit: z.string().transform(val => parseInt(val)).default('50'),
  before_id: z.string().optional(),
});

const listConversationsSchema = z.object({
  page: z.string().transform(val => parseInt(val)).default('1'),
  limit: z.string().transform(val => parseInt(val)).default('10'),
  agent_id: z.string().uuid().optional(),
});

class ConversationController {
  /**
   * Create a new conversation
   */
  createConversation = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401));
    }

    // Validate request body
    const result = createConversationSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid input data',
        errors: result.error.errors,
      });
    }

    // Create conversation
    const conversation = await conversationModel.create(
      req.user.id,
      result.data.agent_id,
      result.data.title
    );

    // Send response
    res.status(201).json({
      status: 'success',
      data: { conversation },
    });
  });

  /**
   * Get conversation by ID
   */
  getConversation = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401));
    }

    const conversationId = req.params.id;
    
    // Get the conversation
    const conversation = await conversationModel.getById(conversationId, req.user.id);
    
    if (!conversation) {
      return next(new AppError('Conversation not found', 404));
    }

    // Send response
    res.status(200).json({
      status: 'success',
      data: { conversation },
    });
  });

  /**
   * List user conversations
   */
  listConversations = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401));
    }

    // Validate query parameters
    const result = listConversationsSchema.safeParse(req.query);
    if (!result.success) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid query parameters',
        errors: result.error.errors,
      });
    }

    // List conversations
    const { conversations, total } = await conversationModel.listByUser(req.user.id, {
      page: result.data.page,
      limit: result.data.limit,
      agentId: result.data.agent_id,
    });

    // Send response
    res.status(200).json({
      status: 'success',
      data: {
        conversations,
        pagination: {
          page: result.data.page,
          limit: result.data.limit,
          total,
          pages: Math.ceil(total / result.data.limit),
        },
      },
    });
  });

  /**
   * Update conversation title
   */
  updateTitle = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401));
    }

    const conversationId = req.params.id;

    // Validate request body
    const result = updateTitleSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid input data',
        errors: result.error.errors,
      });
    }

    // Update conversation title
    const conversation = await conversationModel.updateTitle(
      conversationId,
      req.user.id,
      result.data.title
    );

    // Send response
    res.status(200).json({
      status: 'success',
      data: { conversation },
    });
  });

  /**
   * Delete conversation
   */
  deleteConversation = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401));
    }

    const conversationId = req.params.id;
    
    // Delete the conversation
    await conversationModel.delete(conversationId, req.user.id);

    // Send response
    res.status(200).json({
      status: 'success',
      message: 'Conversation deleted successfully',
    });
  });

  /**
   * Get messages for a conversation
   */
  getMessages = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401));
    }

    const conversationId = req.params.id;
    
    // Validate query parameters
    const result = getMessagesSchema.safeParse(req.query);
    if (!result.success) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid query parameters',
        errors: result.error.errors,
      });
    }

    // Get messages
    const messages = await conversationModel.getMessages(
      conversationId,
      req.user.id,
      {
        limit: result.data.limit,
        beforeId: result.data.before_id,
      }
    );

    // Send response
    res.status(200).json({
      status: 'success',
      data: { messages },
    });
  });
}

export default new ConversationController();