'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice, getDiscountPercent } from '@/lib/utils';
import { useCartStore } from '@/store/cart';
import StarRating from './StarRating';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, openCart } = useCartStore();
  const discount = getDiscountPercent(product.price, product.compare_price);
  const image = product.images?.[0] || `https://picsum.photos/seed/${product.slug}/600/600`;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem(product);
    openCart();
  }

  return (
    <div className="card group overflow-hidden">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-elevated">
          {/* glow behind product */}
          <div className="absolute inset-0 glow-radial opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover relative z-10 group-hover:scale-105 transition-transform duration-700"
          />
          {discount > 0 && (
            <span className="absolute top-3 left-3 z-20 badge-sale">-{discount}%</span>
          )}
        </div>
      </Link>

      <div className="p-5">
        <p className="text-[11px] font-semibold text-secondary uppercase tracking-[0.12em] mb-1.5">{product.category}</p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-display font-700 text-white text-base leading-tight hover:text-accent transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>

        <StarRating rating={product.rating} size={14} showCount count={product.review_count} className="mb-4" />

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-display font-700 text-lg text-white">{formatPrice(product.price)}</span>
            {product.compare_price > product.price && (
              <span className="text-text-tertiary text-sm line-through">{formatPrice(product.compare_price)}</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 bg-primary/90 hover:bg-primary text-white text-sm font-semibold px-3.5 py-2 rounded-btn transition-all hover:shadow-[0_0_20px_rgba(194,24,91,0.5)]"
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus size={15} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
