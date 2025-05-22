import { Agent } from '../types/database';
import { AppError } from '../utils/errorHandler';
import agentModel from '../models/agent.model';
import userModel from '../models/user.model';
import transactionModel from '../models/transaction.model';
import conversationModel from '../models/conversation.model';
import openRouterService from './openrouter.service';
import logger from '../utils/logger';

class AgentService {
  /**
   * Run an agent with given input
   */
  async runAgent(
    userId: string,
    agentId: string,
    input: string,
    conversationId?: string
  ): Promise<{
    response: string;
    conversationId: string;
    messageId: string;
    tokensUsed: number;
  }> {
    // Get the agent
    const agent = await agentModel.getById(agentId);
    if (!agent) {
      throw new AppError('Agent not found', 404);
    }

    // Get the user
    const user = await userModel.getById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Check if user has purchased this agent or if it's free
    if (agent.price > 0) {
      const hasAccess = await this.checkUserAgentAccess(userId, agentId);
      if (!hasAccess) {
        throw new AppError('Access denied. You need to purchase this agent first.', 403);
      }
    }

    // Create or get conversation
    let conversation;
    if (conversationId) {
      conversation = await conversationModel.getById(conversationId, userId);
      if (!conversation) {
        throw new AppError('Conversation not found or access denied', 404);
      }
    } else {
      // Get agent title as conversation title
      const title = agent.name;
      conversation = await conversationModel.create(userId, agentId, title);
    }

    // Get conversation history if it exists
    const conversationHistory = await conversationModel.getMessages(conversation.id, userId, {
      limit: 10, // Limit to last 10 messages for context
    });

    // Prepare messages for the AI
    const messages: Array<{role: 'user' | 'assistant' | 'system', content: string}> = [
      {
        role: 'system',
        content: agent.instructions
      }
    ];

    // Add conversation history
    conversationHistory.forEach(msg => {
      messages.push({
        role: msg.role as 'user' | 'assistant' | 'system',
        content: msg.content
      });
    });

    // Add the new user message
    messages.push({
      role: 'user',
      content: input
    });

    // Save the user message
    const userMessage = await conversationModel.addMessage(
      conversation.id,
      'user',
      input
    );

    try {
      // Call OpenRouter
      const result = await openRouterService.getChatCompletion({
        model: agent.model_id,
        messages,
        temperature: agent.model_config.temperature || 0.7,
        max_tokens: agent.model_config.max_tokens || 2000,
        top_p: agent.model_config.top_p || 1,
        frequency_penalty: agent.model_config.frequency_penalty || 0,
        presence_penalty: agent.model_config.presence_penalty || 0,
      });

      // Calculate token cost
      const tokensUsed = result.usage.total_tokens;
      const creditCost = this.calculateCreditCost(tokensUsed, agent.model_id);

      // Save the assistant's response
      const assistantMessage = await conversationModel.addMessage(
        conversation.id,
        'assistant',
        result.content,
        tokensUsed
      );

      // Update agent usage count
      await agentModel.incrementUsage(agentId);

      // Record the transaction for agent usage
      await transactionModel.create({
        user_id: userId,
        type: 'agent_usage',
        amount: -creditCost, // Negative amount for usage
        description: `Used agent: ${agent.name}`,
        reference_id: agentId
      });

      return {
        response: result.content,
        conversationId: conversation.id,
        messageId: assistantMessage.id,
        tokensUsed
      };
    } catch (error) {
      logger.error('Error running agent', { error, agentId, userId });
      
      // If there was an error, still save it to the conversation
      await conversationModel.addMessage(
        conversation.id,
        'assistant',
        `Error: ${error instanceof AppError ? error.message : 'Failed to generate response'}`
      );
      
      throw error;
    }
  }

  /**
   * Stream an agent response
   */
  async streamAgentResponse(
    userId: string,
    agentId: string,
    input: string,
    conversationId: string | undefined,
    res: any
  ): Promise<{ conversationId: string }> {
    // Get the agent
    const agent = await agentModel.getById(agentId);
    if (!agent) {
      throw new AppError('Agent not found', 404);
    }

    // Get the user
    const user = await userModel.getById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Check if user has purchased this agent or if it's free
    if (agent.price > 0) {
      const hasAccess = await this.checkUserAgentAccess(userId, agentId);
      if (!hasAccess) {
        throw new AppError('Access denied. You need to purchase this agent first.', 403);
      }
    }

    // Create or get conversation
    let conversation;
    if (conversationId) {
      conversation = await conversationModel.getById(conversationId, userId);
      if (!conversation) {
        throw new AppError('Conversation not found or access denied', 404);
      }
    } else {
      // Get agent title as conversation title
      const title = agent.name;
      conversation = await conversationModel.create(userId, agentId, title);
    }

    // Get conversation history
    const conversationHistory = await conversationModel.getMessages(conversation.id, userId, {
      limit: 10, // Limit to last 10 messages for context
    });

    // Prepare messages for the AI
    const messages: Array<{role: 'user' | 'assistant' | 'system', content: string}> = [
      {
        role: 'system',
        content: agent.instructions
      }
    ];

    // Add conversation history
    conversationHistory.forEach(msg => {
      messages.push({
        role: msg.role as 'user' | 'assistant' | 'system',
        content: msg.content
      });
    });

    // Add the new user message
    messages.push({
      role: 'user',
      content: input
    });

    // Save the user message
    await conversationModel.addMessage(
      conversation.id,
      'user',
      input
    );

    // Send initial SSE response with conversation ID
    res.write(`data: ${JSON.stringify({ conversationId: conversation.id })}\n\n`);

    // Store the full response content for saving later
    let fullResponseContent = '';
    let totalTokens = 0;

    // Create a callback function to handle chunks
    const processChunk = (chunk: any) => {
      if (chunk.choices && chunk.choices[0]?.delta?.content) {
        fullResponseContent += chunk.choices[0].delta.content;
      }
      
      // Update tokens when available
      if (chunk.usage) {
        totalTokens = chunk.usage.total_tokens;
      }
    };

    try {
      // Stream response from OpenRouter
      await openRouterService.streamChatCompletion({
        model: agent.model_id,
        messages,
        temperature: agent.model_config.temperature || 0.7,
        max_tokens: agent.model_config.max_tokens || 2000,
        top_p: agent.model_config.top_p || 1,
        frequency_penalty: agent.model_config.frequency_penalty || 0,
        presence_penalty: agent.model_config.presence_penalty || 0,
        stream: true,
      }, res);

      // Once streaming is complete, save the full response
      if (fullResponseContent) {
        // Save the assistant's response
        await conversationModel.addMessage(
          conversation.id,
          'assistant',
          fullResponseContent,
          totalTokens
        );

        // Update agent usage count
        await agentModel.incrementUsage(agentId);

        // Calculate credit cost and record transaction
        if (totalTokens > 0) {
          const creditCost = this.calculateCreditCost(totalTokens, agent.model_id);
          
          await transactionModel.create({
            user_id: userId,
            type: 'agent_usage',
            amount: -creditCost, // Negative amount for usage
            description: `Used agent: ${agent.name}`,
            reference_id: agentId
          });
        }
      }

      return { conversationId: conversation.id };
    } catch (error) {
      logger.error('Error streaming agent response', { error, agentId, userId });
      
      // If there was an error, still save it to the conversation
      await conversationModel.addMessage(
        conversation.id,
        'assistant',
        `Error: ${error instanceof AppError ? error.message : 'Failed to generate response'}`
      );
      
      throw error;
    }
  }

