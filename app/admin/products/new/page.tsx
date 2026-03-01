'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button, Input, Textarea, Select } from '@/components/ui';
import { toast } from '@/components/ui/toast';
import { slugify } from '@/lib/utils';
import type { Category, MetalType } from '@/types';

const metalTypes: { value: MetalType; label: string }[] = [
  { value: 'gold', label: 'Gold' },
  { value: 'white_gold', label: 'White Gold' },
  { value: 'rose_gold', label: 'Rose Gold' },
  { value: 'platinum', label: 'Platinum' },
];

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
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

  useEffect(() => {
    const fetchCategories = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from('categories')
        .select('*')
        .order('display_order');
      setCategories(data || []);
    };
    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      };

      // Auto-generate slug from name
      if (name === 'name') {
        newData.slug = slugify(value);
      }

      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();

    const { data, error } = await supabase
      .from('products')
      .insert({
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
      .select()
      .single();

    if (error) {
      toast.error('Failed to create product', error.message);
      setLoading(false);
      return;
    }

    toast.success('Product created successfully');
    router.push(`/admin/products/${data.id}`);
  };

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
        <h1 className="text-h1">Add New Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
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
            helperText="URL-friendly identifier"
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
              <span className="text-sm">Active (visible on store)</span>
            </label>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <Button type="submit" loading={loading}>
            Create Product
          </Button>
          <Link href="/admin/products">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
