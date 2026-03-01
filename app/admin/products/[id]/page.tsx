'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Upload, X, GripVertical, Plus, Trash2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button, Input, Textarea, Select, Spinner } from '@/components/ui';
import { toast } from '@/components/ui/toast';
import { slugify } from '@/lib/utils';
import type { Category, MetalType, ProductWithDetails, ProductVariant } from '@/types';

const metalTypes: { value: MetalType; label: string }[] = [
  { value: 'gold', label: 'Gold' },
  { value: 'white_gold', label: 'White Gold' },
  { value: 'rose_gold', label: 'Rose Gold' },
  { value: 'platinum', label: 'Platinum' },
];

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [product, setProduct] = useState<ProductWithDetails | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    name_es: '',
    slug: '',
    description: '',
    description_es: '',
    category_id: '',
    base_price: '',
    metal_type: 'gold' as MetalType,
    is_handmade: true,
    is_featured: false,
    is_active: true,
  });
  const [images, setImages] = useState<any[]>([]);
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [uploading, setUploading] = useState(false);

  const supabase = createClient();

  const fetchProduct = useCallback(async () => {
    const { data } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*),
        images:product_images(*),
        variants:product_variants(*)
      `)
      .eq('id', params.id)
      .single();

    if (data) {
      setProduct(data as ProductWithDetails);
      setFormData({
        name: data.name,
        name_es: data.name_es || '',
        slug: data.slug,
        description: data.description || '',
        description_es: data.description_es || '',
        category_id: data.category_id || '',
        base_price: data.base_price.toString(),
        metal_type: data.metal_type,
        is_handmade: data.is_handmade,
        is_featured: data.is_featured,
        is_active: data.is_active,
      });
      setImages(data.images || []);
      setVariants(data.variants || []);
    }
    setLoading(false);
  }, [params.id, supabase]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase
        .from('categories')
        .select('*')
        .order('display_order');
      setCategories(data || []);
    };
    fetchCategories();
    fetchProduct();
  }, [fetchProduct, supabase]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase
      .from('products')
      .update({
        name: formData.name,
        name_es: formData.name_es || null,
        slug: formData.slug,
        description: formData.description || null,
        description_es: formData.description_es || null,
        category_id: formData.category_id || null,
        base_price: parseFloat(formData.base_price),
        metal_type: formData.metal_type,
        is_handmade: formData.is_handmade,
        is_featured: formData.is_featured,
        is_active: formData.is_active,
      })
      .eq('id', params.id);

    if (error) {
      toast.error('Failed to update product', error.message);
    } else {
      toast.success('Product updated successfully');
    }

    setSaving(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    for (const file of Array.from(files)) {
      const fileName = `${params.id}/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, file);

      if (uploadError) {
        toast.error('Failed to upload image');
        continue;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

      // Add image record to database
      await supabase.from('product_images').insert({
        product_id: params.id,
        image_url: publicUrl,
        display_order: images.length,
        is_primary: images.length === 0,
      });
    }

    await fetchProduct();
    setUploading(false);
  };

  const handleSetPrimary = async (imageId: string) => {
    await supabase
      .from('product_images')
      .update({ is_primary: false })
      .eq('product_id', params.id);

    await supabase
      .from('product_images')
      .update({ is_primary: true })
      .eq('id', imageId);

    await fetchProduct();
    toast.success('Primary image updated');
  };

  const handleDeleteImage = async (imageId: string) => {
    await supabase.from('product_images').delete().eq('id', imageId);
    await fetchProduct();
    toast.success('Image deleted');
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', params.id);

    if (error) {
      toast.error('Failed to delete product');
    } else {
      toast.success('Product deleted');
      router.push('/admin/products');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>
        <h1 className="text-h1">Edit Product</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-lg border p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Product Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Product Name (Spanish)"
                  name="name_es"
                  value={formData.name_es}
                  onChange={handleChange}
                />
              </div>

              <Input
                label="Slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
              />

              <div className="grid md:grid-cols-2 gap-6">
                <Textarea
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                />
                <Textarea
                  label="Description (Spanish)"
                  name="description_es"
                  value={formData.description_es}
                  onChange={handleChange}
                  rows={4}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Select
                  label="Category"
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  options={categories.map((c) => ({ value: c.id, label: c.name }))}
                  placeholder="Select category..."
                />
                <Select
                  label="Metal Type"
                  name="metal_type"
                  value={formData.metal_type}
                  onChange={handleChange}
                  options={metalTypes}
                />
                <Input
                  label="Base Price (EUR)"
                  name="base_price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.base_price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_handmade"
                    checked={formData.is_handmade}
                    onChange={handleChange}
                    className="rounded border-input"
                  />
                  <span className="text-sm">Handmade</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_featured"
                    checked={formData.is_featured}
                    onChange={handleChange}
                    className="rounded border-input"
                  />
                  <span className="text-sm">Featured</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                    className="rounded border-input"
                  />
                  <span className="text-sm">Active</span>
                </label>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <Button type="submit" loading={saving}>
                Save Changes
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
              >
                Delete Product
              </Button>
            </div>
          </form>
        </div>

        {/* Images Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border p-6">
            <h2 className="font-heading text-lg mb-4">Product Images</h2>

            <div className="space-y-4">
              {images.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No images uploaded yet.
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {images
                    .sort((a, b) => a.display_order - b.display_order)
                    .map((image) => (
                      <div
                        key={image.id}
                        className={`relative aspect-square rounded overflow-hidden border-2 ${
                          image.is_primary
                            ? 'border-primary'
                            : 'border-transparent'
                        }`}
                      >
                        <Image
                          src={image.image_url}
                          alt=""
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          {!image.is_primary && (
                            <button
                              onClick={() => handleSetPrimary(image.id)}
                              className="p-2 bg-white rounded-full text-xs"
                              title="Set as primary"
                            >
                              Primary
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteImage(image.id)}
                            className="p-2 bg-destructive text-white rounded-full"
                            title="Delete"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        {image.is_primary && (
                          <span className="absolute top-1 left-1 bg-primary text-white text-xs px-2 py-0.5 rounded">
                            Primary
                          </span>
                        )}
                      </div>
                    ))}
                </div>
              )}

              <label className="block">
                <div className="flex items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors">
                  {uploading ? (
                    <Spinner size="sm" />
                  ) : (
                    <div className="text-center">
                      <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mt-1">
                        Upload Images
                      </p>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
