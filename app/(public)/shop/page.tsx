import { Suspense } from 'react';
import { createClient } from '@/lib/supabase/server';
import { ProductGridSkeleton } from '@/components/ui/skeleton';
import { ShopPageContent } from './_components/shop-page-content';
import type { Metadata } from 'next';
import type { ProductWithDetails, Category, MetalType, ProductSort } from '@/types';

export const metadata: Metadata = {
  title: 'Engagement Rings | Handcrafted with Ethically Sourced Diamonds',
  description:
    'Discover our collection of handcrafted engagement rings. Solitaire, halo, three-stone, and vintage styles with ethically sourced diamonds.',
};

interface ShopPageProps {
  searchParams: Promise<{
    search?: string;
    metal?: MetalType;
    min_price?: string;
    max_price?: string;
    sort?: ProductSort;
    page?: string;
  }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;

  return (
    <div>
      {/* Header Banner */}
      <div className="bg-primary text-white py-16 mb-10">
        <div className="container-custom text-center">
          <h1 className="font-heading text-h1 text-white mb-3">Engagement Rings</h1>
          <div className="w-12 h-0.5 bg-gold mx-auto mb-4" />
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Handcrafted rings with ethically sourced diamonds for your perfect moment
          </p>
        </div>
      </div>

      <div className="container-custom pb-12">

      <Suspense
        fallback={
          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            <div className="hidden lg:block">
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-10 bg-muted rounded" />
                ))}
              </div>
            </div>
            <ProductGridSkeleton count={12} />
          </div>
        }
      >
        <ShopContentWrapper searchParams={params} />
      </Suspense>
      </div>
    </div>
  );
}

async function ShopContentWrapper({
  searchParams,
}: {
  searchParams: {
    search?: string;
    metal?: MetalType;
    min_price?: string;
    max_price?: string;
    sort?: ProductSort;
    page?: string;
  };
}) {
  const supabase = await createClient();

  // Build query
  let query = supabase
    .from('products')
    .select(
      `
      *,
      category:categories(*),
      images:product_images(*),
      variants:product_variants(*)
    `,
      { count: 'exact' }
    )
    .eq('is_active', true);

  // Apply filters
  if (searchParams.search) {
    query = query.or(
      `name.ilike.%${searchParams.search}%,description.ilike.%${searchParams.search}%`
    );
  }

  if (searchParams.metal) {
    query = query.eq('metal_type', searchParams.metal);
  }

  if (searchParams.min_price) {
    query = query.gte('base_price', parseFloat(searchParams.min_price));
  }

  if (searchParams.max_price) {
    query = query.lte('base_price', parseFloat(searchParams.max_price));
  }

  // Apply sorting
  switch (searchParams.sort) {
    case 'price_asc':
      query = query.order('base_price', { ascending: true });
      break;
    case 'price_desc':
      query = query.order('base_price', { ascending: false });
      break;
    case 'name_asc':
      query = query.order('name', { ascending: true });
      break;
    case 'name_desc':
      query = query.order('name', { ascending: false });
      break;
    case 'newest':
    default:
      query = query.order('created_at', { ascending: false });
  }

  // Pagination
  const page = parseInt(searchParams.page || '1');
  const perPage = 12;
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;
  query = query.range(from, to);

  const { data: products, count } = await query;

  // Get categories for filter
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  return (
    <ShopPageContent
      products={(products as ProductWithDetails[]) || []}
      categories={(categories as Category[]) || []}
      totalCount={count || 0}
      currentPage={page}
      perPage={perPage}
      filters={searchParams}
    />
  );
}
