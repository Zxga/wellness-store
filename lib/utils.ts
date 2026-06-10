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
  'prorelax-sauna-blanket': [
    'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80',
    'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
  ],
  'neckease-massage-gun-pro': [
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
  ],
  'glowrevive-red-light-face-wand': [
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
    'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&q=80',
  ],
  'deepknead-shiatsu-neck-massager': [
    'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80',
    'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80',
  ],
  'icepulse-facial-roller-set': [
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
    'https://images.unsplash.com/photo-1599440010893-9352be2c6a19?w=800&q=80',
  ],
  'flexwave-ems-muscle-stimulator': [
    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
    'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&q=80',
  ],
};

export function getProductImages(slug: string): string[] {
  return PRODUCT_IMAGES[slug] || [
    `https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80`,
  ];
}
