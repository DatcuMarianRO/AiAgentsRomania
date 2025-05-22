import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { asyncHandler, AppError } from '../utils/errorHandler';
import paymentService from '../services/payment.service';
import transactionModel from '../models/transaction.model';
import supabase from '../config/database';
import logger from '../utils/logger';

// Request validation schemas
const creditCheckoutSchema = z.object({
  credit_amount: z.number().positive().int(),
  return_url: z.string().url(),
});

const subscriptionCheckoutSchema = z.object({
  plan_id: z.string().uuid(),
  return_url: z.string().url(),
});

class PaymentController {
  /**
   * Create checkout session for credit purchase
   */
  createCreditCheckout = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401));
    }

    // Validate request body
    const result = creditCheckoutSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid input data',
        errors: result.error.errors,
      });
    }

    // Create checkout session
    const session = await paymentService.createCreditCheckoutSession(
      req.user.id,
      result.data.credit_amount,
      result.data.return_url
    );

    // Send response
    res.status(200).json({
      status: 'success',
      data: session,
    });
  });

  /**
   * Create checkout session for subscription
   */
  createSubscriptionCheckout = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401));
    }

    // Validate request body
    const result = subscriptionCheckoutSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid input data',
        errors: result.error.errors,
      });
    }

    // Create checkout session
    const session = await paymentService.createSubscriptionCheckoutSession(
      req.user.id,
      result.data.plan_id,
      result.data.return_url
    );

    // Send response
    res.status(200).json({
      status: 'success',
      data: session,
    });
  });

  /**
   * Handle Stripe webhook
   */
  handleWebhook = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const signature = req.headers['stripe-signature'];
    
    if (!signature) {
      return next(new AppError('Missing Stripe signature', 400));
    }

    try {
      // Handle the webhook
      await paymentService.handleStripeWebhook(req.body);

      // Send response
      res.status(200).json({ received: true });
    } catch (error) {
      logger.error('Webhook error', { error });
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      res.status(400).json({ received: false, error: errorMessage });
    }
  });

  /**
   * Get subscription plans
   */
  getSubscriptionPlans = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // Get plans from database
    const { data, error } = await supabase
      .from('subscription_plans')
      .select('*')
      .order('price', { ascending: true });

    if (error) {
      return next(new AppError(`Error fetching subscription plans: ${error.message}`, 500));
    }

    // Send response
    res.status(200).json({
      status: 'success',
      data: { plans: data },
    });
  });

  /**
   * Get user transactions
   */
  getUserTransactions = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401));
    }

    // Validate query parameters
    const querySchema = z.object({
      page: z.string().transform(val => parseInt(val)).default('1'),
      limit: z.string().transform(val => parseInt(val)).default('10'),
      type: z.string().optional(),
      sort_order: z.enum(['asc', 'desc']).default('desc'),
    });

    const result = querySchema.safeParse(req.query);
    if (!result.success) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid query parameters',
        errors: result.error.errors,
      });
    }

    // Get transactions
    const { transactions, total } = await transactionModel.getUserTransactions(
      req.user.id,
      {
        page: result.data.page,
        limit: result.data.limit,
        type: result.data.type as any,
        sort_order: result.data.sort_order,
      }
    );

    // Get summary data
    const summary = await transactionModel.getUserTransactionSummary(req.user.id);

    // Send response
    res.status(200).json({
      status: 'success',
      data: {
        transactions,
        summary,
        pagination: {
          page: result.data.page,
          limit: result.data.limit,
          total,
          pages: Math.ceil(total / result.data.limit),
        },
      },
    });
  });

  /**
   * Check checkout session status
   */
  checkSession = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401));
    }

    const sessionId = req.params.sessionId;
    
    if (!sessionId) {
      return next(new AppError('Session ID is required', 400));
    }

    // Get the session from Stripe
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Check if this session belongs to the current user
    if (session.client_reference_id !== req.user.id) {
      return next(new AppError('Access denied', 403));
    }

    // Send response
    res.status(200).json({
      status: 'success',
      data: {
        status: session.status,
        payment_status: session.payment_status,
      },
    });
  });
}

export default new PaymentController();