'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Leaf, Heart } from 'lucide-react';
import { Button } from '@/components/ui';
import { useLanguage } from '@/hooks/useLanguage';

const values = [
  {
    icon: Sparkles,
    title: 'Exceptional Quality',
    titleEs: 'Calidad Excepcional',
    description: 'Each piece is crafted with the finest materials and meticulous attention to detail.',
    descriptionEs: 'Cada pieza está elaborada con los mejores materiales y meticulosa atención al detalle.',
  },
  {
    icon: Leaf,
    title: 'Sustainable Luxury',
    titleEs: 'Lujo Sostenible',
    description: 'We use ethically sourced diamonds and recycled precious metals.',
    descriptionEs: 'Utilizamos diamantes de origen ético y metales preciosos reciclados.',
  },
  {
    icon: Heart,
    title: 'Handmade with Love',
    titleEs: 'Hecho a Mano con Amor',
    description: 'Every piece is handcrafted by skilled artisans in Barcelona.',
    descriptionEs: 'Cada pieza está hecha a mano por artesanos expertos en Barcelona.',
  },
];

export function AboutSection() {
  const { language, t } = useLanguage();

  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-lg overflow-hidden">
            <Image
              src="/images/about-craftsmanship.jpg"
              alt="Engagement ring craftsmanship"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>

          {/* Content */}
          <div>
            <h2 className="text-h2 mb-6">{t('home.sustainabilityTitle')}</h2>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              {t('home.sustainabilityText')}
            </p>

            {/* Values */}
            <div className="space-y-6 mb-8">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div key={value.title} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/30 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg mb-1">
                        {language === 'es' ? value.titleEs : value.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {language === 'es' ? value.descriptionEs : value.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link href="/about">
              <Button variant="outline">{t('common.learnMore')}</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
