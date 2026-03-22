'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { CartDrawer } from '@/components/cart/cart-drawer';

const navigation = [
  { name: 'Shop', nameEs: 'Tienda', href: '/shop' },
  { name: 'Rings', nameEs: 'Anillos', href: '/shop/rings' },
  { name: 'Necklaces', nameEs: 'Collares', href: '/shop/necklaces' },
  { name: 'Earrings', nameEs: 'Pendientes', href: '/shop/earrings' },
  { name: 'About', nameEs: 'Nosotros', href: '/about' },
  { name: 'Contact', nameEs: 'Contacto', href: '/contact' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  const { items } = useCart();
  const { user } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-sm shadow-sm'
            : 'bg-transparent'
        )}
      >
        {/* Top bar */}
        <div className="bg-primary text-white text-center py-2 text-xs sm:text-sm">
          <p>{t('header.freeShipping')}</p>
        </div>

        <nav className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden p-2 -ml-2 text-primary"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center"
            >
              <span className="font-heading text-2xl md:text-3xl text-primary tracking-wide">
                KaraLITH
              </span>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary',
                    pathname === item.href
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  )}
                >
                  {language === 'es' ? item.nameEs : item.name}
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Language toggle */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
                className="hidden sm:flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {language === 'en' ? 'ES' : 'EN'}
              </button>

              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-primary hover:text-primary-600 transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Wishlist */}
              <Link
                href="/account/wishlist"
                className="hidden sm:block p-2 text-primary hover:text-primary-600 transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
              </Link>

              {/* Account */}
              <Link
                href={user ? '/account' : '/login'}
                className="p-2 text-primary hover:text-primary-600 transition-colors"
                aria-label={user ? 'Account' : 'Sign in'}
              >
                <User className="h-5 w-5" />
              </Link>

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-primary hover:text-primary-600 transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gold text-white text-xs flex items-center justify-center font-medium">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-xl animate-slide-in-right">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-heading text-xl text-primary">
                KaraLITH
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 -mr-2"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="p-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'block py-3 text-lg font-medium border-b border-border/50 transition-colors',
                    pathname === item.href
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-primary'
                  )}
                >
                  {language === 'es' ? item.nameEs : item.name}
                </Link>
              ))}
              <div className="mt-6 pt-6 border-t space-y-4">
                <Link
                  href={user ? '/account' : '/login'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary"
                >
                  <User className="h-5 w-5" />
                  {user ? t('header.myAccount') : t('header.signIn')}
                </Link>
                <Link
                  href="/account/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary"
                >
                  <Heart className="h-5 w-5" />
                  {t('header.wishlist')}
                </Link>
              </div>
              <div className="mt-6 pt-6 border-t">
                <button
                  onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <span
                    className={cn(
                      'px-2 py-1 rounded',
                      language === 'en' && 'bg-primary text-white'
                    )}
                  >
                    EN
                  </span>
                  <span
                    className={cn(
                      'px-2 py-1 rounded',
                      language === 'es' && 'bg-primary text-white'
                    )}
                  >
                    ES
                  </span>
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Search modal */}
      {searchOpen && (
        <SearchModal onClose={() => setSearchOpen(false)} />
      )}

      {/* Cart drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(query)}`;
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div className="absolute top-0 left-0 right-0 bg-white p-4 shadow-lg animate-slide-up">
        <div className="container-custom">
          <form onSubmit={handleSubmit} className="flex items-center gap-4">
            <Search className="h-5 w-5 text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for jewelry..."
              className="flex-1 py-3 text-lg outline-none placeholder:text-muted-foreground"
            />
            <button
              type="button"
              onClick={onClose}
              className="p-2"
              aria-label="Close search"
            >
              <X className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
