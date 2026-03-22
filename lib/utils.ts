import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
}

export function formatDate(
  date: string | Date,
  locale: string = 'en-US'
): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatDateTime(
  date: string | Date,
  locale: string = 'en-US'
): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `KL-${timestamp}-${random}`;
}

export function getMetalDisplayName(
  metalType: string,
  locale: string = 'en'
): string {
  const names: Record<string, Record<string, string>> = {
    gold: { en: 'Gold', es: 'Oro' },
    white_gold: { en: 'White Gold', es: 'Oro Blanco' },
    rose_gold: { en: 'Rose Gold', es: 'Oro Rosa' },
    platinum: { en: 'Platinum', es: 'Platino' },
  };
  return names[metalType]?.[locale] || metalType;
}

export function getOrderStatusDisplayName(
  status: string,
  locale: string = 'en'
): string {
  const names: Record<string, Record<string, string>> = {
    pending: { en: 'Pending', es: 'Pendiente' },
    paid: { en: 'Paid', es: 'Pagado' },
    in_production: { en: 'In Production', es: 'En Producción' },
    ready: { en: 'Ready for Shipping', es: 'Listo para Enviar' },
    shipped: { en: 'Shipped', es: 'Enviado' },
    delivered: { en: 'Delivered', es: 'Entregado' },
    cancelled: { en: 'Cancelled', es: 'Cancelado' },
  };
  return names[status]?.[locale] || status;
}

export function getOrderStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    paid: 'bg-blue-100 text-blue-800',
    in_production: 'bg-purple-100 text-purple-800',
    ready: 'bg-indigo-100 text-indigo-800',
    shipped: 'bg-cyan-100 text-cyan-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
}

export function calculateTotal(
  items: Array<{ unit_price: number; quantity: number }>
): number {
  return items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

export function getRingSizes(): string[] {
  return [
    '7',
    '7.5',
    '8',
    '8.5',
    '9',
    '9.5',
    '10',
    '10.5',
    '11',
    '11.5',
    '12',
    '12.5',
    '13',
    '13.5',
    '14',
    '14.5',
    '15',
    '15.5',
    '16',
    '16.5',
    '17',
    '17.5',
    '18',
    '18.5',
    '19',
    '19.5',
    '20',
    '20.5',
    '21',
  ];
}

export function getCountries(): Array<{ code: string; name: string }> {
  return [
    { code: 'ES', name: 'Spain' },
    { code: 'FR', name: 'France' },
    { code: 'DE', name: 'Germany' },
    { code: 'IT', name: 'Italy' },
    { code: 'PT', name: 'Portugal' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'MX', name: 'Mexico' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'BE', name: 'Belgium' },
    { code: 'AT', name: 'Austria' },
    { code: 'CH', name: 'Switzerland' },
  ];
}
