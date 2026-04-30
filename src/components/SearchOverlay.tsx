import React, { useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}
export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);
  return (
    <AnimatePresence>
      {isOpen &&
      <motion.div
        initial={{
          opacity: 0,
          y: -20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        exit={{
          opacity: 0,
          y: -20
        }}
        className="fixed inset-0 z-50 flex flex-col bg-[#FDFBF7]">
        
          <div className="flex items-center gap-4 border-b border-gray-200 p-4">
            <Search className="h-6 w-6 text-gray-400" />
            <input
            ref={inputRef}
            type="text"
            placeholder="Search products..."
            className="flex-1 bg-transparent font-inter text-lg outline-none placeholder:text-gray-400" />
          
            <button onClick={onClose} className="p-2 text-[#2B3A55]">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 p-4">
            <p className="font-inter text-sm text-gray-500">
              Start typing to search...
            </p>
            {/* Search results would go here */}
          </div>
        </motion.div>
      }
    </AnimatePresence>);

}