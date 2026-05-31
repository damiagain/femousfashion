import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Filter, X, ChevronRight, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useProductsStore } from "../data/productStore";
import { categories } from "../data/categories";
import { ProductCard } from "../components/ProductCard";
import { SkeletonCard } from "../components/SkeletonCard";
export function ShopPage() {
  const { products, isLoading } = useProductsStore();
  const { categorySlug } = useParams<{
    categorySlug?: string;
  }>();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filters state (strictly derived from URL)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categorySlug && categorySlug !== 'all' ? [categorySlug] : [],
  );

  const [sortOption, setSortOption] = useState("newest");
  // Update selected category when URL changes
  useEffect(() => {
    if (categorySlug) {
      setSelectedCategories([categorySlug]);
    } else {
      setSelectedCategories([]);
    }
  }, [categorySlug]);
  const currentCategory = categorySlug
    ? categories.find((c) => c.slug === categorySlug)
    : null;
  const handleCategoryToggle = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug],
    );
  };
  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (selectedCategories.length > 0) {
      // Normalize for safety (case/whitespace mismatches)
      result = result.filter((p) => {
        const cat = (p.category || "").trim().toLowerCase();
        return selectedCategories.some((s) => s.trim().toLowerCase() === cat);
      });
    }
    switch (sortOption) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
      default:
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
    }
    return result;
  }, [products, selectedCategories, sortOption]);
  const FilterContent = () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-4 font-fraunces text-lg text-[#2B3A55]">
          Categories
        </h3>
        <div className="flex flex-col gap-3">
          {categories.map((c) => (
            <label
              key={c.id}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(c.slug)}
                onChange={() => handleCategoryToggle(c.slug)}
                className="h-5 w-5 rounded border-gray-300 text-[#D4A373] focus:ring-[#D4A373]"
              />

              <span className="font-inter text-sm text-gray-700">{c.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-fraunces text-lg text-[#2B3A55]">Sort By</h3>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white p-3 font-inter text-sm outline-none focus:border-[#D4A373] focus:ring-1 focus:ring-[#D4A373]"
        >
          <option value="newest">Newest Arrivals</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#FDFBF7] pt-16 md:pt-20">
      {/* Category Hero */}
      <div className="bg-[#F5F2EB] py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center md:px-8">
          <h1 className="font-fraunces text-[28px] text-[#2B3A55] md:text-[40px]">
            {currentCategory ? currentCategory.name : "All Collection"}
          </h1>
          <div className="mx-auto mt-4 h-1 w-16 bg-[#D4A373]" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
        {/* Breadcrumbs */}
        <div className="mb-8 hidden items-center gap-2 font-inter text-sm text-gray-500 md:flex">
          <Link to="/" className="hover:text-[#D4A373]">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/shop" className="hover:text-[#D4A373]">
            Shop
          </Link>
          {currentCategory && (
            <>
              <ChevronRight className="h-4 w-4" />
              <span className="text-[#2B3A55]">{currentCategory.name}</span>
            </>
          )}
        </div>

        <div className="flex flex-col gap-8 md:flex-row md:items-start">
          {/* Mobile Filter Button */}
          <div className="flex items-center justify-between md:hidden">
            <span className="font-inter text-sm text-gray-500">
              {filteredProducts.length} Products
            </span>
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 font-inter text-sm font-medium text-[#2B3A55] shadow-sm border border-gray-200"
            >
              <Filter className="h-4 w-4" />
              Filter & Sort
            </button>
          </div>

          {/* Desktop Sidebar */}
          <aside className="hidden w-64 shrink-0 md:block">
            <FilterContent />
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-6 hidden items-center justify-between md:flex">
              <span className="font-inter text-sm text-gray-500">
                Showing {filteredProducts.length} results
              </span>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
                {Array.from({
                  length: 8,
                }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mb-4 rounded-full bg-gray-100 p-6">
                  <Search className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="mb-2 font-fraunces text-xl text-[#2B3A55]">
                  No products found
                </h3>
                <p className="mb-6 font-inter text-gray-500">
                  We couldn't find any products matching your current filters.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setSortOption("newest");
                  }}
                  className="rounded-lg bg-[#2B3A55] px-6 py-3 font-inter font-semibold text-white transition-transform hover:scale-105 active:scale-95"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Bottom Sheet */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileFilterOpen(false)}
            />

            <motion.div
              initial={{
                y: "100%",
              }}
              animate={{
                y: 0,
              }}
              exit={{
                y: "100%",
              }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
              }}
              className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-[#FDFBF7] p-6 shadow-xl md:hidden"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-fraunces text-xl text-[#2B3A55]">
                  Filter & Sort
                </h2>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-2 text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <FilterContent />
              <div className="mt-8">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full rounded-lg bg-[#2B3A55] py-4 font-inter font-semibold text-white active:scale-95 transition-transform"
                >
                  Show {filteredProducts.length} Results
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
