import Image from 'next/image';
import { Instagram } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KaraLITH | Handcrafted Engagement Rings — Coming Soon',
  description:
    'KaraLITH — Handcrafted engagement rings with ethically sourced diamonds. Launching soon from Barcelona.',
  keywords: [
    'engagement rings',
    'handcrafted engagement rings',
    'ethical diamonds',
    'Barcelona jewelry',
    'custom engagement rings',
    'KaraLITH',
  ],
  openGraph: {
    title: 'KaraLITH | Handcrafted Engagement Rings — Coming Soon',
    description:
      'Handcrafted engagement rings with ethically sourced diamonds, designed with love in Barcelona. Launching soon.',
    url: 'https://karalith.com',
    siteName: 'KaraLITH',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/images/logo/logo.png',
        width: 330,
        height: 215,
        alt: 'KaraLITH — Handcrafted Engagement Rings',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'KaraLITH | Handcrafted Engagement Rings — Coming Soon',
    description:
      'Handcrafted engagement rings with ethically sourced diamonds. Launching soon from Barcelona.',
    images: ['/images/logo/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://karalith.com',
  },
};

export default function ComingSoonPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-primary overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Gold accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-2xl mx-auto">
        {/* Logo */}
        <Image
          src="/images/logo/logo-white.svg"
          alt="KaraLITH"
          width={220}
          height={144}
          className="h-28 sm:h-36 md:h-44 w-auto mb-12"
          priority
        />

        {/* Divider */}
        <div className="w-16 h-px bg-gold mb-10" />

        {/* Tagline */}
        <h1 className="font-heading text-white text-2xl sm:text-3xl md:text-4xl tracking-wide mb-6">
          Something Beautiful is Coming
        </h1>

        <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-md mb-12">
          Handcrafted engagement rings with ethically sourced diamonds, designed with love in Barcelona.
        </p>

        {/* Contact */}
        <div className="flex flex-col items-center gap-6">
          <a
            href="mailto:thor.karalith@gmail.com"
            className="text-gold hover:text-gold-300 transition-colors text-sm tracking-widest uppercase"
          >
            thor.karalith@gmail.com
          </a>

          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/karalith"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom text */}
      <div className="absolute bottom-6 text-white/30 text-xs tracking-widest uppercase">
        &copy; {new Date().getFullYear()} KaraLITH
      </div>
    </div>
  );
}
