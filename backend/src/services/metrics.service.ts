import { createLoggerWithContext } from '../utils/logger';
import sql from '../config/postgres';
import { AppError } from '../utils/errorHandler';

// Crează un logger cu context specific pentru acest serviciu
const logger = createLoggerWithContext({ service: 'metrics-service' });

class MetricsService {
  /**
   * Recuperează statisticile generale ale aplicației
   */
  async getSystemMetrics(): Promise<any> {
    try {
      logger.info('Recuperare metrici sistem');
      
      // Interogare SQL pentru a obține statistici din baza de date
      const userCount = await sql`SELECT COUNT(*) as count FROM profiles`;
      const agentCount = await sql`SELECT COUNT(*) as count FROM agents`;
      const activeSubscriptions = await sql`
        SELECT subscription_tier, COUNT(*) as count 
        FROM profiles 
        WHERE subscription_tier != 'free' 
        GROUP BY subscription_tier
      `;
      
      // Structurarea rezultatelor
      const metrics = {
        users: parseInt(userCount[0]?.count || '0', 10),
        agents: parseInt(agentCount[0]?.count || '0', 10),
        subscriptions: activeSubscriptions.reduce((acc, sub) => {
          acc[sub.subscription_tier] = parseInt(sub.count, 10);
          return acc;
        }, {} as Record<string, number>),
        timestamp: new Date().toISOString()
      };
      
      logger.debug('Metrici sistem recuperate', { metrics });
      return metrics;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Eroare la recuperarea metricilor', { 
        error: errorMessage,
        stack: error instanceof Error ? error.stack : undefined 
      });
      throw new AppError(`Eroare la recuperarea metricilor: ${errorMessage}`, 500);
    }
  }
  
  /**
   * Înregistrează utilizarea unui agent pentru analize
   */
  async logAgentUsage(data: { 
    userId: string; 
    agentId: string; 
    tokensUsed: number;
    responseTime: number;
    isStreaming: boolean;
  }): Promise<void> {
    try {
      logger.info('Înregistrare utilizare agent', { 
        userId: data.userId,
        agentId: data.agentId,
        tokensUsed: data.tokensUsed
      });
      
      // Înregistrează utilizarea în baza de date
      await sql`
        INSERT INTO agent_usage (
          user_id, 
          agent_id, 
          tokens_used, 
          response_time_ms, 
          is_streaming,
          created_at
        ) VALUES (
          ${data.userId}, 
          ${data.agentId}, 
          ${data.tokensUsed}, 
          ${data.responseTime},
          ${data.isStreaming},
          NOW()
        )
      `;
      
      logger.debug('Utilizare agent înregistrată cu succes');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Eroare la înregistrarea utilizării agentului', { 
        error: errorMessage,
        data,
        stack: error instanceof Error ? error.stack : undefined
      });
      // Nu aruncăm eroarea mai departe pentru a evita întreruperea fluxului principal
      // Eșecul logării nu ar trebui să afecteze experiența utilizatorului
    }
  }
  
  /**
   * Obține statistici de utilizare pentru un utilizator specific
   */
  async getUserUsageStats(userId: string): Promise<any> {
    try {
      logger.info('Recuperare statistici utilizare pentru utilizator', { userId });
      
      // Statistici de utilizare a agentului
      const agentUsage = await sql`
        SELECT 
          agent_id, 
          COUNT(*) as usage_count, 
          SUM(tokens_used) as total_tokens,
          AVG(response_time_ms) as avg_response_time
        FROM agent_usage
        WHERE user_id = ${userId}
        GROUP BY agent_id
        ORDER BY usage_count DESC
      `;
      
      // Utilizare pe zile
      const dailyUsage = await sql`
        SELECT 
          DATE_TRUNC('day', created_at) as day,
          COUNT(*) as usage_count,
          SUM(tokens_used) as tokens_used
        FROM agent_usage
        WHERE user_id = ${userId}
        GROUP BY DATE_TRUNC('day', created_at)
        ORDER BY day DESC
        LIMIT 30
      `;
      
      const result = {
        agentUsage,
        dailyUsage,
        userId
      };
      
      logger.debug('Statistici utilizator recuperate', { userId, statsCount: agentUsage.length });
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Eroare la recuperarea statisticilor utilizatorului', { 
        error: errorMessage,
        userId,
        stack: error instanceof Error ? error.stack : undefined 
      });
      throw new AppError(`Eroare la recuperarea statisticilor: ${errorMessage}`, 500);
    }
  }
  
  /**
   * Recuperează topul agenților după utilizare
   */
  async getTopAgents(limit: number = 10): Promise<any[]> {
    try {
      logger.info('Recuperare top agenți', { limit });
      
      const topAgents = await sql`
        SELECT 
          a.id,
          a.name,
          a.description,
          a.created_by,
          COUNT(au.id) as usage_count,
          SUM(au.tokens_used) as total_tokens
        FROM agents a
        JOIN agent_usage au ON a.id = au.agent_id
        GROUP BY a.id, a.name, a.description, a.created_by
        ORDER BY usage_count DESC
        LIMIT ${limit}
      `;
      
      logger.debug('Top agenți recuperați', { count: topAgents.length });
      return topAgents;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Eroare la recuperarea topului de agenți', { 
        error: errorMessage,
        limit,
        stack: error instanceof Error ? error.stack : undefined 
      });
      throw new AppError(`Eroare la recuperarea topului de agenți: ${errorMessage}`, 500);
    }
  }
}

export default new MetricsService();