import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useReviewsStore } from "../data/reviewStore";
import {
  ChevronRight,
  ShieldCheck,
  Truck,
  MessageCircle,
  Star,
  X,
  Plus,
  Minus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useProductsStore } from "../data/productStore";
import {
  useCart,
  formatPrice,
  buildProductWhatsAppMessage,
  getWhatsAppLink,
} from "../data/cartStore";
import { ProductCard } from "../components/ProductCard";
import { StarRating } from "../components/StarRating";
export function ProductPage() {
  const { products } = useProductsStore();
  const { id } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const product = products.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { reviews, addReview } = useReviewsStore(id);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    email: "",
    rating: 0,
    text: "",
  });

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewForm.rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    const success = await addReview({ ...reviewForm, productId: id! });
    if (success) {
      toast.success("Review submitted!");
      setReviewForm({ name: "", email: "", rating: 0, text: "" });
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [id]);
  useEffect(() => {
    if (product && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);
  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FDFBF7] pt-20">
        <h2 className="mb-4 font-fraunces text-2xl text-[#2B3A55]">
          Product Not Found
        </h2>
        <Link to="/shop" className="text-[#D4A373] underline">
          Return to Shop
        </Link>
      </div>
    );
  }
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  const handleAddToCart = () => {
    const needsSize = product.sizes && product.sizes.length > 0;
    if (needsSize && !selectedSize) {
      toast.error("Please select a size");
      return;
    }
    addItem(product, selectedSize, quantity);
    toast.success("Added to cart", {
      style: {
        background: "#D4A373",
        color: "#fff",
        border: "none",
      },
    });
  };
  const handleWhatsAppOrder = () => {
    const needsSize = product.sizes && product.sizes.length > 0;
    if (needsSize && !selectedSize) {
      toast.error("Please select a size");
      return;
    }
    const message = buildProductWhatsAppMessage(
      product,
      selectedSize,
      quantity,
    );
    window.open(getWhatsAppLink(message), "_blank");
  };
  return (
    <main className="min-h-screen bg-[#FDFBF7] pt-16 md:pt-20 pb-24 md:pb-12">
      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
        <div className="flex items-center gap-2 font-inter text-sm text-gray-500">
          <Link to="/" className="hover:text-[#D4A373]">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/shop" className="hover:text-[#D4A373]">
            Shop
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link
            to={`/shop/${product.category}`}
            className="hover:text-[#D4A373] capitalize"
          >
            {product.category.replace("-", " ")}
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:gap-12 lg:gap-16">
          {/* Image Gallery */}
          <div className="flex-1">
            <div className="flex flex-col gap-4 md:flex-row-reverse">
              {/* Main Image */}
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100 md:flex-1">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </AnimatePresence>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-2 md:w-24 md:flex-col md:overflow-visible md:pb-0">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative aspect-square w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100 md:w-full ${selectedImage === idx ? "ring-2 ring-[#D4A373] ring-offset-2" : ""}`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-1 flex-col">
            <h1 className="mb-2 font-fraunces text-2xl text-[#2B3A55] md:text-4xl">
              {product.name}
            </h1>

            <div className="mb-6 flex items-center gap-4">
              <span className="font-inter text-xl font-semibold text-[#2B3A55] md:text-2xl">
                {formatPrice(product.price)}
                {product.pricingUnit ? ` / ${product.pricingUnit}` : ""}
              </span>
              <div className="flex items-center gap-2 border-l border-gray-300 pl-4">
                <StarRating rating={product.rating} />
                <span className="font-inter text-sm text-gray-500 underline cursor-pointer">
                  {product.reviewCount} reviews
                </span>
              </div>
            </div>

            <p className="mb-8 font-inter text-base leading-relaxed text-gray-600">
              {product.description}
            </p>

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-8">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-inter font-semibold text-[#2B3A55]">
                    Select Size
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="font-inter text-sm text-[#D4A373] underline"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`flex h-12 min-w-[3rem] items-center justify-center rounded-lg border px-4 font-inter text-sm font-medium transition-colors ${selectedSize === size ? "border-[#2B3A55] bg-[#2B3A55] text-white" : "border-gray-300 bg-white text-[#2B3A55] hover:border-[#2B3A55]"}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-8">
              <span className="mb-3 block font-inter font-semibold text-[#2B3A55]">
                Quantity
              </span>
              <div className="flex h-12 w-32 items-center justify-between rounded-lg border border-gray-300 px-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-inter font-medium text-[#2B3A55]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Desktop CTAs */}
            <div className="hidden flex-col gap-4 md:flex">
              <button
                onClick={handleWhatsAppOrder}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#D4A373] py-4 font-inter font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="h-5 w-5" />
                Order via WhatsApp
              </button>
              <button
                onClick={handleAddToCart}
                className="flex w-full items-center justify-center rounded-lg border-2 border-[#2B3A55] py-4 font-inter font-semibold text-[#2B3A55] transition-colors hover:bg-[#2B3A55] hover:text-white active:scale-[0.98]"
              >
                Add to Cart
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 flex flex-col gap-4 rounded-xl bg-[#F5F2EB] p-6">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-[#D4A373]" />
                <span className="font-inter text-sm text-[#2B3A55]">
                  Ships from Nigeria 🇳🇬 (Worldwide Available)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-[#D4A373]" />
                <span className="font-inter text-sm text-[#2B3A55]">
                  Premium Quality Craftsmanship
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-[#D4A373]" />
                <span className="font-inter text-sm text-[#2B3A55]">
                  Personalized WhatsApp Support
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Complete the Look */}
      {relatedProducts.length > 0 && (
        <section className="mx-auto mt-20 max-w-7xl px-4 md:px-8">
          <h2 className="mb-8 font-fraunces text-2xl text-[#2B3A55] md:text-3xl">
            Complete the Look
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Reviews Section */}
      <section className="mx-auto mt-20 max-w-7xl px-4 md:px-8">
        <div className="border-t border-gray-200 pt-12">
          <h2 className="mb-8 font-fraunces text-2xl text-[#2B3A55] md:text-3xl">
            Customer Reviews
          </h2>
          <div className="flex flex-col gap-12 md:flex-row">
            <div className="flex-1">
              {reviews.length === 0 ? (
                <p className="font-inter text-gray-500">
                  No reviews yet. Be the first!
                </p>
              ) : (
                <div className="flex flex-col gap-8">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-100 pb-6"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-inter font-semibold text-[#2B3A55]">
                          {review.name}
                        </span>
                        <span className="font-inter text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString(
                            "en-GB",
                          )}
                        </span>
                      </div>
                      <StarRating rating={review.rating} />
                      <p className="mt-3 font-inter text-gray-600">
                        {review.text}
                      </p>
                      {review.adminReply && (
                        <div className="mt-4 rounded-lg bg-[#F5F2EB] p-4">
                          <div className="mb-1 flex items-center gap-2">
                            <span className="rounded bg-[#D4A373] px-2 py-0.5 text-[10px] font-bold text-white">
                              ADMIN
                            </span>
                            <span className="font-inter text-sm font-semibold text-[#2B3A55]">
                              Femous Fashion
                            </span>
                          </div>
                          <p className="font-inter text-sm text-gray-600">
                            {review.adminReply}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add Review Form */}
            <div className="flex-1 rounded-xl bg-[#F5F2EB] p-6 md:p-8">
              <h3 className="mb-6 font-fraunces text-xl text-[#2B3A55]">
                Write a Review
              </h3>
              <form
                className="flex flex-col gap-4"
                onSubmit={handleReviewSubmit}
              >
                <div>
                  <label className="mb-1 block font-inter text-sm font-medium text-[#2B3A55]">
                    Rating
                  </label>
                  <StarRating
                    rating={reviewForm.rating}
                    interactive
                    size={24}
                    onChange={(r) =>
                      setReviewForm({ ...reviewForm, rating: r })
                    }
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block font-inter text-sm font-medium text-[#2B3A55]">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={reviewForm.name}
                      onChange={(e) =>
                        setReviewForm({ ...reviewForm, name: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 p-3 font-inter outline-none focus:border-[#D4A373]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block font-inter text-sm font-medium text-[#2B3A55]">
                      Email (hidden)
                    </label>
                    <input
                      type="email"
                      required
                      value={reviewForm.email}
                      onChange={(e) =>
                        setReviewForm({ ...reviewForm, email: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 p-3 font-inter outline-none focus:border-[#D4A373]"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block font-inter text-sm font-medium text-[#2B3A55]">
                    Review
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={reviewForm.text}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, text: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 p-3 font-inter outline-none focus:border-[#D4A373]"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 rounded-lg bg-[#2B3A55] py-3 font-inter font-semibold text-white transition-transform active:scale-95"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:hidden">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-inter text-xs text-gray-500">
                Total Price
              </span>
              <span className="font-inter text-lg font-semibold text-[#2B3A55]">
                {formatPrice(product.price * quantity)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleAddToCart}
              className="flex flex-1 items-center justify-center rounded-lg border-2 border-[#2B3A55] py-3 font-inter font-semibold text-[#2B3A55] active:scale-95 transition-colors hover:bg-[#2B3A55] hover:text-white"
            >
              Add to Cart
            </button>
            <button
              onClick={handleWhatsAppOrder}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#D4A373] py-3 font-inter font-semibold text-white active:scale-95"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      <AnimatePresence>
        {isSizeGuideOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
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
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsSizeGuideOpen(false)}
            />

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto"
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-fraunces text-2xl text-[#2B3A55]">
                  Size Guide
                </h3>
                <button
                  onClick={() => setIsSizeGuideOpen(false)}
                  className="p-2 text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-inter text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="p-3 font-semibold text-[#2B3A55]">Size</th>
                      <th className="p-3 font-semibold text-[#2B3A55]">
                        Chest (in)
                      </th>
                      <th className="p-3 font-semibold text-[#2B3A55]">
                        Waist (in)
                      </th>
                      <th className="p-3 font-semibold text-[#2B3A55]">
                        Length (in)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="p-3 font-medium">S</td>
                      <td className="p-3 text-gray-600">36-38</td>
                      <td className="p-3 text-gray-600">30-32</td>
                      <td className="p-3 text-gray-600">28</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-3 font-medium">M</td>
                      <td className="p-3 text-gray-600">39-41</td>
                      <td className="p-3 text-gray-600">33-35</td>
                      <td className="p-3 text-gray-600">29</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-3 font-medium">L</td>
                      <td className="p-3 text-gray-600">42-44</td>
                      <td className="p-3 text-gray-600">36-38</td>
                      <td className="p-3 text-gray-600">30</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-3 font-medium">XL</td>
                      <td className="p-3 text-gray-600">45-47</td>
                      <td className="p-3 text-gray-600">39-41</td>
                      <td className="p-3 text-gray-600">31</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">XXL</td>
                      <td className="p-3 text-gray-600">48-50</td>
                      <td className="p-3 text-gray-600">42-44</td>
                      <td className="p-3 text-gray-600">32</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 font-inter text-xs text-gray-500">
                Measurements are approximate. For custom sizing, please contact
                us via WhatsApp.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
