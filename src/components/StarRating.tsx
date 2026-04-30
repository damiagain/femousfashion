import React from 'react';
import { Star } from 'lucide-react';
interface StarRatingProps {
  rating: number;
  max?: number;
  size?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}
export function StarRating({
  rating,
  max = 5,
  size = 16,
  interactive = false,
  onChange
}: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({
        length: max
      }).map((_, i) => {
        const starValue = i + 1;
        const isFilled = starValue <= rating;
        return (
          <button
            key={i}
            type={interactive ? 'button' : 'button'}
            disabled={!interactive}
            onClick={() => interactive && onChange?.(starValue)}
            className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}
            aria-label={`Rate ${starValue} stars`}>
            
            <Star
              size={size}
              className={`${isFilled ? 'fill-[#D4A373] text-[#D4A373]' : 'fill-transparent text-gray-300'}`} />
            
          </button>);

      })}
    </div>);

}