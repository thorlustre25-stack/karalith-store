'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { useCart } from '@/hooks/useCart';
import { useLanguage } from '@/hooks/useLanguage';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const { t } = useLanguage();
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  useEffect(() => {
    // Clear the cart on successful checkout
    clearCart();

    // Get order number from URL
    const order = searchParams.get('order');
    if (order) {
      setOrderNumber(order);
    }
  }, [clearCart, searchParams]);

  return (
    <div className="container-custom py-16">
      <div className="max-w-lg mx-auto text-center">
        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-success/10 flex items-center justify-center">
          <CheckCircle className="h-10 w-10 text-success" />
        </div>

        <h1 className="text-h1 mb-4">{t('checkout.orderSuccess')}</h1>

        <p className="text-muted-foreground mb-8">
          {t('checkout.orderSuccessMessage')}
        </p>

        {orderNumber && (
          <div className="bg-muted/30 rounded-lg p-6 mb-8">
            <p className="text-sm text-muted-foreground mb-2">Order Number</p>
            <p className="text-xl font-mono font-medium">{orderNumber}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/account/orders">
            <Button variant="outline" leftIcon={<Package className="h-4 w-4" />}>
              View Orders
            </Button>
          </Link>
          <Link href="/shop">
            <Button rightIcon={<ArrowRight className="h-4 w-4" />}>
              Continue Shopping
            </Button>
          </Link>
        </div>

        <div className="mt-12 p-6 border rounded-lg text-left">
          <h2 className="font-heading text-lg mb-4">What happens next?</h2>
          <ol className="space-y-4 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center shrink-0">
                1
              </span>
              <span>
                You'll receive an order confirmation email with your order
                details.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center shrink-0">
                2
              </span>
              <span>
                Our artisans will begin crafting your piece with care.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center shrink-0">
                3
              </span>
              <span>
                Once ready, we'll ship your order and send you tracking
                information.
              </span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
