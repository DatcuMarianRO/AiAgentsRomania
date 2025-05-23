import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getSession, requireAuth } from '@/lib/auth';
import { 
  successResponse, 
  errorResponse, 
  notFoundResponse, 
  forbiddenResponse,
  validationErrorResponse 
} from '@/lib/api-response';

// Update schema
const updateAgentSchema = z.object({
  name: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  longDescription: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  pricing: z.object({
    monthly: z.number().optional(),
    yearly: z.number().optional(),
    oneTime: z.number().optional(),
  }).optional(),
  features: z.array(z.object({
    name: z.string(),
    description: z.string().optional(),
    included: z.boolean().default(true),
  })).optional(),
  modelProvider: z.enum(['openai', 'anthropic', 'google', 'meta']).optional(),
  modelName: z.string().optional(),
  systemPrompt: z.string().optional(),
  temperature: z.number().min(0).max(2).optional(),
  maxTokens: z.number().min(100).max(8000).optional(),
  imageUrl: z.string().url().optional().nullable(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    
    const agent = await prisma.agent.findUnique({
      where: { id: params.id },
      include: {
        createdBy: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
        _count: {
          select: {
            subscriptions: {
              where: { status: 'ACTIVE' },
            },
            conversations: true,
            reviews: true,
          },
        },
      },
    });
    
    if (!agent) {
      return notFoundResponse('Agent nu a fost găsit');
    }
    
    // Check if user can view this agent
    if (agent.status !== 'PUBLISHED') {
      if (!session || (session.user.role === 'USER' && agent.createdById !== session.user.id)) {
        return notFoundResponse('Agent nu a fost găsit');
      }
    }
    
    // Get average rating
    const reviews = await prisma.review.aggregate({
      where: { agentId: agent.id },
      _avg: { rating: true },
    });
    
    return successResponse({
      ...agent,
      stats: {
        activeSubscriptions: agent._count.subscriptions,
        totalConversations: agent._count.conversations,
        totalReviews: agent._count.reviews,
        averageRating: reviews._avg.rating || 0,
      },
    });
    
  } catch (error) {
    console.error('Get agent error:', error);
    return errorResponse('A apărut o eroare', 500);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAuth();
    
    // Get agent
    const agent = await prisma.agent.findUnique({
      where: { id: params.id },
      select: { id: true, createdById: true },
    });
    
    if (!agent) {
      return notFoundResponse('Agent nu a fost găsit');
    }
    
    // Check permissions
    const isAdmin = session.user.role === 'ADMIN' || session.user.role === 'SUPER_ADMIN';
    const isOwner = agent.createdById === session.user.id;
    
    if (!isAdmin && !isOwner) {
      return forbiddenResponse('Nu ai permisiunea de a modifica acest agent');
    }
    
    const body = await request.json();
    
    // Validate input
    const validation = updateAgentSchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      return validationErrorResponse(errors as any);
    }
    
    // Update agent
    const updatedAgent = await prisma.agent.update({
      where: { id: params.id },
      data: validation.data,
    });
    
    return successResponse(updatedAgent);
    
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return forbiddenResponse();
    }
    console.error('Update agent error:', error);
    return errorResponse('A apărut o eroare la actualizarea agentului', 500);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAuth();
    
    // Only admins can delete agents
    if (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN') {
      return forbiddenResponse('Nu ai permisiunea de a șterge agenți');
    }
    
    // Check if agent exists
    const agent = await prisma.agent.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            subscriptions: {
              where: { status: 'ACTIVE' },
            },
          },
        },
      },
    });
    
    if (!agent) {
      return notFoundResponse('Agent nu a fost găsit');
    }
    
    // Prevent deletion if there are active subscriptions
    if (agent._count.subscriptions > 0) {
      return errorResponse(
        'Nu poți șterge un agent cu abonamente active. Arhivează-l în schimb.',
        400
      );
    }
    
    // Soft delete by archiving
    await prisma.agent.update({
      where: { id: params.id },
      data: { status: 'ARCHIVED' },
    });
    
    return successResponse({ message: 'Agent arhivat cu succes' });
    
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return forbiddenResponse();
    }
    console.error('Delete agent error:', error);
    return errorResponse('A apărut o eroare la ștergerea agentului', 500);
  }
}