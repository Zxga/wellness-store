import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getProducts } from '@/lib/supabase';
import { FALLBACK_PRODUCTS } from '@/lib/fallback';
import { Product } from '@/types';
import ProductCard from '@/components/ui/ProductCard';

async function loadProducts(): Promise<Product[]> {
  try {
    const data = (await getProducts({ limit: 12 })) as Product[];
    if (data && data.length) return data;
  } catch {
    /* fall through */
  }
  return FALLBACK_PRODUCTS;
}

export default async function CollectionGrid() {
  const products = await loadProducts();

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-secondary text-xs uppercase tracking-[0.25em] mb-2">The Collection</p>
            <h2 className="font-display font-800 text-3xl sm:text-4xl">Recovery Rituals</h2>
          </div>
          <Link href="/shop" className="btn-outline text-sm px-5 py-2.5 gap-2 whitespace-nowrap">
            Shop All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
