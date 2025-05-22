import api from './api';
import { 
  Agent, 
  AgentCategory, 
  ApiResponse, 
  PaginatedResponse,
  AgentWithCreator
} from '@/types';

// Agent service for handling agent operations
const agentService = {
  // Get agent by ID
  getAgentById: async (id: string) => {
    const response = await api.get<ApiResponse<{ agent: Agent; creator: any }>>(
      `/agents/${id}`
    );
    
    if (response.data.status === 'success' && response.data.data) {
      return response.data.data as unknown as AgentWithCreator;
    }
    
    throw new Error(response.data.message || 'Failed to get agent');
  },
  
  // List agents with filters
  listAgents: async (params: {
    page?: number;
    limit?: number;
    category_id?: string;
    creator_id?: string;
    visibility?: 'public' | 'private' | 'unlisted';
    featured?: boolean;
    search?: string;
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
  } = {}) => {
    const response = await api.get<ApiResponse<{ agents: Agent[]; pagination: any }>>(
      '/agents',
      { params }
    );
    
    if (response.data.status === 'success' && response.data.data) {
      return {
        data: response.data.data.agents,
        pagination: response.data.data.pagination,
      } as PaginatedResponse<Agent>;
    }
    
    throw new Error(response.data.message || 'Failed to list agents');
  },
  
  // Create a new agent
  createAgent: async (data: Partial<Agent>) => {
    const response = await api.post<ApiResponse<{ agent: Agent }>>(
      '/agents',
      data
    );
    
    if (response.data.status === 'success' && response.data.data) {
      return response.data.data.agent;
    }
    
    throw new Error(response.data.message || 'Failed to create agent');
  },
  
  // Update an agent
  updateAgent: async (id: string, data: Partial<Agent>) => {
    const response = await api.put<ApiResponse<{ agent: Agent }>>(
      `/agents/${id}`,
      data
    );
    
    if (response.data.status === 'success' && response.data.data) {
      return response.data.data.agent;
    }
    
    throw new Error(response.data.message || 'Failed to update agent');
  },
  
  // Delete an agent
  deleteAgent: async (id: string) => {
    const response = await api.delete<ApiResponse<void>>(`/agents/${id}`);
    
    if (response.data.status === 'success') {
      return true;
    }
    
    throw new Error(response.data.message || 'Failed to delete agent');
  },
  
  // Run an agent
  runAgent: async (id: string, input: string, conversationId?: string) => {
    const response = await api.post<ApiResponse<{
      response: string;
      conversationId: string;
      messageId: string;
      tokensUsed: number;
    }>>(
      `/agents/${id}/run`,
      { input, conversation_id: conversationId }
    );
    
    if (response.data.status === 'success' && response.data.data) {
      return response.data.data;
    }
    
    throw new Error(response.data.message || 'Failed to run agent');
  },
  
  // Get agent categories
  getCategories: async () => {
    const response = await api.get<ApiResponse<{ categories: AgentCategory[] }>>(
      '/agents/categories'
    );
    
    if (response.data.status === 'success' && response.data.data) {
      return response.data.data.categories;
    }
    
    throw new Error(response.data.message || 'Failed to get categories');
  },
  
  // Purchase an agent
  purchaseAgent: async (id: string) => {
    const response = await api.post<ApiResponse<{ credits_available: number }>>(
      `/agents/${id}/purchase`
    );
    
    if (response.data.status === 'success' && response.data.data) {
      return response.data.data.credits_available;
    }
    
    throw new Error(response.data.message || 'Failed to purchase agent');
  },
  
  // Rate an agent
  rateAgent: async (id: string, rating: number, comment?: string) => {
    const response = await api.post<ApiResponse<void>>(
      `/agents/${id}/rate`,
      { rating, comment }
    );
    
    if (response.data.status === 'success') {
      return true;
    }
    
    throw new Error(response.data.message || 'Failed to rate agent');
  },
};

export default agentService;