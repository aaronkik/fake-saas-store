import Stripe from 'stripe';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
export const STRIPE_SAAS_PRODUCT_ID = process.env.STRIPE_SAAS_PRODUCT_ID;
export const STRIPE_MONTH_SUB_PRICE_ID = process.env.STRIPE_MONTH_SUB_PRICE_ID;
export const STRIPE_YEAR_SUB_PRICE_ID = process.env.STRIPE_YEAR_SUB_PRICE_ID;

if (!STRIPE_SECRET_KEY)
  throw new Error('Missing process.env.STRIPE_SECRET_KEY');

export const stripeClient = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2022-08-01',
  appInfo: {
    name: 'Fake SaaS website',
  },
});
