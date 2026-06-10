import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getProducts } from '@/lib/supabase';
import ProductCard from '@/components/ui/ProductCard';
import { FALLBACK_PRODUCTS } from '@/lib/fallback';

export default async function FeaturedProducts() {
  let products = [];
  try {
    products = await getProducts({ featured: true, limit: 3 }) || [];
  } catch {
    products = FALLBACK_PRODUCTS.slice(0, 3);
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="font-display font-800 text-3xl sm:text-4xl text-text-primary mb-2">
              Bestsellers
            </h2>
            <p className="text-text-secondary">Our most-loved wellness devices</p>
          </div>
          <Link href="/shop" className="btn-outline flex items-center gap-2 text-sm px-5 py-2.5 whitespace-nowrap">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
