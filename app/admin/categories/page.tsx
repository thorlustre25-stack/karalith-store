'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, GripVertical } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button, Input, Textarea, Modal, Badge } from '@/components/ui';
import { toast } from '@/components/ui/toast';
import { slugify } from '@/lib/utils';
import type { Category } from '@/types';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    name_es: '',
    slug: '',
    description: '',
    description_es: '',
  });

  const supabase = createClient();

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('display_order');
    setCategories(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      if (name === 'name') {
        newData.slug = slugify(value);
      }
      return newData;
    });
  };

  const openAddModal = () => {
    setEditing(null);
    setFormData({
      name: '',
      name_es: '',
      slug: '',
      description: '',
      description_es: '',
    });
    setModalOpen(true);
  };

  const openEditModal = (category: Category) => {
    setEditing(category);
    setFormData({
      name: category.name,
      name_es: category.name_es || '',
      slug: category.slug,
      description: category.description || '',
      description_es: (category as any).description_es || '',
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editing) {
      const { error } = await supabase
        .from('categories')
        .update({
          name: formData.name,
          name_es: formData.name_es || null,
          slug: formData.slug,
          description: formData.description || null,
          description_es: formData.description_es || null,
        })
        .eq('id', editing.id);

      if (error) {
        toast.error('Failed to update category');
      } else {
        toast.success('Category updated');
        fetchCategories();
      }
    } else {
      const { error } = await supabase.from('categories').insert({
        name: formData.name,
        name_es: formData.name_es || null,
        slug: formData.slug,
        description: formData.description || null,
        description_es: formData.description_es || null,
        display_order: categories.length,
      });

      if (error) {
        toast.error('Failed to create category');
      } else {
        toast.success('Category created');
        fetchCategories();
      }
    }

    setModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure? Products in this category will be uncategorized.')) {
      return;
    }

    const { error } = await supabase.from('categories').delete().eq('id', id);

    if (error) {
      toast.error('Failed to delete category');
    } else {
      toast.success('Category deleted');
      fetchCategories();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-h1">Categories</h1>
          <p className="text-muted-foreground">Manage product categories</p>
        </div>
        <Button onClick={openAddModal} leftIcon={<Plus className="h-4 w-4" />}>
          Add Category
        </Button>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium">Name</th>
              <th className="px-6 py-4 text-left text-sm font-medium">Slug</th>
              <th className="px-6 py-4 text-left text-sm font-medium">
                Status
              </th>
              <th className="px-6 py-4 text-right text-sm font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-muted/30">
                <td className="px-6 py-4">
                  <p className="font-medium">{category.name}</p>
                  {category.name_es && (
                    <p className="text-sm text-muted-foreground">
                      {category.name_es}
                    </p>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground font-mono">
                  {category.slug}
                </td>
                <td className="px-6 py-4">
                  <Badge
                    variant={
                      (category as any).is_active !== false
                        ? 'success'
                        : 'secondary'
                    }
                  >
                    {(category as any).is_active !== false
                      ? 'Active'
                      : 'Inactive'}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => openEditModal(category)}
                      className="p-2 hover:bg-muted rounded"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="p-2 hover:bg-muted rounded text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Category' : 'Add Category'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              label="Name (Spanish)"
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
          <div className="grid grid-cols-2 gap-4">
            <Textarea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
            <Textarea
              label="Description (Spanish)"
              name="description_es"
              value={formData.description_es}
              onChange={handleChange}
              rows={3}
            />
          </div>
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">{editing ? 'Update' : 'Create'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
