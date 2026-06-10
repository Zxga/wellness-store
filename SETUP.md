# WellnessHub — Setup Guide

## 1. Install Dependencies
```bash
npm install
```

## 2. Configure Environment Variables
Edit `.env.local` with your real credentials:

### Supabase
1. Go to https://supabase.com → New Project
2. Settings → API → copy `URL` and `anon key` and `service_role key`
3. Run the SQL from `supabase/schema.sql` in the SQL Editor

### Stripe
1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy Publishable Key and Secret Key
3. For webhooks: `stripe listen --forward-to localhost:3000/api/webhook` (dev) or set up in Stripe Dashboard for production

### Resend
1. Go to https://resend.com → API Keys → Create Key
2. Add your sending domain or use the sandbox

## 3. Seed the Database
After configuring Supabase, run:
```bash
curl -X POST http://localhost:3000/api/seed \
  -H "Authorization: Bearer admin123"
```

## 4. Run Dev Server
```bash
npm run dev
```
Open http://localhost:3000

## 5. Deploy to Vercel
```bash
npm install -g vercel
vercel
```
Set all env vars in Vercel Dashboard → Project → Settings → Environment Variables.

For Stripe webhooks on production:
- Add `https://yourdomain.com/api/webhook` in Stripe Dashboard → Webhooks
- Copy the webhook secret to `STRIPE_WEBHOOK_SECRET`

## Admin Panel
Visit `/admin` — password is whatever you set in `ADMIN_PASSWORD` env var (default: `admin123`).

## Pages
| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, featured products, testimonials |
| `/shop` | All products with filters & sort |
| `/products/[slug]` | Product page (A/B test: Variant A or B) |
| `/cart` | Cart with checkout |
| `/order/success` | Order confirmation |
| `/about` | Brand story |
| `/faq` | FAQ accordion |
| `/contact` | Contact form |
| `/admin` | Password-protected admin panel |
