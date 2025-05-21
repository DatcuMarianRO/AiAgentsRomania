// 1. Fisier: src/types/analytics.ts (sau unde ai definit tipurile)

export interface KPITrend {
  value: number | string;
  changePercentage?: number; // ex: 10 pentru +10%, -5 pentru -5%
  periodComparison?: string; // ex: "vs luna trecută"
  unit?: string; // ex: "€", "tokeni"
}

export interface TimeSeriesData {
  date: string; // Format 'YYYY-MM-DD' sau 'MMM DD'
  [key: string]: number | string; // Metrici multiple posibile
}

export interface TopListItem {
  id: string; // Poate fi agentId, userId etc.
  name: string;
  value: number | string;
  secondaryValue?: string; // O valoare secundară, ex: "execuții" sau "conversații"
  avatarUrl?: string;
  slug?: string; // Pentru link-uri către pagina de detalii (ex: agent)
  // Adaugă agentId dacă este specific pentru topAgentsUsed în UserAnalyticsData
  agentId?: string; 
  agentName?: string; // Duplicat cu name, dar specific pentru topAgentsUsed
  agentAvatarUrl?: string; // Specific pentru topAgentsUsed
}

export interface DistributionDataItem {
  name: string; // Numele categoriei (ex: tier, model AI)
  value: number; // Numărul de itemi
  fill?: string; // Culoare pentru grafic (opțional, poate fi gestionat în componenta chart)
}

export interface AdminAnalyticsData {
  summary: {
    totalUsers: KPITrend;
    totalAgents: KPITrend;
    activeSubscriptions: KPITrend;
    totalRevenue: KPITrend;
  };
  userTrends: TimeSeriesData[]; // ex: { date: 'Ian', newUsers: 10, activeUsers: 50 }
  agentTrends: TimeSeriesData[]; // ex: { date: 'Ian', createdAgents: 5, executedCalls: 1000 }
  revenueTrends: TimeSeriesData[]; // ex: { date: 'Ian', revenue: 1200.50 }
  topPerformingAgents: TopListItem[]; // ex: { id: 'agent1', name: 'Super Agent', value: 500 (execuții) }
  subscriptionDistribution: DistributionDataItem[]; // ex: { name: 'Pro', value: 50 }
  lastUpdatedAt: string; // ISO date string
}

export interface UserAnalyticsData {
  summary: {
    totalConversations: KPITrend;
    tokensUsedThisPeriod: KPITrend;
    averageMessagesPerConversation: KPITrend;
  };
  activityOverTime: TimeSeriesData[]; // ex: { date: 'Mai 10', messagesSent: 25, conversationsStarted: 2 }
  topAgentsUsed: TopListItem[]; // ex: { agentId: 'agent1', agentName: 'Support Bot', value: 30 (conversații) }
  lastUpdatedAt: string; // ISO date string
}
