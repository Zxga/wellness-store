'use client';
import { Star } from 'lucide-react';
import { Review } from '@/types';
import StarRating from '@/components/ui/StarRating';

interface ReviewsSectionProps {
  reviews: Review[];
  rating: number;
  reviewCount: number;
}

export default function ReviewsSection({ reviews, rating, reviewCount }: ReviewsSectionProps) {
  const breakdown = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((r) => Math.round(r.rating) === stars).length,
    pct: reviews.length ? (reviews.filter((r) => Math.round(r.rating) === stars).length / reviews.length) * 100 : 0,
  }));

  return (
    <section className="mt-16">
      <h2 className="font-display font-700 text-2xl text-text-primary mb-8">Customer Reviews</h2>

      <div className="grid md:grid-cols-3 gap-8 mb-10">
        {/* Summary */}
        <div className="flex flex-col items-center justify-center p-6 bg-green-50 rounded-card text-center">
          <span className="font-display font-800 text-5xl text-primary">{rating.toFixed(1)}</span>
          <StarRating rating={rating} size={20} className="my-2" />
          <p className="text-text-secondary text-sm">{reviewCount} reviews</p>
        </div>

        {/* Breakdown */}
        <div className="md:col-span-2 space-y-2">
          {breakdown.map(({ stars, count, pct }) => (
            <div key={stars} className="flex items-center gap-3">
              <span className="text-sm text-text-secondary w-4">{stars}</span>
              <Star size={14} className="star-filled shrink-0" />
              <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-secondary rounded-full transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-xs text-text-secondary w-6 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review list */}
      <div className="space-y-5">
        {reviews.map((r) => (
          <div key={r.id} className="border-b border-gray-100 pb-5">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                  {r.author_name.charAt(0)}
                </div>
                <span className="font-semibold text-text-primary text-sm">{r.author_name}</span>
              </div>
              <span className="text-xs text-text-secondary">
                {new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <StarRating rating={r.rating} size={13} className="mb-2" />
            <p className="text-text-secondary text-sm leading-relaxed">{r.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
