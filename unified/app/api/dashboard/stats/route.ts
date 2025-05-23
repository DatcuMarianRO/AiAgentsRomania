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

    // Get user's stats
    const [
      totalAgents,
      activeAgents,
      totalConversations,
      currentMonthConversations,
      subscription
    ] = await Promise.all([
      // Total agents
      prisma.userAgent.count({
        where: { userId: user.id }
      }),
      
      // Active agents
      prisma.userAgent.count({
        where: { 
          userId: user.id,
          status: 'ACTIVE'
        }
      }),
      
      // Total conversations
      prisma.conversation.count({
        where: { userId: user.id }
      }),
      
      // Current month conversations
      prisma.conversation.count({
        where: {
          userId: user.id,
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          }
        }
      }),
      
      // Active subscription
      prisma.subscription.findFirst({
        where: {
          userId: user.id,
          status: 'ACTIVE'
        },
        include: {
          plan: true
        }
      })
    ]);

    // Calculate monthly revenue (for admins)
    let monthlyRevenue = 0;
    let totalUsers = 0;
    let activeUsers = 0;
    
    if (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') {
      const currentMonth = new Date();
      currentMonth.setDate(1);
      currentMonth.setHours(0, 0, 0, 0);

      const [revenue, userCounts] = await Promise.all([
        prisma.order.aggregate({
          where: {
            createdAt: { gte: currentMonth },
            status: 'COMPLETED'
          },
          _sum: {
            amount: true
          }
        }),
        prisma.user.groupBy({
          by: ['status'],
          _count: true
        })
      ]);

      monthlyRevenue = revenue._sum.amount || 0;
      
      userCounts.forEach((group) => {
        totalUsers += group._count;
        if (group.status === 'ACTIVE') {
          activeUsers = group._count;
        }
      });
    }

    const stats = {
      totalAgents,
      activeAgents,
      totalConversations,
      currentMonthConversations,
      subscription: subscription ? {
        plan: subscription.plan.name,
        status: subscription.status,
        expiresAt: subscription.expiresAt
      } : null,
      ...(user.role === 'ADMIN' || user.role === 'SUPER_ADMIN' ? {
        monthlyRevenue,
        totalUsers,
        activeUsers
      } : {})
    };

    return ApiResponse.success(stats);
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return ApiResponse.error('Eroare la obținerea statisticilor');
  }
}