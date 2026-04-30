import { useState, useEffect, useCallback } from 'react';
import { Product } from '../types';
import { products as initialProducts } from './products';

const PRODUCTS_KEY = 'femous_products';

function getStoredProducts(): Product[] {
  try {
    const stored = localStorage.getItem(PRODUCTS_KEY);
    return stored ? JSON.parse(stored) : initialProducts;
  } catch {
    return initialProducts;
  }
}

function saveProducts(products: Product[]) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  window.dispatchEvent(new Event('products_changed'));
}

export function useProductsStore() {
  const [products, setProducts] = useState<Product[]>(getStoredProducts);

  useEffect(() => {
    const handleStorage = () => setProducts(getStoredProducts());
    window.addEventListener('products_changed', handleStorage);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('products_changed', handleStorage);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const addProduct = useCallback((product: Product) => {
    const newProducts = [product, ...getStoredProducts()];
    saveProducts(newProducts);
  }, []);

  const updateProduct = useCallback((product: Product) => {
    const newProducts = getStoredProducts().map((p) =>
      p.id === product.id ? product : p
    );
    saveProducts(newProducts);
  }, []);

  const removeProduct = useCallback((id: string) => {
    const newProducts = getStoredProducts().filter((p) => p.id !== id);
    saveProducts(newProducts);
  }, []);

  return { products, addProduct, updateProduct, removeProduct };
}
