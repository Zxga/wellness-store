'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Lock } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/lib/utils';
import dynamic from 'next/dynamic';

const PayPalCheckoutButton = dynamic(() => import('@/components/cart/PayPalCheckoutButton'), {
  ssr: false,
  loading: () => <div className="h-12 w-full rounded-btn bg-white/5 animate-pulse" />,
});

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const total = subtotal();
  const shipping = total >= 50 ? 0 : 9.99;

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4 text-center">
        <ShoppingBag size={60} className="text-white/10" />
        <h1 className="font-display font-800 text-2xl">Your cart is empty</h1>
        <p className="text-text-secondary">Start your glow ritual</p>
        <Link href="/shop" className="btn-primary px-8 py-3">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/shop" className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors text-sm">
          <ArrowLeft size={15} /> Continue Shopping
        </Link>
        <h1 className="font-display font-800 text-2xl">Your Ritual Cart ({items.length})</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => {
            const image = product.images?.[0] || '';
            return (
              <div key={product.id} className="card p-5 flex gap-4">
                <div className="relative w-24 h-24 rounded-card overflow-hidden bg-elevated shrink-0">
                  {image && <Image src={image} alt={product.name} fill sizes="96px" className="object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-secondary">{product.category}</span>
                      <h3 className="font-display font-700 text-white leading-tight mt-0.5">{product.name}</h3>
                    </div>
                    <button onClick={() => removeItem(product.id)} className="text-white/20 hover:text-danger transition-colors shrink-0">
                      <Trash2 size={17} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-white/15 rounded-btn overflow-hidden">
                      <button onClick={() => updateQuantity(product.id, quantity - 1)} className="px-3 py-1.5 hover:bg-white/10">
                        <Minus size={13} />
                      </button>
                      <span className="px-4 py-1.5 font-semibold text-sm border-x border-white/15">{quantity}</span>
                      <button onClick={() => updateQuantity(product.id, quantity + 1)} className="px-3 py-1.5 hover:bg-white/10">
                        <Plus size={13} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-display font-700 text-lg text-white">{formatPrice(product.price * quantity)}</p>
                      {quantity > 1 && <p className="text-xs text-text-tertiary">{formatPrice(product.price)} each</p>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div>
          <div className="card p-6 sticky top-24">
            <h2 className="font-display font-700 text-xl mb-5">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Subtotal</span>
                <span className="text-white font-medium">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Shipping</span>
                <span className={shipping === 0 ? 'text-secondary font-medium' : 'text-white font-medium'}>
                  {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-secondary bg-primary/10 px-3 py-2 rounded-btn border border-[rgba(194,24,91,0.2)]">
                  Add {formatPrice(50 - total)} more for free shipping
                </p>
              )}
              <div className="border-t border-white/10 pt-3 flex justify-between">
                <span className="font-display font-700 text-white">Total</span>
                <span className="font-display font-800 text-xl text-white">{formatPrice(total + shipping)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="btn-primary w-full py-4 gap-2 disabled:opacity-60"
            >
              <Lock size={15} />
              {loading ? 'Redirecting...' : 'Secure Checkout'}
            </button>

            <div className="relative my-4 flex items-center gap-3">
              <div className="flex-1 border-t border-white/10" />
              <span className="text-xs text-text-tertiary uppercase tracking-wider">or</span>
              <div className="flex-1 border-t border-white/10" />
            </div>

            <PayPalCheckoutButton items={items} total={total + shipping} />

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {['Visa', 'Mastercard', 'AmEx', 'PayPal'].map((p) => (
                <span key={p} className="text-xs border border-white/15 text-text-secondary px-2 py-1 rounded">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
