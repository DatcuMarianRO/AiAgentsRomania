import { NextRequest } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { successResponse, unauthorizedResponse, errorResponse } from '@/lib/api-response';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await requireAuth();
    
    // Get full user data with stats
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        status: true,
        avatarUrl: true,
        emailVerified: true,
        createdAt: true,
        _count: {
          select: {
            agents: true,
            subscriptions: {
              where: { status: 'ACTIVE' }
            },
            orders: {
              where: { status: 'COMPLETED' }
            },
          },
        },
      },
    });
    
    if (!user) {
      return unauthorizedResponse();
    }
    
    return successResponse({
      ...user,
      stats: {
        totalAgents: user._count.agents,
        activeSubscriptions: user._count.subscriptions,
        totalOrders: user._count.orders,
      },
    });
    
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return unauthorizedResponse();
    }
    console.error('Get user error:', error);
    return errorResponse('A apărut o eroare', 500);
  }
}