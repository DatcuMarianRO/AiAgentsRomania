import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

// Validate environment variables
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error('Missing Stripe secret key. Check your .env file.');
}

// Create Stripe client
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2025-04-30.basil', // Use the latest API version
});

export default stripe;