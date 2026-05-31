import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";

export type Review = {
  id: string;
  productId: string;
  name: string;
  email?: string;
  rating: number;
  text: string;
  adminReply?: string;
  createdAt: string;
};

export function useReviewsStore(productId?: string) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReviews = useCallback(async () => {
    try {
      setIsLoading(true);
      let query = supabase
        .from("reviews")
        .select("*")
        .order("createdAt", { ascending: false });
      if (productId) query = query.eq("productId", productId);
      const { data, error } = await query;
      if (error) throw error;
      if (data) setReviews(data as Review[]);
    } catch (error: any) {
      console.error("Error fetching reviews:", error.message);
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const addReview = useCallback(
    async (review: Omit<Review, "id" | "createdAt">) => {
      try {
        const { error } = await supabase.from("reviews").insert([review]);
        if (error) throw error;
        await fetchReviews();
        return true;
      } catch (error: any) {
        toast.error(`Failed to submit review: ${error.message}`);
        return false;
      }
    },
    [fetchReviews],
  );

  const deleteReview = useCallback(
    async (id: string) => {
      try {
        const { error } = await supabase.from("reviews").delete().eq("id", id);
        if (error) throw error;
        await fetchReviews();
        return true;
      } catch (error: any) {
        toast.error(`Failed to delete review: ${error.message}`);
        return false;
      }
    },
    [fetchReviews],
  );

  const replyToReview = useCallback(
    async (id: string, adminReply: string) => {
      try {
        const { error } = await supabase
          .from("reviews")
          .update({ adminReply })
          .eq("id", id);
        if (error) throw error;
        await fetchReviews();
        return true;
      } catch (error: any) {
        toast.error(`Failed to post reply: ${error.message}`);
        return false;
      }
    },
    [fetchReviews],
  );

  return { reviews, isLoading, addReview, deleteReview, replyToReview };
}
