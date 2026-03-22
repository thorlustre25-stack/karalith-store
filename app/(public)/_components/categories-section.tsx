'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { Gem, Sparkles, Heart, Crown } from 'lucide-react';

const ringStyles = [
  {
    name: 'Solitaire',
    nameEs: 'Solitario',
    style: 'solitaire',
    icon: Gem,
    description: 'Timeless single diamond elegance',
    descriptionEs: 'Elegancia atemporal de un solo diamante',
  },
  {
    name: 'Halo',
    nameEs: 'Halo',
    style: 'halo',
    icon: Sparkles,
    description: 'Center stone surrounded by brilliance',
    descriptionEs: 'Piedra central rodeada de brillo',
  },
  {
    name: 'Three-Stone',
    nameEs: 'Tres Piedras',
    style: 'three-stone',
    icon: Heart,
    description: 'Past, present, and future',
    descriptionEs: 'Pasado, presente y futuro',
  },
  {
    name: 'Vintage',
    nameEs: 'Vintage',
    style: 'vintage',
    icon: Crown,
    description: 'Inspired by timeless eras',
    descriptionEs: 'Inspirado en épocas atemporales',
  },
];

export function CategoriesSection() {
  const { language, t } = useLanguage();

  return (
    <section className="section bg-muted/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="section-title">{t('home.categoriesTitle')}</h2>
          <p className="text-muted-foreground mt-2">
            {language === 'es'
              ? 'Descubre el estilo perfecto para tu momento especial'
              : 'Discover the perfect style for your special moment'}
          </p>
          <div className="divider mt-4" />
        </div>

        {/* Ring styles grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {ringStyles.map((style) => {
            const Icon = style.icon;
            return (
              <Link
                key={style.style}
                href={`/shop?style=${style.style}`}
                className="group relative bg-white rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-all duration-300 border border-border/50 hover:border-primary/30"
              >
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-8 w-8 text-primary" />
                </div>

                {/* Content */}
                <h3 className="font-heading text-xl mb-2 text-primary">
                  {language === 'es' ? style.nameEs : style.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'es' ? style.descriptionEs : style.description}
                </p>

                {/* Hover arrow */}
                <div className="mt-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">
                    {language === 'es' ? 'Explorar' : 'Explore'} →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
