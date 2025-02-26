import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default async function middleware(req: NextRequest) {
  // Add custom headers
  const res = NextResponse.next();
  res.headers.set('User-Agent', 'newsagg-app');

  // Check if the route requires authentication
  if (
    req.nextUrl.pathname.startsWith('/carbon-footprint') ||
    req.nextUrl.pathname.startsWith('/api/user') ||
    req.nextUrl.pathname.startsWith('/api/preferences')
  ) {
    // Redirect to login if no session cookie is present
    const authCookie = req.cookies.get('appSession');
    if (!authCookie) {
      const loginUrl = new URL('/api/auth/login', req.url);
      loginUrl.searchParams.set('returnTo', req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return res;
}

export const config = {
  matcher: [
    // Protected routes that require authentication
    '/carbon-footprint/:path*',
    '/api/user/:path*',
    '/api/preferences/:path*',
    
    // Exclude public paths and auth endpoints
    '/((?!api/auth/.*|_next/.*|favicon.ico).*)',
  ],
};