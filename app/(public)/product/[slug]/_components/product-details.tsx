'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Check, Truck, Shield, Sparkles, Star, MessageCircle } from 'lucide-react';
import { Button, Badge, Select } from '@/components/ui';
import { toast } from '@/components/ui/toast';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { cn, formatPrice, getMetalDisplayName, getRingSizes } from '@/lib/utils';
import { ShapeSelector, MetalSelector } from '@/components/product/diamond-shapes';
import type { ProductWithDetails, ReviewWithUser, ProductVariant } from '@/types';

interface ProductDetailsProps {
  product: ProductWithDetails;
  reviews: ReviewWithUser[];
}

export function ProductDetails({ product, reviews }: ProductDetailsProps) {
  const { t, language } = useLanguage();
  const { addItem } = useCart();
  const { user } = useAuth();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants[0] || null
  );
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedCarat, setSelectedCarat] = useState<string>('');
  const [selectedMetal, setSelectedMetal] = useState<string>('');
  const [selectedShape, setSelectedShape] = useState<string>('');
  const [customNotes, setCustomNotes] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>(
    'description'
  );

  const inWishlist = user ? isInWishlist(product.id) : false;
  const primaryImage = product.images.find((img) => img.is_primary) || product.images[0];
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  // Calculate final price
  const basePrice = product.base_price;
  const adjustment = selectedVariant?.price_adjustment || 0;
  const finalPrice = basePrice + adjustment;

  // Diamond carat weight options
  const DIAMOND_CARAT_OPTIONS = [
    { value: '0.75', label: '0.75 ct' },
    { value: '1.00', label: '1.00 ct' },
    { value: '1.50', label: '1.50 ct' },
    { value: '2.00', label: '2.00 ct' },
    { value: '2.50', label: '2.50 ct' },
    { value: '3.00', label: '3.00 ct' },
    { value: '3.50', label: '3.50 ct' },
    { value: '4.00', label: '4.00 ct' },
    { value: 'contact', label: t('product.contactForLarger') },
  ];

  // Check if this is a ring (needs size & diamond weight selection)
  const needsSize =
    product.category?.slug === 'rings' || product.category?.slug === 'engagement';
  const needsDiamondWeight = needsSize;

  const handleAddToCart = async () => {
    if (needsDiamondWeight && !selectedShape) {
      toast.warning(t('product.selectStoneShape'));
      return;
    }
    if (needsDiamondWeight && !selectedCarat) {
      toast.warning(t('product.selectDiamondWeight'));
      return;
    }
    if (needsDiamondWeight && !selectedMetal) {
      toast.warning(t('product.selectMetal'));
      return;
    }
    if (needsSize && !selectedSize) {
      toast.warning(t('product.selectSize'));
      return;
    }

    setIsAdding(true);

    addItem(
      product,
      selectedVariant,
      primaryImage,
      1,
      selectedSize || undefined,
      selectedCarat || undefined,
      selectedMetal || undefined,
      selectedShape || undefined,
      customNotes || undefined
    );

    toast.success(t('product.addedToCart'));

    setTimeout(() => setIsAdding(false), 1500);
  };

  const handleWishlistToggle = async () => {
    if (!user) {
      toast.info('Please sign in to save items to your wishlist');
      return;
    }
    await toggleWishlist(product.id);
  };

  const name = language === 'es' && product.name_es ? product.name_es : product.name;
  const description =
    language === 'es' && product.description_es
      ? product.description_es
      : product.description;

  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground mb-4">
        <Link href="/shop" className="hover:text-primary">
          Shop
        </Link>
        {product.category && (
          <>
            <span className="mx-2">/</span>
            <Link
              href={`/shop/${product.category.slug}`}
              className="hover:text-primary"
            >
              {language === 'es' ? product.category.name_es : product.category.name}
            </Link>
          </>
        )}
      </nav>

      {/* Title & Price */}
      <h1 className="font-heading text-h2 mb-2">{name}</h1>

      {/* Rating */}
      {reviews.length > 0 && (
        <div className="flex items-center gap-2 mb-4">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'h-4 w-4',
                  i < Math.round(averageRating)
                    ? 'fill-gold text-gold'
                    : 'text-muted-foreground/30'
                )}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
          </span>
        </div>
      )}

      <p className="text-2xl font-medium text-primary mb-6">
        {formatPrice(finalPrice)}
      </p>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Badge variant="secondary">
          {getMetalDisplayName(product.metal_type, language)}
        </Badge>
        {product.is_handmade && (
          <Badge variant="gold">
            <Sparkles className="h-3 w-3 mr-1" />
            {t('product.handmade')}
          </Badge>
        )}
      </div>

      {/* Variant Selection (Diamond Grade) */}
      {product.variants.length > 1 && (
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            {t('product.diamondGrade')}
          </label>
          <div className="flex gap-3">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant)}
                className={cn(
                  'px-4 py-2 border rounded-md transition-colors',
                  selectedVariant?.id === variant.id
                    ? 'border-primary bg-primary text-white'
                    : 'border-border hover:border-primary'
                )}
              >
                {variant.diamond_grade}
                {variant.price_adjustment > 0 && (
                  <span className="text-xs ml-1">
                    (+{formatPrice(variant.price_adjustment)})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Stone Shape Selection */}
      {needsDiamondWeight && (
        <div className="mb-6">
          <label className="block text-sm font-medium mb-3">
            {t('product.stoneShape')}
          </label>
          <ShapeSelector
            selectedShape={selectedShape}
            onSelect={setSelectedShape}
          />
        </div>
      )}

      {/* Diamond Weight (Carats) Selection */}
      {needsDiamondWeight && (
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            {t('product.diamondWeight')}
          </label>
          {selectedCarat === 'contact' ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                For diamonds over 4.00ct, please contact us for availability and pricing.
              </p>
              <div className="flex gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md text-sm hover:bg-primary/90 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  Contact Us
                </Link>
                <button
                  onClick={() => setSelectedCarat('')}
                  className="px-4 py-2 border border-border rounded-md text-sm hover:border-primary transition-colors"
                >
                  Choose a different size
                </button>
              </div>
            </div>
          ) : (
            <Select
              options={DIAMOND_CARAT_OPTIONS}
              value={selectedCarat}
              onChange={(e) => setSelectedCarat(e.target.value)}
              placeholder={t('product.selectDiamondWeight')}
            />
          )}
        </div>
      )}

      {/* Metal Selection */}
      {needsDiamondWeight && (
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            {t('product.metalType')}
          </label>
          <MetalSelector
            selectedMetal={selectedMetal}
            onSelect={setSelectedMetal}
            language={language}
          />
        </div>
      )}

      {/* Ring Size Selection */}
      {needsSize && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">{t('product.selectSize')}</label>
            <Link
              href="/ring-size-guide"
              className="text-sm text-primary hover:underline"
            >
              Size Guide
            </Link>
          </div>
          <Select
            options={getRingSizes().map((size) => ({ value: size, label: size }))}
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            placeholder="Select size..."
          />
        </div>
      )}

      {/* Customization Notes */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          {t('product.customization')}{' '}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <textarea
          value={customNotes}
          onChange={(e) => setCustomNotes(e.target.value)}
          placeholder="Add any personalization requests..."
          rows={2}
          className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
        />
      </div>

      {/* Add to Cart & Wishlist */}
      <div className="flex gap-4 mb-8">
        <Button
          onClick={handleAddToCart}
          size="lg"
          className="flex-1"
          loading={isAdding}
          disabled={selectedCarat === 'contact'}
          leftIcon={isAdding ? <Check className="h-5 w-5" /> : <ShoppingBag className="h-5 w-5" />}
        >
          {isAdding ? t('product.addedToCart') : t('product.addToCart')}
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={handleWishlistToggle}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={cn(
              'h-5 w-5',
              inWishlist && 'fill-rose-gold text-rose-gold'
            )}
          />
        </Button>
      </div>

      {/* Features */}
      <div className="grid grid-cols-3 gap-4 py-6 border-y mb-8">
        <div className="text-center">
          <Truck className="h-6 w-6 mx-auto text-primary mb-2" />
          <p className="text-xs text-muted-foreground">{t('product.freeShipping')}</p>
        </div>
        <div className="text-center">
          <Shield className="h-6 w-6 mx-auto text-primary mb-2" />
          <p className="text-xs text-muted-foreground">2 Year Warranty</p>
        </div>
        <div className="text-center">
          <Sparkles className="h-6 w-6 mx-auto text-primary mb-2" />
          <p className="text-xs text-muted-foreground">Certified Diamonds</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b mb-6">
        <div className="flex gap-8">
          {(['description', 'specifications', 'reviews'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'pb-3 text-sm font-medium border-b-2 transition-colors',
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              {t(`product.${tab}`)}
              {tab === 'reviews' && ` (${reviews.length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'description' && (
          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground leading-relaxed">{description}</p>
          </div>
        )}

        {activeTab === 'specifications' && (
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-muted-foreground">Metal</dt>
              <dd className="font-medium">
                {getMetalDisplayName(product.metal_type, language)}
              </dd>
            </div>
            {selectedVariant?.diamond_grade && (
              <div>
                <dt className="text-muted-foreground">Diamond Grade</dt>
                <dd className="font-medium">{selectedVariant.diamond_grade}</dd>
              </div>
            )}
            <div>
              <dt className="text-muted-foreground">Craftsmanship</dt>
              <dd className="font-medium">
                {product.is_handmade ? 'Handmade' : 'Machine Made'}
              </dd>
            </div>
            {selectedVariant?.sku && (
              <div>
                <dt className="text-muted-foreground">SKU</dt>
                <dd className="font-medium">{selectedVariant.sku}</dd>
              </div>
            )}
          </dl>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {reviews.length === 0 ? (
              <p className="text-muted-foreground">No reviews yet.</p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="border-b pb-6 last:border-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            'h-4 w-4',
                            i < review.rating
                              ? 'fill-gold text-gold'
                              : 'text-muted-foreground/30'
                          )}
                        />
                      ))}
                    </div>
                    <span className="font-medium text-sm">
                      {(review.user as any)?.first_name || 'Anonymous'}
                    </span>
                  </div>
                  {review.title && (
                    <p className="font-medium mb-1">{review.title}</p>
                  )}
                  {review.comment && (
                    <p className="text-muted-foreground text-sm">
                      {review.comment}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
