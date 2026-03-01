'use client';

import { useCallback, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from './useAuth';
import type { WishlistItemWithProduct } from '@/types';

export function useWishlist() {
  const [items, setItems] = useState<WishlistItemWithProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const supabase = createClient();

  const fetchWishlist = useCallback(async () => {
    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data } = await supabase
      .from('wishlist')
      .select(`
        *,
        product:products(
          *,
          category:categories(*),
          images:product_images(*),
          variants:product_variants(*)
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    setItems(data || []);
    setLoading(false);
  }, [user, supabase]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const addToWishlist = async (productId: string) => {
    if (!user) return { error: 'Please sign in to add items to your wishlist' };

    const { error } = await supabase.from('wishlist').insert({
      user_id: user.id,
      product_id: productId,
    });

    if (!error) {
      await fetchWishlist();
    }

    return { error: error?.message || null };
  };

  const removeFromWishlist = async (productId: string) => {
    if (!user) return { error: 'Not authenticated' };

    const { error } = await supabase
      .from('wishlist')
      .delete()
      .eq('user_id', user.id)
      .eq('product_id', productId);

    if (!error) {
      setItems((prev) => prev.filter((item) => item.product_id !== productId));
    }

    return { error: error?.message || null };
  };

  const isInWishlist = (productId: string) => {
    return items.some((item) => item.product_id === productId);
  };

  const toggleWishlist = async (productId: string) => {
    if (isInWishlist(productId)) {
      return removeFromWishlist(productId);
    }
    return addToWishlist(productId);
  };

  return {
    items,
    loading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    refetch: fetchWishlist,
  };
}
