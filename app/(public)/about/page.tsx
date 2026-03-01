import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Leaf, Heart, Award, Globe, Users } from 'lucide-react';
import { Button } from '@/components/ui';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about KaraLITH - our story, craftsmanship, and commitment to sustainable luxury jewelry.',
};

const values = [
  {
    icon: Sparkles,
    title: 'Exceptional Quality',
    description:
      'Each piece is crafted with the finest materials and meticulous attention to detail by our master artisans.',
  },
  {
    icon: Leaf,
    title: 'Sustainable Practices',
    description:
      'We use ethically sourced diamonds and recycled precious metals, minimizing our environmental impact.',
  },
  {
    icon: Heart,
    title: 'Handmade with Love',
    description:
      'Every piece is handcrafted in our Barcelona atelier, ensuring unique character and superior quality.',
  },
  {
    icon: Award,
    title: 'Certified Excellence',
    description:
      'All our diamonds are certified by leading gemological institutes, guaranteeing authenticity and quality.',
  },
  {
    icon: Globe,
    title: 'Ethical Sourcing',
    description:
      'We work only with suppliers who share our commitment to ethical labor practices and environmental responsibility.',
  },
  {
    icon: Users,
    title: 'Customer First',
    description:
      'Your satisfaction is our priority. We offer personalized service and a 2-year warranty on all pieces.',
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about-hero.jpg"
            alt="KaraLITH jewelry workshop"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary/70" />
        </div>
        <div className="container-custom relative z-10 text-white">
          <h1 className="font-heading text-display max-w-2xl">Our Story</h1>
          <p className="mt-6 text-xl text-white/90 max-w-xl">
            Born from a passion for timeless elegance and sustainable luxury
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-h2 mb-6">The KaraLITH Journey</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  KaraLITH was founded in 2018 in Barcelona, born from a simple
                  belief: that luxury jewelry can be both exquisitely beautiful
                  and ethically responsible.
                </p>
                <p>
                  Our founder, Maria Karali, a third-generation jeweler, saw an
                  opportunity to revolutionize the industry. Drawing on her
                  family's century-old craftsmanship traditions and combining them
                  with modern sustainable practices, she created a brand that
                  honors the past while embracing the future.
                </p>
                <p>
                  Today, KaraLITH continues to craft each piece by hand in our
                  Barcelona atelier, using only ethically sourced diamonds and
                  recycled precious metals. Every creation tells a story of
                  artistry, integrity, and enduring beauty.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
              <Image
                src="/images/about-founder.jpg"
                alt="KaraLITH founder in workshop"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section id="craftsmanship" className="section bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Craftsmanship</h2>
            <div className="divider mt-4 mb-6" />
            <p className="section-subtitle">
              The art of creating timeless jewelry, passed down through generations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-secondary/30 flex items-center justify-center">
                <span className="text-3xl font-heading text-primary">1</span>
              </div>
              <h3 className="font-heading text-xl mb-3">Design</h3>
              <p className="text-muted-foreground">
                Each piece begins as a sketch, drawing inspiration from nature,
                architecture, and timeless elegance.
              </p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-secondary/30 flex items-center justify-center">
                <span className="text-3xl font-heading text-primary">2</span>
              </div>
              <h3 className="font-heading text-xl mb-3">Crafting</h3>
              <p className="text-muted-foreground">
                Our master artisans hand-craft each piece using traditional
                techniques refined over generations.
              </p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-secondary/30 flex items-center justify-center">
                <span className="text-3xl font-heading text-primary">3</span>
              </div>
              <h3 className="font-heading text-xl mb-3">Finishing</h3>
              <p className="text-muted-foreground">
                Every piece undergoes rigorous quality checks before being
                polished to perfection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section id="sustainability" className="section bg-primary text-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src="/images/about-sustainability.jpg"
                alt="Sustainable jewelry practices"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="font-heading text-h2 mb-6">
                Committed to Sustainability
              </h2>
              <div className="space-y-4 text-white/80 leading-relaxed">
                <p>
                  At KaraLITH, sustainability isn't just a buzzword - it's at the
                  core of everything we do.
                </p>
                <p>
                  <strong className="text-white">Ethical Diamonds:</strong> We
                  source only conflict-free diamonds that are certified by
                  leading gemological institutes.
                </p>
                <p>
                  <strong className="text-white">Recycled Metals:</strong> 100%
                  of our gold and platinum comes from recycled sources, reducing
                  the need for new mining.
                </p>
                <p>
                  <strong className="text-white">Carbon Neutral:</strong> We
                  offset all carbon emissions from our operations and shipping.
                </p>
                <p>
                  <strong className="text-white">Minimal Packaging:</strong> Our
                  packaging is made from recycled and recyclable materials.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Values</h2>
            <div className="divider mt-4" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/30 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-secondary/20">
        <div className="container-custom text-center">
          <h2 className="text-h2 mb-4">Ready to Find Your Perfect Piece?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Explore our collection of handcrafted sustainable luxury jewelry.
          </p>
          <Link href="/shop">
            <Button size="lg">Shop Now</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
