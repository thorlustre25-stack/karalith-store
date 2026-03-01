'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, Check, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button, Badge, Spinner } from '@/components/ui';
import { toast } from '@/components/ui/toast';
import { formatDate, cn } from '@/lib/utils';

interface ReviewWithDetails {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  title: string | null;
  comment: string | null;
  is_approved: boolean;
  created_at: string;
  product: { name: string; slug: string };
  user: { first_name: string | null; last_name: string | null };
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<ReviewWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all');

  const supabase = createClient();

  const fetchReviews = async () => {
    let query = supabase
      .from('reviews')
      .select(`
        *,
        product:products(name, slug),
        user:profiles(first_name, last_name)
      `)
      .order('created_at', { ascending: false });

    if (filter === 'pending') {
      query = query.eq('is_approved', false);
    } else if (filter === 'approved') {
      query = query.eq('is_approved', true);
    }

    const { data } = await query;
    setReviews((data as ReviewWithDetails[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchReviews();
  }, [filter]);

  const handleApprove = async (id: string) => {
    const { error } = await supabase
      .from('reviews')
      .update({ is_approved: true })
      .eq('id', id);

    if (error) {
      toast.error('Failed to approve review');
    } else {
      toast.success('Review approved');
      fetchReviews();
    }
  };

  const handleReject = async (id: string) => {
    const { error } = await supabase.from('reviews').delete().eq('id', id);

    if (error) {
      toast.error('Failed to delete review');
    } else {
      toast.success('Review deleted');
      fetchReviews();
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-h1">Reviews</h1>
        <p className="text-muted-foreground">Moderate customer reviews</p>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {(['all', 'pending', 'approved'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'px-4 py-2 text-sm font-medium rounded-md transition-colors',
              filter === f
                ? 'bg-primary text-white'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : reviews.length === 0 ? (
        <div className="bg-white rounded-lg border p-12 text-center">
          <Star className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">No reviews found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg border p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {/* Product & User */}
                  <div className="flex items-center gap-4 mb-3">
                    <Link
                      href={`/product/${review.product.slug}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {review.product.name}
                    </Link>
                    <span className="text-muted-foreground">by</span>
                    <span className="text-sm">
                      {review.user?.first_name || 'Anonymous'}
                    </span>
                    <Badge
                      variant={review.is_approved ? 'success' : 'warning'}
                    >
                      {review.is_approved ? 'Approved' : 'Pending'}
                    </Badge>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            'h-4 w-4',
                            i < review.rating
                              ? 'fill-gold text-gold'
                              : 'text-muted-foreground/30'
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(review.created_at)}
                    </span>
                  </div>

                  {/* Content */}
                  {review.title && (
                    <p className="font-medium mb-1">{review.title}</p>
                  )}
                  {review.comment && (
                    <p className="text-muted-foreground">{review.comment}</p>
                  )}
                </div>

                {/* Actions */}
                {!review.is_approved && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleApprove(review.id)}
                      leftIcon={<Check className="h-4 w-4" />}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleReject(review.id)}
                      leftIcon={<X className="h-4 w-4" />}
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
