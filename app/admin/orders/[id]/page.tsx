'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Package, Mail, Truck } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button, Select, Input, Badge, Spinner } from '@/components/ui';
import { toast } from '@/components/ui/toast';
import {
  formatPrice,
  formatDateTime,
  getOrderStatusColor,
  getOrderStatusDisplayName,
} from '@/lib/utils';
import type { OrderWithDetails, OrderStatus } from '@/types';

const statusOptions: { value: OrderStatus; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'paid', label: 'Paid' },
  { value: 'in_production', label: 'In Production' },
  { value: 'ready', label: 'Ready for Shipping' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
];

export default function AdminOrderDetailPage() {
  const params = useParams();
  const [order, setOrder] = useState<OrderWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<OrderStatus>('pending');
  const [trackingNumber, setTrackingNumber] = useState('');

  const supabase = createClient();

  const fetchOrder = useCallback(async () => {
    const { data } = await supabase
      .from('orders')
      .select(`
        *,
        items:order_items(*)
      `)
      .eq('id', params.id)
      .single();

    if (data) {
      setOrder(data as OrderWithDetails);
      setStatus(data.status);
      setTrackingNumber(data.tracking_number || '');
    }
    setLoading(false);
  }, [params.id, supabase]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const handleUpdateStatus = async () => {
    setSaving(true);

    const updates: any = { status };

    if (status === 'shipped' && trackingNumber) {
      updates.tracking_number = trackingNumber;
      updates.shipped_at = new Date().toISOString();
    }

    if (status === 'delivered') {
      updates.delivered_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', params.id);

    if (error) {
      toast.error('Failed to update order');
    } else {
      toast.success('Order updated');
      await fetchOrder();
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!order) {
    return <p>Order not found</p>;
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Orders
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-h1">Order {order.order_number}</h1>
            <p className="text-muted-foreground">
              Placed on {formatDateTime(order.created_at)}
            </p>
          </div>
          <Badge className={getOrderStatusColor(order.status)}>
            {getOrderStatusDisplayName(order.status)}
          </Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="bg-white rounded-lg border">
            <div className="p-6 border-b">
              <h2 className="font-heading text-lg">Items</h2>
            </div>
            <div className="divide-y">
              {order.items.map((item: any) => (
                <div key={item.id} className="p-6 flex gap-4">
                  <div className="w-16 h-20 bg-muted rounded overflow-hidden flex-shrink-0">
                    {item.product_image_url ? (
                      <Image
                        src={item.product_image_url}
                        alt={item.product_name}
                        width={64}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="h-6 w-6 text-muted-foreground" />
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
                    <div className="mt-2 flex items-center gap-4 text-sm">
                      <span>Qty: {item.quantity}</span>
                      <span>@ {formatPrice(item.unit_price)}</span>
                    </div>
                  </div>
                  <p className="font-medium">{formatPrice(item.total_price)}</p>
                </div>
              ))}
            </div>
            <div className="p-6 border-t bg-muted/30">
              <div className="space-y-2 text-sm max-w-xs ml-auto">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {order.shipping_cost === 0
                      ? 'Free'
                      : formatPrice(order.shipping_cost)}
                  </span>
                </div>
                <div className="flex justify-between font-medium text-base pt-2 border-t">
                  <span>Total</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Note */}
          {order.notes && (
            <div className="bg-white rounded-lg border p-6">
              <h2 className="font-heading text-lg mb-4">Customer Notes</h2>
              <p className="text-muted-foreground">{order.notes}</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-1 space-y-6">
          {/* Status Update */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="font-heading text-lg mb-4">Update Status</h2>
            <div className="space-y-4">
              <Select
                label="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value as OrderStatus)}
                options={statusOptions}
              />

              {status === 'shipped' && (
                <Input
                  label="Tracking Number"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter tracking number"
                />
              )}

              <Button
                onClick={handleUpdateStatus}
                loading={saving}
                className="w-full"
              >
                Update Order
              </Button>
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="font-heading text-lg mb-4">Customer</h2>
            <div className="space-y-3">
              <div>
                <p className="font-medium">
                  {(order as any).shipping_first_name}{' '}
                  {(order as any).shipping_last_name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {order.guest_email || 'Registered user'}
                </p>
              </div>
              {(order as any).shipping_phone && (
                <p className="text-sm text-muted-foreground">
                  {(order as any).shipping_phone}
                </p>
              )}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="font-heading text-lg mb-4">Shipping Address</h2>
            <p className="text-sm text-muted-foreground">
              {(order as any).shipping_first_name}{' '}
              {(order as any).shipping_last_name}
              <br />
              {(order as any).shipping_street}
              <br />
              {(order as any).shipping_city}, {(order as any).shipping_postal_code}
              <br />
              {(order as any).shipping_country}
            </p>
          </div>

          {/* Payment Info */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="font-heading text-lg mb-4">Payment</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className="font-medium capitalize">
                  {order.status === 'pending' ? 'Awaiting Payment' : 'Paid'}
                </span>
              </div>
              {order.stripe_payment_intent_id && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Stripe ID</span>
                  <span className="font-mono text-xs truncate max-w-[150px]">
                    {order.stripe_payment_intent_id}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
