import React, { lazy } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { categories } from "../data/categories";
import { useProductsStore } from "../data/productStore";
import { testimonials } from "../data/testimonials";
import { ProductCard } from "../components/ProductCard";
import { StarRating } from "../components/StarRating";
import { useSettingsStore } from "../data/settingsStore";

export function HomePage() {
  const { products } = useProductsStore();
  const { settings } = useSettingsStore();
  const featuredProducts = products.filter((p) => p.featured).slice(0, 3);
  return (
    <main className="flex min-h-screen flex-col bg-[#FDFBF7] pb-20 md:pb-0">
      {/* Hero Section */}
      <section className="relative flex min-h-[100vh] w-full items-center justify-center md:min-h-[80vh]">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${settings.heroImage}')`,
          }}
        />

        <div className="relative z-20 flex flex-col items-center px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 rounded-full bg-[#D4A373] px-4 py-1.5 text-xs font-bold tracking-widest text-white md:text-sm"
          >
            FROM NIGERIA TO THE WORLD
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 font-fraunces text-[32px] leading-tight text-white md:text-[56px]"
          >
            Confidently Styled. <br className="hidden md:block" />
            Unapologetically You.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-10 max-w-lg font-inter text-base text-white md:text-lg font-semibold"
          >
            Premium Nigerian menswear blending African heritage with modern
            editorial calm.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex w-full flex-col gap-4 md:w-auto md:flex-row"
          >
            <Link
              to="/shop"
              className="flex w-full items-center justify-center rounded-lg bg-[#D4A373] px-8 py-4 font-inter font-semibold text-white transition-transform hover:scale-105 active:scale-95 md:w-auto"
            >
              Shop the Collection
            </Link>
            <Link
              to="/shop/native-wears"
              className="flex w-full items-center justify-center rounded-lg border-2 border-white px-8 py-4 font-inter font-semibold text-white transition-transform hover:scale-105 hover:bg-white hover:text-[#2B3A55] active:scale-95 md:w-auto"
            >
              Explore Native
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="mb-10 flex flex-col items-center text-center">
          <h2 className="font-fraunces text-3xl text-[#2B3A55] md:text-4xl">
            Shop by Category
          </h2>
          <div className="mt-4 h-1 w-16 bg-[#D4A373]" />
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/shop/${category.slug}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-gray-100 transition-transform duration-200 hover:-translate-y-1 active:-translate-y-1"
            >
              <img
                src={settings.categoryImages[category.slug] || category.image}
                alt={category.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 rounded bg-[#D4A373]/90 py-2 text-center backdrop-blur-sm">
                <span className="font-inter text-sm font-semibold text-white">
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Signature Pieces */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-10 flex flex-col items-center text-center">
            <h2 className="font-fraunces text-3xl text-[#2B3A55] md:text-4xl">
              Signature Pieces
            </h2>
            <div className="mt-4 h-1 w-16 bg-[#D4A373]" />
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Link
              to="/shop"
              className="rounded-lg border-2 border-[#2B3A55] px-8 py-3 font-inter font-semibold text-[#2B3A55] transition-colors hover:bg-[#2B3A55] hover:text-white active:scale-95"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Craftsmanship Banner */}
      <section className="bg-[#2B3A55]">
        <div className="mx-auto flex max-w-7xl flex-col md:flex-row">
          <div className="flex flex-1 flex-col justify-center px-4 py-16 md:px-12 md:py-24 lg:px-20">
            <h2 className="mb-6 font-fraunces text-3xl text-[#FDFBF7] md:text-4xl">
              The Art of Craftsmanship
            </h2>
            <p className="mb-8 font-inter text-lg leading-relaxed text-gray-300">
              Every piece at Femous Fashion is a testament to our rich heritage.
              We work with master artisans across Nigeria to source the finest
              fabrics and employ traditional techniques passed down through
              generations. The result is clothing that doesn't just look good,
              but tells a story.
            </p>
            <div>
              <Link
                to="/shop"
                className="inline-block rounded-lg bg-[#D4A373] px-8 py-4 font-inter font-semibold text-white transition-transform hover:scale-105 active:scale-95"
              >
                Discover Our Story
              </Link>
            </div>
          </div>
          <div className="h-[400px] flex-1 md:h-auto">
            <img
              src={settings.ourStoryImage}
              alt="Craftsmanship"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* The Verdict */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="mb-10 flex flex-col items-center text-center">
          <h2 className="font-fraunces text-3xl text-[#2B3A55] md:text-4xl">
            The Verdict
          </h2>
          <div className="mt-4 h-1 w-16 bg-[#D4A373]" />
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-8 md:hidden">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="w-[85vw] shrink-0 snap-center rounded-xl bg-[#F5F2EB] p-6 shadow-sm"
            >
              <StarRating rating={t.rating} size={16} />
              <p className="my-4 font-inter text-sm italic leading-relaxed text-[#2B3A55]">
                "{t.text}"
              </p>
              <div>
                <p className="font-inter font-semibold text-[#2B3A55]">
                  {t.name}
                </p>
                <p className="font-inter text-xs text-gray-500">{t.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Grid */}
        <div className="hidden grid-cols-3 gap-6 md:grid">
          {testimonials.slice(0, 3).map((t) => (
            <div
              key={t.id}
              className="rounded-xl bg-[#F5F2EB] p-8 shadow-sm transition-transform hover:-translate-y-1"
            >
              <StarRating rating={t.rating} size={18} />
              <p className="my-6 font-inter text-base italic leading-relaxed text-[#2B3A55]">
                "{t.text}"
              </p>
              <div>
                <p className="font-inter font-semibold text-[#2B3A55]">
                  {t.name}
                </p>
                <p className="font-inter text-sm text-gray-500">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
