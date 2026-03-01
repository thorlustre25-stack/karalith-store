import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://karalith.com';
  const supabase = createAdminClient();

  // Static pages
  const staticPages = [
    '',
    '/shop',
    '/about',
    '/contact',
    '/ring-size-guide',
    '/faq',
    '/privacy',
    '/terms',
  ];

  // Fetch categories
  const { data: categories } = await supabase
    .from('categories')
    .select('slug');

  // Fetch products
  const { data: products } = await supabase
    .from('products')
    .select('slug')
    .eq('is_active', true);

  const today = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add static pages
  for (const page of staticPages) {
    xml += `
  <url>
    <loc>${siteUrl}${page}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`;
  }

  // Add category pages
  if (categories) {
    for (const category of categories) {
      xml += `
  <url>
    <loc>${siteUrl}/shop/${category.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    }
  }

  // Add product pages
  if (products) {
    for (const product of products) {
      xml += `
  <url>
    <loc>${siteUrl}/product/${product.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
    }
  }

  xml += `
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
