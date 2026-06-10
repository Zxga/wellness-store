'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Lock } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCartStore();
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
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4">
        <ShoppingBag size={64} className="text-gray-200" />
        <h1 className="font-display font-800 text-2xl text-text-primary">Your cart is empty</h1>
        <p className="text-text-secondary">Add some wellness products to get started!</p>
        <Link href="/shop" className="btn-primary">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/shop" className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors text-sm">
          <ArrowLeft size={16} /> Continue Shopping
        </Link>
        <h1 className="font-display font-800 text-2xl text-text-primary">Shopping Cart ({items.length})</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => {
            const image = product.images?.[0] || `https://picsum.photos/seed/${product.slug}/200/200`;
            return (
              <div key={product.id} className="card p-5 flex gap-4">
                <div className="relative w-24 h-24 rounded-card overflow-hidden bg-gray-50 shrink-0">
                  <Image src={image} alt={product.name} fill sizes="96px" className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-medium text-primary uppercase tracking-wide">{product.category}</span>
                      <h3 className="font-display font-700 text-text-primary leading-tight mt-0.5">{product.name}</h3>
                    </div>
                    <button onClick={() => removeItem(product.id)} className="text-gray-300 hover:text-danger transition-colors shrink-0">
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-gray-200 rounded-btn overflow-hidden">
                      <button onClick={() => updateQuantity(product.id, quantity - 1)} className="px-3 py-1.5 hover:bg-gray-50">
                        <Minus size={14} />
                      </button>
                      <span className="px-4 py-1.5 font-semibold text-sm border-x border-gray-200">{quantity}</span>
                      <button onClick={() => updateQuantity(product.id, quantity + 1)} className="px-3 py-1.5 hover:bg-gray-50">
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-display font-700 text-lg text-text-primary">{formatPrice(product.price * quantity)}</p>
                      {quantity > 1 && (
                        <p className="text-xs text-text-secondary">{formatPrice(product.price)} each</p>
                      )}
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
            <h2 className="font-display font-700 text-xl text-text-primary mb-5">Order Summary</h2>

            <div className="space-y-3 mb-5">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Subtotal</span>
                <span className="font-medium">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Shipping</span>
                <span className={shipping === 0 ? 'text-primary font-medium' : 'font-medium'}>
                  {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-text-secondary bg-green-50 px-3 py-2 rounded-btn">
                  Add {formatPrice(50 - total)} more for free shipping!
                </p>
              )}
              <div className="border-t border-gray-100 pt-3 flex justify-between">
                <span className="font-display font-700 text-text-primary">Total</span>
                <span className="font-display font-800 text-xl text-text-primary">{formatPrice(total + shipping)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full btn-primary py-4 flex items-center justify-center gap-2 text-base disabled:opacity-60"
            >
              <Lock size={16} />
              {loading ? 'Redirecting...' : 'Secure Checkout'}
            </button>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {['Visa', 'Mastercard', 'AmEx', 'PayPal'].map((p) => (
                <span key={p} className="text-xs bg-gray-50 border border-gray-200 text-text-secondary px-2 py-1 rounded">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
