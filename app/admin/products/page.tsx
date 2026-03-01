import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import { Plus, Package, Edit, Eye, EyeOff } from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { formatPrice, getMetalDisplayName } from '@/lib/utils';
import type { ProductWithDetails } from '@/types';

export default async function AdminProductsPage() {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(name),
      images:product_images(image_url, is_primary)
    `)
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-h1">Products</h1>
          <p className="text-muted-foreground">
            Manage your product catalog
          </p>
        </div>
        <Link href="/admin/products/new">
          <Button leftIcon={<Plus className="h-4 w-4" />}>Add Product</Button>
        </Link>
      </div>

      {!products || products.length === 0 ? (
        <div className="bg-white rounded-lg border p-12 text-center">
          <Package className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground mb-4">No products yet.</p>
          <Link href="/admin/products/new">
            <Button leftIcon={<Plus className="h-4 w-4" />}>
              Add Your First Product
            </Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Metal
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((product: any) => {
                const primaryImage = product.images?.find(
                  (img: any) => img.is_primary
                ) || product.images?.[0];

                return (
                  <tr key={product.id} className="hover:bg-muted/30">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-muted rounded overflow-hidden flex-shrink-0">
                          {primaryImage?.image_url ? (
                            <Image
                              src={primaryImage.image_url}
                              alt={product.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="h-6 w-6 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {product.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {product.category?.name || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {getMetalDisplayName(product.metal_type)}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      {formatPrice(product.base_price)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {product.is_active ? (
                          <Badge variant="success">Active</Badge>
                        ) : (
                          <Badge variant="secondary">Inactive</Badge>
                        )}
                        {product.is_featured && (
                          <Badge variant="gold">Featured</Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
