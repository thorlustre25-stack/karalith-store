'use client';

import Link from 'next/link';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const footerLinks = {
  shop: [
    { name: 'All Jewelry', nameEs: 'Todas las Joyas', href: '/shop' },
    { name: 'Rings', nameEs: 'Anillos', href: '/shop/rings' },
    { name: 'Necklaces', nameEs: 'Collares', href: '/shop/necklaces' },
    { name: 'Earrings', nameEs: 'Pendientes', href: '/shop/earrings' },
    { name: 'Bracelets', nameEs: 'Pulseras', href: '/shop/bracelets' },
  ],
  support: [
    { name: 'Ring Size Guide', nameEs: 'Guía de Tallas', href: '/ring-size-guide' },
    { name: 'FAQ', nameEs: 'Preguntas Frecuentes', href: '/faq' },
    { name: 'Shipping & Returns', nameEs: 'Envíos y Devoluciones', href: '/shipping' },
    { name: 'Contact Us', nameEs: 'Contáctanos', href: '/contact' },
    { name: 'Custom Orders', nameEs: 'Pedidos Personalizados', href: '/contact' },
  ],
  company: [
    { name: 'About KaraLITH', nameEs: 'Sobre KaraLITH', href: '/about' },
    { name: 'Sustainability', nameEs: 'Sostenibilidad', href: '/about#sustainability' },
    { name: 'Our Craftsmanship', nameEs: 'Nuestra Artesanía', href: '/about#craftsmanship' },
    { name: 'Privacy Policy', nameEs: 'Política de Privacidad', href: '/privacy' },
    { name: 'Terms & Conditions', nameEs: 'Términos y Condiciones', href: '/terms' },
  ],
};

export function Footer() {
  const { language, t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      {/* Main footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="font-heading text-3xl tracking-wide">
                KaraLITH
              </span>
            </Link>
            <p className="mt-4 text-white/70 max-w-sm leading-relaxed">
              {t('footer.tagline')}
            </p>

            {/* Contact info */}
            <div className="mt-8 space-y-3">
              <a
                href="mailto:hello@karalith.com"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
                hello@karalith.com
              </a>
              <a
                href="tel:+34612345678"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4" />
                +34 612 345 678
              </a>
              <div className="flex items-center gap-3 text-white/70">
                <MapPin className="h-4 w-4" />
                Barcelona, Spain
              </div>
            </div>

            {/* Social links */}
            <div className="mt-8 flex items-center gap-4">
              <a
                href="https://instagram.com/karalith"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/karalith"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="font-heading text-lg mb-4">{t('footer.shop')}</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {language === 'es' ? link.nameEs : link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h3 className="font-heading text-lg mb-4">{t('footer.support')}</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {language === 'es' ? link.nameEs : link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="font-heading text-lg mb-4">{t('footer.company')}</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {language === 'es' ? link.nameEs : link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            &copy; {currentYear} KaraLITH. {t('footer.allRightsReserved')}
          </p>

          {/* Payment methods */}
          <div className="flex items-center gap-4">
            <span className="text-white/50 text-sm">{t('footer.securePayments')}</span>
            <div className="flex items-center gap-2">
              {/* Payment icons would go here - using text for now */}
              <span className="text-xs text-white/30">VISA</span>
              <span className="text-xs text-white/30">MC</span>
              <span className="text-xs text-white/30">AMEX</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
