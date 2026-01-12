
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  description: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  total: number;
  status: 'pending' | 'shipped' | 'delivered';
  date: string;
}

export type AppView = 'storefront' | 'admin';
export type AdminSubView = 'inventory' | 'ai-emails' | 'analytics';

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  type: 'welcome' | 'abandoned-cart' | 'back-in-stock';
}
