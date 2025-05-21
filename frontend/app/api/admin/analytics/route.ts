// 2. Fisier: app/api/admin/analytics/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth/auth';
import { Role } from '@prisma/client';
import { AdminAnalyticsData } from '@/types/analytics';

export async function GET(request: NextRequest) {
  const session = await getServerSession();
  if (!session?.user || session.user.role !== Role.ADMIN) {
    return NextResponse.json({ message: 'Forbidden: Admin access required' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const period = searchParams.get('period') || '30d';

  // TODO: SOLICITARE LA BACKEND (Claude Code) - Aici va fi apelul real
  // const externalApiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/analytics?period=${period}`;
  // const response = await fetch(externalApiUrl, { headers: { /* ...auth headers... */ }});
  // const data: AdminAnalyticsData = await response.json();
  // return NextResponse.json(data);

  // --- SIMULARE RĂSPUNS API PENTRU DEMO ---
  await new Promise(resolve => setTimeout(resolve, 1200));
  const mockAdminData: AdminAnalyticsData = {
    summary: { /* ... date mock ... */ 
        totalUsers: { value: 1256, changePercentage: 5.2, periodComparison: "față de luna trecută" },
        totalAgents: { value: 89, changePercentage: 12, periodComparison: "față de luna trecută" },
        activeSubscriptions: { value: 78, changePercentage: -2, periodComparison: "față de luna trecută" },
        totalRevenue: { value: 1850.75, unit: "€", changePercentage: 8.5, periodComparison: "față de luna trecută" },
    },
    userTrends: [ /* ... date mock ... */ 
        { date: 'Ian', newUsers: 200, activeUsers: 150 }, { date: 'Feb', newUsers: 250, activeUsers: 200 },
        { date: 'Mar', newUsers: 300, activeUsers: 280 }, { date: 'Apr', newUsers: 280, activeUsers: 320 },
        { date: 'Mai', newUsers: 350, activeUsers: 400 },
    ],
    agentTrends: [ /* ... date mock ... */ 
        { date: 'S1', createdAgents: 10, executedCalls: 5000 }, { date: 'S2', createdAgents: 12, executedCalls: 6500 },
        { date: 'S3', createdAgents: 8, executedCalls: 5800 }, { date: 'S4', createdAgents: 15, executedCalls: 7200 },
    ],
    revenueTrends: [ /* ... date mock ... */ 
        { date: 'T1', revenue: 3000 }, { date: 'T2', revenue: 3500 },
        { date: 'T3', revenue: 4200 }, { date: 'T4', revenue: 3800 },
    ],
    topPerformingAgents: [ /* ... date mock ... */ 
        { id: 'agent1', name: 'Support Hero', value: 1250, secondaryValue: "execuții", slug: "support-hero" },
        { id: 'agent2', name: 'Data Cruncher', value: 980, secondaryValue: "execuții", slug: "data-cruncher" },
        { id: 'agent3', name: 'Content Creator Pro', value: 750, secondaryValue: "execuții", slug: "content-creator-pro" },
    ],
    subscriptionDistribution: [ /* ... date mock ... */ 
        { name: 'Free', value: 600, fill: '#8884d8' }, { name: 'Pro', value: 300, fill: '#82ca9d' },
        { name: 'Enterprise', value: 50, fill: '#ffc658' },
    ],
    lastUpdatedAt: new Date().toISOString(),
  };
  return NextResponse.json(mockAdminData);
}
