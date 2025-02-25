import { NextRequest } from 'next/server';
import { withMiddlewareAuthRequired, WithMiddlewareAuthArgs } from '@auth0/nextjs-auth0';

export default withMiddlewareAuthRequired({
  async middleware(req: NextRequest) {
    const headers = new Headers({
      'User-Agent': 'newsagg-app',
    });
    const res = new Response(null, { headers });
    return res;
  },
  returnTo: '/',
} as WithMiddlewareAuthArgs);

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