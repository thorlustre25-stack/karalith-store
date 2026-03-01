'use client';

import { Star } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const testimonials = [
  {
    name: 'Sofia Martinez',
    location: 'Madrid, Spain',
    text: 'The engagement ring I received is absolutely stunning. The quality and craftsmanship exceeded all my expectations.',
    textEs: 'El anillo de compromiso que recibí es absolutamente impresionante. La calidad y la artesanía superaron todas mis expectativas.',
    rating: 5,
  },
  {
    name: 'Marie Dubois',
    location: 'Paris, France',
    text: 'I love that KaraLITH uses sustainable practices. Beautiful jewelry that I can feel good about wearing.',
    textEs: 'Me encanta que KaraLITH use prácticas sostenibles. Hermosas joyas que me siento bien usando.',
    rating: 5,
  },
  {
    name: 'Emma Thompson',
    location: 'London, UK',
    text: 'The customer service was exceptional. They helped me customize my necklace and the result is perfect.',
    textEs: 'El servicio al cliente fue excepcional. Me ayudaron a personalizar mi collar y el resultado es perfecto.',
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
