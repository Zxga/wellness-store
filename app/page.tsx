import { Suspense } from 'react';
import HeroSection from '@/components/home/HeroSection';
import WhyUs from '@/components/home/WhyUs';
import FeaturedSpotlight from '@/components/home/FeaturedSpotlight';
import CollectionGrid from '@/components/home/CollectionGrid';
import Testimonials from '@/components/home/Testimonials';
import AsSeenIn from '@/components/home/AsSeenIn';

function GridSkeleton() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-10 w-56 bg-white/5 rounded mb-10 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card overflow-hidden animate-pulse">
              <div className="aspect-square bg-white/5" />
              <div className="p-5 space-y-3">
                <div className="h-3 bg-white/5 rounded w-1/3" />
                <div className="h-4 bg-white/5 rounded w-2/3" />
                <div className="h-8 bg-white/5 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyUs />
      <Suspense fallback={<GridSkeleton />}>
        <FeaturedSpotlight />
      </Suspense>
      <Suspense fallback={<GridSkeleton />}>
        <CollectionGrid />
      </Suspense>
      <Testimonials />
      <AsSeenIn />
    </>
  );
}
