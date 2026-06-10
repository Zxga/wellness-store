'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ShoppingCart, Check } from 'lucide-react';
import { Product, Review } from '@/types';
import { useCartStore } from '@/store/cart';
import { formatPrice, getDiscountPercent, getOrCreateSessionId } from '@/lib/utils';
import StarRating from '@/components/ui/StarRating';
import CountdownTimer from './CountdownTimer';
import ReviewsSection from './ReviewsSection';
import ProductCard from '@/components/ui/ProductCard';

interface Props {
  product: Product;
  reviews: Review[];
  relatedProducts: Product[];
}

export default function ProductVariantA({ product, reviews, relatedProducts }: Props) {
  const { addItem, openCart } = useCartStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const discount = getDiscountPercent(product.price, product.compare_price);

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
    setTimeout(() => setAdded(false), 2000);
  }

  const images = product.images?.length ? product.images : [
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <div className="relative aspect-square rounded-card overflow-hidden bg-gray-50 mb-3">
            <Image
              src={images[selectedImage] || images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            {discount > 0 && (
              <span className="absolute top-4 left-4 badge-sale text-sm px-3 py-1">-{discount}% OFF</span>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-16 h-16 rounded-btn overflow-hidden border-2 transition-colors ${selectedImage === i ? 'border-primary' : 'border-gray-200'}`}
                >
                  <Image src={img} alt="" fill sizes="64px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <span className="badge-green text-xs mb-3 inline-block">{product.category}</span>
          <h1 className="font-display font-800 text-3xl text-text-primary mb-3">{product.name}</h1>
          <StarRating rating={product.rating} size={18} showCount count={product.review_count} className="mb-4" />
          <CountdownTimer />

          <div className="flex items-baseline gap-3 my-5">
            <span className="font-display font-800 text-4xl text-text-primary">{formatPrice(product.price)}</span>
            <span className="text-text-secondary text-xl line-through">{formatPrice(product.compare_price)}</span>
            <span className="badge-sale">Save {formatPrice(product.compare_price - product.price)}</span>
          </div>

          <p className="text-text-secondary leading-relaxed mb-6">{product.description}</p>

          <div className="flex items-center gap-3 mb-4">
            <label className="text-sm font-medium text-text-secondary">Qty:</label>
            <div className="flex items-center border border-gray-200 rounded-btn overflow-hidden">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-gray-50 text-lg">−</button>
              <span className="px-5 py-2 font-semibold border-x border-gray-200">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-gray-50 text-lg">+</button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className={`w-full flex items-center justify-center gap-2 font-display font-700 text-lg py-4 rounded-btn transition-all ${added ? 'bg-green-600 text-white' : 'bg-primary hover:bg-primary-dark text-white'}`}
          >
            {added ? <><Check size={20} /> Added to Cart!</> : <><ShoppingCart size={20} /> Add to Cart</>}
          </button>

          <div className="grid grid-cols-3 gap-3 mt-5">
            {['🔒 Secure Checkout', '↩ Free Returns', '🚚 Fast Delivery'].map((b) => (
              <div key={b} className="text-center text-xs text-text-secondary border border-gray-100 rounded-btn p-2">
                {b}
              </div>
            ))}
          </div>
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
