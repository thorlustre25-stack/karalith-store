'use client';

import { ProductGrid } from '@/components/product';
import { useLanguage } from '@/hooks/useLanguage';
import type { ProductWithDetails } from '@/types';

interface RelatedProductsProps {
  products: ProductWithDetails[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  const { t } = useLanguage();

  return (
    <section className="border-t pt-16">
      <h2 className="text-h3 mb-8">{t('product.relatedProducts')}</h2>
      <ProductGrid products={products} columns={4} />
    </section>
  );
}
