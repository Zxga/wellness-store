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
    pct: reviews.length
      ? (reviews.filter((r) => Math.round(r.rating) === stars).length / reviews.length) * 100
      : 0,
  }));

  return (
    <section className="mt-16 pt-12 border-t border-white/10">
      <h2 className="font-display font-700 text-2xl mb-8">Customer Reviews</h2>

      <div className="grid md:grid-cols-3 gap-8 mb-10">
        <div
          className="flex flex-col items-center justify-center p-6 rounded-card text-center"
          style={{ background: 'rgba(194,24,91,0.08)', border: '1px solid rgba(240,98,146,0.2)' }}
        >
          <span className="font-display font-800 text-6xl text-secondary">{rating.toFixed(1)}</span>
          <StarRating rating={rating} size={20} className="my-2" />
          <p className="text-text-secondary text-sm">{reviewCount.toLocaleString()} reviews</p>
        </div>

        <div className="md:col-span-2 space-y-2.5">
          {breakdown.map(({ stars, count, pct }) => (
            <div key={stars} className="flex items-center gap-3">
              <span className="text-sm text-text-secondary w-4">{stars}</span>
              <Star size={13} className="star-filled shrink-0" />
              <div className="flex-1 h-2 rounded-full bg-white/8 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #C2185B, #F06292)' }}
                />
              </div>
              <span className="text-xs text-text-secondary w-5 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        {reviews.map((r) => (
          <div key={r.id} className="pb-5 border-b border-white/8">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-accent text-xs font-bold flex items-center justify-center">
                  {r.author_name.charAt(0)}
                </div>
                <span className="font-semibold text-white text-sm">{r.author_name}</span>
              </div>
              <span className="text-xs text-text-tertiary">
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
