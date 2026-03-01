// Database types for KaraLITH e-commerce platform

export type UserRole = 'customer' | 'admin';

export type MetalType = 'gold' | 'white_gold' | 'rose_gold' | 'platinum';

export type DiamondGrade = 'VS' | 'IF';

export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'in_production'
  | 'ready'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

// User & Profile
export interface User {
  id: string;
  email: string;
  created_at: string;
  role: UserRole;
}

export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  role: 'customer' | 'admin';
  default_address_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserWithProfile extends User {
  profile: Profile | null;
}

// Address
export interface Address {
  id: string;
  user_id: string | null;
  street: string;
  city: string;
  postal_code: string;
  country: string;
  is_default: boolean;
  created_at: string;
}

// Category
export interface Category {
  id: string;
  name: string;
  name_es: string | null;
  slug: string;
  description: string | null;
  image_url: string | null;
  display_order: number;
}

// Product
export interface Product {
  id: string;
  name: string;
  name_es: string | null;
  slug: string;
  description: string | null;
  description_es: string | null;
  category_id: string | null;
  base_price: number;
  metal_type: MetalType;
  is_handmade: boolean;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text: string | null;
  display_order: number;
  is_primary: boolean;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  diamond_grade: DiamondGrade | null;
  ring_size: string | null;
  price_adjustment: number;
  sku: string;
}

export interface ProductWithDetails extends Product {
  category: Category | null;
  images: ProductImage[];
  variants: ProductVariant[];
}

// Order
export interface Order {
  id: string;
  order_number: string;
  user_id: string | null;
  guest_email: string | null;
  status: OrderStatus;
  subtotal: number;
  shipping_cost: number;
  total: number;
  shipping_address_id: string | null;
  stripe_payment_intent_id: string | null;
  stripe_customer_id: string | null;
  notes: string | null;
  shipping_first_name: string | null;
  shipping_last_name: string | null;
  shipping_street: string | null;
  shipping_city: string | null;
  shipping_postal_code: string | null;
  shipping_country: string | null;
  tracking_number: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  variant_id: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
  customization_notes: string | null;
  ring_size: string | null;
  product_name: string;
  product_image_url: string | null;
  variant_info: string | null;
}

export interface OrderItemWithProduct extends OrderItem {
  product: Product;
  variant: ProductVariant | null;
}

export interface OrderWithDetails extends Order {
  items: OrderItemWithProduct[];
  shipping_address: Address | null;
  user: User | null;
}

// Wishlist
export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
}

export interface WishlistItemWithProduct extends WishlistItem {
  product: ProductWithDetails;
}

// Review
export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  order_id: string | null;
  rating: number;
  title: string | null;
  comment: string | null;
  is_approved: boolean;
  is_verified_purchase: boolean;
  created_at: string;
}

export interface ReviewWithUser extends Review {
  user: User;
}

// Cart (client-side state)
export interface CartItem {
  product_id: string;
  variant_id: string | null;
  quantity: number;
  ring_size: string | null;
  customization_notes: string | null;
  // Denormalized for display
  product: Product;
  variant: ProductVariant | null;
  image: ProductImage | null;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  shipping_cost: number;
  total: number;
}

// Checkout
export interface CheckoutFormData {
  // Contact
  email: string;
  phone: string;
  // Shipping
  first_name: string;
  last_name: string;
  street: string;
  city: string;
  postal_code: string;
  country: string;
  // Options
  notes: string;
  create_account: boolean;
  password?: string;
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

// Filter types
export interface ProductFilters {
  category?: string;
  metal_type?: MetalType;
  min_price?: number;
  max_price?: number;
  is_featured?: boolean;
  search?: string;
}

// Sort types
export type ProductSort =
  | 'newest'
  | 'price_asc'
  | 'price_desc'
  | 'name_asc'
  | 'name_desc';

// i18n
export type Language = 'en' | 'es';

export interface TranslationMessages {
  [key: string]: string | TranslationMessages;
}

// Admin dashboard stats
export interface DashboardStats {
  total_orders: number;
  total_revenue: number;
  total_customers: number;
  total_products: number;
  recent_orders: OrderWithDetails[];
  orders_by_status: Record<OrderStatus, number>;
}
