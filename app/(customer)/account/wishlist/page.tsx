'use client';

import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { useWishlist } from '@/hooks/useWishlist';
import { useLanguage } from '@/hooks/useLanguage';
import { ProductGrid } from '@/components/product';
import { Spinner } from '@/components/ui';

export default function WishlistPage() {
  const { items, loading } = useWishlist();
  const { t } = useLanguage();

  const products = items.map((item) => item.product).filter(Boolean);

  if (loading) {
    return (
      <div className="container-custom py-8 flex justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/account"
          className="text-sm text-muted-foreground hover:text-primary mb-2 inline-block"
        >
          &larr; Back to Account
        </Link>
        <h1 className="text-h1">{t('account.wishlist')}</h1>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground mb-6">
            Your wishlist is empty. Browse our collection and save items you
            love.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ShoppingBag className="h-4 w-4" />
            Browse Products
          </Link>
        </div>
      ) : (
        <ProductGrid products={products} columns={4} />
      )}
    </div>
  );
}
