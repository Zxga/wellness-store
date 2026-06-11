'use client';
import { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface Props {
  product: Product;
  quantity?: number;
  showPrice?: boolean;
  className?: string;
  label?: string;
}

export default function AddToCartButton({ product, quantity = 1, showPrice = false, className, label = 'Add to Cart' }: Props) {
  const { addItem, openCart } = useCartStore();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem(product, quantity);
    openCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'btn-primary text-base gap-2 w-full',
        added && 'bg-none bg-emerald-600 shadow-none',
        className
      )}
      style={added ? { background: '#0E9F6E', boxShadow: '0 0 24px rgba(14,159,110,0.4)' } : undefined}
    >
      {added ? (
        <><Check size={18} /> Added to Cart</>
      ) : (
        <>
          <ShoppingBag size={18} />
          {label}
          {showPrice && <span className="opacity-90">— {formatPrice(product.price * quantity)}</span>}
        </>
      )}
    </button>
  );
}
