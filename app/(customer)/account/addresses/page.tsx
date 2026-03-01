'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MapPin, Plus, Trash2, Check } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { Button, Input, Select, Modal } from '@/components/ui';
import { toast } from '@/components/ui/toast';
import { getCountries } from '@/lib/utils';
import type { Address } from '@/types';

export default function AddressesPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Address | null>(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    street: '',
    city: '',
    postal_code: '',
    country: 'ES',
    phone: '',
  });

  const supabase = createClient();

  const fetchAddresses = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', user.id)
      .order('is_default', { ascending: false });

    setAddresses(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchAddresses();
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const openAddModal = () => {
    setEditing(null);
    setFormData({
      first_name: '',
      last_name: '',
      street: '',
      city: '',
      postal_code: '',
      country: 'ES',
      phone: '',
    });
    setModalOpen(true);
  };

  const openEditModal = (address: Address) => {
    setEditing(address);
    setFormData({
      first_name: (address as any).first_name || '',
      last_name: (address as any).last_name || '',
      street: address.street,
      city: address.city,
      postal_code: address.postal_code,
      country: address.country,
      phone: (address as any).phone || '',
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editing) {
      const { error } = await supabase
        .from('addresses')
        .update(formData)
        .eq('id', editing.id);

      if (error) {
        toast.error('Failed to update address');
      } else {
        toast.success('Address updated');
        fetchAddresses();
      }
    } else {
      const { error } = await supabase.from('addresses').insert({
        ...formData,
        user_id: user?.id,
        is_default: addresses.length === 0,
      });

      if (error) {
        toast.error('Failed to add address');
      } else {
        toast.success('Address added');
        fetchAddresses();
      }
    }

    setModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('addresses').delete().eq('id', id);

    if (error) {
      toast.error('Failed to delete address');
    } else {
      toast.success('Address deleted');
      fetchAddresses();
    }
  };

  const handleSetDefault = async (id: string) => {
    // First, unset all defaults
    await supabase
      .from('addresses')
      .update({ is_default: false })
      .eq('user_id', user?.id);

    // Set the new default
    const { error } = await supabase
      .from('addresses')
      .update({ is_default: true })
      .eq('id', id);

    if (error) {
      toast.error('Failed to set default address');
    } else {
      toast.success('Default address updated');
      fetchAddresses();
    }
  };

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <Link
            href="/account"
            className="text-sm text-muted-foreground hover:text-primary mb-2 inline-block"
          >
            &larr; Back to Account
          </Link>
          <h1 className="text-h1">{t('account.addresses')}</h1>
        </div>
        <Button onClick={openAddModal} leftIcon={<Plus className="h-4 w-4" />}>
          Add Address
        </Button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-16">
          <MapPin className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground mb-6">
            You haven't saved any addresses yet.
          </p>
          <Button onClick={openAddModal} leftIcon={<Plus className="h-4 w-4" />}>
            Add Your First Address
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`bg-white rounded-lg border p-6 ${
                address.is_default ? 'border-primary' : ''
              }`}
            >
              {address.is_default && (
                <span className="inline-flex items-center gap-1 text-xs text-primary font-medium mb-3">
                  <Check className="h-3 w-3" />
                  Default Address
                </span>
              )}
              <p className="font-medium">
                {(address as any).first_name} {(address as any).last_name}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {address.street}
                <br />
                {address.city}, {address.postal_code}
                <br />
                {getCountries().find((c) => c.code === address.country)?.name}
              </p>
              {(address as any).phone && (
                <p className="text-sm text-muted-foreground mt-1">
                  {(address as any).phone}
                </p>
              )}

              <div className="mt-4 pt-4 border-t flex gap-4">
                <button
                  onClick={() => openEditModal(address)}
                  className="text-sm text-primary hover:underline"
                >
                  Edit
                </button>
                {!address.is_default && (
                  <>
                    <button
                      onClick={() => handleSetDefault(address.id)}
                      className="text-sm text-primary hover:underline"
                    >
                      Set as Default
                    </button>
                    <button
                      onClick={() => handleDelete(address.id)}
                      className="text-sm text-destructive hover:underline"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Address' : 'Add Address'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
            <Input
              label="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <Input
            label="Street Address"
            name="street"
            value={formData.street}
            onChange={handleChange}
            required
          />
          <div className="grid grid-cols-3 gap-4">
            <Input
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <Input
              label="Postal Code"
              name="postal_code"
              value={formData.postal_code}
              onChange={handleChange}
              required
            />
            <Select
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              options={getCountries().map((c) => ({
                value: c.code,
                label: c.name,
              }))}
            />
          </div>
          <Input
            label="Phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
          />
          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">{editing ? 'Update' : 'Add'} Address</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
