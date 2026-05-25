import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CartItem } from "../types";
import { useCart } from "../data/cartStore";

// Ensures deep-links are handled reliably:
// /cart?token=<token>
export function CartTokenHandler() {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        clearCart();
        navigate("/cart", { replace: true });
        return;
      }

      try {
        setIsLoading(true);
        const { supabase } = await import("../lib/supabase");

        const { data, error } = await supabase
          .from("cart_sessions")
          .select("cart_items")
          .eq("token", token)
          .maybeSingle();

        if (error) throw error;

        const cartItems = (data?.cart_items ?? []) as any[];

        const normalized: CartItem[] = cartItems.map((item: any) => ({
          product: {
            id: item.product?.id ?? item.id,
            name: item.product?.name ?? item.n,
            price: item.product?.price ?? item.p,
            images: item.product?.images ??
              item.images ?? [item.product?.images?.[0] ?? item.i],
            category: item.product?.category ?? item.c,
            description: "",
            featured: false,
            inStock: true,
            rating: 5,
            reviewCount: 0,
            sizes: [],
            createdAt: new Date().toISOString(),
          },
          size: item.size ?? item.s,
          quantity: item.quantity ?? item.q,
        }));

        if (normalized.length === 0) {
          toast.error("Cart session not found or expired");
          clearCart();
        } else {
          localStorage.setItem("femous_cart", JSON.stringify(normalized));
        }

        navigate("/cart", { replace: true });
      } catch (e) {
        console.error(e);
        toast.error("Failed to load cart token");
        clearCart();
        navigate("/cart", { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [clearCart, navigate]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FDFBF7] pt-24">
      {isLoading ? (
        <div className="font-inter text-gray-600">Loading your cart…</div>
      ) : (
        <div className="font-inter text-gray-600">Redirecting…</div>
      )}
    </main>
  );
}
