import { useState, useEffect, useCallback } from 'react';
import { CartItem, Product } from '../types';

const CART_KEY = 'femous_cart';

function getStoredCart(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(getStoredCart);

  useEffect(() => {
    saveCart(items);
  }, [items]);

  const addItem = useCallback(
    (product: Product, size: string, quantity: number = 1) => {
      setItems((prev) => {
        const existing = prev.find(
          (i) => i.product.id === product.id && i.size === size
        );
        if (existing) {
          return prev.map((i) =>
          i.product.id === product.id && i.size === size ?
          { ...i, quantity: i.quantity + quantity } :
          i
          );
        }
        return [...prev, { product, quantity, size }];
      });
    },
    []
  );

  const removeItem = useCallback((productId: string, size: string) => {
    setItems((prev) =>
    prev.filter((i) => !(i.product.id === productId && i.size === size))
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, size: string, quantity: number) => {
      if (quantity <= 0) {
        setItems((prev) =>
        prev.filter((i) => !(i.product.id === productId && i.size === size))
        );
        return;
      }
      setItems((prev) =>
      prev.map((i) =>
      i.product.id === productId && i.size === size ?
      { ...i, quantity } :
      i
      )
      );
    },
    []
  );

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice
  };
}

export function formatPrice(amount: number): string {
  return '₦' + amount.toLocaleString('en-NG');
}

export function getWhatsAppLink(message: string): string {
  return `https://wa.me/2348104038155?text=${encodeURIComponent(message)}`;
}

export function buildCartWhatsAppMessage(items: CartItem[]): string {
  if (items.length === 0) return 'Hi, I would like to place an order.';
  let msg = 'Hi Femous Fashion! I would like to order:\n\n';
  items.forEach((item, i) => {
    msg += `${i + 1}. ${item.product.name} (Size: ${item.size}) x${item.quantity} — ₦${(item.product.price * item.quantity).toLocaleString('en-NG')}\n`;
  });
  const total = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  msg += `\nTotal: ₦${total.toLocaleString('en-NG')}\n\nPlease confirm availability and shipping details. Thank you!`;
  return msg;
}

export function buildProductWhatsAppMessage(
product: Product,
size: string)
: string {
  return `Hi Femous Fashion! I'm interested in ordering:\n\n${product.name} (Size: ${size}) — ₦${product.price.toLocaleString('en-NG')}\n\nPlease confirm availability and shipping details. Thank you!`;
}