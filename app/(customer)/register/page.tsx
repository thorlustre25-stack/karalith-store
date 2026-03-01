'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button, Input, Spinner } from '@/components/ui';
import { toast } from '@/components/ui/toast';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signUp } = useAuth();
  const { t } = useLanguage();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const redirectTo = searchParams.get('redirect') || '/account';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    const { error } = await signUp(formData.email, formData.password, {
      first_name: formData.first_name,
      last_name: formData.last_name,
    });

    if (error) {
      toast.error('Registration failed', error);
    } else {
      // Send welcome email
      fetch('/api/auth/welcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.first_name,
        }),
      }).catch(console.error);

      toast.success(
        'Account created!',
        'Please check your email to verify your account.'
      );
      router.push(redirectTo);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="font-heading text-3xl text-primary">KaraLITH</span>
          </Link>
          <h1 className="mt-6 text-h2">{t('auth.register')}</h1>
          <p className="mt-2 text-muted-foreground">
            Create an account to track orders and save favorites.
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              placeholder="John"
            />
            <Input
              label="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              placeholder="Doe"
            />
          </div>

          <Input
            label={t('auth.email')}
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
          />

          <Input
            label={t('auth.password')}
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Create a password"
            helperText="Minimum 8 characters"
          />

          <Input
            label="Confirm Password"
            name="confirm_password"
            type="password"
            value={formData.confirm_password}
            onChange={handleChange}
            required
            placeholder="Confirm your password"
          />

          <Button type="submit" className="w-full" loading={loading}>
            {t('auth.register')}
          </Button>
        </form>

        {/* Terms */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          By creating an account, you agree to our{' '}
          <Link href="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
          .
        </p>

        {/* Login link */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {t('auth.hasAccount')}{' '}
          <Link
            href={`/login${redirectTo !== '/account' ? `?redirect=${redirectTo}` : ''}`}
            className="text-primary font-medium hover:underline"
          >
            {t('auth.login')}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center"><Spinner size="lg" /></div>}>
      <RegisterForm />
    </Suspense>
  );
}
