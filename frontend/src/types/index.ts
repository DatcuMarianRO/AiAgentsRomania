import { Toast } from "@/components/ui/toast";

export type ToastProps = React.ComponentPropsWithoutRef<typeof Toast> & {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  duration?: number;
};

export type ToastActionElement = {
  id: string;
  dismiss: () => void;
  update: (props: Partial<ToastProps>) => void;
};

export type CreateToastFnReturn = {
  toasts: ToastProps[];
  toast: (props: Partial<ToastProps>) => ToastActionElement;
  dismiss: (toastId?: string) => void;
};

// Auth types
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
}

// Agent types
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
  price: number;
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

export interface AgentWithCreator extends Agent {
  creator: {
    id: string;
    first_name: string;
    last_name: string;
    avatar_url?: string;
  };
}

// Conversation types
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

// API response types
export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
  errors?: any[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Subscription types
export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  monthly_credits: number;
  features: string[];
  stripe_price_id: string;
  created_at: string;
  updated_at: string;
}