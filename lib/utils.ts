import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function generateSessionId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return generateSessionId();
  const key = 'wh_session_id';
  let sid = sessionStorage.getItem(key);
  if (!sid) {
    sid = generateSessionId();
    sessionStorage.setItem(key, sid);
  }
  return sid;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function getDiscountPercent(price: number, comparePrice: number): number {
  return Math.round(((comparePrice - price) / comparePrice) * 100);
}

export function getProductImage(images: string[], index = 0): string {
  if (images && images.length > index && images[index]) return images[index];
  return `https://picsum.photos/seed/${Math.random().toString(36).slice(2)}/600/600`;
}

const PRODUCT_IMAGES: Record<string, string[]> = {
  'lux-01-red-light-face-mask': [
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80',
    'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=900&q=80',
  ],
  'frost-01-facial-ice-bath-bowl': [
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&q=80',
    'https://images.unsplash.com/photo-1599440010893-9352be2c6a19?w=900&q=80',
  ],
  'pulse-01-mini-massage-gun': [
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=900&q=80',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80',
  ],
  'dream-01-weighted-sleep-mask': [
    'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=900&q=80',
    'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&q=80',
  ],
};

export function getProductImages(slug: string): string[] {
  return PRODUCT_IMAGES[slug] || [
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80',
  ];
}

const PRODUCT_BENEFITS: Record<string, string[]> = {
  'lux-01-red-light-face-mask': ['Boosts Collagen', '10 Min Daily', 'Non-Invasive', 'FDA-Cleared'],
  'frost-01-facial-ice-bath-bowl': ['Reduces Puffiness', 'Tightens Pores', 'BPA-Free', 'Reusable'],
  'pulse-01-mini-massage-gun': ['6 Speeds', 'Whisper-Quiet', 'USB-C Charging', 'Travel-Size'],
  'dream-01-weighted-sleep-mask': ['Blocks 100% Light', 'Calming Pressure', 'Breathable', 'Adjustable'],
};

export function getProductBenefits(slug: string): string[] {
  return PRODUCT_BENEFITS[slug] || ['Premium Quality', 'Fast Results', 'Easy to Use', 'Loved by Thousands'];
}
