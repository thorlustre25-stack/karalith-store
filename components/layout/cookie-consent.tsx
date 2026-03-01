'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { useLanguage } from '@/hooks/useLanguage';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem('karalith-cookie-consent');
    if (!consent) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('karalith-cookie-consent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('karalith-cookie-consent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t shadow-lg animate-slide-up">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">
              {language === 'es' ? (
                <>
                  Utilizamos cookies para mejorar tu experiencia en nuestro sitio.
                  Al continuar navegando, aceptas nuestra{' '}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Política de Privacidad
                  </Link>
                  .
                </>
              ) : (
                <>
                  We use cookies to enhance your experience on our site. By
                  continuing to browse, you accept our{' '}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </>
              )}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={handleDecline}>
              {language === 'es' ? 'Rechazar' : 'Decline'}
            </Button>
            <Button size="sm" onClick={handleAccept}>
              {language === 'es' ? 'Aceptar' : 'Accept'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
