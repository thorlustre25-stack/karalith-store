import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

// Set to true to show the coming soon page as the homepage
const COMING_SOON_MODE = true;

export async function middleware(request: NextRequest) {
  // Redirect homepage to coming soon page
  if (COMING_SOON_MODE && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/coming-soon', request.url));
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
