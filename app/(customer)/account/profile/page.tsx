'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { Button, Input } from '@/components/ui';
import { toast } from '@/components/ui/toast';

export default function ProfilePage() {
  const { user, profile, updateProfile } = useAuth();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: profile?.first_name || '',
    last_name: profile?.last_name || '',
    phone: profile?.phone || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await updateProfile(formData);

    if (error) {
      toast.error('Failed to update profile', error);
    } else {
      toast.success('Profile updated');
    }

    setLoading(false);
  };

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
        <h1 className="text-h1">{t('account.profile')}</h1>
      </div>

      <div className="max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg border p-6">
            <h2 className="font-heading text-lg mb-6">Personal Information</h2>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
                <Input
                  label="Last Name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </div>

              <Input
                label="Email"
                type="email"
                value={user?.email || ''}
                disabled
                helperText="Email cannot be changed"
              />

              <Input
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+34 612 345 678"
              />
            </div>
          </div>

          <Button type="submit" loading={loading}>
            {t('common.save')}
          </Button>
        </form>

        {/* Password Section */}
        <div className="mt-8 bg-white rounded-lg border p-6">
          <h2 className="font-heading text-lg mb-4">Password</h2>
          <p className="text-sm text-muted-foreground mb-4">
            To change your password, we'll send you a reset link to your email.
          </p>
          <Button variant="outline" disabled>
            Change Password
          </Button>
        </div>

        {/* Delete Account */}
        <div className="mt-8 bg-white rounded-lg border border-destructive/20 p-6">
          <h2 className="font-heading text-lg mb-4 text-destructive">
            Delete Account
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Permanently delete your account and all associated data. This action
            cannot be undone.
          </p>
          <Button variant="destructive" disabled>
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
}
