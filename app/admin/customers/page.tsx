import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Badge } from '@/components/ui';
import { formatDate } from '@/lib/utils';
import { Users } from 'lucide-react';

export default async function AdminCustomersPage() {
  const supabase = await createClient();

  const { data: profiles } = await supabase
    .from('profiles')
    .select(`
      *,
      user:id(email)
    `)
    .order('created_at', { ascending: false });

  // Get order counts
  const { data: orderCounts } = await supabase
    .from('orders')
    .select('user_id')
    .not('user_id', 'is', null);

  const orderCountMap = (orderCounts || []).reduce((acc: any, order: any) => {
    acc[order.user_id] = (acc[order.user_id] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-h1">Customers</h1>
        <p className="text-muted-foreground">View registered customers</p>
      </div>

      {!profiles || profiles.length === 0 ? (
        <div className="bg-white rounded-lg border p-12 text-center">
          <Users className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">No customers yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Joined
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Orders
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {profiles.map((profile: any) => (
                <tr key={profile.id} className="hover:bg-muted/30">
                  <td className="px-6 py-4">
                    <p className="font-medium">
                      {profile.first_name || profile.last_name
                        ? `${profile.first_name || ''} ${profile.last_name || ''}`
                        : 'No name'}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {profile.user?.email || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {formatDate(profile.created_at)}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {orderCountMap[profile.id] || 0}
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={profile.role === 'admin' ? 'gold' : 'default'}
                    >
                      {profile.role || 'customer'}
                    </Badge>
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