  /**
   * Check if a user has access to a specific agent
   */
  async checkUserAgentAccess(userId: string, agentId: string): Promise<boolean> {
    // Get the agent
    const agent = await agentModel.getById(agentId);
    if (!agent) {
      return false;
    }

    // If agent is free, everyone has access
    if (agent.price <= 0) {
      return true;
    }

    // If user is the creator, they have access
    if (agent.creator_id === userId) {
      return true;
    }

    // Otherwise, check if user has purchased this agent
    const { data, error } = await supabase
      .from('agent_purchases')
      .select('id')
      .eq('user_id', userId)
      .eq('agent_id', agentId)
      .single();

    if (error) {
      return false;
    }

    return !!data;
  }

  /**
   * Purchase an agent
   */
  async purchaseAgent(userId: string, agentId: string): Promise<void> {
    // Get the agent
    const agent = await agentModel.getById(agentId);
    if (!agent) {
      throw new AppError('Agent not found', 404);
    }

    // Check if agent is purchasable
    if (agent.price <= 0) {
      throw new AppError('This agent is free and does not need to be purchased', 400);
    }

    // Check if the user already owns this agent
    const hasAccess = await this.checkUserAgentAccess(userId, agentId);
    if (hasAccess) {
      throw new AppError('You already own this agent', 400);
    }

    // Check if user has enough credits
    const user = await userModel.getById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (user.credits_available < agent.price) {
      throw new AppError(`Insufficient credits. Required: ${agent.price}, Available: ${user.credits_available}`, 402);
    }

    // Start a transaction in Supabase (will be handled automatically by the transaction model)
    
    // Record the purchase transaction
    await transactionModel.create({
      user_id: userId,
      type: 'agent_purchase',
      amount: -agent.price, // Negative amount for purchase
      description: `Purchased agent: ${agent.name}`,
      reference_id: agentId
    });

    // If user is not the creator, also create a sale transaction for the creator
    if (userId !== agent.creator_id) {
      // Creator gets 80% of the sale
      const creatorAmount = Math.floor(agent.price * 0.8);
      
      await transactionModel.create({
        user_id: agent.creator_id,
        type: 'agent_sale',
        amount: creatorAmount, // Positive amount for sale
        description: `Sale of agent: ${agent.name}`,
        reference_id: agentId
      });
    }

    // Record the purchase in the agent_purchases table
    const { error } = await supabase
      .from('agent_purchases')
      .insert([{
        user_id: userId,
        agent_id: agentId,
        price_paid: agent.price
      }]);

    if (error) {
      throw new AppError(`Error recording agent purchase: ${error instanceof Error ? error.message : 'Unknown error'}`, 500);
    }
  }

  /**
   * Calculate credit cost based on tokens used and model
   */
  private calculateCreditCost(tokensUsed: number, modelId: string): number {
    // Different models have different credit costs per token
    const costPerToken: Record<string, number> = {
      // Default rates, can be adjusted
      'anthropic/claude-3-opus': 0.01,
      'anthropic/claude-3-sonnet': 0.005,
      'anthropic/claude-3-haiku': 0.002,
      'openai/gpt-4': 0.01,
      'openai/gpt-4o': 0.008,
      'openai/gpt-3.5-turbo': 0.001,
      'google/gemini-1.5-pro': 0.005,
      'meta/llama-3-70b': 0.003,
    };

    // Get the base model name
    const baseModelId = Object.keys(costPerToken).find(
      (baseId) => modelId.toLowerCase().includes(baseId.toLowerCase())
    );

    // Use the cost for the matching base model, or a default cost
    const rate = baseModelId ? costPerToken[baseModelId] : 0.003;

    // Calculate cost and round up to nearest integer credit
    return Math.ceil(tokensUsed * rate);
  }
}

import supabase from '../config/database';
export default new AgentService();