
import { Product, Order } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Nebula Smart Watch',
    price: 199.99,
    category: 'Electronics',
    stock: 45,
    image: 'https://picsum.photos/seed/watch/400/400',
    description: 'High-performance fitness tracking with an AMOLED display.'
  },
  {
    id: '2',
    name: 'Eco-Friendly Yoga Mat',
    price: 49.99,
    category: 'Fitness',
    stock: 12,
    image: 'https://picsum.photos/seed/yoga/400/400',
    description: 'Non-slip, biodegradable material for perfect balance.'
  },
  {
    id: '3',
    name: 'Wireless Noise-Canceling Headphones',
    price: 299.00,
    category: 'Electronics',
    stock: 8,
    image: 'https://picsum.photos/seed/audio/400/400',
    description: 'Studio-quality sound with 40-hour battery life.'
  },
  {
    id: '4',
    name: 'Organic Cotton T-Shirt',
    price: 25.00,
    category: 'Apparel',
    stock: 120,
    image: 'https://picsum.photos/seed/shirt/400/400',
    description: 'Breathable, sustainable, and incredibly soft.'
  },
  {
    id: '5',
    name: 'Smart Desk Lamp',
    price: 75.50,
    category: 'Home',
    stock: 3,
    image: 'https://picsum.photos/seed/lamp/400/400',
    description: 'Adjustable color temperature and integrated wireless charger.'
  },
  {
    id: '6',
    name: 'Aero Runner Pro',
    price: 129.99,
    category: 'Fitness',
    stock: 22,
    image: 'https://picsum.photos/seed/shoes/400/400',
    description: 'Lightweight running shoes for professional athletes.'
  }
];

export const INITIAL_ORDERS: Order[] = [
  { id: 'ORD-001', customerName: 'Alice Johnson', customerEmail: 'alice@example.com', total: 199.99, status: 'delivered', date: '2023-10-25' },
  { id: 'ORD-002', customerName: 'Bob Smith', customerEmail: 'bob@example.com', total: 75.50, status: 'shipped', date: '2023-10-26' },
  { id: 'ORD-003', customerName: 'Charlie Brown', customerEmail: 'charlie@example.com', total: 49.99, status: 'pending', date: '2023-10-27' },
];

export const CATEGORIES = ['All', 'Electronics', 'Fitness', 'Apparel', 'Home'];
