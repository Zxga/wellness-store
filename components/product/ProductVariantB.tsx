'use client';
import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Check, Users, Package, ChevronDown, ChevronUp, ShieldCheck, RotateCcw, Truck, Zap } from 'lucide-react';
import { Product, Review } from '@/types';
import { useCartStore } from '@/store/cart';
import { formatPrice, getDiscountPercent, getProductBenefits, getOrCreateSessionId } from '@/lib/utils';
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
  const benefits = getProductBenefits(product.slug);

  const viewerCount = useMemo(() => 12 + (product.id.charCodeAt(0) % 36), [product.id]);
  const stockCount = useMemo(() => 3 + (product.id.charCodeAt(0) % 6), [product.id]);

  const image = product.images?.[0] || '';

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
    setTimeout(() => setAdded(false), 1800);
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Full-width hero image */}
      <div className="relative w-full h-72 sm:h-[480px] rounded-card overflow-hidden mb-10 border border-white/10"
        style={{ boxShadow: '0 0 80px rgba(194,24,91,0.35)' }}>
        {image && <Image src={image} alt={product.name} fill sizes="100vw" className="object-cover" priority />}
        <div className="absolute inset-0 bg-gradient-to-t from-[#120308]/80 via-transparent to-transparent" />
        {discount > 0 && (
          <span className="absolute top-5 left-5 badge-sale text-sm px-4 py-1.5">-{discount}% TODAY ONLY</span>
        )}
        <div className="absolute inset-0 glow-radial opacity-60 pointer-events-none" />
      </div>

      <div className="grid lg:grid-cols-2 gap-14">
        {/* Right — highlights (first on mobile) */}
        <div className="order-2 lg:order-1">
          <h2 className="font-display font-700 text-xl mb-5">Why It Works</h2>
          <ul className="space-y-3">
            {product.description.split('. ').filter(Boolean).map((line, i) => (
              <li key={i} className="flex items-start gap-3 text-text-secondary text-sm">
                <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={11} className="text-secondary" />
                </span>
                {line.endsWith('.') ? line : `${line}.`}
              </li>
            ))}
          </ul>

          {/* Benefit badges */}
          <div className="flex flex-wrap gap-2 mt-6">
            {benefits.map((b) => (
              <span key={b} className="badge-rose text-xs">{b}</span>
            ))}
          </div>
        </div>

        {/* Left — purchase block */}
        <div className="order-1 lg:order-2">
          <p className="text-[11px] uppercase tracking-[0.25em] text-secondary mb-2">{product.category}</p>
          <h1 className="font-display font-800 text-3xl sm:text-4xl mb-3 leading-tight">{product.name}</h1>
          <StarRating rating={product.rating} size={16} showCount count={product.review_count} className="mb-5" />

          {/* Social proof */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-pill"
              style={{ background: 'rgba(240,98,146,0.1)', border: '1px solid rgba(240,98,146,0.2)', color: '#F8BBD0' }}>
              <Users size={13} />
              {viewerCount} viewing now
            </div>
            <div className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-pill"
              style={{ background: 'rgba(255,64,129,0.1)', border: '1px solid rgba(255,64,129,0.2)', color: '#FF7BA3' }}>
              <Package size={13} />
              Only {stockCount} left
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="font-display font-800 text-4xl text-white">{formatPrice(product.price)}</span>
            {product.compare_price > product.price && (
              <span className="text-text-tertiary text-xl line-through">{formatPrice(product.compare_price)}</span>
            )}
            <span className="badge-sale">You save {formatPrice(product.compare_price - product.price)}</span>
          </div>

          {/* Qty */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-sm text-text-secondary">Qty:</span>
            <div className="flex items-center border border-white/15 rounded-btn overflow-hidden">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-white/10 text-lg">−</button>
              <span className="px-5 py-2 font-semibold border-x border-white/15">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-white/10 text-lg">+</button>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3 mb-5">
            <button
              onClick={handleAddToCart}
              className="w-full py-4 font-display font-700 text-lg rounded-btn transition-all flex items-center justify-center gap-2"
              style={
                added
                  ? { background: '#0E9F6E', boxShadow: '0 0 24px rgba(14,159,110,0.4)' }
                  : { background: 'linear-gradient(135deg,#C2185B,#A01548)', boxShadow: '0 0 32px rgba(194,24,91,0.5)' }
              }
            >
              {added ? <><Check size={20} /> Added!</> : <>Add to Cart — {formatPrice(product.price * quantity)}</>}
            </button>
            <button
              onClick={handleBuyNow}
              className="w-full py-4 font-display font-700 text-lg rounded-btn transition-all flex items-center justify-center gap-2 btn-secondary"
            >
              <Zap size={18} /> Buy Now
            </button>
          </div>

          {/* Trust */}
          <div className="grid grid-cols-3 gap-2 mb-5">
            {[
              { icon: ShieldCheck, label: 'Secure Checkout' },
              { icon: RotateCcw, label: '30-Day Returns' },
              { icon: Truck, label: 'Free Shipping' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 text-center border border-white/10 rounded-btn p-3">
                <Icon size={16} className="text-secondary" />
                <span className="text-[11px] text-text-secondary">{label}</span>
              </div>
            ))}
          </div>

          {/* Shipping accordion */}
          <div className="rounded-card overflow-hidden border border-white/10">
            <button
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-white/5 transition-colors"
              onClick={() => setShippingOpen(!shippingOpen)}
            >
              <span>Shipping & Delivery</span>
              {shippingOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>
            {shippingOpen && (
              <div className="px-4 pb-4 text-sm text-text-secondary space-y-2 border-t border-white/8">
                <p>🚢 <strong className="text-white">Free Standard</strong> — 7–14 business days</p>
                <p>✈️ <strong className="text-white">Express ($9.99)</strong> — 3–5 business days</p>
                <p>📦 Ships in 1–2 days from US / EU warehouse</p>
                <p>🌍 Delivered to 30+ countries</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related */}
      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <p className="text-[11px] uppercase tracking-[0.25em] text-secondary mb-3">Complete Your Ritual</p>
          <h2 className="font-display font-700 text-2xl mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}

      <ReviewsSection reviews={reviews} rating={product.rating} reviewCount={product.review_count} />
    </div>
  );
}
