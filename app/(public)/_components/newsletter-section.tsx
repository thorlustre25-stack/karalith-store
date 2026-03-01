'use client';

import { useState } from 'react';
import { Button, Input } from '@/components/ui';
import { toast } from '@/components/ui/toast';
import { useLanguage } from '@/hooks/useLanguage';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { language } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success(
      language === 'es' ? 'Suscrito con exito' : 'Successfully subscribed!',
      language === 'es'
        ? 'Gracias por unirte a nuestra lista.'
        : 'Thank you for joining our list.'
    );

    setEmail('');
    setLoading(false);
  };

  return (
    <section className="py-20 bg-primary text-white">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-h2 mb-4">
            {language === 'es'
              ? 'Unete a Nuestra Lista Exclusiva'
              : 'Join Our Exclusive List'}
          </h2>
          <p className="text-white/80 mb-8">
            {language === 'es'
              ? 'Se el primero en conocer nuevas colecciones, ofertas exclusivas y consejos de estilo.'
              : 'Be the first to know about new collections, exclusive offers, and styling tips.'}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={language === 'es' ? 'Tu correo electronico' : 'Your email address'}
              required
              className="flex-1 px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 focus:border-white/40 focus:outline-none transition-colors"
            />
            <Button
              type="submit"
              variant="gold"
              loading={loading}
              className="whitespace-nowrap"
            >
              {language === 'es' ? 'Suscribirse' : 'Subscribe'}
            </Button>
          </form>

          <p className="mt-4 text-xs text-white/50">
            {language === 'es'
              ? 'Al suscribirte, aceptas recibir correos de marketing.'
              : 'By subscribing, you agree to receive marketing emails.'}
          </p>
        </div>
      </div>
    </section>
  );
}
