'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { Language } from '@/types';

// English translations
const en = {
  // Header
  'header.freeShipping': 'Free shipping on all engagement rings',
  'header.myAccount': 'My Account',
  'header.signIn': 'Sign In',
  'header.wishlist': 'Wishlist',

  // Footer
  'footer.tagline': 'Handcrafted engagement rings with ethically sourced diamonds. Sustainable luxury for your forever moment.',
  'footer.shop': 'Shop',
  'footer.support': 'Support',
  'footer.company': 'Company',
  'footer.allRightsReserved': 'All rights reserved.',
  'footer.securePayments': 'Secure payments',

  // WhatsApp
  'whatsapp.defaultMessage': 'Hello! I would like to know more about KaraLITH engagement rings.',

  // Homepage
  'home.heroTitle': 'Begin Forever',
  'home.heroSubtitle': 'Handcrafted engagement rings with ethically sourced diamonds',
  'home.shopNow': 'Explore Rings',
  'home.ourStory': 'Our Story',
  'home.featuredTitle': 'Our Engagement Rings',
  'home.featuredSubtitle': 'Each ring is handcrafted with care, ready for your perfect moment',
  'home.categoriesTitle': 'Find Your Style',
  'home.testimonialsTitle': 'Love Stories',
  'home.sustainabilityTitle': 'Sustainable Luxury',
  'home.sustainabilityText': 'Every ring is crafted using ethically sourced diamonds and sustainable practices.',

  // Products
  'product.addToCart': 'Add to Cart',
  'product.addedToCart': 'Added to Cart',
  'product.selectSize': 'Select Ring Size',
  'product.diamondGrade': 'Diamond Grade',
  'product.diamondWeight': 'Diamond Weight (Carats)',
  'product.selectDiamondWeight': 'Select diamond weight',
  'product.contactForLarger': 'Contact us for larger stones',
  'product.stoneShape': 'Stone Shape',
  'product.selectStoneShape': 'Please select a stone shape',
  'product.selectMetal': 'Please select a metal type',
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
  'header.freeShipping': 'Envío gratis en todos los anillos de compromiso',
  'header.myAccount': 'Mi Cuenta',
  'header.signIn': 'Iniciar Sesión',
  'header.wishlist': 'Lista de Deseos',

  // Footer
  'footer.tagline': 'Anillos de compromiso artesanales con diamantes de origen ético. Lujo sostenible para tu momento eterno.',
  'footer.shop': 'Tienda',
  'footer.support': 'Soporte',
  'footer.company': 'Empresa',
  'footer.allRightsReserved': 'Todos los derechos reservados.',
  'footer.securePayments': 'Pagos seguros',

  // WhatsApp
  'whatsapp.defaultMessage': '¡Hola! Me gustaría saber más sobre los anillos de compromiso KaraLITH.',

  // Homepage
  'home.heroTitle': 'Comienza Para Siempre',
  'home.heroSubtitle': 'Anillos de compromiso artesanales con diamantes de origen ético',
  'home.shopNow': 'Explorar Anillos',
  'home.ourStory': 'Nuestra Historia',
  'home.featuredTitle': 'Nuestros Anillos de Compromiso',
  'home.featuredSubtitle': 'Cada anillo es elaborado con cuidado, listo para tu momento perfecto',
  'home.categoriesTitle': 'Encuentra Tu Estilo',
  'home.testimonialsTitle': 'Historias de Amor',
  'home.sustainabilityTitle': 'Lujo Sostenible',
  'home.sustainabilityText': 'Cada anillo está elaborado con diamantes de origen ético y prácticas sostenibles.',

  // Products
  'product.addToCart': 'Añadir al Carrito',
  'product.addedToCart': 'Añadido al Carrito',
  'product.selectSize': 'Seleccionar Talla',
  'product.diamondGrade': 'Calidad del Diamante',
  'product.diamondWeight': 'Peso del Diamante (Quilates)',
  'product.selectDiamondWeight': 'Seleccionar peso del diamante',
  'product.contactForLarger': 'Contáctenos para piedras más grandes',
  'product.stoneShape': 'Forma de la Piedra',
  'product.selectStoneShape': 'Por favor seleccione una forma de piedra',
  'product.selectMetal': 'Por favor seleccione un tipo de metal',
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
