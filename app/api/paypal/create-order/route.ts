import { NextRequest, NextResponse } from 'next/server';

const PAYPAL_API = 'https://api-m.paypal.com';

async function getAccessToken(): Promise<string> {
  const creds = Buffer.from(
    `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString('base64');

  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${creds}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await res.json();
  if (!data.access_token) throw new Error('Failed to get PayPal access token');
  return data.access_token;
}

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json();

    const subtotal: number = items.reduce(
      (sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity,
      0
    );
    const shipping = subtotal >= 50 ? 0 : 9.99;
    const total = (subtotal + shipping).toFixed(2);

    const accessToken = await getAccessToken();

    const order = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: total,
              breakdown: {
                item_total: { currency_code: 'USD', value: subtotal.toFixed(2) },
                shipping: { currency_code: 'USD', value: shipping.toFixed(2) },
              },
            },
            items: items.map((item: { name: string; price: number; quantity: number }) => ({
              name: item.name.slice(0, 127),
              unit_amount: { currency_code: 'USD', value: item.price.toFixed(2) },
              quantity: String(item.quantity),
              category: 'PHYSICAL_GOODS',
            })),
          },
        ],
        application_context: {
          brand_name: 'RAYLUNE',
          shipping_preference: 'GET_FROM_FILE',
          user_action: 'PAY_NOW',
          return_url: `${process.env.NEXT_PUBLIC_URL}/order/success`,
          cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
        },
      }),
    });

    const orderData = await order.json();
    if (!orderData.id) {
      console.error('[paypal] create-order error:', JSON.stringify(orderData));
      return NextResponse.json({ error: 'Failed to create PayPal order' }, { status: 500 });
    }

    return NextResponse.json({ id: orderData.id });
  } catch (err: any) {
    console.error('[paypal] create-order exception:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
