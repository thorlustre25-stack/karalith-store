'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { Language } from '@/types';

// English translations
const en = {
  // Header
  'header.freeShipping': 'Free shipping on orders over €150',
  'header.myAccount': 'My Account',
  'header.signIn': 'Sign In',
  'header.wishlist': 'Wishlist',

  // Footer
  'footer.tagline': 'Sustainable luxury jewelry, handcrafted with ethically sourced diamonds and precious metals.',
  'footer.shop': 'Shop',
  'footer.support': 'Support',
  'footer.company': 'Company',
  'footer.allRightsReserved': 'All rights reserved.',
  'footer.securePayments': 'Secure payments',

  // WhatsApp
  'whatsapp.defaultMessage': 'Hello! I would like to know more about KaraLITH jewelry.',

  // Homepage
  'home.heroTitle': 'Timeless Elegance',
  'home.heroSubtitle': 'Sustainable luxury jewelry crafted with exceptional diamonds',
  'home.shopNow': 'Shop Now',
  'home.ourStory': 'Our Story',
  'home.featuredTitle': 'Featured Collection',
  'home.featuredSubtitle': 'Discover our most beloved pieces, crafted with care and precision',
  'home.categoriesTitle': 'Shop by Category',
  'home.testimonialsTitle': 'What Our Clients Say',
  'home.sustainabilityTitle': 'Sustainable Luxury',
  'home.sustainabilityText': 'Every piece is crafted using ethically sourced materials and sustainable practices.',

  // Products
  'product.addToCart': 'Add to Cart',
  'product.addedToCart': 'Added to Cart',
  'product.selectSize': 'Select Ring Size',
  'product.diamondGrade': 'Diamond Grade',
  'product.metalType': 'Metal Type',
  'product.description': 'Description',
  'product.specifications': 'Specifications',
  'product.reviews': 'Reviews',
  'product.relatedProducts': 'You May Also Like',
  'product.handmade': 'Handmade',
  'product.freeShipping': 'Free Shipping',
  'product.customization': 'Customization Notes',

  // Cart
  'cart.title': 'Your Cart',
  'cart.empty': 'Your cart is empty',
  'cart.continueShopping': 'Continue Shopping',
  'cart.subtotal': 'Subtotal',
  'cart.shipping': 'Shipping',
  'cart.freeShipping': 'Free',
  'cart.total': 'Total',
  'cart.checkout': 'Proceed to Checkout',
  'cart.remove': 'Remove',

  // Checkout
  'checkout.title': 'Checkout',
  'checkout.contact': 'Contact Information',
  'checkout.shipping': 'Shipping Address',
  'checkout.payment': 'Payment',
  'checkout.placeOrder': 'Place Order',
  'checkout.orderSuccess': 'Order Confirmed!',
  'checkout.orderSuccessMessage': 'Thank you for your order. You will receive a confirmation email shortly.',

  // Auth
  'auth.login': 'Sign In',
  'auth.register': 'Create Account',
  'auth.email': 'Email',
  'auth.password': 'Password',
  'auth.forgotPassword': 'Forgot password?',
  'auth.noAccount': "Don't have an account?",
  'auth.hasAccount': 'Already have an account?',
  'auth.orContinueWith': 'Or continue with',
  'auth.magicLink': 'Send Magic Link',

  // Account
  'account.title': 'My Account',
  'account.orders': 'Orders',
  'account.wishlist': 'Wishlist',
  'account.addresses': 'Addresses',
  'account.profile': 'Profile',
  'account.signOut': 'Sign Out',

  // Common
  'common.loading': 'Loading...',
  'common.error': 'Something went wrong',
  'common.save': 'Save',
  'common.cancel': 'Cancel',
  'common.delete': 'Delete',
  'common.edit': 'Edit',
  'common.viewAll': 'View All',
  'common.learnMore': 'Learn More',
};

