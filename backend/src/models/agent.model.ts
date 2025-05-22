import supabase from '../config/database';
import { Agent, AgentVisibility } from '../types/database';
import { AppError } from '../utils/errorHandler';

class AgentModel {
  // Get agent by ID
  async getById(id: string): Promise<Agent | null> {
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new AppError(`Error fetching agent: ${error.message}`, 500);
    }

    return data;
  }

  // List agents with filters
  async list(options: {
    page?: number;
    limit?: number;
    category_id?: string;
    creator_id?: string;
    visibility?: AgentVisibility;
    featured?: boolean;
    search?: string;
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
  } = {}): Promise<{ agents: Agent[]; total: number }> {
    const {
      page = 1,
      limit = 10,
      category_id,
      creator_id,
      visibility = 'public',
      featured,
      search,
      sort_by = 'created_at',
      sort_order = 'desc',
    } = options;

    const offset = (page - 1) * limit;

    // Start building the query
    let query = supabase
      .from('agents')
      .select('*', { count: 'exact' });

    // Apply filters
    if (category_id) {
      query = query.eq('category_id', category_id);
    }

    if (creator_id) {
      query = query.eq('creator_id', creator_id);
    }

    if (visibility) {
      query = query.eq('visibility', visibility);
    }

    if (featured !== undefined) {
      query = query.eq('featured', featured);
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Apply pagination and ordering
    query = query
      .order(sort_by, { ascending: sort_order === 'asc' })
      .range(offset, offset + limit - 1);

    // Execute the query
    const { data, error, count } = await query;

    if (error) {
      throw new AppError(`Error listing agents: ${error.message}`, 500);
    }

    return {
      agents: data || [],
      total: count || 0,
    };
  }

  // Create new agent
  async create(agentData: Partial<Agent>): Promise<Agent> {
    const { data, error } = await supabase
      .from('agents')
      .insert([agentData])
      .select()
      .single();

    if (error) {
      throw new AppError(`Error creating agent: ${error.message}`, 500);
    }

    return data;
  }

  // Update agent
  async update(id: string, agentData: Partial<Agent>): Promise<Agent> {
    const { data, error } = await supabase
      .from('agents')
      .update(agentData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new AppError(`Error updating agent: ${error.message}`, 500);
    }

    return data;
  }

  // Delete agent
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('agents')
      .delete()
      .eq('id', id);

    if (error) {
      throw new AppError(`Error deleting agent: ${error.message}`, 500);
    }
  }

  // Increment usage count
  async incrementUsage(id: string): Promise<void> {
    const { error } = await supabase.rpc('increment_agent_usage', { agent_id: id });

    if (error) {
      throw new AppError(`Error incrementing agent usage: ${error.message}`, 500);
    }
  }

  // Update average rating
  async updateRating(id: string): Promise<void> {
    const { error } = await supabase.rpc('update_agent_rating', { agent_id: id });

    if (error) {
      throw new AppError(`Error updating agent rating: ${error.message}`, 500);
    }
  }
}

export default new AgentModel();