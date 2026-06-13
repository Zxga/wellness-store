import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  console.log('[contact] POST received');
  try {
    const body = await req.json();
    console.log('[contact] body:', JSON.stringify(body));
    const { name, email, message } = body;
    if (!name || !email || !message) {
      console.log('[contact] missing fields');
      return NextResponse.json({ error: 'All fields required' }, { status: 400 });
    }
    console.log('[contact] RESEND_API_KEY set:', !!process.env.RESEND_API_KEY, '| ADMIN_EMAIL:', process.env.ADMIN_EMAIL);
    const result = await sendContactEmail(name, email, message);
    console.log('[contact] sendContactEmail result:', JSON.stringify(result));
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[contact] ERROR:', err?.message, err?.response?.data ?? '');
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