// Spanish translations
const es: typeof en = {
  // Header
  'header.freeShipping': 'Envío gratis en pedidos de más de €150',
  'header.myAccount': 'Mi Cuenta',
  'header.signIn': 'Iniciar Sesión',
  'header.wishlist': 'Lista de Deseos',

  // Footer
  'footer.tagline': 'Joyería de lujo sostenible, artesanal con diamantes y metales preciosos de origen ético.',
  'footer.shop': 'Tienda',
  'footer.support': 'Soporte',
  'footer.company': 'Empresa',
  'footer.allRightsReserved': 'Todos los derechos reservados.',
  'footer.securePayments': 'Pagos seguros',

  // WhatsApp
  'whatsapp.defaultMessage': '¡Hola! Me gustaría saber más sobre las joyas KaraLITH.',

  // Homepage
  'home.heroTitle': 'Elegancia Atemporal',
  'home.heroSubtitle': 'Joyería de lujo sostenible elaborada con diamantes excepcionales',
  'home.shopNow': 'Comprar Ahora',
  'home.ourStory': 'Nuestra Historia',
  'home.featuredTitle': 'Colección Destacada',
  'home.featuredSubtitle': 'Descubre nuestras piezas más queridas, elaboradas con cuidado y precisión',
  'home.categoriesTitle': 'Comprar por Categoría',
  'home.testimonialsTitle': 'Lo Que Dicen Nuestros Clientes',
  'home.sustainabilityTitle': 'Lujo Sostenible',
  'home.sustainabilityText': 'Cada pieza está elaborada con materiales de origen ético y prácticas sostenibles.',

  // Products
  'product.addToCart': 'Añadir al Carrito',
  'product.addedToCart': 'Añadido al Carrito',
  'product.selectSize': 'Seleccionar Talla',
  'product.diamondGrade': 'Calidad del Diamante',
  'product.metalType': 'Tipo de Metal',
  'product.description': 'Descripción',
  'product.specifications': 'Especificaciones',
  'product.reviews': 'Reseñas',
  'product.relatedProducts': 'También Te Puede Gustar',
  'product.handmade': 'Hecho a Mano',
  'product.freeShipping': 'Envío Gratis',
  'product.customization': 'Notas de Personalización',

  // Cart
  'cart.title': 'Tu Carrito',
  'cart.empty': 'Tu carrito está vacío',
  'cart.continueShopping': 'Continuar Comprando',
  'cart.subtotal': 'Subtotal',
  'cart.shipping': 'Envío',
  'cart.freeShipping': 'Gratis',
  'cart.total': 'Total',
  'cart.checkout': 'Proceder al Pago',
  'cart.remove': 'Eliminar',

  // Checkout
  'checkout.title': 'Finalizar Compra',
  'checkout.contact': 'Información de Contacto',
  'checkout.shipping': 'Dirección de Envío',
  'checkout.payment': 'Pago',
  'checkout.placeOrder': 'Realizar Pedido',
  'checkout.orderSuccess': '¡Pedido Confirmado!',
  'checkout.orderSuccessMessage': 'Gracias por tu pedido. Recibirás un correo de confirmación en breve.',

  // Auth
  'auth.login': 'Iniciar Sesión',
  'auth.register': 'Crear Cuenta',
  'auth.email': 'Correo Electrónico',
  'auth.password': 'Contraseña',
  'auth.forgotPassword': '¿Olvidaste tu contraseña?',
  'auth.noAccount': '¿No tienes una cuenta?',
  'auth.hasAccount': '¿Ya tienes una cuenta?',
  'auth.orContinueWith': 'O continuar con',
  'auth.magicLink': 'Enviar Enlace Mágico',

  // Account
  'account.title': 'Mi Cuenta',
  'account.orders': 'Pedidos',
  'account.wishlist': 'Lista de Deseos',
  'account.addresses': 'Direcciones',
  'account.profile': 'Perfil',
  'account.signOut': 'Cerrar Sesión',

  // Common
  'common.loading': 'Cargando...',
  'common.error': 'Algo salió mal',
  'common.save': 'Guardar',
  'common.cancel': 'Cancelar',
  'common.delete': 'Eliminar',
  'common.edit': 'Editar',
  'common.viewAll': 'Ver Todo',
  'common.learnMore': 'Saber Más',
};

const translations = { en, es };

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof en) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('karalith-lang', lang);
      document.documentElement.lang = lang;
    }
  }, []);

  const t = useCallback(
    (key: keyof typeof en): string => {
      return translations[language][key] || key;
    },
    [language]
  );

  // Load saved language on mount
  if (typeof window !== 'undefined') {
    const savedLang = localStorage.getItem('karalith-lang') as Language;
    if (savedLang && savedLang !== language) {
      setLanguageState(savedLang);
    }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
