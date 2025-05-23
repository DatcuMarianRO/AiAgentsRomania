import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { ApiResponse } from '@/lib/api-response';
import { z } from 'zod';

// GET agent details
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return ApiResponse.unauthorized('Nu ești autentificat');
    }

    // Get user's agent with full details
    const userAgent = await prisma.userAgent.findFirst({
      where: { 
        userId: user.id,
        agentId: params.id
      },
      include: {
        agent: {
          include: {
            category: true,
            _count: {
              select: {
                conversations: true,
                userAgents: true
              }
            }
          }
        },
        _count: {
          select: {
            conversations: {
              where: { userId: user.id }
            }
          }
        }
      }
    });

    if (!userAgent) {
      return ApiResponse.notFound('Agentul nu a fost găsit');
    }

    // Calculate message count
    const messageCount = await prisma.message.count({
      where: {
        conversation: {
          userId: user.id,
          agentId: params.id
        }
      }
    });

    const agentData = {
      id: userAgent.agent.id,
      name: userAgent.agent.name,
      type: userAgent.agent.type,
      description: userAgent.agent.description,
      category: userAgent.agent.category?.name,
      status: userAgent.status,
      customName: userAgent.customName,
      settings: userAgent.settings,
      _count: {
        conversations: userAgent._count.conversations,
        messages: messageCount,
        totalUsers: userAgent.agent._count.userAgents
      },
      createdAt: userAgent.createdAt
    };

    return ApiResponse.success(agentData);
  } catch (error) {
    console.error('Agent detail error:', error);
    return ApiResponse.error('Eroare la obținerea detaliilor agentului');
  }
}

// UPDATE agent settings
const updateSchema = z.object({
  customName: z.string().optional(),
  status: z.enum(['ACTIVE', 'PAUSED']).optional(),
  settings: z.object({
    greeting: z.string().optional(),
    tone: z.enum(['professional', 'friendly', 'casual', 'formal']).optional(),
    maxTokens: z.number().optional(),
    temperature: z.number().min(0).max(2).optional(),
  }).optional()
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return ApiResponse.unauthorized('Nu ești autentificat');
    }

    const body = await request.json();
    const validatedData = updateSchema.parse(body);

    // Check if user owns this agent
    const userAgent = await prisma.userAgent.findFirst({
      where: { 
        userId: user.id,
        agentId: params.id
      }
    });

    if (!userAgent) {
      return ApiResponse.notFound('Agentul nu a fost găsit');
    }

    // Update user agent settings
    const updated = await prisma.userAgent.update({
      where: { id: userAgent.id },
      data: {
        customName: validatedData.customName,
        status: validatedData.status,
        settings: validatedData.settings ? {
          ...(userAgent.settings as any || {}),
          ...validatedData.settings
        } : userAgent.settings
      },
      include: {
        agent: true
      }
    });

    return ApiResponse.success({
      message: 'Setările agentului au fost actualizate',
      agent: updated
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ApiResponse.badRequest('Date invalide', error.errors);
    }
    console.error('Update agent error:', error);
    return ApiResponse.error('Eroare la actualizarea agentului');
  }
}

// DELETE agent
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return ApiResponse.unauthorized('Nu ești autentificat');
    }

    // Check if user owns this agent
    const userAgent = await prisma.userAgent.findFirst({
      where: { 
        userId: user.id,
        agentId: params.id
      }
    });

    if (!userAgent) {
      return ApiResponse.notFound('Agentul nu a fost găsit');
    }

    // Delete user agent (cascades to conversations)
    await prisma.userAgent.delete({
      where: { id: userAgent.id }
    });

    return ApiResponse.success({
      message: 'Agentul a fost șters cu succes'
    });
  } catch (error) {
    console.error('Delete agent error:', error);
    return ApiResponse.error('Eroare la ștergerea agentului');
  }
}