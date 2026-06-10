export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compare_price: number;
  images: string[];
  category: string;
  stock: number;
  rating: number;
  review_count: number;
  is_featured: boolean;
  created_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  author_name: string;
  rating: number;
  body: string;
  created_at: string;
}

export interface Order {
  id: string;
  stripe_session_id: string;
  customer_email: string;
  customer_name: string;
  items: OrderItem[];
  subtotal: number;
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
}

export interface OrderItem {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ABTest {
  id: string;
  variant: 'A' | 'B';
  event: 'view' | 'add_to_cart' | 'purchase';
  product_id: string;
  session_id: string;
  created_at: string;
}

export interface Subscriber {
  id: string;
  email: string;
  discount_code: string;
  created_at: string;
}
