import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getSession, requireAuth } from '@/lib/auth';
import { successResponse, errorResponse, validationErrorResponse, forbiddenResponse } from '@/lib/api-response';

// Schema for filtering agents
const getAgentsSchema = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  tags: z.string().optional(), // comma separated
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(12),
  sort: z.enum(['name', 'rating', 'price', 'created', 'users']).default('rating'),
  order: z.enum(['asc', 'desc']).default('desc'),
});

// Schema for creating agent
const createAgentSchema = z.object({
  name: z.string().min(3, 'Numele trebuie să aibă minim 3 caractere'),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug-ul poate conține doar litere mici, cifre și cratime'),
  description: z.string().min(10, 'Descrierea trebuie să aibă minim 10 caractere'),
  longDescription: z.string().optional(),
  category: z.string().min(1, 'Categoria este obligatorie'),
  tags: z.array(z.string()).default([]),
  pricing: z.object({
    monthly: z.number().optional(),
    yearly: z.number().optional(),
    oneTime: z.number().optional(),
  }),
  features: z.array(z.object({
    name: z.string(),
    description: z.string().optional(),
    included: z.boolean().default(true),
  })),
  modelProvider: z.enum(['openai', 'anthropic', 'google', 'meta']),
  modelName: z.string(),
  systemPrompt: z.string().optional(),
  temperature: z.number().min(0).max(2).default(0.7),
  maxTokens: z.number().min(100).max(8000).default(2000),
  imageUrl: z.string().url().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams);
    
    // Validate params
    const validation = getAgentsSchema.safeParse(params);
    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      return validationErrorResponse(errors as any);
    }
    
    const { 
      category, 
      search, 
      status = 'PUBLISHED', 
      minPrice, 
      maxPrice, 
      tags,
      page, 
      limit, 
      sort, 
      order 
    } = validation.data;
    
    // Build where clause
    const where: any = {};
    
    // Only show published agents to non-authenticated users
    const session = await getSession();
    if (!session || session.user.role === 'USER') {
      where.status = 'PUBLISHED';
    } else if (status) {
      where.status = status;
    }
    
    if (category) {
      where.category = category;
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } },
      ];
    }
    
    if (tags) {
      const tagArray = tags.split(',').map(t => t.trim());
      where.tags = { hasSome: tagArray };
    }
    
    // Price filtering would need to be done in memory or with raw SQL
    // since pricing is stored as JSON
    
    // Build orderBy
    const orderBy: any = {};
    switch (sort) {
      case 'name':
        orderBy.name = order;
        break;
      case 'rating':
        orderBy.rating = order;
        break;
      case 'created':
        orderBy.createdAt = order;
        break;
      case 'users':
        orderBy.totalUsers = order;
        break;
      default:
        orderBy.rating = 'desc';
    }
    
    // Get total count
    const total = await prisma.agent.count({ where });
    
    // Get agents
    const agents = await prisma.agent.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        category: true,
        tags: true,
        pricing: true,
        features: true,
        rating: true,
        totalReviews: true,
        totalUsers: true,
        imageUrl: true,
        status: true,
        createdAt: true,
        createdBy: {
          select: {
            id: true,
            fullName: true,
          },
        },
      },
    });
    
    // Filter by price if needed (in memory)
    let filteredAgents = agents;
    if (minPrice !== undefined || maxPrice !== undefined) {
      filteredAgents = agents.filter(agent => {
        const pricing = agent.pricing as any;
        const lowestPrice = Math.min(
          pricing.monthly || Infinity,
          pricing.yearly ? pricing.yearly / 12 : Infinity,
          pricing.oneTime || Infinity
        );
        
        if (minPrice !== undefined && lowestPrice < minPrice) return false;
        if (maxPrice !== undefined && lowestPrice > maxPrice) return false;
        return true;
      });
    }
    
    return successResponse({
      agents: filteredAgents,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
    
  } catch (error) {
    console.error('Get agents error:', error);
    return errorResponse('A apărut o eroare la încărcarea agenților', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth();
    
    // Only admins can create agents
    if (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN') {
      return forbiddenResponse('Nu ai permisiunea de a crea agenți');
    }
    
    const body = await request.json();
    
    // Validate input
    const validation = createAgentSchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      return validationErrorResponse(errors as any);
    }
    
    const data = validation.data;
    
    // Check if slug is unique
    const existingAgent = await prisma.agent.findUnique({
      where: { slug: data.slug },
    });
    
    if (existingAgent) {
      return errorResponse('Un agent cu acest slug există deja', 409);
    }
    
    // Create agent
    const agent = await prisma.agent.create({
      data: {
        ...data,
        createdById: session.user.id,
        status: 'DRAFT', // Always start as draft
      },
    });
    
    return successResponse(agent, 201);
    
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return forbiddenResponse();
    }
    console.error('Create agent error:', error);
    return errorResponse('A apărut o eroare la crearea agentului', 500);
  }
}