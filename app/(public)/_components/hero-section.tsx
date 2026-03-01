'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui';
import { useLanguage } from '@/hooks/useLanguage';

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[80vh] flex items-center">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-jewelry.jpg"
          alt="Luxury jewelry on elegant background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="max-w-2xl">
          <h1 className="font-heading text-display text-white mb-6 animate-slide-up">
            {t('home.heroTitle')}
          </h1>
          <p className="text-xl text-white/90 mb-8 animate-slide-up animation-delay-100">
            {t('home.heroSubtitle')}
          </p>
          <div className="flex flex-wrap gap-4 animate-slide-up animation-delay-200">
            <Link href="/shop">
              <Button size="lg" variant="gold">
                {t('home.shopNow')}
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                {t('home.ourStory')}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
