import { Suspense } from 'react';
import ShopClient from './ShopClient';

export const metadata = {
  title: 'Shop All Products',
  description: 'Browse the full RAYLUNE collection. Red light therapy, recovery tools, and sleep rituals.',
};

export default function ShopPage() {
  return (
    <div className="min-h-screen">
      <div className="border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 glow-radial opacity-30 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-secondary text-xs uppercase tracking-[0.25em] mb-2">RAYLUNE</p>
          <h1 className="font-display font-800 text-3xl sm:text-4xl mb-2">The Collection</h1>
          <p className="text-text-secondary">Light. Recovery. Glow. — every ritual in one place.</p>
        </div>
      </div>
      <Suspense fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center text-text-secondary">Loading...</div>
      }>
        <ShopClient />
      </Suspense>
    </div>
  );
}
