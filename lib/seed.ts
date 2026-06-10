import { getServiceClient } from './supabase';
import { slugify, getProductImages } from './utils';

const products = [
  {
    name: 'ProRelax Sauna Blanket',
    price: 79.99,
    compare_price: 119.99,
    category: 'Heat Therapy',
    description: 'Experience spa-level heat therapy at home. Our infrared sauna blanket promotes deep muscle relaxation, detoxification, and stress relief in just 30 minutes.',
    rating: 4.8,
    review_count: 247,
    stock: 50,
    is_featured: true,
  },
  {
    name: 'NeckEase Massage Gun Pro',
    price: 54.99,
    compare_price: 89.99,
    category: 'Massage',
    description: '6 adjustable speed settings, whisper-quiet motor. Targets neck, shoulders, and back tension with precision percussive therapy.',
    rating: 4.7,
    review_count: 183,
    stock: 75,
    is_featured: true,
  },
  {
    name: 'GlowRevive Red Light Face Wand',
    price: 44.99,
    compare_price: 69.99,
    category: 'Skincare',
    description: 'Clinical-grade 630nm + 850nm wavelengths. Reduces fine lines, boosts collagen production, and accelerates skin recovery in 10 minutes daily.',
    rating: 4.9,
    review_count: 312,
    stock: 100,
    is_featured: true,
  },
  {
    name: 'DeepKnead Shiatsu Neck Massager',
    price: 39.99,
    compare_price: 59.99,
    category: 'Massage',
    description: '3D rotating massage nodes with heat function. Mimics professional shiatsu massage for instant tension relief at home or in the car.',
    rating: 4.6,
    review_count: 156,
    stock: 60,
    is_featured: false,
  },
  {
    name: 'IcePulse Facial Roller Set',
    price: 24.99,
    compare_price: 39.99,
    category: 'Skincare',
    description: 'Dual-ended rose quartz roller + gua sha stone. Reduces puffiness, boosts circulation, and enhances product absorption in your morning routine.',
    rating: 4.5,
    review_count: 428,
    stock: 120,
    is_featured: false,
  },
  {
    name: 'FlexWave EMS Muscle Stimulator',
    price: 49.99,
    compare_price: 79.99,
    category: 'Recovery',
    description: '16 intensity levels, 6 massage modes. FDA-cleared EMS technology for muscle recovery, pain relief, and passive workout enhancement.',
    rating: 4.7,
    review_count: 94,
    stock: 45,
    is_featured: false,
  },
];

const reviews = [
  { author_name: 'Sarah M.', rating: 5, body: 'Absolutely love this! My back feels amazing after just one session.' },
  { author_name: 'James T.', rating: 5, body: 'Best purchase I made this year. Ships fast and works perfectly.' },
  { author_name: 'Emily R.', rating: 4, body: 'Great quality for the price. Noticed results within a week.' },
  { author_name: 'Michael K.', rating: 5, body: 'Worth every penny. My whole family uses it now!' },
  { author_name: 'Lisa P.', rating: 4, body: 'Super easy to use and feels very professional quality.' },
];

export async function seedDatabase() {
  const client = getServiceClient();

  for (const product of products) {
    const slug = slugify(product.name);
    const images = getProductImages(slug);

    const { data, error } = await client
      .from('products')
      .upsert({ ...product, slug, images }, { onConflict: 'slug' })
      .select('id')
      .single();

    if (error) {
      console.error('Seed product error:', error);
      continue;
    }

    for (const review of reviews.slice(0, 3)) {
      await client.from('reviews').insert({
        product_id: data.id,
        ...review,
      });
    }
  }

  console.log('Database seeded successfully!');
}
