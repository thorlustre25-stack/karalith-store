'use client';

import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui';
import { formatPrice, getMetalDisplayName } from '@/lib/utils';
import { cn } from '@/lib/utils';
import type { CartItem } from '@/types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, getSubtotal, getShippingCost, getTotal } = useCart();
  const { t, language } = useLanguage();

  const subtotal = getSubtotal();
  const shipping = getShippingCost();
  const total = getTotal();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-heading text-xl">{t('cart.title')}</h2>
          <button
            onClick={onClose}
            className="p-2 -mr-2 hover:bg-muted rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[calc(100%-160px)] px-6 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-6">{t('cart.empty')}</p>
            <Button onClick={onClose} variant="outline">
              {t('cart.continueShopping')}
            </Button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.map((item) => (
                <CartItemCard
                  key={`${item.product_id}-${item.variant_id}`}
                  item={item}
                  language={language}
                  onUpdateQuantity={(qty) =>
                    updateQuantity(item.product_id, item.variant_id, qty)
                  }
                  onRemove={() => removeItem(item.product_id, item.variant_id)}
                />
              ))}
            </div>

            {/* Footer */}
            <div className="border-t p-4 space-y-4 bg-white">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('cart.subtotal')}</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('cart.shipping')}</span>
                  <span>
                    {shipping === 0 ? t('cart.freeShipping') : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between font-medium text-lg pt-2 border-t">
                  <span>{t('cart.total')}</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Link href="/checkout" onClick={onClose}>
                  <Button className="w-full" size="lg">
                    {t('cart.checkout')}
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={onClose}
                >
                  {t('cart.continueShopping')}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

interface CartItemCardProps {
  item: CartItem;
  language: string;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

function CartItemCard({ item, language, onUpdateQuantity, onRemove }: CartItemCardProps) {
  const { t } = useLanguage();
  const price = item.product.base_price + (item.variant?.price_adjustment || 0);

  return (
    <div className="flex gap-4">
      {/* Image */}
      <div className="w-20 h-24 bg-muted rounded-md overflow-hidden flex-shrink-0">
        {item.image?.image_url ? (
          <Image
            src={item.image.image_url}
            alt={item.product.name}
            width={80}
            height={96}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <ShoppingBag className="h-8 w-8" />
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm truncate">
          {language === 'es' && item.product.name_es
            ? item.product.name_es
            : item.product.name}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          {item.selected_metal
            ? getMetalDisplayName(item.selected_metal, language)
            : getMetalDisplayName(item.product.metal_type, language)}
          {item.variant?.diamond_grade && ` · ${item.variant.diamond_grade}`}
        </p>
        {item.stone_shape && (
          <p className="text-xs text-muted-foreground">
            Shape: {item.stone_shape.charAt(0).toUpperCase() + item.stone_shape.slice(1)}
          </p>
        )}
        {item.diamond_carat && (
          <p className="text-xs text-muted-foreground">Diamond: {item.diamond_carat} ct</p>
        )}
        {item.ring_size && (
          <p className="text-xs text-muted-foreground">Size: {item.ring_size}</p>
        )}
        <p className="font-medium text-sm mt-2">{formatPrice(price)}</p>

        {/* Quantity controls */}
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center border rounded">
            <button
              onClick={() => onUpdateQuantity(item.quantity - 1)}
              className="p-1.5 hover:bg-muted transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="px-3 text-sm">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.quantity + 1)}
              className="p-1.5 hover:bg-muted transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          <button
            onClick={onRemove}
            className="text-xs text-muted-foreground hover:text-destructive transition-colors"
          >
            {t('cart.remove')}
          </button>
        </div>
      </div>
    </div>
  );
}
