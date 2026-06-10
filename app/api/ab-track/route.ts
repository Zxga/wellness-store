import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { variant, event, productId, sessionId } = await req.json();
    const client = getServiceClient();
    await client.from('ab_tests').insert({ variant, event, product_id: productId, session_id: sessionId });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false });
  }
}
