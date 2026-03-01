'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, ChevronRight, ShoppingBag } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { Badge, Spinner } from '@/components/ui';
import { formatPrice, formatDate, getOrderStatusColor, getOrderStatusDisplayName } from '@/lib/utils';
import type { Order } from '@/types';

export default function OrdersPage() {
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      const supabase = createClient();
      const { data } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      setOrders(data || []);
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

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
        <h1 className="text-h1">{t('account.orders')}</h1>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground mb-6">
            You haven't placed any orders yet.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            Start Shopping
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/account/orders/${order.id}`}
              className="block bg-white rounded-lg border p-6 hover:border-primary transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/30 flex items-center justify-center">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{order.order_number}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(order.created_at, language === 'es' ? 'es-ES' : 'en-US')}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <Badge className={getOrderStatusColor(order.status)}>
                    {getOrderStatusDisplayName(order.status, language)}
                  </Badge>
                  <p className="mt-2 font-medium">{formatPrice(order.total)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
