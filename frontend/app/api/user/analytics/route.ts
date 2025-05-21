// 3. Fisier: app/api/user/analytics/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth/auth';
import { UserAnalyticsData } from '@/types/analytics';

export async function GET(request: NextRequest) {
  const session = await getServerSession();
  if (!session?.user || !(session.user as any).id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const userId = (session.user as any).id;

  const { searchParams } = new URL(request.url);
  const period = searchParams.get('period') || '30d';

  // TODO: SOLICITARE LA BACKEND (Claude Code) - Aici va fi apelul real
  // const externalApiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}/analytics?period=${period}`;
  // const response = await fetch(externalApiUrl, { headers: { /* ...auth headers... */ }});
  // const data: UserAnalyticsData = await response.json();
  // return NextResponse.json(data);

  // --- SIMULARE RĂSPUNS API PENTRU DEMO ---
  await new Promise(resolve => setTimeout(resolve, 900));
  const mockUserData: UserAnalyticsData = {
    summary: { /* ... date mock ... */ 
        totalConversations: { value: 42, changePercentage: 15, periodComparison: "față de luna trecută" },
        tokensUsedThisPeriod: { value: 23500, unit: "tokeni", changePercentage: -5, periodComparison: "față de luna trecută" },
        averageMessagesPerConversation: { value: 8.3, changePercentage: 2, periodComparison: "față de luna trecută" },
    },
    activityOverTime: [ /* ... date mock ... */ 
        { date: 'Mai 10', messagesSent: 15, conversationsStarted: 2 }, { date: 'Mai 11', messagesSent: 22, conversationsStarted: 3 },
        { date: 'Mai 12', messagesSent: 10, conversationsStarted: 1 }, { date: 'Mai 13', messagesSent: 30, conversationsStarted: 4 },
        { date: 'Mai 14', messagesSent: 18, conversationsStarted: 2 },
    ],
    topAgentsUsed: [ /* ... date mock ... */ 
        { id: 'agent1', agentId: 'agent1', agentName: 'Support Hero', name: 'Support Hero', agentAvatarUrl: '/images/mock/agent-avatar-3.png', value: 15, secondaryValue: "conversații", slug: "support-hero" },
        { id: 'agent2', agentId: 'agent2', agentName: 'Data Cruncher', name: 'Data Cruncher', agentAvatarUrl: '/images/mock/agent-avatar-1.png', value: 10, secondaryValue: "conversații", slug: "data-cruncher" },
        { id: 'agent4', agentId: 'agent4', agentName: 'DevHelper AI', name: 'DevHelper AI', agentAvatarUrl: '/images/mock/agent-avatar-4.png', value: 8, secondaryValue: "conversații", slug: "devhelper-ai" },
    ],
    lastUpdatedAt: new Date().toISOString(),
  };
  return NextResponse.json(mockUserData);
}
