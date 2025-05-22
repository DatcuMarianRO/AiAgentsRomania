import { z } from 'zod';

/**
 * Validation schema for registration
 */
export const registerSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
});

/**
 * Validation schema for login
 */
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

/**
 * Validation schema for agent creation/update
 */
export const agentSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(100, 'Name cannot exceed 100 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description cannot exceed 500 characters'),
  instructions: z.string().min(10, 'Instructions must be at least 10 characters'),
  model_provider: z.enum(['anthropic', 'openai', 'google', 'mistral', 'meta', 'other'], {
    errorMap: () => ({ message: 'Please select a valid model provider' }),
  }),
  model_id: z.string().min(3, 'Model ID is required'),
  model_config: z.record(z.any()).default({}),
  thumbnail_url: z.string().url('Please enter a valid URL').optional().nullable(),
  visibility: z.enum(['public', 'private', 'unlisted'], {
    errorMap: () => ({ message: 'Please select a valid visibility option' }),
  }).default('private'),
  price: z.number().min(0, 'Price cannot be negative').default(0),
  category_id: z.string().uuid('Please select a valid category'),
  tags: z.array(z.string()).default([]),
});

/**
 * Validation schema for profile update
 */
export const updateProfileSchema = z.object({
  first_name: z.string().min(1, 'First name is required').optional(),
  last_name: z.string().min(1, 'Last name is required').optional(),
  avatar_url: z.string().url('Must be a valid URL').optional().nullable(),
});