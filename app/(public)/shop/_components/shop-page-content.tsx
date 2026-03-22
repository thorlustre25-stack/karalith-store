'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useCallback } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';
import { ProductGrid } from '@/components/product';
import { Button, Select, Badge } from '@/components/ui';
import { useLanguage } from '@/hooks/useLanguage';
import { cn, formatPrice, getMetalDisplayName } from '@/lib/utils';
import type { ProductWithDetails, Category, MetalType, ProductSort } from '@/types';

interface ShopPageContentProps {
  products: ProductWithDetails[];
  categories: Category[];
  totalCount: number;
  currentPage: number;
  perPage: number;
  filters: {
    search?: string;
    metal?: MetalType;
    min_price?: string;
    max_price?: string;
    sort?: ProductSort;
  };
}

const metalTypes: { value: MetalType; label: string; labelEs: string }[] = [
  { value: 'gold', label: 'Gold', labelEs: 'Oro' },
  { value: 'white_gold', label: 'White Gold', labelEs: 'Oro Blanco' },
  { value: 'rose_gold', label: 'Rose Gold', labelEs: 'Oro Rosa' },
  { value: 'platinum', label: 'Platinum', labelEs: 'Platino' },
];

const sortOptions: { value: ProductSort; label: string; labelEs: string }[] = [
  { value: 'newest', label: 'Newest', labelEs: 'Mas Reciente' },
  { value: 'price_asc', label: 'Price: Low to High', labelEs: 'Precio: Menor a Mayor' },
  { value: 'price_desc', label: 'Price: High to Low', labelEs: 'Precio: Mayor a Menor' },
  { value: 'name_asc', label: 'Name: A-Z', labelEs: 'Nombre: A-Z' },
  { value: 'name_desc', label: 'Name: Z-A', labelEs: 'Nombre: Z-A' },
];

const priceRanges = [
  { min: 0, max: 500, label: 'Under $500' },
  { min: 500, max: 1000, label: '$500 - $1,000' },
  { min: 1000, max: 2500, label: '$1,000 - $2,500' },
  { min: 2500, max: 5000, label: '$2,500 - $5,000' },
  { min: 5000, max: undefined, label: 'Over $5,000' },
];

