import { Product } from '../types';

export const products: Product[] = [
{
  id: '1',
  name: 'Royal Agbada Set',
  description:
  'A masterfully tailored three-piece agbada set in premium guinea brocade. Features intricate hand-embroidered neckline and cuffs. Perfect for weddings, ceremonies, and special occasions. Comes with agbada, dashiki, and sokoto.',
  price: 185000,
  category: 'native-wears',
  images: [
  'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=1000&fit=crop'],

  featured: true,
  inStock: true,
  rating: 4.8,
  reviewCount: 24,
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  createdAt: '2026-03-15'
},
{
  id: '2',
  name: 'Indigo Senator Suit',
  description:
  'Sharp two-piece senator suit in deep indigo Italian fabric. Slim-fit cut with structured shoulders and clean lines. Ideal for corporate events and formal gatherings.',
  price: 95000,
  category: 'corporate-wears',
  images: [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&h=1000&fit=crop'],

  featured: true,
  inStock: true,
  rating: 4.6,
  reviewCount: 18,
  sizes: ['M', 'L', 'XL', 'XXL'],
  createdAt: '2026-03-20'
},
{
  id: '3',
  name: 'Lagos Street Hoodie',
  description:
  'Premium heavyweight cotton hoodie with Adire-inspired print on the back. Relaxed fit, ribbed cuffs, and kangaroo pocket. Represents the vibrant energy of Lagos street culture.',
  price: 35000,
  category: 'street-wears',
  images: [
  'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&h=1000&fit=crop'],

  featured: false,
  inStock: true,
  rating: 4.5,
  reviewCount: 31,
  sizes: ['S', 'M', 'L', 'XL'],
  createdAt: '2026-04-01'
},
{
  id: '4',
  name: 'Coastal Linen Shirt',
  description:
  'Breathable linen shirt in sand tone with mother-of-pearl buttons. Relaxed fit perfect for weekend outings, beach events, or casual Fridays. Pairs beautifully with chinos or shorts.',
  price: 28000,
  category: 'casual-wears',
  images: [
  'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=1000&fit=crop'],

  featured: true,
  inStock: true,
  rating: 4.7,
  reviewCount: 15,
  sizes: ['S', 'M', 'L', 'XL'],
  createdAt: '2026-04-05'
},
{
  id: '5',
  name: 'Heritage Leather Belt',
  description:
  'Hand-stitched full-grain leather belt with brushed brass buckle. Made by Lagos artisans using traditional techniques. 38mm width, fits waist 30-42.',
  price: 15000,
  category: 'accessories',
  images: [
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=1000&fit=crop'],

  featured: false,
  inStock: true,
  rating: 4.9,
  reviewCount: 42,
  sizes: ['30-34', '34-38', '38-42'],
  createdAt: '2026-04-10'
},
{
  id: '6',
  name: 'Aso-Oke Premium Fabric',
  description:
  'Hand-woven Aso-Oke fabric in royal blue and gold pattern. 5 yards, perfect for custom native wear. Each piece is unique with slight variations that reflect authentic craftsmanship.',
  price: 45000,
  category: 'fabrics',
  images: [
  'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=1000&fit=crop'],

  featured: true,
  inStock: true,
  rating: 4.8,
  reviewCount: 12,
  sizes: ['5 Yards', '10 Yards'],
  createdAt: '2026-04-12'
}];