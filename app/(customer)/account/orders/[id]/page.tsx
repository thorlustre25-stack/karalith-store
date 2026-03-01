'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { Badge, Spinner } from '@/components/ui';
import {
  formatPrice,
  formatDate,
  getOrderStatusColor,
  getOrderStatusDisplayName,
} from '@/lib/utils';
import type { OrderWithDetails, OrderStatus } from '@/types';

const statusSteps: { status: OrderStatus; icon: any }[] = [
  { status: 'paid', icon: CheckCircle },
  { status: 'in_production', icon: Package },
  { status: 'shipped', icon: Truck },
  { status: 'delivered', icon: CheckCircle },
];

export default function OrderDetailPage() {
  const params = useParams();
  const { user } = useAuth();
  const { language } = useLanguage();
  const [order, setOrder] = useState<OrderWithDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!user || !params.id) return;

      const supabase = createClient();
      const { data } = await supabase
        .from('orders')
        .select(`
          *,
          items:order_items(
            *,
            product:products(*),
            variant:product_variants(*)
          )
        `)
        .eq('id', params.id)
        .eq('user_id', user.id)
        .single();

      setOrder(data as OrderWithDetails);
      setLoading(false);
    };

    fetchOrder();
  }, [user, params.id]);

  if (loading) {
    return (
      <div className="container-custom py-8 flex justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container-custom py-8">
        <p className="text-center text-muted-foreground">Order not found</p>
      </div>
    );
  }

  const currentStepIndex = statusSteps.findIndex(
    (s) => s.status === order.status
  );

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/account/orders"
          className="text-sm text-muted-foreground hover:text-primary mb-2 inline-block"
        >
          &larr; Back to Orders
        </Link>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-h1">Order {order.order_number}</h1>
            <p className="text-muted-foreground">
              Placed on{' '}
              {formatDate(
                order.created_at,
                language === 'es' ? 'es-ES' : 'en-US'
              )}
            </p>
          </div>
          <Badge className={getOrderStatusColor(order.status)}>
            {getOrderStatusDisplayName(order.status, language)}
          </Badge>
        </div>
      </div>

      {/* Status Progress */}
      {order.status !== 'pending' && order.status !== 'cancelled' && (
        <div className="bg-white rounded-lg border p-6 mb-8">
          <h2 className="font-heading text-lg mb-6">Order Status</h2>
          <div className="flex items-center justify-between">
            {statusSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <div key={step.status} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isActive
                          ? 'bg-primary text-white'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <p
                      className={`mt-2 text-xs ${
                        isCurrent ? 'font-medium' : 'text-muted-foreground'
                      }`}
                    >
                      {getOrderStatusDisplayName(step.status, language)}
                    </p>
                  </div>
                  {index < statusSteps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-4 ${
                        index < currentStepIndex ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {order.tracking_number && (
            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-muted-foreground">
                Tracking Number:{' '}
                <span className="font-mono font-medium text-foreground">
                  {order.tracking_number}
                </span>
              </p>
            </div>
          )}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Order Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border">
            <div className="p-6 border-b">
              <h2 className="font-heading text-lg">Items</h2>
            </div>
            <div className="divide-y">
              {order.items.map((item) => (
                <div key={item.id} className="p-6 flex gap-4">
                  <div className="w-20 h-24 bg-muted rounded overflow-hidden flex-shrink-0">
                    {item.product_image_url ? (
                      <Image
                        src={item.product_image_url}
                        alt={item.product_name}
                        width={80}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.product_name}</p>
                    {item.variant_info && (
                      <p className="text-sm text-muted-foreground">
                        {item.variant_info}
                      </p>
                    )}
                    {item.ring_size && (
                      <p className="text-sm text-muted-foreground">
                        Size: {item.ring_size}
                      </p>
                    )}
                    {item.customization_notes && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Note: {item.customization_notes}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground mt-2">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">{formatPrice(item.total_price)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1 space-y-6">
          {/* Order Summary */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="font-heading text-lg mb-4">Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>
                  {order.shipping_cost === 0
                    ? 'Free'
                    : formatPrice(order.shipping_cost)}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t text-base font-medium">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="font-heading text-lg mb-4">Shipping Address</h2>
            <p className="text-sm text-muted-foreground">
              {order.shipping_first_name} {order.shipping_last_name}
              <br />
              {order.shipping_street}
              <br />
              {order.shipping_city}, {order.shipping_postal_code}
              <br />
              {order.shipping_country}
            </p>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="bg-white rounded-lg border p-6">
              <h2 className="font-heading text-lg mb-4">Order Notes</h2>
              <p className="text-sm text-muted-foreground">{order.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