export function ShopPageContent({
  products,
  categories,
  totalCount,
  currentPage,
  perPage,
  filters,
}: ShopPageContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { language } = useLanguage();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const totalPages = Math.ceil(totalCount / perPage);

  // Only show ring-related categories
  const RING_SLUGS = ['rings', 'engagement', 'wedding-bands'];
  const filteredCategories = categories.filter((c) => RING_SLUGS.includes(c.slug));

  const updateFilters = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === '') {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      // Reset to page 1 when filters change
      if (!('page' in updates)) {
        params.delete('page');
      }

      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const clearAllFilters = () => {
    router.push(pathname);
  };

  const hasActiveFilters =
    filters.metal || filters.min_price || filters.max_price || filters.search;

  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-8">
      {/* Desktop Filters */}
      <aside className="hidden lg:block">
        <div className="sticky top-32 space-y-8 bg-light-pink rounded-lg p-6">
          {/* Categories */}
          <div>
            <h3 className="font-heading text-lg mb-4 text-primary">Categories</h3>
            <div className="space-y-2">
              {filteredCategories.map((category) => (
                <a
                  key={category.id}
                  href={`/shop/${category.slug}`}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  {language === 'es' ? category.name_es : category.name}
                </a>
              ))}
            </div>
          </div>

          {/* Metal Type */}
          <div>
            <h3 className="font-heading text-lg mb-4 text-primary">Metal Type</h3>
            <div className="space-y-2">
              {metalTypes.map((metal) => (
                <button
                  key={metal.value}
                  onClick={() =>
                    updateFilters({
                      metal:
                        filters.metal === metal.value ? undefined : metal.value,
                    })
                  }
                  className={cn(
                    'block w-full text-left px-3 py-2 rounded transition-colors',
                    filters.metal === metal.value
                      ? 'bg-primary text-white'
                      : 'text-muted-foreground hover:bg-muted'
                  )}
                >
                  {language === 'es' ? metal.labelEs : metal.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-heading text-lg mb-4 text-primary">Price Range</h3>
            <div className="space-y-2">
              {priceRanges.map((range, index) => {
                const isActive =
                  filters.min_price === String(range.min) &&
                  (range.max
                    ? filters.max_price === String(range.max)
                    : !filters.max_price);

                return (
                  <button
                    key={index}
                    onClick={() =>
                      updateFilters({
                        min_price: isActive ? undefined : String(range.min),
                        max_price: isActive
                          ? undefined
                          : range.max
                          ? String(range.max)
                          : undefined,
                      })
                    }
                    className={cn(
                      'block w-full text-left px-3 py-2 rounded transition-colors',
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-muted-foreground hover:bg-muted'
                    )}
                  >
                    {range.label}
                  </button>
                );
              })}
            </div>
          </div>

          {hasActiveFilters && (
            <Button variant="ghost" onClick={clearAllFilters} className="w-full">
              Clear All Filters
            </Button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div>
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* Mobile filter button */}
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
              leftIcon={<Filter className="h-4 w-4" />}
            >
              Filters
            </Button>

            <p className="text-sm text-muted-foreground">
              {totalCount} {totalCount === 1 ? 'product' : 'products'}
            </p>
          </div>

          {/* Sort */}
          <Select
            options={sortOptions.map((opt) => ({
              value: opt.value,
              label: language === 'es' ? opt.labelEs : opt.label,
            }))}
            value={filters.sort || 'newest'}
            onChange={(e) => updateFilters({ sort: e.target.value })}
            className="w-48"
          />
        </div>

        {/* Active filters */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mb-6">
            {filters.search && (
              <Badge
                variant="secondary"
                className="gap-1 cursor-pointer"
                onClick={() => updateFilters({ search: undefined })}
              >
                Search: {filters.search}
                <X className="h-3 w-3" />
              </Badge>
            )}
            {filters.metal && (
              <Badge
                variant="secondary"
                className="gap-1 cursor-pointer"
                onClick={() => updateFilters({ metal: undefined })}
              >
                {getMetalDisplayName(filters.metal, language)}
                <X className="h-3 w-3" />
              </Badge>
            )}
            {(filters.min_price || filters.max_price) && (
              <Badge
                variant="secondary"
                className="gap-1 cursor-pointer"
                onClick={() =>
                  updateFilters({ min_price: undefined, max_price: undefined })
                }
              >
                {filters.min_price && formatPrice(parseFloat(filters.min_price))}
                {filters.min_price && filters.max_price && ' - '}
                {filters.max_price && formatPrice(parseFloat(filters.max_price))}
                {!filters.max_price && '+'}
                <X className="h-3 w-3" />
              </Badge>
            )}
          </div>
        )}

        {/* Products */}
        <ProductGrid products={products} columns={3} />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() =>
                updateFilters({ page: String(currentPage - 1) })
              }
            >
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? 'primary' : 'outline'}
                size="sm"
                onClick={() => updateFilters({ page: String(page) })}
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() =>
                updateFilters({ page: String(currentPage + 1) })
              }
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <MobileFilters
          categories={categories}
          filters={filters}
          onClose={() => setMobileFiltersOpen(false)}
          onUpdateFilters={updateFilters}
          onClearFilters={clearAllFilters}
          language={language}
        />
      )}
    </div>
  );
}

function MobileFilters({
  categories,
  filters,
  onClose,
  onUpdateFilters,
  onClearFilters,
  language,
}: {
  categories: Category[];
  filters: ShopPageContentProps['filters'];
  onClose: () => void;
  onUpdateFilters: (updates: Record<string, string | undefined>) => void;
  onClearFilters: () => void;
  language: string;
}) {
  const RING_SLUGS = ['rings', 'engagement', 'wedding-bands'];
  const filteredCategories = categories.filter((c) => RING_SLUGS.includes(c.slug));
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white z-50 lg:hidden overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-heading text-lg">Filters</h2>
          <button onClick={onClose} className="p-2">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Categories */}
          <div>
            <h3 className="font-medium mb-3">Categories</h3>
            <div className="space-y-2">
              {filteredCategories.map((category) => (
                <a
                  key={category.id}
                  href={`/shop/${category.slug}`}
                  className="block text-muted-foreground hover:text-primary"
                  onClick={onClose}
                >
                  {language === 'es' ? category.name_es : category.name}
                </a>
              ))}
            </div>
          </div>

          {/* Metal Type */}
          <div>
            <h3 className="font-medium mb-3">Metal Type</h3>
            <div className="space-y-2">
              {metalTypes.map((metal) => (
                <button
                  key={metal.value}
                  onClick={() => {
                    onUpdateFilters({
                      metal:
                        filters.metal === metal.value ? undefined : metal.value,
                    });
                    onClose();
                  }}
                  className={cn(
                    'block w-full text-left px-3 py-2 rounded',
                    filters.metal === metal.value
                      ? 'bg-primary text-white'
                      : 'text-muted-foreground'
                  )}
                >
                  {language === 'es' ? metal.labelEs : metal.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full" onClick={onClearFilters}>
            Clear All
          </Button>
        </div>
      </div>
    </>
  );
}
