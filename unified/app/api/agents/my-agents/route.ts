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

    // Get user's agents with counts
    const userAgents = await prisma.userAgent.findMany({
      where: { userId: user.id },
      include: {
        agent: {
          include: {
            category: true,
            _count: {
              select: {
                conversations: true
              }
            }
          }
        },
        _count: {
          select: {
            conversations: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Transform data
    const agents = userAgents.map(ua => ({
      id: ua.agent.id,
      name: ua.agent.name,
      type: ua.agent.type,
      description: ua.agent.description,
      category: ua.agent.category?.name,
      status: ua.status,
      customName: ua.customName,
      settings: ua.settings,
      _count: {
        conversations: ua._count.conversations
      },
      createdAt: ua.createdAt
    }));

    return ApiResponse.success(agents);
  } catch (error) {
    console.error('My agents error:', error);
    return ApiResponse.error('Eroare la obținerea agenților');
  }
}