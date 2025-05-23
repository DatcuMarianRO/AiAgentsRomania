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

    // Get all users with counts
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        fullName: true,
        company: true,
        role: true,
        status: true,
        createdAt: true,
        _count: {
          select: {
            userAgents: true,
            conversations: true,
            orders: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return ApiResponse.success(users);
  } catch (error) {
    console.error('Admin get users error:', error);
    return ApiResponse.error('Eroare la obținerea utilizatorilor');
  }
}