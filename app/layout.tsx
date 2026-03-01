import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { OrganizationJsonLd } from '@/components/seo';

export const metadata: Metadata = {
  title: {
    default: 'KaraLITH | Sustainable Luxury Jewelry',
    template: '%s | KaraLITH',
  },
  description:
    'Discover handcrafted sustainable luxury jewelry. Ethically sourced diamonds and precious metals, crafted with care in Barcelona.',
  keywords: [
    'luxury jewelry',
    'sustainable jewelry',
    'ethical diamonds',
    'handmade rings',
    'gold jewelry',
    'diamond rings',
    'Barcelona jewelry',
  ],
  authors: [{ name: 'KaraLITH' }],
  creator: 'KaraLITH',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'es_ES',
    siteName: 'KaraLITH',
    title: 'KaraLITH | Sustainable Luxury Jewelry',
    description:
      'Discover handcrafted sustainable luxury jewelry. Ethically sourced diamonds and precious metals.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'KaraLITH Jewelry',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KaraLITH | Sustainable Luxury Jewelry',
    description:
      'Discover handcrafted sustainable luxury jewelry. Ethically sourced diamonds and precious metals.',
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
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
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
          description="Sustainable luxury jewelry handcrafted in Barcelona with ethically sourced diamonds and precious metals."
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
