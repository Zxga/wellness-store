import { NextRequest, NextResponse } from 'next/server';
import { addSubscriber } from '@/lib/supabase';
import { sendWelcomeEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

    const discountCode = 'WELCOME10';
    await addSubscriber(email, discountCode);
    await sendWelcomeEmail(email, discountCode);

    return NextResponse.json({ success: true, code: discountCode });
  } catch (err: any) {
    console.error('Subscribe error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
