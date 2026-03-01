import { Suspense } from 'react';
import { createClient } from '@/lib/supabase/server';
import { HeroSection } from './_components/hero-section';
import { FeaturedProducts } from './_components/featured-products';
import { CategoriesSection } from './_components/categories-section';
import { AboutSection } from './_components/about-section';
import { TestimonialsSection } from './_components/testimonials-section';
import { NewsletterSection } from './_components/newsletter-section';
import { ProductGridSkeleton } from '@/components/ui/skeleton';

export default async function HomePage() {
  return (
    <>
      <HeroSection />

      <Suspense fallback={
        <section className="section">
          <div className="container-custom">
            <div className="text-center mb-12">
              <div className="h-8 w-64 bg-muted rounded mx-auto mb-4" />
              <div className="h-4 w-96 bg-muted rounded mx-auto" />
            </div>
            <ProductGridSkeleton count={4} />
          </div>
        </section>
      }>
        <FeaturedProductsWrapper />
      </Suspense>

      <CategoriesSection />

      <AboutSection />

      <TestimonialsSection />

      <NewsletterSection />
    </>
  );
}

async function FeaturedProductsWrapper() {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*),
      images:product_images(*),
      variants:product_variants(*)
    `)
    .eq('is_featured', true)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(8);

  return <FeaturedProducts products={products || []} />;
}
