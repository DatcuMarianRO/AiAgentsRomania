-- Tabel pentru înregistrarea utilizării agenților
CREATE TABLE IF NOT EXISTS agent_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  tokens_used INTEGER NOT NULL DEFAULT 0,
  response_time_ms INTEGER NOT NULL DEFAULT 0,
  is_streaming BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indecși pentru performanță în interogări
CREATE INDEX IF NOT EXISTS idx_agent_usage_user_id ON agent_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_agent_usage_agent_id ON agent_usage(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_usage_created_at ON agent_usage(created_at);

-- View pentru statistici zilnice agregate
CREATE OR REPLACE VIEW daily_usage_stats AS
SELECT
  DATE_TRUNC('day', created_at) AS day,
  COUNT(*) AS total_requests,
  SUM(tokens_used) AS total_tokens,
  AVG(response_time_ms) AS avg_response_time,
  COUNT(DISTINCT user_id) AS unique_users,
  COUNT(DISTINCT agent_id) AS unique_agents
FROM agent_usage
GROUP BY DATE_TRUNC('day', created_at)
ORDER BY day DESC;

-- Politică RLS pentru a restricționa accesul la datele de utilizare
ALTER TABLE agent_usage ENABLE ROW LEVEL SECURITY;

-- Politicile RLS:
-- 1. Utilizatorii pot vedea doar propriile date de utilizare
CREATE POLICY user_usage_policy ON agent_usage
  FOR SELECT
  USING (auth.uid() = user_id);

-- 2. Adminii pot vedea toate datele
CREATE POLICY admin_usage_policy ON agent_usage
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Funcție pentru a obține statisticile unui utilizator
CREATE OR REPLACE FUNCTION get_user_usage_stats(user_id UUID)
RETURNS TABLE (
  agent_id UUID,
  agent_name TEXT,
  usage_count BIGINT,
  total_tokens BIGINT,
  avg_response_time NUMERIC
) LANGUAGE SQL SECURITY DEFINER AS $$
  SELECT
    a.id AS agent_id,
    a.name AS agent_name,
    COUNT(au.id) AS usage_count,
    SUM(au.tokens_used) AS total_tokens,
    AVG(au.response_time_ms) AS avg_response_time
  FROM agent_usage au
  JOIN agents a ON au.agent_id = a.id
  WHERE au.user_id = get_user_usage_stats.user_id
  GROUP BY a.id, a.name
  ORDER BY usage_count DESC;
$$;