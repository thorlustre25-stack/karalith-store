'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductGrid } from '@/components/product';
import { useLanguage } from '@/hooks/useLanguage';
import type { ProductWithDetails } from '@/types';

interface FeaturedProductsProps {
  products: ProductWithDetails[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const { t } = useLanguage();

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="section bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="section-title">{t('home.featuredTitle')}</h2>
          <div className="divider mt-4 mb-6" />
          <p className="section-subtitle">{t('home.featuredSubtitle')}</p>
        </div>

        {/* Products */}
        <ProductGrid products={products} columns={4} />

        {/* View all link */}
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            {t('common.viewAll')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
