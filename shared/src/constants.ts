/**
 * Constants shared between frontend and backend
 */

/**
 * Auth-related constants
 */
export const AUTH = {
  TOKEN_EXPIRY: '15m', // Access token expiry
  REFRESH_TOKEN_EXPIRY: '7d', // Refresh token expiry
  COOKIE_NAME: 'refreshToken',
};

/**
 * API routes
 */
export const API_ROUTES = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
    PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password',
    RESET_PASSWORD_REQUEST: '/auth/reset-password-request',
    RESET_PASSWORD: '/auth/reset-password',
  },
  AGENTS: {
    BASE: '/agents',
    CATEGORIES: '/agents/categories',
    RUN: (id: string) => `/agents/${id}/run`,
    STREAM: (id: string) => `/agents/${id}/stream`,
    PURCHASE: (id: string) => `/agents/${id}/purchase`,
    RATE: (id: string) => `/agents/${id}/rate`,
  },
  CONVERSATIONS: {
    BASE: '/conversations',
    MESSAGES: (id: string) => `/conversations/${id}/messages`,
  },
  PAYMENTS: {
    CHECKOUT_CREDITS: '/payments/checkout/credits',
    CHECKOUT_SUBSCRIPTION: '/payments/checkout/subscription',
    PLANS: '/payments/plans',
    TRANSACTIONS: '/payments/transactions',
    WEBHOOK: '/payments/webhook',
  },
};

/**
 * Subscription plan IDs
 */
export const SUBSCRIPTION_PLANS = {
  FREE: 'price_free',
  BASIC: 'price_basic_monthly',
  PREMIUM: 'price_premium_monthly',
  ENTERPRISE: 'price_enterprise_monthly',
};

/**
 * Credit packages
 */
export const CREDIT_PACKAGES = [
  { credits: 100, price: 10 },  // $0.10 per credit
  { credits: 500, price: 45 },  // $0.09 per credit
  { credits: 1000, price: 80 }, // $0.08 per credit
  { credits: 5000, price: 350 }, // $0.07 per credit
];