'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
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
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {discount > 0 && (
            <span className="absolute top-3 left-3 badge-sale">-{discount}%</span>
          )}
        </div>
      </Link>

      <div className="p-4">
        <p className="text-xs font-medium text-primary uppercase tracking-wide mb-1">{product.category}</p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-display font-700 text-text-primary text-base leading-tight hover:text-primary transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>

        <StarRating rating={product.rating} size={14} showCount count={product.review_count} className="mb-3" />

        <div className="flex items-center justify-between">
          <div>
            <span className="font-display font-bold text-lg text-text-primary">{formatPrice(product.price)}</span>
            {product.compare_price > product.price && (
              <span className="text-text-secondary text-sm line-through ml-2">{formatPrice(product.compare_price)}</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 bg-primary text-white text-sm font-semibold px-3 py-2 rounded-btn hover:bg-primary-dark transition-colors"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart size={15} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
