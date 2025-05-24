import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { asyncHandler, AppError } from '../utils/errorHandler';
import agentModel from '../models/agent.model';
import agentService from '../services/agent.service';
import userModel from '../models/user.model';
import transactionModel from '../models/transaction.model';
import supabase from '../config/database';

// Request validation schemas
const createAgentSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().min(10).max(500),
  instructions: z.string().min(10),
  model_provider: z.enum(['anthropic', 'openai', 'google', 'mistral', 'meta', 'other']),
  model_id: z.string().min(3),
  model_config: z.record(z.any()).default({}),
  thumbnail_url: z.string().url().optional(),
  visibility: z.enum(['public', 'private', 'unlisted']).default('private'),
  price: z.number().min(0).default(0),
  category_id: z.string().uuid(),
  tags: z.array(z.string()).default([]),
});

const updateAgentSchema = createAgentSchema.partial();

const runAgentSchema = z.object({
  input: z.string().min(1),
  conversation_id: z.string().uuid().optional(),
});

const listAgentsSchema = z.object({
  page: z.string().transform(val => parseInt(val)).default('1'),
  limit: z.string().transform(val => parseInt(val)).default('10'),
  category_id: z.string().uuid().optional(),
  creator_id: z.string().uuid().optional(),
  visibility: z.enum(['public', 'private', 'unlisted']).optional(),
  featured: z.string().transform(val => val === 'true').optional(),
  search: z.string().optional(),
  sort_by: z.string().default('created_at'),
  sort_order: z.enum(['asc', 'desc']).default('desc'),
});

