import Stripe from 'stripe';
import { CartItem } from '@/types';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createCheckoutSession(cartItems: CartItem[], origin: string) {
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: cartItems.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.product.name,
          images: item.product.images?.length ? [item.product.images[0]] : [],
        },
        unit_amount: Math.round(item.product.price * 100),
      },
      quantity: item.quantity,
    })),
    success_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cart`,
    shipping_address_collection: {
      allowed_countries: ['US', 'GB', 'CA', 'AU', 'DE', 'FR'],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 0, currency: 'usd' },
          display_name: 'Free Shipping',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 7 },
            maximum: { unit: 'business_day', value: 14 },
          },
        },
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 999, currency: 'usd' },
          display_name: 'Express Shipping',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 3 },
            maximum: { unit: 'business_day', value: 5 },
          },
        },
      },
    ],
  });

  return session;
}
