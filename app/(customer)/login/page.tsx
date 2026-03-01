'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Sparkles } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { toast } from '@/components/ui/toast';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn, signInWithMagicLink } = useAuth();
  const { t } = useLanguage();

  const [mode, setMode] = useState<'password' | 'magic'>('password');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const redirectTo = searchParams.get('redirect') || '/account';

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      toast.error('Login failed', error);
    } else {
      toast.success('Welcome back!');
      router.push(redirectTo);
    }

    setLoading(false);
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signInWithMagicLink(email);

    if (error) {
      toast.error('Failed to send magic link', error);
    } else {
      setMagicLinkSent(true);
      toast.success('Check your email', 'We sent you a login link.');
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
          <h1 className="mt-6 text-h2">{t('auth.login')}</h1>
          <p className="mt-2 text-muted-foreground">
            Welcome back. Sign in to access your account.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setMode('password')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              mode === 'password'
                ? 'bg-primary text-white'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Password
          </button>
          <button
            onClick={() => setMode('magic')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              mode === 'magic'
                ? 'bg-primary text-white'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Magic Link
          </button>
        </div>

        {/* Password Login Form */}
        {mode === 'password' && (
          <form onSubmit={handlePasswordLogin} className="space-y-6">
            <Input
              label={t('auth.email')}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
            <div>
              <Input
                label={t('auth.password')}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
              <Link
                href="/forgot-password"
                className="mt-1 inline-block text-sm text-primary hover:underline"
              >
                {t('auth.forgotPassword')}
              </Link>
            </div>

            <Button type="submit" className="w-full" loading={loading}>
              {t('auth.login')}
            </Button>
          </form>
        )}

        {/* Magic Link Form */}
        {mode === 'magic' && (
          <>
            {magicLinkSent ? (
              <div className="text-center p-8 bg-success/10 rounded-lg">
                <Mail className="h-12 w-12 mx-auto text-success mb-4" />
                <h2 className="font-heading text-xl mb-2">Check your email</h2>
                <p className="text-muted-foreground">
                  We sent a login link to <strong>{email}</strong>
                </p>
                <button
                  onClick={() => setMagicLinkSent(false)}
                  className="mt-4 text-sm text-primary hover:underline"
                >
                  Use a different email
                </button>
              </div>
            ) : (
              <form onSubmit={handleMagicLink} className="space-y-6">
                <Input
                  label={t('auth.email')}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  helperText="We'll send you a magic link to sign in instantly."
                />

                <Button
                  type="submit"
                  className="w-full"
                  loading={loading}
                  leftIcon={<Sparkles className="h-4 w-4" />}
                >
                  {t('auth.magicLink')}
                </Button>
              </form>
            )}
          </>
        )}

        {/* Sign up link */}
        <p className="mt-8 text-center text-sm text-muted-foreground">
          {t('auth.noAccount')}{' '}
          <Link
            href={`/register${redirectTo !== '/account' ? `?redirect=${redirectTo}` : ''}`}
            className="text-primary font-medium hover:underline"
          >
            {t('auth.register')}
          </Link>
        </p>
      </div>
    </div>
  );
}
