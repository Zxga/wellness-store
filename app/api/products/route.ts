import { NextRequest, NextResponse } from 'next/server';
import { FALLBACK_PRODUCTS } from '@/lib/fallback';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || 'best_selling';

  try {
    const { getProducts } = await import('@/lib/supabase');
    const products = await getProducts({ category: category || undefined, sort });
    return NextResponse.json({ products });
  } catch {
    let products = [...FALLBACK_PRODUCTS];
    if (category) products = products.filter((p) => p.category === category);
    if (sort === 'price_asc') products.sort((a, b) => a.price - b.price);
    else if (sort === 'price_desc') products.sort((a, b) => b.price - a.price);
    else products.sort((a, b) => b.review_count - a.review_count);
    return NextResponse.json({ products });
  }
}
