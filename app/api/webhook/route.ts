import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { getServiceClient } from '@/lib/supabase';
import { sendOrderConfirmation } from '@/lib/email';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const client = getServiceClient();

    try {
      // Retrieve line items
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 });

      const items = lineItems.data.map((item) => ({
        product_id: '',
        name: item.description || '',
        price: (item.amount_total || 0) / 100 / (item.quantity || 1),
        quantity: item.quantity || 1,
        image: '',
      }));

      const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
      const total = (session.amount_total || 0) / 100;

      // Save order
      await client.from('orders').insert({
        stripe_session_id: session.id,
        customer_email: session.customer_details?.email || '',
        customer_name: session.customer_details?.name || '',
        items,
        subtotal,
        total,
        status: 'paid',
      });

      // Send confirmation email
      if (session.customer_details?.email) {
        await sendOrderConfirmation(
          session.customer_details.email,
          session.customer_details.name || 'Customer',
          session.id,
          items,
          total
        );
      }
    } catch (err) {
      console.error('Webhook processing error:', err);
    }
  }

  return NextResponse.json({ received: true });
}
