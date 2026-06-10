import { Suspense } from 'react';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import WhyUs from '@/components/home/WhyUs';
import Testimonials from '@/components/home/Testimonials';
import ProductCard from '@/components/ui/ProductCard';

function ProductSkeleton() {
  return (
    <div className="card overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-100" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-gray-100 rounded w-1/3" />
        <div className="h-4 bg-gray-100 rounded w-2/3" />
        <div className="h-3 bg-gray-100 rounded w-1/2" />
        <div className="h-8 bg-gray-100 rounded" />
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Suspense
        fallback={
          <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="h-10 bg-gray-100 rounded w-48 mb-10 animate-pulse" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => <ProductSkeleton key={i} />)}
              </div>
            </div>
          </section>
        }
      >
        <FeaturedProducts />
      </Suspense>
      <WhyUs />
      <Testimonials />
    </>
  );
}
