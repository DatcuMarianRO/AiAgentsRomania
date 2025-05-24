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

    // Get all agents with counts
    const agents = await prisma.agent.findMany({
      include: {
        category: true,
        _count: {
          select: {
            userAgents: true,
            conversations: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return ApiResponse.success(agents);
  } catch (error) {
    console.error('Admin get agents error:', error);
    return ApiResponse.error('Eroare la obținerea agenților');
  }
}