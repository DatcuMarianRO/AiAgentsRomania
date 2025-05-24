// Common types shared between frontend and backend

/**
 * Response type for API endpoints
 */
export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page: number;
  limit: number;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

/**
 * User roles
 */
export type UserRole = 'user' | 'creator' | 'admin';

/**
 * Subscription tiers
 */
export type SubscriptionTier = 'free' | 'basic' | 'premium' | 'enterprise';

/**
 * User profile
 */
export interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  role: UserRole;
  subscription_tier: SubscriptionTier;
  credits_available: number;
  created_at: string;
  updated_at: string;
}

/**
 * Agent model provider
 */
export type AgentModelProvider = 'anthropic' | 'openai' | 'google' | 'mistral' | 'meta' | 'other';

/**
 * Agent visibility
 */
export type AgentVisibility = 'public' | 'private' | 'unlisted';

/**
 * AI Agent
 */
export interface Agent {
  id: string;
  name: string;
  description: string;
  instructions: string;
  model_provider: AgentModelProvider;
  model_id: string;
  model_config: Record<string, any>;
  creator_id: string;
  thumbnail_url?: string;
  visibility: AgentVisibility;
  price: number;
  category_id: string;
  tags: string[];
  featured: boolean;
  usage_count: number;
  average_rating: number;
  created_at: string;
  updated_at: string;
}

/**
 * Agent with creator details
 */
export interface AgentWithCreator extends Agent {
  creator: {
    id: string;
    first_name: string;
    last_name: string;
    avatar_url?: string;
  };
}

/**
 * Agent category
 */
export interface AgentCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  order: number;
  created_at: string;
  updated_at: string;
}