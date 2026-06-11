import { getServiceClient } from './supabase';
import { slugify, getProductImages } from './utils';

const products = [
  {
    name: 'LUX-01 Red Light Face Mask',
    price: 89.99,
    compare_price: 149.99,
    category: 'Light Therapy',
    description: 'Clinical-grade red light therapy at home. Our LUX-01 mask uses 630nm + 850nm wavelengths to boost collagen production, reduce fine lines, and restore your natural glow in just 10 minutes a day. Non-invasive, FDA-cleared, and dermatologist-approved.',
    rating: 4.9,
    review_count: 4728,
    stock: 80,
    is_featured: true,
  },
  {
    name: 'FROST-01 Facial Ice Bath Bowl',
    price: 34.99,
    compare_price: 54.99,
    category: 'Recovery',
    description: 'Spa-quality cryotherapy at home. Reduce puffiness, tighten pores, and energize your skin with our BPA-free facial ice bath. The viral self-care ritual loved by millions — perfect for morning routines or post-workout recovery.',
    rating: 4.7,
    review_count: 1203,
    stock: 120,
    is_featured: false,
  },
  {
    name: 'PULSE-01 Mini Massage Gun',
    price: 54.99,
    compare_price: 89.99,
    category: 'Recovery',
    description: 'Professional percussive therapy in your pocket. 6 speed settings and a whisper-quiet motor target muscle tension, speed recovery, and melt away stress. Compact enough for your bag, powerful enough for deep relief.',
    rating: 4.8,
    review_count: 2891,
    stock: 95,
    is_featured: false,
  },
  {
    name: 'DREAM-01 Weighted Sleep Mask',
    price: 29.99,
    compare_price: 44.99,
    category: 'Sleep & Relax',
    description: 'Drift into deeper sleep. Our weighted sleep mask applies gentle, calming pressure to relax your mind, block out light completely, and help you fall asleep faster. The perfect end to your recovery ritual.',
    rating: 4.6,
    review_count: 856,
    stock: 140,
    is_featured: false,
  },
];

const reviews = [
  { author_name: 'Sarah M.', rating: 5, body: 'My skin has never looked better! The glow is real and the quality is premium.' },
  { author_name: 'Jessica L.', rating: 5, body: 'Worth every penny. 10 minutes a day and my complexion is brighter than ever.' },
  { author_name: 'Amara K.', rating: 5, body: 'Beautiful packaging, feels genuinely premium, and the results speak for themselves.' },
  { author_name: 'Maya T.', rating: 4, body: 'Took a couple weeks to notice but now I am hooked. Part of my nightly ritual.' },
  { author_name: 'Olivia R.', rating: 5, body: 'Dermatologist recommended and I can see why. Gentle, easy, and effective.' },
];

export async function seedDatabase() {
  const client = getServiceClient();

  for (const product of products) {
    const slug = slugify(product.name);
    const images = getProductImages(slug);

    const { data, error } = await client
      .from('products')
      .upsert({ ...product, slug, images } as any, { onConflict: 'slug' })
      .select('id')
      .single();

    if (error) {
      console.error('Seed product error:', error);
      continue;
    }

    const productId = (data as { id: string }).id;
    for (const review of reviews.slice(0, 3)) {
      await client.from('reviews').insert({ product_id: productId, ...review } as any);
    }
  }

  console.log('RAYLUNE database seeded successfully!');
}
