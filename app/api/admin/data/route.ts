import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const client = getServiceClient();

    const [ordersRes, abRes, subscribersRes, productsRes] = await Promise.all([
      client.from('orders').select('*').order('created_at', { ascending: false }).limit(50),
      client.from('ab_tests').select('variant, event'),
      client.from('subscribers').select('*').order('created_at', { ascending: false }),
      client.from('products').select('*').order('created_at', { ascending: false }),
    ]);

    // Process A/B results
    const abData = abRes.data || [];
    const variants = ['A', 'B'];
    const abResults = variants.map((v) => {
      const vData = abData.filter((r: any) => r.variant === v);
      const views = vData.filter((r: any) => r.event === 'view').length;
      const addToCarts = vData.filter((r: any) => r.event === 'add_to_cart').length;
      const purchases = vData.filter((r: any) => r.event === 'purchase').length;
      return {
        variant: v,
        views,
        add_to_carts: addToCarts,
        purchases,
        conversion_rate: views > 0 ? (purchases / views) * 100 : 0,
      };
    });

    return NextResponse.json({
      orders: ordersRes.data || [],
      abResults,
      subscribers: subscribersRes.data || [],
      products: productsRes.data || [],
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
