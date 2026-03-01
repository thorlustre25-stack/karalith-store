import { createClient } from '@/lib/supabase/server';
import { formatPrice } from '@/lib/utils';
import {
  Package,
  ShoppingBag,
  Users,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
} from 'lucide-react';
import Link from 'next/link';

async function getStats() {
  const supabase = await createClient();

  // Get total orders and revenue
  const { data: orders } = await supabase
    .from('orders')
    .select('total, status')
    .neq('status', 'cancelled');

  const totalOrders = orders?.length || 0;
  const totalRevenue = orders?.reduce((sum, o) => sum + (o.total || 0), 0) || 0;
  const paidOrders = orders?.filter((o) => o.status !== 'pending').length || 0;

  // Get total products
  const { count: productCount } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);

  // Get total customers
  const { count: customerCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true });

  // Get recent orders
  const { data: recentOrders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  // Get orders by status
  const ordersByStatus = {
    pending: orders?.filter((o) => o.status === 'pending').length || 0,
    paid: orders?.filter((o) => o.status === 'paid').length || 0,
    in_production: orders?.filter((o) => o.status === 'in_production').length || 0,
    shipped: orders?.filter((o) => o.status === 'shipped').length || 0,
    delivered: orders?.filter((o) => o.status === 'delivered').length || 0,
  };

  return {
    totalOrders,
    totalRevenue,
    paidOrders,
    productCount: productCount || 0,
    customerCount: customerCount || 0,
    recentOrders: recentOrders || [],
    ordersByStatus,
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const statCards = [
    {
      name: 'Total Revenue',
      value: formatPrice(stats.totalRevenue),
      icon: DollarSign,
      href: '/admin/orders',
      color: 'bg-green-500',
    },
    {
      name: 'Total Orders',
      value: stats.totalOrders.toString(),
      icon: ShoppingBag,
      href: '/admin/orders',
      color: 'bg-blue-500',
    },
    {
      name: 'Products',
      value: stats.productCount.toString(),
      icon: Package,
      href: '/admin/products',
      color: 'bg-purple-500',
    },
    {
      name: 'Customers',
      value: stats.customerCount.toString(),
      icon: Users,
      href: '/admin/customers',
      color: 'bg-orange-500',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-h1">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your store.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.name}
              href={stat.href}
              className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="mt-4 text-2xl font-semibold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.name}</p>
            </Link>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Order Status */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="font-heading text-lg mb-6">Orders by Status</h2>
          <div className="space-y-4">
            {Object.entries(stats.ordersByStatus).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <span className="capitalize text-sm">
                  {status.replace('_', ' ')}
                </span>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{
                        width: `${
                          stats.totalOrders > 0
                            ? (count / stats.totalOrders) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium w-8 text-right">
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-lg">Recent Orders</h2>
            <Link
              href="/admin/orders"
              className="text-sm text-primary hover:underline"
            >
              View All
            </Link>
          </div>
          {stats.recentOrders.length === 0 ? (
            <p className="text-muted-foreground text-sm">No orders yet.</p>
          ) : (
            <div className="space-y-4">
              {stats.recentOrders.map((order: any) => (
                <Link
                  key={order.id}
                  href={`/admin/orders/${order.id}`}
                  className="flex items-center justify-between py-2 hover:bg-muted/50 -mx-2 px-2 rounded"
                >
                  <div>
                    <p className="font-medium text-sm">{order.order_number}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.shipping_first_name} {order.shipping_last_name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">
                      {formatPrice(order.total)}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {order.status.replace('_', ' ')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
