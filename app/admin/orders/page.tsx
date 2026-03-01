import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Badge } from '@/components/ui';
import {
  formatPrice,
  formatDate,
  getOrderStatusColor,
  getOrderStatusDisplayName,
} from '@/lib/utils';
import type { Order } from '@/types';

export default async function AdminOrdersPage() {
  const supabase = await createClient();

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-h1">Orders</h1>
        <p className="text-muted-foreground">Manage customer orders</p>
      </div>

      {!orders || orders.length === 0 ? (
        <div className="bg-white rounded-lg border p-12 text-center">
          <p className="text-muted-foreground">No orders yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Order
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {orders.map((order: Order) => (
                <tr key={order.id} className="hover:bg-muted/30">
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {order.order_number}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm">
                      {(order as any).shipping_first_name}{' '}
                      {(order as any).shipping_last_name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {order.guest_email || 'Registered user'}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {formatDate(order.created_at)}
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={getOrderStatusColor(order.status)}>
                      {getOrderStatusDisplayName(order.status)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right font-medium">
                    {formatPrice(order.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
