-- Products
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  compare_price DECIMAL(10,2) NOT NULL,
  images TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  stock INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_session_id TEXT UNIQUE NOT NULL,
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]',
  subtotal DECIMAL(10,2) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','paid','shipped','delivered','cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- A/B Tests
CREATE TABLE IF NOT EXISTS ab_tests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  variant TEXT NOT NULL CHECK (variant IN ('A','B')),
  event TEXT NOT NULL CHECK (event IN ('view','add_to_cart','purchase')),
  product_id UUID,
  session_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Email Subscribers
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  discount_code TEXT NOT NULL DEFAULT 'WELCOME10',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_ab_tests_variant ON ab_tests(variant);
CREATE INDEX IF NOT EXISTS idx_ab_tests_session ON ab_tests(session_id);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE ab_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Public read for products and reviews
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read reviews" ON reviews FOR SELECT USING (true);

-- Service role full access (for server-side operations)
CREATE POLICY "Service role all products" ON products USING (auth.role() = 'service_role');
CREATE POLICY "Service role all orders" ON orders USING (auth.role() = 'service_role');
CREATE POLICY "Service role all reviews" ON reviews USING (auth.role() = 'service_role');
CREATE POLICY "Service role all ab_tests" ON ab_tests USING (auth.role() = 'service_role');
CREATE POLICY "Service role all subscribers" ON subscribers USING (auth.role() = 'service_role');

-- Anon insert for ab_tests and subscribers (needed from client)
CREATE POLICY "Anon insert ab_tests" ON ab_tests FOR INSERT WITH CHECK (true);
CREATE POLICY "Anon insert subscribers" ON subscribers FOR INSERT WITH CHECK (true);
