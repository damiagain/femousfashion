import React, { useState } from "react";
import { Trash2, Reply, Check } from "lucide-react";
import { toast } from "sonner";
import { useReviewsStore } from "../../data/reviewStore";
import { useProductsStore } from "../../data/productStore";
import { StarRating } from "../../components/StarRating";

export function AdminReviews() {
  const { reviews, deleteReview, replyToReview } = useReviewsStore();
  const { products } = useProductsStore();
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      await deleteReview(id);
      toast.success("Review deleted");
    }
  };

  const handleReplySubmit = async (id: string) => {
    if (!replyText.trim()) return;
    await replyToReview(id, replyText.trim());
    toast.success("Reply posted");
    setReplyingTo(null);
    setReplyText("");
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-fraunces text-2xl text-[#2B3A55] md:text-3xl">
          Reviews
        </h1>
        <p className="font-inter text-sm text-gray-500 mt-1">
          Manage customer testimonials and reviews.
        </p>
      </div>

      {reviews.length === 0 ? (
        <p className="font-inter text-gray-500">No reviews yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => {
            const product = products.find((p) => p.id === review.productId);
            const thumb = product?.images?.[0];
            const productName = product?.name;

            return (
              <div
                key={review.id}
                className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    {productName && (
                      <p className="font-inter text-xs font-medium text-[#D4A373] mb-1">
                        {productName}
                      </p>
                    )}
                    <h3 className="font-inter font-semibold text-[#2B3A55]">
                      {review.name}
                    </h3>
                    <p className="font-inter text-xs text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setReplyingTo(
                          replyingTo === review.id ? null : review.id,
                        );
                        setReplyText("");
                      }}
                      className="p-1.5 text-gray-400 hover:text-[#2B3A55] rounded-lg hover:bg-gray-100"
                      title="Reply"
                    >
                      <Reply className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-100"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {thumb && (
                  <div className="mb-4 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={thumb}
                      alt={productName}
                      className="h-28 w-full object-cover"
                    />
                  </div>
                )}

                <div className="mb-4">
                  <StarRating rating={review.rating} size={16} />
                </div>

                <p className="font-inter text-sm text-gray-600 italic flex-1">
                  "{review.text}"
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
                    <p className="font-inter text-sm text-gray-700">
                      {review.adminReply}
                    </p>
                  </div>
                )}

                {replyingTo === review.id && (
                  <div className="mt-4 border-t border-gray-100 pt-4">
                    <label className="mb-2 block font-inter text-xs font-medium text-[#2B3A55]">
                      Admin Reply
                    </label>
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      rows={3}
                      placeholder="Type your reply..."
                      className="w-full rounded-lg border border-gray-300 p-2 font-inter text-sm outline-none focus:border-[#D4A373]"
                    />
                    <div className="mt-2 flex justify-end gap-2">
                      <button
                        onClick={() => setReplyingTo(null)}
                        className="rounded px-3 py-1.5 font-inter text-xs font-medium text-gray-500 hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleReplySubmit(review.id)}
                        className="flex items-center gap-1 rounded bg-[#2B3A55] px-3 py-1.5 font-inter text-xs font-medium text-white"
                      >
                        <Check className="h-3 w-3" />
                        Post Reply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
