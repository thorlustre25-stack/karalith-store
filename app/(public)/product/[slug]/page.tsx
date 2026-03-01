import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ProductDetails } from './_components/product-details';
import { ProductGallery } from './_components/product-gallery';
import { RelatedProducts } from './_components/related-products';
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/seo';
import type { Metadata } from 'next';
import type { ProductWithDetails, ReviewWithUser } from '@/types';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description || '',
      type: 'website',
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  // Fetch product with all related data
  const { data: product } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*),
      images:product_images(*),
      variants:product_variants(*)
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (!product) {
    notFound();
  }

  // Fetch reviews
  const { data: reviews } = await supabase
    .from('reviews')
    .select(`
      *,
      user:profiles(first_name, last_name)
    `)
    .eq('product_id', product.id)
    .eq('is_approved', true)
    .order('created_at', { ascending: false });

  // Fetch related products
  const { data: relatedProducts } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*),
      images:product_images(*),
      variants:product_variants(*)
    `)
    .eq('category_id', product.category_id)
    .eq('is_active', true)
    .neq('id', product.id)
    .limit(4);

  // Sort images by display_order
  const sortedImages = [...(product.images || [])].sort(
    (a, b) => a.display_order - b.display_order
  );

  // Sort variants
  const sortedVariants = [...(product.variants || [])].sort(
    (a, b) => (a.price_adjustment || 0) - (b.price_adjustment || 0)
  );

  const productWithSorted = {
    ...product,
    images: sortedImages,
    variants: sortedVariants,
  } as ProductWithDetails;

  // Calculate average rating
  const avgRating =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : undefined;

  const primaryImage = sortedImages.find((img) => img.is_primary) || sortedImages[0];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://karalith.com';

  return (
    <>
      <ProductJsonLd
        name={product.name}
        description={product.description || ''}
        image={sortedImages.map((img) => img.image_url)}
        sku={product.id}
        brand="KaraLITH"
        price={product.base_price}
        currency="EUR"
        availability="InStock"
        url={`${siteUrl}/product/${product.slug}`}
        rating={
          avgRating
            ? { ratingValue: avgRating, reviewCount: reviews?.length || 0 }
            : undefined
        }
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteUrl },
          { name: 'Shop', url: `${siteUrl}/shop` },
          ...(product.category
            ? [
                {
                  name: product.category.name,
                  url: `${siteUrl}/shop/${product.category.slug}`,
                },
              ]
            : []),
          { name: product.name, url: `${siteUrl}/product/${product.slug}` },
        ]}
      />
      <div className="container-custom py-8">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Gallery */}
          <ProductGallery images={sortedImages} productName={product.name} />

          {/* Details */}
          <ProductDetails
            product={productWithSorted}
            reviews={(reviews as ReviewWithUser[]) || []}
          />
        </div>

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <RelatedProducts products={relatedProducts as ProductWithDetails[]} />
        )}
      </div>
    </>
  );
}
