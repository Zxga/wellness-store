import { notFound } from 'next/navigation';
import { FALLBACK_PRODUCTS, FALLBACK_REVIEWS } from '@/lib/fallback';
import ProductVariantA from '@/components/product/ProductVariantA';
import ProductVariantB from '@/components/product/ProductVariantB';
import { Product, Review } from '@/types';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  const product = FALLBACK_PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  // Try Supabase, fall back to static data
  let product: Product | null = null;
  let reviews: Review[] = FALLBACK_REVIEWS;
  let related: Product[] = [];

  try {
    const { getProductBySlug, getProductReviews, getProducts } = await import('@/lib/supabase');
    product = (await getProductBySlug(params.slug)) as Product;
    reviews = ((await getProductReviews(product!.id)) || FALLBACK_REVIEWS) as Review[];
    const allProducts = ((await getProducts({ limit: 10 })) || []) as Product[];
    related = allProducts.filter((p) => p.slug !== params.slug).slice(0, 3);
  } catch {
    product = FALLBACK_PRODUCTS.find((p) => p.slug === params.slug) || null;
    related = FALLBACK_PRODUCTS.filter((p) => p.slug !== params.slug).slice(0, 3);
  }

  if (!product) notFound();
  const p = product as Product;

  // Deterministic A/B split based on product id
  const variant = p.id.charCodeAt(p.id.length - 1) % 2 === 0 ? 'A' : 'B';

  return variant === 'A' ? (
    <ProductVariantA product={p} reviews={reviews} relatedProducts={related} />
  ) : (
    <ProductVariantB product={p} reviews={reviews} relatedProducts={related} />
  );
}

export async function generateStaticParams() {
  return FALLBACK_PRODUCTS.map((p) => ({ slug: p.slug }));
}
