'use client';
import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { ShoppingCart, Check, Users, Package, ChevronDown, ChevronUp, ShieldCheck, RotateCcw, Zap } from 'lucide-react';
import { Product, Review } from '@/types';
import { useCartStore } from '@/store/cart';
import { formatPrice, getDiscountPercent, getOrCreateSessionId } from '@/lib/utils';
import StarRating from '@/components/ui/StarRating';
import ReviewsSection from './ReviewsSection';
import ProductCard from '@/components/ui/ProductCard';

interface Props {
  product: Product;
  reviews: Review[];
  relatedProducts: Product[];
}

export default function ProductVariantB({ product, reviews, relatedProducts }: Props) {
  const { addItem, openCart } = useCartStore();
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [shippingOpen, setShippingOpen] = useState(false);
  const discount = getDiscountPercent(product.price, product.compare_price);

  // Simulated social proof numbers (stable per product)
  const viewerCount = useMemo(() => 12 + (product.id.charCodeAt(0) % 36), [product.id]);
  const stockCount = useMemo(() => 3 + (product.id.charCodeAt(0) % 6), [product.id]);

  useEffect(() => {
    const sessionId = getOrCreateSessionId();
    fetch('/api/ab-track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ variant: 'B', event: 'view', productId: product.id, sessionId }),
    });
  }, [product.id]);

  function handleAddToCart() {
    addItem(product, quantity);
    openCart();
    const sessionId = getOrCreateSessionId();
    fetch('/api/ab-track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ variant: 'B', event: 'add_to_cart', productId: product.id, sessionId }),
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  async function handleBuyNow() {
    addItem(product, quantity);
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ product, quantity }] }),
    });
    const { url } = await res.json();
    if (url) window.location.href = url;
  }

  const image = product.images?.[0] || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Full-width image */}
      <div className="relative w-full h-80 sm:h-[480px] rounded-card overflow-hidden mb-10">
        <Image src={image} alt={product.name} fill sizes="100vw" className="object-cover" priority />
        {discount > 0 && (
          <span className="absolute top-5 left-5 badge-sale text-sm px-4 py-1.5">-{discount}% TODAY ONLY</span>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="lg:order-2">
          <span className="badge-green text-xs mb-3 inline-block">{product.category}</span>
          <h1 className="font-display font-800 text-3xl text-text-primary mb-3">{product.name}</h1>
          <StarRating rating={product.rating} size={18} showCount count={product.review_count} className="mb-4" />

          {/* Social proof */}
          <div className="flex flex-wrap gap-3 mb-5">
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium px-3 py-1.5 rounded-pill">
              <Users size={14} />
              {viewerCount} people viewing now
            </div>
            <div className="flex items-center gap-1.5 bg-red-50 border border-red-200 text-danger text-sm font-medium px-3 py-1.5 rounded-pill">
              <Package size={14} />
              Only {stockCount} left in stock!
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-5">
            <span className="font-display font-800 text-4xl text-text-primary">{formatPrice(product.price)}</span>
            <span className="text-text-secondary text-xl line-through">{formatPrice(product.compare_price)}</span>
            <span className="bg-secondary text-white font-bold text-sm px-3 py-1 rounded-pill">
              You save {formatPrice(product.compare_price - product.price)}
            </span>
          </div>

          <p className="text-text-secondary leading-relaxed mb-6">{product.description}</p>

          {/* Quantity */}
          <div className="flex items-center gap-3 mb-4">
            <label className="text-sm font-medium text-text-secondary">Quantity:</label>
            <div className="flex items-center border border-gray-200 rounded-btn overflow-hidden">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-gray-50 text-lg">−</button>
              <span className="px-5 py-2 font-semibold border-x border-gray-200">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-gray-50 text-lg">+</button>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleAddToCart}
              className={`w-full flex items-center justify-center gap-2 font-display font-700 text-lg py-4 rounded-btn transition-all ${added ? 'bg-green-600 text-white' : 'bg-primary hover:bg-primary-dark text-white'}`}
            >
              {added ? <><Check size={20} /> Added!</> : <><ShoppingCart size={20} /> Add to Cart</>}
            </button>
            <button
              onClick={handleBuyNow}
              className="w-full flex items-center justify-center gap-2 font-display font-700 text-lg py-4 rounded-btn bg-secondary hover:opacity-90 text-white transition-opacity"
            >
              ⚡ Buy Now
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 mt-5">
            {[
              { icon: ShieldCheck, label: 'Secure Checkout' },
              { icon: RotateCcw, label: 'Free Returns' },
              { icon: Zap, label: 'Fast Delivery' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 text-center border border-gray-100 rounded-btn p-3">
                <Icon size={18} className="text-primary" />
                <span className="text-xs text-text-secondary font-medium">{label}</span>
              </div>
            ))}
          </div>

          {/* Shipping accordion */}
          <div className="mt-5 border border-gray-200 rounded-card overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-text-primary hover:bg-gray-50 transition-colors"
              onClick={() => setShippingOpen(!shippingOpen)}
            >
              Shipping & Delivery Info
              {shippingOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {shippingOpen && (
              <div className="px-4 pb-4 text-sm text-text-secondary space-y-2 border-t border-gray-100">
                <p>🚢 <strong>Free Standard Shipping</strong> — 7–14 business days</p>
                <p>✈️ <strong>Express Shipping ($9.99)</strong> — 3–5 business days</p>
                <p>📦 Ships from our US / EU warehouse within 1–2 days</p>
                <p>🌍 We deliver to 30+ countries worldwide</p>
              </div>
            )}
          </div>
        </div>

        <div className="lg:order-1">
          <h2 className="font-display font-700 text-xl text-text-primary mb-4">Product Highlights</h2>
          <ul className="space-y-3">
            {product.description.split('. ').filter(Boolean).map((line, i) => (
              <li key={i} className="flex items-start gap-2.5 text-text-secondary text-sm">
                <span className="text-primary font-bold mt-0.5">✓</span>
                {line.endsWith('.') ? line : line + '.'}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <h2 className="font-display font-700 text-2xl text-text-primary mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}

      <ReviewsSection reviews={reviews} rating={product.rating} reviewCount={product.review_count} />
    </div>
  );
}
