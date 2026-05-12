import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { formatPrice, useCart } from '../data/cartStore';
import { StarRating } from './StarRating';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X } from 'lucide-react';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}
export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const isAdmin = sessionStorage.getItem('admin_auth') === 'true';

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.sizes && product.sizes.length > 0) {
      setIsSizeModalOpen(true);
    } else {
      addItem(product, '', 1);
      toast.success('Added to cart', {
        style: { background: '#D4A373', color: '#fff', border: 'none' },
      });
    }
  };

  const handleSelectSize = (size: string) => {
    addItem(product, size, 1);
    toast.success('Added to cart', {
      style: { background: '#D4A373', color: '#fff', border: 'none' },
    });
    setIsSizeModalOpen(false);
  };

  return (
    <div className="relative flex flex-col gap-3 group">
      <Link
        to={`/product/${product.id}`}
        className="flex flex-col gap-3 transition-transform duration-200 hover:-translate-y-1 block">
        
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
        <div className="flex flex-col gap-1 flex-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            {product.category.replace('-', ' ')}
          </span>
          <h3 className="font-fraunces text-lg text-[#2B3A55]">{product.name}</h3>
          <div className="flex items-center justify-between mt-auto">
            <span className="font-inter font-semibold text-[#2B3A55]">
              {formatPrice(product.price)}
              {product.pricingUnit ? ` / ${product.pricingUnit}` : ''}
            </span>
            <div className="flex items-center gap-1">
              <StarRating rating={product.rating} size={14} />
              <span className="text-xs text-gray-500">
                ({product.reviewCount})
              </span>
            </div>
          </div>
        </div>
      </Link>
      
      {!isAdmin && (
        <button 
          onClick={handleAddToCartClick}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-[#2B3A55] py-2 font-inter text-sm font-semibold text-[#2B3A55] transition-colors hover:bg-[#2B3A55] hover:text-white active:scale-95 md:hidden"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>
      )}

      <AnimatePresence>
        {isSizeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xs rounded-2xl bg-white p-6 shadow-xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-fraunces text-xl text-[#2B3A55]">Select Size</h3>
                <button onClick={() => setIsSizeModalOpen(false)} className="text-gray-400 hover:text-gray-600 rounded-full p-1 hover:bg-gray-100 transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSelectSize(size)}
                    className="flex h-10 items-center justify-center rounded-lg border border-gray-300 font-inter text-sm font-medium text-[#2B3A55] transition-colors hover:border-[#2B3A55] hover:bg-gray-50"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}