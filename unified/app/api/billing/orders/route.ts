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

    // Get user's orders
    const orders = await prisma.order.findMany({
      where: {
        userId: user.id
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 20
    });

    return ApiResponse.success(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    return ApiResponse.error('Eroare la obținerea facturilor');
  }
}