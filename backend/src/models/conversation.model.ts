import supabase from '../config/database';
import { Conversation, Message } from '../types/database';
import { AppError } from '../utils/errorHandler';

class ConversationModel {
  // Create a new conversation
  async create(
    userId: string, 
    agentId: string, 
    title: string
  ): Promise<Conversation> {
    const { data, error } = await supabase
      .from('conversations')
      .insert([{
        user_id: userId,
        agent_id: agentId,
        title
      }])
      .select()
      .single();

    if (error) {
      throw new AppError(`Error creating conversation: ${error.message}`, 500);
    }

    return data;
  }

  // Get conversation by ID
  async getById(id: string, userId: string): Promise<Conversation | null> {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId) // Security: ensure this conversation belongs to the user
      .single();

    if (error) {
      throw new AppError(`Error fetching conversation: ${error.message}`, 500);
    }

    return data;
  }

  // List user conversations
  async listByUser(
    userId: string,
    options: {
      page?: number;
      limit?: number;
      agentId?: string;
    } = {}
  ): Promise<{ conversations: Conversation[]; total: number }> {
    const {
      page = 1,
      limit = 10,
      agentId,
    } = options;

    const offset = (page - 1) * limit;

    // Start building the query
    let query = supabase
      .from('conversations')
      .select('*', { count: 'exact' })
      .eq('user_id', userId);

    // Filter by agent if provided
    if (agentId) {
      query = query.eq('agent_id', agentId);
    }

    // Apply pagination and ordering
    query = query
      .order('updated_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Execute the query
    const { data, error, count } = await query;

    if (error) {
      throw new AppError(`Error listing conversations: ${error.message}`, 500);
    }

    return {
      conversations: data || [],
      total: count || 0,
    };
  }

  // Update conversation title
  async updateTitle(id: string, userId: string, title: string): Promise<Conversation> {
    const { data, error } = await supabase
      .from('conversations')
      .update({ title })
      .eq('id', id)
      .eq('user_id', userId) // Security: ensure this conversation belongs to the user
      .select()
      .single();

    if (error) {
      throw new AppError(`Error updating conversation title: ${error.message}`, 500);
    }

    return data;
  }

  // Delete conversation
  async delete(id: string, userId: string): Promise<void> {
    // Note: This will cascade delete all messages due to DB constraints
    const { error } = await supabase
      .from('conversations')
      .delete()
      .eq('id', id)
      .eq('user_id', userId); // Security: ensure this conversation belongs to the user

    if (error) {
      throw new AppError(`Error deleting conversation: ${error.message}`, 500);
    }
  }

  // Add message to conversation
  async addMessage(
    conversationId: string,
    role: 'user' | 'assistant' | 'system',
    content: string,
    tokensUsed = 0
  ): Promise<Message> {
    const { data, error } = await supabase
      .from('messages')
      .insert([{
        conversation_id: conversationId,
        role,
        content,
        tokens_used: tokensUsed
      }])
      .select()
      .single();

    if (error) {
      throw new AppError(`Error adding message: ${error.message}`, 500);
    }

    // Update conversation's updated_at timestamp
    await supabase
      .from('conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', conversationId);

    return data;
  }

  // Get messages for a conversation
  async getMessages(
    conversationId: string,
    userId: string,
    options: {
      limit?: number;
      beforeId?: string;
    } = {}
  ): Promise<Message[]> {
    const { limit = 50, beforeId } = options;

    // First verify the conversation belongs to this user
    const conversation = await this.getById(conversationId, userId);
    
    if (!conversation) {
      throw new AppError('Conversation not found or access denied', 404);
    }

    // Start building the query
    let query = supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: false })
      .limit(limit);

    // Add pagination if beforeId is provided
    if (beforeId) {
      // Get the created_at time of the message with beforeId
      const { data: beforeMessage } = await supabase
        .from('messages')
        .select('created_at')
        .eq('id', beforeId)
        .single();

      if (beforeMessage) {
        query = query.lt('created_at', beforeMessage.created_at);
      }
    }

    // Execute the query
    const { data, error } = await query;

    if (error) {
      throw new AppError(`Error fetching messages: ${error.message}`, 500);
    }

    // Reverse to get chronological order
    return (data || []).reverse();
  }
}

export default new ConversationModel();