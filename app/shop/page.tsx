import { Suspense } from 'react';
import ShopClient from './ShopClient';

export const metadata = {
  title: 'Shop All Wellness Products',
  description: 'Browse our full collection of premium wellness gadgets. Filter by category, price, and more.',
};

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="font-display font-800 text-3xl sm:text-4xl text-text-primary mb-2">All Products</h1>
          <p className="text-text-secondary">Premium wellness devices for your best life</p>
        </div>
      </div>
      <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-20 text-center text-text-secondary">Loading products...</div>}>
        <ShopClient />
      </Suspense>
    </div>
  );
}
