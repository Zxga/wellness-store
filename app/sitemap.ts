import { MetadataRoute } from 'next';
import { FALLBACK_PRODUCTS } from '@/lib/fallback';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://wellnesshub.com';

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/shop`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  const productPages: MetadataRoute.Sitemap = FALLBACK_PRODUCTS.map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: new Date(p.created_at),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}
