// User-related types
export type UserRole = 'user' | 'creator' | 'admin';

export type SubscriptionTier = 'free' | 'basic' | 'premium' | 'enterprise';

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  role: UserRole;
  subscription_tier: SubscriptionTier;
  subscription_id?: string;
  credits_available: number;
  token_version?: number; // Used for invalidating refresh tokens
  created_at: string;
  updated_at: string;
}

// Agent-related types
export type AgentModelProvider = 'anthropic' | 'openai' | 'google' | 'mistral' | 'meta' | 'other';

export type AgentVisibility = 'public' | 'private' | 'unlisted';

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
  price: number; // In credits
  category_id: string;
  tags: string[];
  featured: boolean;
  usage_count: number;
  average_rating: number;
  created_at: string;
  updated_at: string;
}

export interface AgentCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface AgentReview {
  id: string;
  user_id: string;
  agent_id: string;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
}

// Conversation related types
export interface Conversation {
  id: string;
  user_id: string;
  agent_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  tokens_used: number;
  created_at: string;
}

// Transaction related types
export type TransactionType = 'credit_purchase' | 'subscription_payment' | 'agent_purchase' | 'agent_sale' | 'agent_usage';

export interface Transaction {
  id: string;
  user_id: string;
  type: TransactionType;
  amount: number; // Positive for incoming, negative for outgoing
  description: string;
  reference_id?: string; // Related entity ID (agent_id, subscription_id, etc.)
  stripe_payment_id?: string;
  created_at: string;
}

// Subscription related types
export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number; // Monthly price in cents
  monthly_credits: number;
  features: string[];
  stripe_price_id: string;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: 'active' | 'canceled' | 'past_due' | 'unpaid';
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  stripe_subscription_id: string;
  created_at: string;
  updated_at: string;
}