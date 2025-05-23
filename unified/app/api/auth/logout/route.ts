import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (session) {
      // Invalidate session in database
      await prisma.session.deleteMany({
        where: { token: session.token },
      });
    }
    
    // Clear cookies
    const cookieStore = cookies();
    cookieStore.delete('auth-token');
    cookieStore.delete('refresh-token');
    
    return successResponse({ message: 'Deconectat cu succes' });
    
  } catch (error) {
    console.error('Logout error:', error);
    return errorResponse('A apărut o eroare la deconectare', 500);
  }
}