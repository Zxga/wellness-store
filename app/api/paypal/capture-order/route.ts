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
    const { orderID } = await req.json();
    if (!orderID) return NextResponse.json({ error: 'Missing orderID' }, { status: 400 });

    const accessToken = await getAccessToken();

    const capture = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const captureData = await capture.json();

    if (captureData.status !== 'COMPLETED') {
      console.error('[paypal] capture failed:', JSON.stringify(captureData));
      return NextResponse.json({ error: 'Payment capture failed' }, { status: 400 });
    }

    return NextResponse.json({ status: 'COMPLETED', captureData });
  } catch (err: any) {
    console.error('[paypal] capture-order exception:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
