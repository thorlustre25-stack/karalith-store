'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';

const categories = [
  {
    name: 'Rings',
    nameEs: 'Anillos',
    slug: 'rings',
    image: '/images/categories/rings.jpg',
    description: 'Handcrafted rings',
    descriptionEs: 'Anillos artesanales',
  },
  {
    name: 'Necklaces',
    nameEs: 'Collares',
    slug: 'necklaces',
    image: '/images/categories/necklaces.jpg',
    description: 'Elegant necklaces',
    descriptionEs: 'Collares elegantes',
  },
  {
    name: 'Earrings',
    nameEs: 'Pendientes',
    slug: 'earrings',
    image: '/images/categories/earrings.jpg',
    description: 'Stunning earrings',
    descriptionEs: 'Pendientes impresionantes',
  },
  {
    name: 'Bracelets',
    nameEs: 'Pulseras',
    slug: 'bracelets',
    image: '/images/categories/bracelets.jpg',
    description: 'Beautiful bracelets',
    descriptionEs: 'Hermosas pulseras',
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
          <div className="divider mt-4" />
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/shop/${category.slug}`}
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              {/* Image */}
              <div className="absolute inset-0 bg-muted">
                <Image
                  src={category.image}
                  alt={language === 'es' ? category.nameEs : category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(min-width: 768px) 25vw, 50vw"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center text-white">
                <h3 className="font-heading text-xl md:text-2xl mb-1">
                  {language === 'es' ? category.nameEs : category.name}
                </h3>
                <p className="text-sm text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                  {language === 'es' ? category.descriptionEs : category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
