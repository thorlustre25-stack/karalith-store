'use client';

import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

export function WhatsAppButton() {
  const { t } = useLanguage();
  const phoneNumber = '34612345678'; // Replace with actual number
  const message = encodeURIComponent(t('whatsapp.defaultMessage'));
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-30 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 transition-transform"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
