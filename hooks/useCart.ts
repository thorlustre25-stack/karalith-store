'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product, ProductVariant, ProductImage } from '@/types';

interface CartStore {
  items: CartItem[];
  addItem: (
    product: Product,
    variant: ProductVariant | null,
    image: ProductImage | null,
    quantity?: number,
    ringSize?: string,
    diamondCarat?: string,
    selectedMetal?: string,
    stoneShape?: string,
    customizationNotes?: string
  ) => void;
  removeItem: (productId: string, variantId: string | null) => void;
  updateQuantity: (productId: string, variantId: string | null, quantity: number) => void;
  updateItemNotes: (productId: string, variantId: string | null, notes: string) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getItemCount: () => number;
  getShippingCost: () => number;
  getTotal: () => number;
}

const SHIPPING_THRESHOLD = 150; // Free shipping over €150
const SHIPPING_COST = 15;

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, variant, image, quantity = 1, ringSize, diamondCarat, selectedMetal, stoneShape, customizationNotes) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) =>
              item.product_id === product.id &&
              item.variant_id === (variant?.id || null) &&
              item.ring_size === (ringSize || null)
          );

          if (existingIndex > -1) {
            const newItems = [...state.items];
            newItems[existingIndex].quantity += quantity;
            return { items: newItems };
          }

          return {
            items: [
              ...state.items,
              {
                product_id: product.id,
                variant_id: variant?.id || null,
                quantity,
                ring_size: ringSize || null,
                diamond_carat: diamondCarat || null,
                selected_metal: selectedMetal || null,
                stone_shape: stoneShape || null,
                customization_notes: customizationNotes || null,
                product,
                variant,
                image,
              },
            ],
          };
        });
      },

      removeItem: (productId, variantId) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(item.product_id === productId && item.variant_id === variantId)
          ),
        }));
      },

      updateQuantity: (productId, variantId, quantity) => {
        if (quantity < 1) {
          get().removeItem(productId, variantId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product_id === productId && item.variant_id === variantId
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      updateItemNotes: (productId, variantId, notes) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product_id === productId && item.variant_id === variantId
              ? { ...item, customization_notes: notes }
              : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getSubtotal: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          const basePrice = item.product.base_price;
          const adjustment = item.variant?.price_adjustment || 0;
          return total + (basePrice + adjustment) * item.quantity;
        }, 0);
      },

      getItemCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },

      getShippingCost: () => {
        const subtotal = get().getSubtotal();
        return subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
      },

      getTotal: () => {
        return get().getSubtotal() + get().getShippingCost();
      },
    }),
    {
      name: 'karalith-cart',
    }
  )
);
