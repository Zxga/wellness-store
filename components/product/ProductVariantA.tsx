'use client';
import { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { Check, ShieldCheck, RotateCcw, Truck } from 'lucide-react';
import { Product, Review } from '@/types';
import { useCartStore } from '@/store/cart';
import { formatPrice, getDiscountPercent, getProductBenefits, getOrCreateSessionId } from '@/lib/utils';
import StarRating from '@/components/ui/StarRating';
import CountdownTimer from './CountdownTimer';
import ReviewsSection from './ReviewsSection';
import ProductCard from '@/components/ui/ProductCard';

interface Props {
  product: Product;
  reviews: Review[];
  relatedProducts: Product[];
}

const OPTIONS_SUPPLY = [
  { id: '1x',  label: '1 Mask',              desc: 'Perfect starter',  price: 89.99  },
  { id: '2x',  label: 'Mask + Serum Bundle', desc: 'Most popular',     price: 119.99, badge: 'SAVE 15%' },
];
const OPTIONS_TYPE = [
  { id: 'one-time', label: 'One-Time Purchase', price: null },
  { id: '2pack',    label: '2-Pack Gift Set',   price: 159.99, badge: 'GIFT READY' },
];
const BUNDLES = [
  { id: 'starter', label: 'Glow Starter', sub: 'LUX-01 + FROST-01',              price: 109.99, badge: 'SAVE $15'   },
  { id: 'ritual',  label: 'Full Ritual',  sub: 'LUX-01 + FROST-01 + PULSE-01',   price: 149.99, badge: 'BEST VALUE' },
];

export default function ProductVariantA({ product, reviews, relatedProducts }: Props) {
  const { addItem, openCart } = useCartStore();
  const [selectedImg, setSelectedImg] = useState(0);
  const [supply, setSupply] = useState('1x');
  const [optType, setOptType] = useState('one-time');
  const [bundle, setBundle] = useState('');
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [priceKey, setPriceKey] = useState(0);
  const discount = getDiscountPercent(product.price, product.compare_price);
  const benefits = getProductBenefits(product.slug);
  const images = product.images?.length ? product.images : [];

  // Derive price from selected options — bundle > 2-pack > supply > default
  const displayPrice = useMemo(() => {
    if (bundle) return BUNDLES.find((b) => b.id === bundle)!.price;
    if (optType === '2pack') return OPTIONS_TYPE[1].price!;
    if (supply === '2x') return OPTIONS_SUPPLY[1].price;
    return OPTIONS_SUPPLY[0].price;
  }, [bundle, optType, supply]);

  // Trigger pop animation whenever price changes
  const prevPrice = useRef(displayPrice);
  useEffect(() => {
    if (displayPrice !== prevPrice.current) {
      prevPrice.current = displayPrice;
      setPriceKey((k) => k + 1);
    }
  }, [displayPrice]);

  const savingsLabel = useMemo(() => {
    if (bundle === 'ritual') return 'Best Value';
    if (bundle === 'starter') return 'Save $15';
    if (optType === '2pack') return 'Gift Ready';
    if (supply === '2x') return 'Save 15%';
    return null;
  }, [bundle, optType, supply]);

  useEffect(() => {
    const sessionId = getOrCreateSessionId();
    fetch('/api/ab-track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ variant: 'A', event: 'view', productId: product.id, sessionId }),
    });
  }, [product.id]);

  function handleAddToCart() {
    addItem(product, quantity);
    openCart();
    const sessionId = getOrCreateSessionId();
    fetch('/api/ab-track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ variant: 'A', event: 'add_to_cart', productId: product.id, sessionId }),
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid lg:grid-cols-2 gap-14">
        {/* Images */}
        <div className="sticky top-24 self-start">
          <div className="relative aspect-square rounded-card overflow-hidden border border-white/10 mb-3"
            style={{ background: '#1F0810', boxShadow: '0 0 80px rgba(194,24,91,0.3)' }}>
            {/* glow */}
            <div className="absolute inset-0 glow-radial animate-glow-pulse" />
            {images[selectedImg] && (
              <Image
                src={images[selectedImg]}
                alt={product.name}
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover relative z-10"
                priority
              />
            )}
            {discount > 0 && (
              <span className="absolute top-5 left-5 z-20 badge-sale text-sm px-3 py-1">-{discount}%</span>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(i)}
                  className={`relative w-16 h-16 rounded-card overflow-hidden border-2 transition-all ${
                    selectedImg === i
                      ? 'border-secondary shadow-[0_0_16px_rgba(240,98,146,0.4)]'
                      : 'border-white/15 hover:border-white/30'
                  }`}
                >
                  <Image src={img} alt="" fill sizes="64px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-secondary mb-2">{product.category}</p>
          <h1 className="font-display font-800 text-3xl sm:text-4xl mb-3 leading-tight">{product.name}</h1>
          <StarRating rating={product.rating} size={16} showCount count={product.review_count} className="mb-4" />
          <CountdownTimer />

          <div className="flex items-baseline gap-3 my-5">
            <span
              key={priceKey}
              className="font-display font-800 text-4xl text-white animate-price-pop"
            >
              {formatPrice(displayPrice)}
            </span>
            {displayPrice < product.compare_price && (
              <span className="text-text-tertiary text-xl line-through">{formatPrice(product.compare_price)}</span>
            )}
            {savingsLabel && (
              <span className="badge-sale">{savingsLabel}</span>
            )}
          </div>

          <p className="text-text-secondary leading-relaxed mb-6 text-sm">{product.description}</p>

          {/* Benefits */}
          <div className="flex flex-wrap gap-2 mb-7">
            {benefits.map((b) => (
              <span key={b} className="badge-rose text-xs flex items-center gap-1">
                <Check size={10} /> {b}
              </span>
            ))}
          </div>

          {/* Step 1 */}
          <div className="mb-5">
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-3">1. Choose Your Supply</p>
            <div className="grid grid-cols-2 gap-2">
              {OPTIONS_SUPPLY.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => { setSupply(opt.id); setBundle(''); }}
                  className={`relative text-left p-4 rounded-card border transition-all ${
                    supply === opt.id && !bundle
                      ? 'border-secondary shadow-[0_0_20px_rgba(194,24,91,0.35)]'
                      : 'border-white/12 hover:border-white/25'
                  }`}
                  style={supply === opt.id && !bundle ? { background: 'rgba(194,24,91,0.1)' } : { background: 'rgba(255,255,255,0.03)' }}
                >
                  {opt.badge && (
                    <span className="absolute top-2 right-2 badge-sale text-[10px] px-2">{opt.badge}</span>
                  )}
                  <p className="font-semibold text-white text-sm">{opt.label}</p>
                  <p className="text-text-tertiary text-xs mt-0.5">{opt.desc}</p>
                  <p className="text-secondary font-semibold text-sm mt-1">{formatPrice(opt.price)}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2 */}
          <div className="mb-5">
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-3">2. Choose Your Option</p>
            <div className="grid grid-cols-2 gap-2">
              {OPTIONS_TYPE.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => { setOptType(opt.id); setBundle(''); }}
                  className={`relative text-left p-4 rounded-card border transition-all ${
                    optType === opt.id && !bundle
                      ? 'border-secondary shadow-[0_0_20px_rgba(194,24,91,0.35)]'
                      : 'border-white/12 hover:border-white/25'
                  }`}
                  style={optType === opt.id && !bundle ? { background: 'rgba(194,24,91,0.1)' } : { background: 'rgba(255,255,255,0.03)' }}
                >
                  {opt.badge && (
                    <span className="absolute top-2 right-2 badge-rose text-[10px] px-2">{opt.badge}</span>
                  )}
                  <p className="font-semibold text-white text-sm">{opt.label}</p>
                  {opt.price && (
                    <p className="text-secondary font-semibold text-sm mt-1">{formatPrice(opt.price)}</p>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3 */}
          <div className="mb-7">
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-3">3. Save More With Bundles</p>
            <div className="grid grid-cols-2 gap-2">
              {BUNDLES.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setBundle(bundle === b.id ? '' : b.id)}
                  className={`relative text-left p-4 rounded-card border transition-all ${
                    bundle === b.id
                      ? 'border-secondary shadow-[0_0_20px_rgba(194,24,91,0.35)]'
                      : 'border-white/12 hover:border-white/25'
                  }`}
                  style={bundle === b.id ? { background: 'rgba(194,24,91,0.1)' } : { background: 'rgba(255,255,255,0.03)' }}
                >
                  <span className="absolute top-2 right-2 badge-sale text-[10px] px-2">{b.badge}</span>
                  <p className="font-semibold text-white text-sm">{b.label}</p>
                  <p className="text-text-tertiary text-xs mt-0.5">{b.sub}</p>
                  <p className="text-secondary font-semibold text-sm mt-1">{formatPrice(b.price)}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Qty + CTA */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center border border-white/15 rounded-btn overflow-hidden">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2.5 hover:bg-white/10 transition-colors text-lg">−</button>
              <span className="px-5 py-2.5 font-semibold border-x border-white/15">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2.5 hover:bg-white/10 transition-colors text-lg">+</button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full py-4 font-display font-700 text-lg rounded-btn transition-all flex items-center justify-center gap-2"
            style={
              added
                ? { background: '#0E9F6E', boxShadow: '0 0 24px rgba(14,159,110,0.4)' }
                : { background: 'linear-gradient(135deg,#C2185B,#A01548)', boxShadow: '0 0 32px rgba(194,24,91,0.5)' }
            }
          >
            {added ? (
              <><Check size={20} /> Added to Cart!</>
            ) : (
              <>Add to Cart — {formatPrice(displayPrice * quantity)}</>
            )}
          </button>

          {/* Trust */}
          <div className="grid grid-cols-3 gap-2 mt-4">
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
        </div>
      </div>

      {/* Related */}
      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <p className="text-[11px] uppercase tracking-[0.25em] text-secondary mb-3">You May Also Like</p>
          <h2 className="font-display font-700 text-2xl mb-6">Complete Your Ritual</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}

      <ReviewsSection reviews={reviews} rating={product.rating} reviewCount={product.review_count} />
    </div>
  );
}
