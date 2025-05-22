import stripe from '../config/stripe';
import { SubscriptionPlan } from '../types/database';
import { AppError } from '../utils/errorHandler';
import userModel from '../models/user.model';
import transactionModel from '../models/transaction.model';
import supabase from '../config/database';
import logger from '../utils/logger';

class PaymentService {
  /**
   * Create a checkout session for credit purchase
   */
  async createCreditCheckoutSession(
    userId: string,
    creditAmount: number,
    returnUrl: string
  ): Promise<{ sessionId: string; url: string }> {
    // Get the user
    const user = await userModel.getById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Credit pricing tiers
    const pricingTiers = [
      { credits: 100, price: 10 },    // $0.10 per credit
      { credits: 500, price: 45 },    // $0.09 per credit
      { credits: 1000, price: 80 },   // $0.08 per credit
      { credits: 5000, price: 350 },  // $0.07 per credit
    ];

    // Find the pricing tier for this credit amount
    const tier = pricingTiers.find(t => t.credits === creditAmount);
    if (!tier) {
      throw new AppError('Invalid credit amount', 400);
    }

    // Create the checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${creditAmount} Credits`,
              description: 'Credits for AI Agents Romania platform',
            },
            unit_amount: tier.price * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${returnUrl}?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${returnUrl}?canceled=true`,
      customer_email: user.email,
      client_reference_id: userId,
      metadata: {
        userId,
        credits: creditAmount.toString(),
        type: 'credit_purchase',
      },
    });

    return {
      sessionId: session.id,
      url: session.url || '',
    };
  }

  /**
   * Create a checkout session for subscription
   */
  async createSubscriptionCheckoutSession(
    userId: string,
    planId: string,
    returnUrl: string
  ): Promise<{ sessionId: string; url: string }> {
    // Get the user
    const user = await userModel.getById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Get the subscription plan
    const { data: plan, error } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('id', planId)
      .single();

    if (error || !plan) {
      throw new AppError('Subscription plan not found', 404);
    }

    // Create the checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: plan.stripe_price_id,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${returnUrl}?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${returnUrl}?canceled=true`,
      customer_email: user.email,
      client_reference_id: userId,
      metadata: {
        userId,
        planId,
        type: 'subscription',
      },
    });

    return {
      sessionId: session.id,
      url: session.url || '',
    };
  }

  /**
   * Handle Stripe webhook for completed payments
   */
  async handleStripeWebhook(event: any): Promise<void> {
    try {
      switch (event.type) {
        case 'checkout.session.completed':
          await this.handleCheckoutCompleted(event.data.object);
          break;
          
        case 'invoice.paid':
          await this.handleInvoicePaid(event.data.object);
          break;
          
        case 'invoice.payment_failed':
          await this.handleInvoicePaymentFailed(event.data.object);
          break;
          
        case 'customer.subscription.updated':
          await this.handleSubscriptionUpdated(event.data.object);
          break;
          
        case 'customer.subscription.deleted':
          await this.handleSubscriptionDeleted(event.data.object);
          break;
      }
    } catch (error) {
      logger.error('Error handling Stripe webhook', { error, eventType: event.type });
      throw error;
    }
  }

  /**
   * Handle completed checkout session
   */
  private async handleCheckoutCompleted(session: any): Promise<void> {
    const { userId, credits, type, planId } = session.metadata;

    if (!userId) {
      throw new AppError('Missing user ID in session metadata', 400);
    }

    if (type === 'credit_purchase' && credits) {
      // Credit purchase
      const creditAmount = parseInt(credits, 10);
      
      // Add credits to user
      await transactionModel.create({
        user_id: userId,
        type: 'credit_purchase',
        amount: creditAmount,
        description: `Purchased ${creditAmount} credits`,
        stripe_payment_id: session.id,
      });
    } else if (type === 'subscription' && planId) {
      // Subscription purchase - handled by invoice.paid event
    }
  }

  /**
   * Handle paid invoice
   */
  private async handleInvoicePaid(invoice: any): Promise<void> {
    if (!invoice.subscription) {
      return; // Not a subscription invoice
    }

    // Get the subscription
    const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
    const userId = subscription.metadata.userId;
    const planId = subscription.metadata.planId;

    if (!userId || !planId) {
      throw new AppError('Missing user ID or plan ID in subscription metadata', 400);
    }

    // Get the plan to determine credits to award
    const { data: plan, error } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('id', planId)
      .single();

    if (error || !plan) {
      throw new AppError('Subscription plan not found', 404);
    }

    // Update user's subscription status
    await userModel.update(userId, {
      subscription_tier: this.getPlanTier(plan),
      subscription_id: subscription.id,
    });

    // Update or create subscription record
    const { data: existingSubscription } = await supabase
      .from('subscriptions')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (existingSubscription) {
      // Update existing subscription
      await supabase
        .from('subscriptions')
        .update({
          plan_id: planId,
          status: 'active',
          current_period_start: new Date((subscription as any).current_period_start * 1000).toISOString(),
          current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
          cancel_at_period_end: subscription.cancel_at_period_end,
          stripe_subscription_id: subscription.id,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingSubscription.id);
    } else {
      // Create new subscription
      await supabase
        .from('subscriptions')
        .insert({
          user_id: userId,
          plan_id: planId,
          status: 'active',
          current_period_start: new Date((subscription as any).current_period_start * 1000).toISOString(),
          current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
          cancel_at_period_end: subscription.cancel_at_period_end,
          stripe_subscription_id: subscription.id,
        });
    }

    // Add monthly credits
    await transactionModel.create({
      user_id: userId,
      type: 'subscription_payment',
      amount: plan.monthly_credits,
      description: `Monthly credits for ${plan.name} subscription`,
      reference_id: planId,
      stripe_payment_id: invoice.id,
    });
  }

  /**
   * Handle failed invoice payment
   */
  private async handleInvoicePaymentFailed(invoice: any): Promise<void> {
    if (!invoice.subscription) {
      return; // Not a subscription invoice
    }

    // Get the subscription
    const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
    const userId = subscription.metadata.userId;
    
    if (!userId) {
      throw new AppError('Missing user ID in subscription metadata', 400);
    }

    // Update subscription status
    const { data: existingSubscription } = await supabase
      .from('subscriptions')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (existingSubscription) {
      await supabase
        .from('subscriptions')
        .update({
          status: 'past_due',
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingSubscription.id);
    }
  }

  /**
   * Handle subscription updates
   */
  private async handleSubscriptionUpdated(subscription: any): Promise<void> {
    const userId = subscription.metadata.userId;
    
    if (!userId) {
      throw new AppError('Missing user ID in subscription metadata', 400);
    }

    // Update subscription record
    const { data: existingSubscription } = await supabase
      .from('subscriptions')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (existingSubscription) {
      await supabase
        .from('subscriptions')
        .update({
          status: subscription.status,
          cancel_at_period_end: subscription.cancel_at_period_end,
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingSubscription.id);
    }
  }

  /**
   * Handle subscription deletion
   */
  private async handleSubscriptionDeleted(subscription: any): Promise<void> {
    const userId = subscription.metadata.userId;
    
    if (!userId) {
      throw new AppError('Missing user ID in subscription metadata', 400);
    }

    // Update user's subscription status
    await userModel.update(userId, {
      subscription_tier: 'free',
      subscription_id: undefined,
    });

    // Update subscription record
    const { data: existingSubscription } = await supabase
      .from('subscriptions')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (existingSubscription) {
      await supabase
        .from('subscriptions')
        .update({
          status: 'canceled',
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingSubscription.id);
    }
  }

  /**
   * Map subscription plan to user tier
   */
  private getPlanTier(plan: SubscriptionPlan): 'free' | 'basic' | 'premium' | 'enterprise' {
    // Map plan to tier based on your business logic
    const name = plan.name.toLowerCase();
    
    if (name.includes('enterprise')) {
      return 'enterprise';
    } else if (name.includes('premium')) {
      return 'premium';
    } else if (name.includes('basic')) {
      return 'basic';
    } else {
      return 'free';
    }
  }
}

export default new PaymentService();