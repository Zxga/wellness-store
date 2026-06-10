'use client';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  size?: number;
  showCount?: boolean;
  count?: number;
  className?: string;
}

export default function StarRating({ rating, size = 16, showCount, count, className }: StarRatingProps) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={star <= Math.round(rating) ? 'star-filled' : 'star-empty'}
        />
      ))}
      {showCount && count !== undefined && (
        <span className="text-text-secondary text-sm ml-1">({count})</span>
      )}
    </div>
  );
}
