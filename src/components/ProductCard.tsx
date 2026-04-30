import React, { lazy } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { formatPrice } from '../data/cartStore';
import { StarRating } from './StarRating';
interface ProductCardProps {
  product: Product;
}
export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex flex-col gap-3 transition-transform duration-200 hover:-translate-y-1">
      
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-gray-100">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy" />
        
        {product.featured &&
        <div className="absolute left-3 top-3 rounded-full bg-[#D4A373] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
            Featured
          </div>
        }
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          {product.category.replace('-', ' ')}
        </span>
        <h3 className="font-fraunces text-lg text-[#2B3A55]">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="font-inter font-semibold text-[#2B3A55]">
            {formatPrice(product.price)}
          </span>
          <div className="flex items-center gap-1">
            <StarRating rating={product.rating} size={14} />
            <span className="text-xs text-gray-500">
              ({product.reviewCount})
            </span>
          </div>
        </div>
      </div>
    </Link>);

}