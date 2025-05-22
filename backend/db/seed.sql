-- Seed data for AI Agents Romania

-- Seed agent categories
INSERT INTO agent_categories (name, description, icon, "order")
VALUES 
  ('Productivity', 'Boost your productivity with these AI assistants', 'rocket', 1),
  ('Creative', 'Unleash your creativity with AI assistance', 'paintbrush', 2),
  ('Education', 'Learn new skills and topics with AI tutors', 'book', 3),
  ('Business', 'AI assistants for business tasks and analysis', 'briefcase', 4),
  ('Programming', 'Coding assistance and development tools', 'code', 5),
  ('Wellness', 'Health and mental wellness assistants', 'heart', 6),
  ('Entertainment', 'Fun and entertaining AI agents', 'popcorn', 7),
  ('Research', 'Research assistants and knowledge navigators', 'microscope', 8);

-- Seed subscription plans
INSERT INTO subscription_plans (name, description, price, monthly_credits, features, stripe_price_id)
VALUES
  ('Free', 'Basic access to the platform', 0, 10, 
   ARRAY['Access to public agents', 'Limited usage (10 credits)', 'Standard support'],
   'price_free'),
  
  ('Basic', 'Enhanced access with more credits', 999, 100, 
   ARRAY['Access to all public agents', '100 monthly credits', 'Standard support', 'Agent creation access'],
   'price_basic_monthly'),
  
  ('Premium', 'Premium access with advanced features', 2999, 500, 
   ARRAY['Access to all agents', '500 monthly credits', 'Priority support', 'Agent creation access', 'Advanced agent customization', 'Access to premium models'],
   'price_premium_monthly'),
  
  ('Enterprise', 'Full access with maximum resources', 9999, 2000, 
   ARRAY['Unlimited access to all agents', '2000 monthly credits', 'Dedicated support', 'Advanced agent customization', 'Access to all models', 'API access', 'White-label options'],
   'price_enterprise_monthly');

-- Sample agents (to be created after users are registered)
-- These will need to be inserted after you have some users registered in the system
-- Replace user IDs with actual user IDs from your system

/*
-- Example agent insert (uncomment and modify when you have user IDs)
INSERT INTO agents (
  name, 
  description, 
  instructions, 
  model_provider, 
  model_id, 
  model_config, 
  creator_id, 
  thumbnail_url, 
  visibility, 
  price, 
  category_id, 
  tags, 
  featured
)
VALUES (
  'Research Assistant',
  'An expert research assistant that helps you find information and summarize articles.',
  'You are a helpful research assistant. Help the user find information, summarize content, and answer questions based on your knowledge. Be concise, accurate, and helpful.',
  'anthropic',
  'anthropic/claude-3-opus-20240229',
  '{"temperature": 0.7, "max_tokens": 2000}',
  '00000000-0000-0000-0000-000000000000', -- Replace with actual user ID
  'https://example.com/research-agent.jpg',
  'public',
  10,
  (SELECT id FROM agent_categories WHERE name = 'Research'),
  ARRAY['research', 'summarization', 'information'],
  TRUE
);
*/