'use client';

import { Star } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const testimonials = [
  {
    name: 'Sofia Martinez',
    location: 'Madrid, Spain',
    text: 'The engagement ring I received is absolutely stunning. The quality and craftsmanship exceeded all my expectations. She said yes!',
    textEs: 'El anillo de compromiso que recibí es absolutamente impresionante. La calidad y la artesanía superaron todas mis expectativas. ¡Ella dijo que sí!',
    rating: 5,
  },
  {
    name: 'James & Marie',
    location: 'Paris, France',
    text: 'We chose KaraLITH for our engagement ring because of their ethical diamonds. The ring is breathtaking and meaningful.',
    textEs: 'Elegimos KaraLITH para nuestro anillo de compromiso por sus diamantes éticos. El anillo es impresionante y significativo.',
    rating: 5,
  },
  {
    name: 'Emma Thompson',
    location: 'London, UK',
    text: 'The team helped me design a custom engagement ring. They listened to every detail and the result is absolutely perfect.',
    textEs: 'El equipo me ayudó a diseñar un anillo de compromiso personalizado. Escucharon cada detalle y el resultado es absolutamente perfecto.',
    rating: 5,
  },
];

export function TestimonialsSection() {
  const { language, t } = useLanguage();

  return (
    <section className="section bg-secondary/20">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="section-title">{t('home.testimonialsTitle')}</h2>
          <div className="divider mt-4" />
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-8 shadow-card"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-gold text-gold"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{language === 'es' ? testimonial.textEs : testimonial.text}"
              </p>

              {/* Author */}
              <div>
                <p className="font-medium">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
