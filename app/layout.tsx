import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { OrganizationJsonLd } from '@/components/seo';

export const metadata: Metadata = {
  title: {
    default: 'KaraLITH | Handcrafted Engagement Rings',
    template: '%s | KaraLITH',
  },
  description:
    'Handcrafted engagement rings with ethically sourced diamonds. Solitaire, halo, three-stone, and vintage styles crafted with care in Barcelona.',
  keywords: [
    'engagement rings',
    'diamond engagement rings',
    'ethical diamonds',
    'handmade engagement rings',
    'sustainable engagement rings',
    'solitaire rings',
    'halo engagement rings',
    'custom engagement rings',
    'Barcelona jewelry',
  ],
  authors: [{ name: 'KaraLITH' }],
  creator: 'KaraLITH',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'es_ES',
    siteName: 'KaraLITH',
    title: 'KaraLITH | Handcrafted Engagement Rings',
    description:
      'Handcrafted engagement rings with ethically sourced diamonds. Find your perfect ring.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'KaraLITH Engagement Rings',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KaraLITH | Handcrafted Engagement Rings',
    description:
      'Handcrafted engagement rings with ethically sourced diamonds. Find your perfect ring.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/images/logo/icon.png',
    apple: '/images/logo/icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <OrganizationJsonLd
          name="KaraLITH"
          url="https://karalith.com"
          logo="https://karalith.com/images/logo.png"
          description="Handcrafted engagement rings in Barcelona with ethically sourced diamonds. Solitaire, halo, three-stone, and vintage styles."
          address={{
            streetAddress: 'Carrer de Valencia, 123',
            addressLocality: 'Barcelona',
            postalCode: '08011',
            addressCountry: 'ES',
          }}
          contactPoint={{
            telephone: '+34-123-456-789',
            email: 'hello@karalith.com',
          }}
        />
      </head>
      <body className="font-body antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
