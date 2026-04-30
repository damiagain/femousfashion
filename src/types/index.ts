export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: CategorySlug;
  images: string[];
  featured: boolean;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  sizes: string[];
  createdAt: string;
}

export type CategorySlug =
'native-wears' |
'corporate-wears' |
'street-wears' |
'casual-wears' |
'accessories' |
'fabrics';

export interface Category {
  id: string;
  name: string;
  slug: CategorySlug;
  image: string;
  sortOrder: number;
}

export interface Review {
  id: string;
  productId: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  adminReply?: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
}