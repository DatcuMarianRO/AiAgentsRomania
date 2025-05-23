import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { ApiResponse } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return ApiResponse.unauthorized('Nu ești autentificat');
    }

    // Check admin access
    if (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN') {
      return ApiResponse.forbidden('Nu ai permisiunea de a accesa această resursă');
    }

    // Get current month start
    const currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setHours(0, 0, 0, 0);

    // Get previous month start
    const previousMonth = new Date(currentMonth);
    previousMonth.setMonth(previousMonth.getMonth() - 1);

    // Revenue analytics
    const [currentRevenue, previousRevenue] = await Promise.all([
      prisma.order.aggregate({
        where: {
          createdAt: { gte: currentMonth },
          status: 'COMPLETED'
        },
        _sum: { amount: true }
      }),
      prisma.order.aggregate({
        where: {
          createdAt: { gte: previousMonth, lt: currentMonth },
          status: 'COMPLETED'
        },
        _sum: { amount: true }
      })
    ]);

    const revenueGrowth = previousRevenue._sum.amount 
      ? Math.round(((currentRevenue._sum.amount || 0) - previousRevenue._sum.amount) / previousRevenue._sum.amount * 100)
      : 0;

    // User analytics
    const [totalUsers, activeUsers, newUsers] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { status: 'ACTIVE' } }),
      prisma.user.count({ where: { createdAt: { gte: currentMonth } } })
    ]);

    const userGrowth = Math.round((newUsers / (totalUsers - newUsers || 1)) * 100);

    // Conversation analytics
    const [monthlyConversations, previousMonthConversations] = await Promise.all([
      prisma.conversation.count({
        where: { createdAt: { gte: currentMonth } }
      }),
      prisma.conversation.count({
        where: { createdAt: { gte: previousMonth, lt: currentMonth } }
      })
    ]);

    const conversationGrowth = previousMonthConversations
      ? Math.round((monthlyConversations - previousMonthConversations) / previousMonthConversations * 100)
      : 0;

    // Agent analytics
    const [totalAgents, activeAgents] = await Promise.all([
      prisma.agent.count(),
      prisma.agent.count({ where: { status: 'ACTIVE' } })
    ]);

    // Top agents by conversations
    const topAgents = await prisma.agent.findMany({
      select: {
        id: true,
        name: true,
        type: true,
        _count: {
          select: { conversations: true }
        }
      },
      orderBy: {
        conversations: {
          _count: 'desc'
        }
      },
      take: 5
    });

    // Top users by agent count
    const topUsers = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        fullName: true,
        company: true,
        _count: {
          select: { userAgents: true }
        }
      },
      where: {
        userAgents: {
          some: {}
        }
      },
      orderBy: {
        userAgents: {
          _count: 'desc'
        }
      },
      take: 5
    });

    const analytics = {
      revenue: {
        total: currentRevenue._sum.amount || 0,
        growth: revenueGrowth
      },
      users: {
        total: totalUsers,
        active: activeUsers,
        new: newUsers,
        growth: userGrowth
      },
      conversations: {
        monthly: monthlyConversations,
        growth: conversationGrowth
      },
      agents: {
        total: totalAgents,
        active: activeAgents,
        growth: 0 // Calculate if needed
      },
      topAgents: topAgents.map(agent => ({
        id: agent.id,
        name: agent.name,
        type: agent.type,
        conversations: agent._count.conversations
      })),
      topUsers: topUsers.map(user => ({
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        company: user.company,
        agents: user._count.userAgents
      }))
    };

    return ApiResponse.success(analytics);
  } catch (error) {
    console.error('Admin analytics error:', error);
    return ApiResponse.error('Eroare la obținerea analizelor');
  }
}