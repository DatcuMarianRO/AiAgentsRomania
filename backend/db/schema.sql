-- Schema for AI Agents Romania

-- Enable Row Level Security (RLS)
ALTER DATABASE postgres SET session_preauth_role = 'anon';

-- Create extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable pgvector extension for embeddings (future use)
CREATE EXTENSION IF NOT EXISTS vector;

-- User roles
CREATE TYPE user_role AS ENUM ('user', 'creator', 'admin');

-- Subscription tiers
CREATE TYPE subscription_tier AS ENUM ('free', 'basic', 'premium', 'enterprise');

-- Agent model providers
CREATE TYPE agent_model_provider AS ENUM ('anthropic', 'openai', 'google', 'mistral', 'meta', 'other');

-- Agent visibility
CREATE TYPE agent_visibility AS ENUM ('public', 'private', 'unlisted');

-- Transaction types
CREATE TYPE transaction_type AS ENUM ('credit_purchase', 'subscription_payment', 'agent_purchase', 'agent_sale', 'agent_usage');

-- Subscription status
CREATE TYPE subscription_status AS ENUM ('active', 'canceled', 'past_due', 'unpaid');

-- User profiles
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  avatar_url TEXT,
  role user_role NOT NULL DEFAULT 'user',
  subscription_tier subscription_tier NOT NULL DEFAULT 'free',
  subscription_id TEXT,
  credits_available INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Agent categories
CREATE TABLE agent_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Agents
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  instructions TEXT NOT NULL,
  model_provider agent_model_provider NOT NULL,
  model_id TEXT NOT NULL,
  model_config JSONB NOT NULL DEFAULT '{}'::JSONB,
  creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  thumbnail_url TEXT,
  visibility agent_visibility NOT NULL DEFAULT 'private',
  price INTEGER NOT NULL DEFAULT 0,
  category_id UUID NOT NULL REFERENCES agent_categories(id) ON DELETE CASCADE,
  tags TEXT[] NOT NULL DEFAULT '{}'::TEXT[],
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  usage_count INTEGER NOT NULL DEFAULT 0,
  average_rating FLOAT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Agent purchases
CREATE TABLE agent_purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  price_paid INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, agent_id)
);

-- Agent reviews
CREATE TABLE agent_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, agent_id)
);

-- Conversations
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Messages
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  tokens_used INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Subscription plans
CREATE TABLE subscription_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL, -- Monthly price in cents
  monthly_credits INTEGER NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}'::TEXT[],
  stripe_price_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Subscriptions
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES subscription_plans(id) ON DELETE CASCADE,
  status subscription_status NOT NULL DEFAULT 'active',
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  cancel_at_period_end BOOLEAN NOT NULL DEFAULT FALSE,
  stripe_subscription_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Transactions
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type transaction_type NOT NULL,
  amount INTEGER NOT NULL,
  description TEXT NOT NULL,
  reference_id UUID,
  stripe_payment_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Functions

-- Function to increment agent usage count
CREATE OR REPLACE FUNCTION increment_agent_usage(agent_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE agents
  SET usage_count = usage_count + 1
  WHERE id = agent_id;
END;
$$ LANGUAGE plpgsql;

-- Function to update agent average rating
CREATE OR REPLACE FUNCTION update_agent_rating(agent_id UUID)
RETURNS VOID AS $$
DECLARE
  avg_rating FLOAT;
BEGIN
  SELECT AVG(rating) INTO avg_rating
  FROM agent_reviews
  WHERE agent_id = agent_id;

  UPDATE agents
  SET average_rating = COALESCE(avg_rating, 0)
  WHERE id = agent_id;
END;
$$ LANGUAGE plpgsql;

-- Function to create a transaction and update user credits
CREATE OR REPLACE FUNCTION create_transaction(
  p_user_id UUID,
  p_type transaction_type,
  p_amount INTEGER,
  p_description TEXT,
  p_reference_id UUID DEFAULT NULL,
  p_stripe_payment_id TEXT DEFAULT NULL
)
RETURNS SETOF transactions AS $$
DECLARE
  new_transaction transactions%ROWTYPE;
BEGIN
  -- Insert the transaction
  INSERT INTO transactions (
    user_id,
    type,
    amount,
    description,
    reference_id,
    stripe_payment_id
  ) VALUES (
    p_user_id,
    p_type,
    p_amount,
    p_description,
    p_reference_id,
    p_stripe_payment_id
  ) RETURNING * INTO new_transaction;

  -- Update user credits
  UPDATE users
  SET credits_available = credits_available + p_amount
  WHERE id = p_user_id;

  RETURN NEXT new_transaction;
END;
$$ LANGUAGE plpgsql;

-- Function to get user transaction summary
CREATE OR REPLACE FUNCTION get_user_transaction_summary(p_user_id UUID)
RETURNS TABLE (
  total_credits_purchased INTEGER,
  total_credits_spent INTEGER,
  total_earnings INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COALESCE(SUM(amount) FILTER (WHERE type = 'credit_purchase' AND amount > 0), 0) AS total_credits_purchased,
    COALESCE(ABS(SUM(amount) FILTER (WHERE (type = 'agent_usage' OR type = 'agent_purchase') AND amount < 0)), 0) AS total_credits_spent,
    COALESCE(SUM(amount) FILTER (WHERE type = 'agent_sale' AND amount > 0), 0) AS total_earnings
  FROM transactions
  WHERE user_id = p_user_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update the 'updated_at' column on update
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agents_updated_at
BEFORE UPDATE ON agents
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agent_reviews_updated_at
BEFORE UPDATE ON agent_reviews
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at
BEFORE UPDATE ON conversations
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscription_plans_updated_at
BEFORE UPDATE ON subscription_plans
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
BEFORE UPDATE ON subscriptions
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security Policies

-- Users table policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view only themselves" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update only themselves" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Allow admins full access to users
CREATE POLICY "Admins have full access to users" ON users
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- Agents table policies
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view public agents" ON agents
  FOR SELECT USING (visibility = 'public');

CREATE POLICY "Creators can view their private agents" ON agents
  FOR SELECT USING (creator_id = auth.uid());

CREATE POLICY "Agents creators can update their own agents" ON agents
  FOR UPDATE USING (creator_id = auth.uid());

CREATE POLICY "Agents creators can delete their own agents" ON agents
  FOR DELETE USING (creator_id = auth.uid());

CREATE POLICY "Creators and admins can insert agents" ON agents
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND (users.role = 'creator' OR users.role = 'admin')
    )
  );

-- Agent purchases policies
ALTER TABLE agent_purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view only their purchases" ON agent_purchases
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own purchases" ON agent_purchases
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Conversations and messages policies
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view only their conversations" ON conversations
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own conversations" ON conversations
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own conversations" ON conversations
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own conversations" ON conversations
  FOR DELETE USING (user_id = auth.uid());

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view messages from their conversations" ON messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM conversations
      WHERE conversations.id = messages.conversation_id
      AND conversations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert messages to their conversations" ON messages
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM conversations
      WHERE conversations.id = conversation_id
      AND conversations.user_id = auth.uid()
    )
  );

-- Other policies for transactions, subscriptions, etc.
-- (add similar policies for all remaining tables)