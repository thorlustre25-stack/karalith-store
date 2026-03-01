'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag } from 'lucide-react';
import { cn, formatPrice, getMetalDisplayName } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';
import { useWishlist } from '@/hooks/useWishlist';
import { useAuth } from '@/hooks/useAuth';
import type { ProductWithDetails } from '@/types';
import { Badge } from '@/components/ui';

interface ProductCardProps {
  product: ProductWithDetails;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { language } = useLanguage();
  const { user } = useAuth();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const primaryImage = product.images.find((img) => img.is_primary) || product.images[0];
  const secondaryImage = product.images.find((img) => !img.is_primary);
  const inWishlist = user ? isInWishlist(product.id) : false;

  const name = language === 'es' && product.name_es ? product.name_es : product.name;
  const metalName = getMetalDisplayName(product.metal_type, language);

  const handleWishlistClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (user) {
      await toggleWishlist(product.id);
    }
  };

  return (
    <div className="group relative">
      <Link href={`/product/${product.slug}`} className="block">
        {/* Image container */}
        <div className="relative aspect-product overflow-hidden rounded-lg bg-muted">
          {primaryImage ? (
            <>
              <Image
                src={primaryImage.image_url}
                alt={primaryImage.alt_text || name}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className={cn(
                  'object-cover transition-opacity duration-500',
                  secondaryImage ? 'group-hover:opacity-0' : ''
                )}
                priority={priority}
              />
              {secondaryImage && (
                <Image
                  src={secondaryImage.image_url}
                  alt={secondaryImage.alt_text || name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              )}
            </>
          ) : (
            <div className="flex h-full items-center justify-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground/50" />
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.is_featured && (
              <Badge variant="gold">Featured</Badge>
            )}
            {product.is_handmade && (
              <Badge variant="secondary">Handmade</Badge>
            )}
          </div>

          {/* Wishlist button */}
          {user && (
            <button
              onClick={handleWishlistClick}
              className={cn(
                'absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm transition-all',
                'opacity-0 group-hover:opacity-100',
                inWishlist && 'opacity-100'
              )}
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart
                className={cn(
                  'h-4 w-4 transition-colors',
                  inWishlist ? 'fill-rose-gold text-rose-gold' : 'text-primary'
                )}
              />
            </button>
          )}

          {/* Quick view overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-white/90 backdrop-blur-sm rounded-md py-2 text-center text-sm font-medium text-primary">
              View Details
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            {metalName}
          </p>
          <h3 className="mt-1 font-heading text-base text-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="mt-2 font-medium text-primary">
            {formatPrice(product.base_price)}
          </p>
        </div>
      </Link>
    </div>
  );
}
