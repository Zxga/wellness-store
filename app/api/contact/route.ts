import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 });
    }
    await sendContactEmail(name, email, message);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Contact error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
