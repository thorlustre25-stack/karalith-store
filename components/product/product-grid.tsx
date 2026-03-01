'use client';

import { ProductCard } from './product-card';
import { ProductCardSkeleton } from '@/components/ui/skeleton';
import type { ProductWithDetails } from '@/types';

interface ProductGridProps {
  products: ProductWithDetails[];
  loading?: boolean;
  columns?: 2 | 3 | 4;
}

const columnClasses = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 md:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
};

export function ProductGrid({
  products,
  loading = false,
  columns = 4,
}: ProductGridProps) {
  if (loading) {
    return (
      <div className={`grid ${columnClasses[columns]} gap-6`}>
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">No products found</p>
      </div>
    );
  }

  return (
    <div className={`grid ${columnClasses[columns]} gap-6`}>
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={index < 4}
        />
      ))}
    </div>
  );
}
