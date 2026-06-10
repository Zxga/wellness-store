'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/lib/utils';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const total = subtotal();

  // Upsell: pick first item not in cart
  const UPSELL_PRODUCT_SLUG = 'icepulse-facial-roller-set';
  const hasUpsell = items.some((i) => i.product.slug === UPSELL_PRODUCT_SLUG);
  const upsellItem = !hasUpsell && items.length > 0 ? {
    name: 'IcePulse Facial Roller Set',
    price: 24.99,
    slug: UPSELL_PRODUCT_SLUG,
  } : null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-white shadow-2xl transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="font-display font-700 text-lg text-text-primary flex items-center gap-2">
            <ShoppingBag size={20} className="text-primary" />
            Your Cart ({items.length})
          </h2>
          <button onClick={closeCart} className="p-2 text-text-secondary hover:text-text-primary">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <ShoppingBag size={48} className="text-gray-200" />
              <p className="text-text-secondary font-medium">Your cart is empty</p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="btn-primary text-sm"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(({ product, quantity }) => {
                const image = product.images?.[0] || `https://picsum.photos/seed/${product.slug}/200/200`;
                return (
                  <div key={product.id} className="flex gap-3 py-3 border-b border-gray-50">
                    <div className="relative w-20 h-20 rounded-card overflow-hidden bg-gray-50 shrink-0">
                      <Image src={image} alt={product.name} fill sizes="80px" className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-text-primary text-sm leading-tight line-clamp-2 mb-1">{product.name}</p>
                      <p className="text-primary font-bold text-sm">{formatPrice(product.price)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                        <button
                          onClick={() => removeItem(product.id)}
                          className="ml-auto text-gray-300 hover:text-danger transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Upsell */}
              {upsellItem && (
                <div className="bg-amber-50 border border-amber-200 rounded-card p-3">
                  <p className="text-xs font-semibold text-amber-700 mb-1">🎁 Add to your routine</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-text-primary">{upsellItem.name}</p>
                    <span className="text-sm font-bold text-primary">{formatPrice(upsellItem.price)}</span>
                  </div>
                  <Link
                    href={`/products/${upsellItem.slug}`}
                    onClick={closeCart}
                    className="text-xs text-amber-700 underline mt-1 block"
                  >
                    View product →
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-5">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium text-text-secondary">Subtotal</span>
              <span className="font-display font-700 text-xl text-text-primary">{formatPrice(total)}</span>
            </div>
            <Link
              href="/cart"
              onClick={closeCart}
              className="block w-full text-center btn-primary text-base py-4 rounded-btn"
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={closeCart}
              className="block w-full text-center text-text-secondary text-sm mt-3 hover:text-primary transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
