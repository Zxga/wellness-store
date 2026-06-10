import { createClient } from '@supabase/supabase-js';

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || url === 'your_supabase_url') {
    throw new Error('Supabase not configured');
  }
  return createClient(url, key);
}

export function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key || url === 'your_supabase_url') {
    throw new Error('Supabase not configured');
  }
  return createClient(url, key);
}

// Lazy singleton
let _supabase: ReturnType<typeof createClient> | null = null;
export function getSupabase(): ReturnType<typeof createClient> {
  if (!_supabase) _supabase = getClient() as ReturnType<typeof createClient>;
  return _supabase!;
}

export const PRODUCTS_QUERY = `
  id, name, slug, description, price, compare_price,
  images, category, stock, rating, review_count,
  is_featured, created_at
`;

export async function getProducts(options?: {
  category?: string;
  featured?: boolean;
  limit?: number;
  offset?: number;
  sort?: string;
}) {
  let query = getSupabase().from('products').select(PRODUCTS_QUERY);

  if (options?.category) query = query.eq('category', options.category);
  if (options?.featured) query = query.eq('is_featured', true);

  if (options?.sort === 'price_asc') query = query.order('price', { ascending: true });
  else if (options?.sort === 'price_desc') query = query.order('price', { ascending: false });
  else if (options?.sort === 'newest') query = query.order('created_at', { ascending: false });
  else query = query.order('review_count', { ascending: false });

  if (options?.limit) query = query.limit(options.limit);
  if (options?.offset) query = query.range(options.offset, (options.offset + (options.limit || 12)) - 1);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getProductBySlug(slug: string) {
  const { data, error } = await getSupabase()
    .from('products')
    .select(PRODUCTS_QUERY)
    .eq('slug', slug)
    .single();
  if (error) throw error;
  return data;
}

export async function getProductReviews(productId: string) {
  const { data, error } = await getSupabase()
    .from('reviews')
    .select('*')
    .eq('product_id', productId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function trackABEvent(
  variant: 'A' | 'B',
  event: 'view' | 'add_to_cart' | 'purchase',
  productId: string,
  sessionId: string
) {
  const { error } = await getSupabase().from('ab_tests').insert({
    variant,
    event,
    product_id: productId,
    session_id: sessionId,
  } as any);
  if (error) console.error('AB track error:', error);
}

export async function addSubscriber(email: string, discountCode: string) {
  const { error } = await getSupabase()
    .from('subscribers')
    .upsert({ email, discount_code: discountCode } as any, { onConflict: 'email' });
  if (error) throw error;
}
