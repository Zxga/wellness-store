'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Plus, Minus, Trash2, ShoppingBag, Sparkles } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/lib/utils';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const total = subtotal();
  const shipping = total >= 50 ? 0 : 9.99;

  const upsellSlug = 'frost-01-facial-ice-bath-bowl';
  const hasUpsell = items.some((i) => i.product.slug === upsellSlug);
  const upsellProduct = !hasUpsell && items.length > 0
    ? { name: 'FROST-01 Facial Ice Bath Bowl', price: 34.99, slug: upsellSlug }
    : null;

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeCart}
      />

      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm border-l border-white/10 flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ background: '#1F0810' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h2 className="font-display font-700 text-lg text-white flex items-center gap-2">
            <ShoppingBag size={18} className="text-secondary" />
            Your Ritual ({items.length})
          </h2>
          <button onClick={closeCart} className="p-2 text-text-secondary hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <Sparkles size={44} className="text-white/10" />
              <p className="text-text-secondary font-medium">Your ritual cart is empty</p>
              <Link href="/shop" onClick={closeCart} className="btn-primary text-sm px-6 py-2.5">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(({ product, quantity }) => {
                const image = product.images?.[0] || '';
                return (
                  <div key={product.id} className="flex gap-3 py-3 border-b border-white/8">
                    <div className="relative w-20 h-20 rounded-card overflow-hidden bg-elevated shrink-0">
                      {image && <Image src={image} alt={product.name} fill sizes="80px" className="object-cover" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase tracking-wider text-secondary mb-0.5">{product.category}</p>
                      <p className="font-medium text-white text-sm leading-tight line-clamp-2 mb-2">{product.name}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-white/15 rounded-btn overflow-hidden">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center hover:bg-white/10 transition-colors"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="w-7 text-center text-sm font-semibold border-x border-white/15">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center hover:bg-white/10 transition-colors"
                          >
                            <Plus size={11} />
                          </button>
                        </div>
                        <span className="text-secondary font-700 text-sm">{formatPrice(product.price * quantity)}</span>
                        <button
                          onClick={() => removeItem(product.id)}
                          className="ml-auto text-white/25 hover:text-danger transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Upsell */}
              {upsellProduct && (
                <div
                  className="rounded-card p-3 border"
                  style={{ background: 'rgba(194,24,91,0.08)', borderColor: 'rgba(240,98,146,0.25)' }}
                >
                  <p className="text-xs font-semibold text-accent mb-1.5">✦ Complete your ritual</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white">{upsellProduct.name}</p>
                    <span className="text-sm font-700 text-secondary">{formatPrice(upsellProduct.price)}</span>
                  </div>
                  <Link href={`/products/${upsellProduct.slug}`} onClick={closeCart}
                    className="text-xs text-accent/70 hover:text-accent transition-colors mt-1 block">
                    View product →
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/10 px-5 py-5">
            <div className="flex justify-between items-center mb-1">
              <span className="text-text-secondary text-sm">Subtotal</span>
              <span className="text-white font-700 text-lg">{formatPrice(total)}</span>
            </div>
            {shipping === 0 && (
              <p className="text-secondary text-xs mb-4">✦ Free shipping included</p>
            )}
            <Link
              href="/cart"
              onClick={closeCart}
              className="btn-primary w-full text-base py-4 mt-2 block"
            >
              Checkout — {formatPrice(total + shipping)}
            </Link>
            <button onClick={closeCart} className="w-full text-center text-text-secondary text-sm mt-3 hover:text-white transition-colors">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
