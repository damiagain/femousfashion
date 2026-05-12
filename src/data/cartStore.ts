import { useState, useEffect, useCallback } from 'react';
import { CartItem, Product } from '../types';

// Unicode-safe Base64 encoding helpers
function b64EncodeUnicode(str: string) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
    return String.fromCharCode(parseInt(p1, 16));
  }));
}

function b64DecodeUnicode(str: string) {
  try {
    return decodeURIComponent(atob(str).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  } catch (e) {
    console.error('Failed to decode unicode string', e);
    return null;
  }
}

export function encodeCart(items: CartItem[]): string {
  const simplified = items.map(item => ({
    id: item.product.id,
    p: item.product.price,
    n: item.product.name,
    i: item.product.images[0],
    s: item.size,
    q: item.quantity,
    c: item.product.category
  }));
  return b64EncodeUnicode(JSON.stringify(simplified));
}

export function decodeCart(encoded: string): CartItem[] {
  const jsonStr = b64DecodeUnicode(encoded);
  if (!jsonStr) return [];
  try {
    const decoded = JSON.parse(jsonStr);
    return decoded.map((item: any) => ({
      product: {
        id: item.id,
        name: item.n,
        price: item.p,
        images: [item.i],
        category: item.c,
        description: '',
        featured: false,
        inStock: true,
        rating: 5,
        reviewCount: 0,
        sizes: [],
        createdAt: new Date().toISOString()
      },
      size: item.s,
      quantity: item.q
    }));
  } catch (e) {
    console.error('Failed to parse decoded cart JSON', e);
    return [];
  }
}

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

  // Handle cart sharing link
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cartData = params.get('cart');
    if (cartData) {
      const decoded = decodeCart(cartData);
      if (decoded.length > 0) {
        setItems(decoded);
        // Clean up URL
        const url = new URL(window.location.href);
        url.searchParams.delete('cart');
        window.history.replaceState({}, '', url.toString());
      }
    }
  }, []);

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
  msg += `\nTotal: ₦${total.toLocaleString('en-NG')}\n\n`;
  
  // Add sharing link
  const cartLink = `${window.location.origin}/cart?cart=${encodeCart(items)}`;
  msg += `View Order Details: ${cartLink}\n\n`;
  
  msg += `Please confirm availability and shipping details. Thank you!`;
  return msg;
}

export function buildProductWhatsAppMessage(
  product: Product,
  size: string,
  quantity: number = 1
): string {
  const total = product.price * quantity;
  const items = [{ product, size, quantity }];
  const cartLink = `${window.location.origin}/cart?cart=${encodeCart(items)}`;
  
  return `Hi Femous Fashion! I'm interested in ordering:\n\n${product.name} (Size: ${size}) x${quantity} — ₦${total.toLocaleString('en-NG')}\n\nView Details: ${cartLink}\n\nPlease confirm availability and shipping details. Thank you!`;
}