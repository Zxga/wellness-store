import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { getProducts } from '@/lib/supabase';
import { FALLBACK_PRODUCTS } from '@/lib/fallback';
import { formatPrice, getProductBenefits, getDiscountPercent } from '@/lib/utils';
import { Product } from '@/types';
import AddToCartButton from '@/components/ui/AddToCartButton';
import StarRating from '@/components/ui/StarRating';

async function loadProducts(): Promise<Product[]> {
  try {
    const data = (await getProducts({ limit: 12 })) as Product[];
    if (data && data.length) return data;
  } catch {
    /* fall through */
  }
  return FALLBACK_PRODUCTS;
}

export default async function FeaturedSpotlight() {
  const products = await loadProducts();
  const hero =
    products.find((p) => p.slug === 'lux-01-red-light-face-mask') ||
    products.find((p) => p.is_featured) ||
    products[0];

  const paired = products
    .filter((p) => p.slug === 'frost-01-facial-ice-bath-bowl' || p.slug === 'pulse-01-mini-massage-gun')
    .slice(0, 2);

  if (!hero) return null;
  const benefits = getProductBenefits(hero.slug);
  const discount = getDiscountPercent(hero.price, hero.compare_price);
  const image = hero.images?.[0] || '';

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] glow-hero opacity-50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Image */}
          <div className="relative order-1 lg:order-1 flex justify-center">
            <div className="absolute w-[460px] h-[460px] glow-radial animate-glow-pulse" />
            <div className="relative w-full max-w-lg aspect-square rounded-card overflow-hidden border border-white/10 shadow-[0_0_70px_rgba(194,24,91,0.3)]">
              <Image
                src={image}
                alt={hero.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {discount > 0 && (
                <span className="absolute top-5 left-5 badge-sale text-sm px-3 py-1">-{discount}%</span>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="order-2 lg:order-2">
            <p className="text-secondary text-xs uppercase tracking-[0.25em] mb-3">The Signature Ritual</p>
            <h2 className="font-display font-800 text-4xl sm:text-5xl mb-4 leading-tight">{hero.name}</h2>
            <StarRating rating={hero.rating} size={16} showCount count={hero.review_count} className="mb-5" />
            <p className="text-text-secondary leading-relaxed mb-7 max-w-xl">{hero.description}</p>

            <ul className="grid grid-cols-2 gap-3 mb-8 max-w-md">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm text-white">
                  <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-secondary" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display font-800 text-3xl text-white">{formatPrice(hero.price)}</span>
              {hero.compare_price > hero.price && (
                <span className="text-text-tertiary text-lg line-through">{formatPrice(hero.compare_price)}</span>
              )}
            </div>

            <div className="max-w-xs">
              <AddToCartButton product={hero} showPrice />
            </div>
            <Link href={`/products/${hero.slug}`} className="inline-block mt-4 text-sm text-accent hover:text-white transition-colors">
              View full details →
            </Link>
          </div>
        </div>

        {/* Best paired with */}
        {paired.length > 0 && (
          <div className="mt-20">
            <p className="text-center text-text-secondary text-sm uppercase tracking-[0.2em] mb-8">
              Best Paired With
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {paired.map((p) => {
                const img = p.images?.[0] || '';
                return (
                  <Link
                    key={p.id}
                    href={`/products/${p.slug}`}
                    className="card group flex items-center gap-4 p-4"
                  >
                    <div className="relative w-20 h-20 rounded-card overflow-hidden bg-elevated shrink-0">
                      <Image src={img} alt={p.name} fill sizes="80px" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] uppercase tracking-wide text-secondary mb-0.5">{p.category}</p>
                      <p className="font-display font-700 text-white text-sm leading-tight line-clamp-2">{p.name}</p>
                      <p className="text-white font-700 mt-1">{formatPrice(p.price)}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
