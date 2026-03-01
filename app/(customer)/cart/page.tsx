'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useLanguage } from '@/hooks/useLanguage';
import { Button, Input } from '@/components/ui';
import { formatPrice, getMetalDisplayName } from '@/lib/utils';

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    updateItemNotes,
    getSubtotal,
    getShippingCost,
    getTotal,
  } = useCart();
  const { t, language } = useLanguage();

  const subtotal = getSubtotal();
  const shipping = getShippingCost();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="container-custom py-16">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground/50 mb-6" />
          <h1 className="text-h2 mb-4">{t('cart.empty')}</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link href="/shop">
            <Button size="lg">{t('cart.continueShopping')}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <h1 className="text-h1 mb-8">{t('cart.title')}</h1>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => {
            const price =
              item.product.base_price + (item.variant?.price_adjustment || 0);

            return (
              <div
                key={`${item.product_id}-${item.variant_id}`}
                className="flex gap-6 p-6 bg-white rounded-lg border"
              >
                {/* Image */}
                <Link
                  href={`/product/${item.product.slug}`}
                  className="w-32 h-40 bg-muted rounded-md overflow-hidden flex-shrink-0"
                >
                  {item.image?.image_url ? (
                    <Image
                      src={item.image.image_url}
                      alt={item.product.name}
                      width={128}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                </Link>

                {/* Details */}
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="font-heading text-lg hover:text-primary transition-colors"
                      >
                        {language === 'es' && item.product.name_es
                          ? item.product.name_es
                          : item.product.name}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">
                        {getMetalDisplayName(item.product.metal_type, language)}
                        {item.variant?.diamond_grade &&
                          ` · ${item.variant.diamond_grade}`}
                      </p>
                      {item.ring_size && (
                        <p className="text-sm text-muted-foreground">
                          Size: {item.ring_size}
                        </p>
                      )}
                    </div>
                    <p className="font-medium text-lg">
                      {formatPrice(price * item.quantity)}
                    </p>
                  </div>

                  {/* Customization notes */}
                  <div className="mt-4">
                    <Input
                      placeholder="Customization notes (optional)"
                      value={item.customization_notes || ''}
                      onChange={(e) =>
                        updateItemNotes(
                          item.product_id,
                          item.variant_id,
                          e.target.value
                        )
                      }
                      className="text-sm"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product_id,
                            item.variant_id,
                            item.quantity - 1
                          )
                        }
                        className="p-2 hover:bg-muted transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 py-2 min-w-[3rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product_id,
                            item.variant_id,
                            item.quantity + 1
                          )
                        }
                        className="p-2 hover:bg-muted transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        removeItem(item.product_id, item.variant_id)
                      }
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      {t('cart.remove')}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            {t('cart.continueShopping')}
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border p-6 sticky top-32">
            <h2 className="font-heading text-xl mb-6">Order Summary</h2>

            <div className="space-y-4 pb-6 border-b">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('cart.subtotal')}</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('cart.shipping')}</span>
                <span>
                  {shipping === 0 ? t('cart.freeShipping') : formatPrice(shipping)}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-muted-foreground">
                  Free shipping on orders over {formatPrice(150)}
                </p>
              )}
            </div>

            <div className="flex justify-between py-6 text-lg font-medium">
              <span>{t('cart.total')}</span>
              <span>{formatPrice(total)}</span>
            </div>

            <Link href="/checkout">
              <Button className="w-full" size="lg">
                {t('cart.checkout')}
              </Button>
            </Link>

            <p className="mt-4 text-xs text-center text-muted-foreground">
              Secure checkout with Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
