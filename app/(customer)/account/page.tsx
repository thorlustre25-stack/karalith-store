'use client';

import Link from 'next/link';
import {
  Package,
  Heart,
  MapPin,
  User,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui';

const menuItems = [
  {
    icon: Package,
    name: 'Orders',
    nameEs: 'Pedidos',
    description: 'View your order history',
    descriptionEs: 'Ver historial de pedidos',
    href: '/account/orders',
  },
  {
    icon: Heart,
    name: 'Wishlist',
    nameEs: 'Lista de Deseos',
    description: 'Your saved items',
    descriptionEs: 'Tus artículos guardados',
    href: '/account/wishlist',
  },
  {
    icon: MapPin,
    name: 'Addresses',
    nameEs: 'Direcciones',
    description: 'Manage shipping addresses',
    descriptionEs: 'Gestionar direcciones de envío',
    href: '/account/addresses',
  },
  {
    icon: User,
    name: 'Profile',
    nameEs: 'Perfil',
    description: 'Edit your profile',
    descriptionEs: 'Editar tu perfil',
    href: '/account/profile',
  },
];

export default function AccountPage() {
  const { user, profile, signOut } = useAuth();
  const { language, t } = useLanguage();

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-h1 mb-2">{t('account.title')}</h1>
        <p className="text-muted-foreground">
          {language === 'es' ? 'Hola' : 'Hello'},{' '}
          {profile?.first_name || user?.email}!
        </p>
      </div>

      {/* Menu Grid */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-4 p-6 bg-white rounded-lg border hover:border-primary transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-secondary/30 flex items-center justify-center">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="font-heading text-lg group-hover:text-primary transition-colors">
                  {language === 'es' ? item.nameEs : item.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {language === 'es' ? item.descriptionEs : item.description}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          );
        })}
      </div>

      {/* Sign Out */}
      <Button
        variant="outline"
        onClick={handleSignOut}
        leftIcon={<LogOut className="h-4 w-4" />}
      >
        {t('account.signOut')}
      </Button>
    </div>
  );
}