class AgentController {
  /**
   * Create a new agent
   */
  createAgent = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401));
    }

    // Validate request body
    const result = createAgentSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid input data',
        errors: result.error.errors,
      });
    }

    // Check if user can create agents (must be creator or admin)
    if (req.user.role !== 'creator' && req.user.role !== 'admin') {
      return next(new AppError('You must be a creator to publish agents', 403));
    }

    // Create agent
    const agent = await agentModel.create({
      ...result.data,
      creator_id: req.user.id,
      featured: false,
      usage_count: 0,
      average_rating: 0,
    });

    // Send response
    res.status(201).json({
      status: 'success',
      data: { agent },
    });
  });

  /**
   * Get agent by ID
   */
  getAgent = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const agentId = req.params.id;
    
    // Get the agent
    const agent = await agentModel.getById(agentId);
    
    if (!agent) {
      return next(new AppError('Agent not found', 404));
    }

    // Check visibility
    if (agent.visibility === 'private' && (!req.user || req.user.id !== agent.creator_id)) {
      return next(new AppError('You do not have access to this agent', 403));
    }

    // Get creator info
    const creator = await userModel.getById(agent.creator_id);

    // Send response
    res.status(200).json({
      status: 'success',
      data: {
        agent,
        creator: creator ? {
          id: creator.id,
          first_name: creator.first_name,
          last_name: creator.last_name,
          avatar_url: creator.avatar_url,
        } : null,
      },
    });
  });

  /**
   * Update agent
   */
  updateAgent = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401));
    }

    const agentId = req.params.id;
    
    // Get the agent
    const agent = await agentModel.getById(agentId);
    
    if (!agent) {
      return next(new AppError('Agent not found', 404));
    }

    // Check if user can update this agent
    if (agent.creator_id !== req.user.id && req.user.role !== 'admin') {
      return next(new AppError('You do not have permission to update this agent', 403));
    }

    // Validate request body
    const result = updateAgentSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid input data',
        errors: result.error.errors,
      });
    }

    // Update agent
    const updatedAgent = await agentModel.update(agentId, result.data);

    // Send response
    res.status(200).json({
      status: 'success',
      data: { agent: updatedAgent },
    });
  });

  /**
   * Delete agent
   */
  deleteAgent = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401));
    }

    const agentId = req.params.id;
    
    // Get the agent
    const agent = await agentModel.getById(agentId);
    
    if (!agent) {
      return next(new AppError('Agent not found', 404));
    }

    // Check if user can delete this agent
    if (agent.creator_id !== req.user.id && req.user.role !== 'admin') {
      return next(new AppError('You do not have permission to delete this agent', 403));
    }

    // Delete agent
    await agentModel.delete(agentId);

    // Send response
    res.status(200).json({
      status: 'success',
      message: 'Agent deleted successfully',
    });
  });

  /**
   * List agents
   */
  listAgents = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // Validate query parameters
    const result = listAgentsSchema.safeParse(req.query);
    if (!result.success) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid query parameters',
        errors: result.error.errors,
      });
    }

    // Handle visibility filter based on authentication
    let visibility = result.data.visibility;
    if (!visibility) {
      visibility = 'public';
    }

    // Only the agent creator or admins can see private agents
    if (visibility === 'private' && (!req.user || (req.user.role !== 'admin' && result.data.creator_id !== req.user.id))) {
      // Force visibility to public for unauthorized users
      visibility = 'public';
    }

    // List agents
    const { agents, total } = await agentModel.list({
      ...result.data,
      visibility,
    });

    // Send response
    res.status(200).json({
      status: 'success',
      data: {
        agents,
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
   * Run agent
   */
  runAgent = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401));
    }

    const agentId = req.params.id;
    
    // Validate request body
    const result = runAgentSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid input data',
        errors: result.error.errors,
      });
    }

    // Run agent
    const response = await agentService.runAgent(
      req.user.id,
      agentId,
      result.data.input,
      result.data.conversation_id
    );

    // Send response
    res.status(200).json({
      status: 'success',
      data: response,
    });
  });

  /**
   * Stream agent response
   */
  streamAgentResponse = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401));
    }

    const agentId = req.params.id;
    
    // Validate request body
    const result = runAgentSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid input data',
        errors: result.error.errors,
      });
    }

    // Set headers for SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    try {
      // Stream agent response
      await agentService.streamAgentResponse(
        req.user.id,
        agentId,
        result.data.input,
        result.data.conversation_id,
        res
      );
    } catch (error) {
      // Error will be handled within the service
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Error in stream controller:', errorMessage);
    }
  });

  /**
   * Purchase agent
   */
  purchaseAgent = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401));
    }

    const agentId = req.params.id;
    
    // Purchase agent
    await agentService.purchaseAgent(req.user.id, agentId);

    // Get updated user info
    const user = await userModel.getById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Send response
    res.status(200).json({
      status: 'success',
      message: 'Agent purchased successfully',
      data: {
        credits_available: user.credits_available,
      },
    });
  });

  /**
   * Get agent categories
   */
  getCategories = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // Get categories from database
    const { data, error } = await supabase
      .from('agent_categories')
      .select('*')
      .order('order', { ascending: true });

    if (error) {
      return next(new AppError(`Error fetching categories: ${error.message}`, 500));
    }

    // Send response
    res.status(200).json({
      status: 'success',
      data: { categories: data },
    });
  });

  /**
   * Rate an agent
   */
  rateAgent = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401));
    }

    const agentId = req.params.id;
    
    // Validate request body
    const ratingSchema = z.object({
      rating: z.number().min(1).max(5),
      comment: z.string().max(500).optional(),
    });

    const result = ratingSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid input data',
        errors: result.error.errors,
      });
    }

    // Check if agent exists
    const agent = await agentModel.getById(agentId);
    if (!agent) {
      return next(new AppError('Agent not found', 404));
    }

    // Check if user has used this agent
    const { count } = await supabase
      .from('messages')
      .select('id', { count: 'exact' })
      .eq('conversation_id', supabase.from('conversations').select('id').eq('user_id', req.user.id).eq('agent_id', agentId))
      .single();

    if (!count) {
      return next(new AppError('You must use this agent before rating it', 400));
    }

    // Create or update review
    const { data: existingReview } = await supabase
      .from('agent_reviews')
      .select('id')
      .eq('user_id', req.user.id)
      .eq('agent_id', agentId)
      .single();

    if (existingReview) {
      // Update existing review
      await supabase
        .from('agent_reviews')
        .update({
          rating: result.data.rating,
          comment: result.data.comment || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingReview.id);
    } else {
      // Create new review
      await supabase
        .from('agent_reviews')
        .insert({
          user_id: req.user.id,
          agent_id: agentId,
          rating: result.data.rating,
          comment: result.data.comment || null,
        });
    }

    // Update agent's average rating
    await agentModel.updateRating(agentId);

    // Send response
    res.status(200).json({
      status: 'success',
      message: 'Review submitted successfully',
    });
  });
}

export default new AgentController();