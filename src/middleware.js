import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/lib/sessionConfig';

/**
 * Next.js Route Middleware — Authentication Guard
 * ─────────────────────────────────────────────────
 * Protects dashboard pages, admin views, and authenticated API routes.
 * Uses iron-session to verify the signed session cookie server-side.
 */

// Routes that do NOT require authentication
const PUBLIC_PATHS = ['/', '/login', '/register'];

// Path prefixes that are always public
const ALWAYS_PUBLIC_PREFIXES = [
  '/_next/',
  '/favicon',
  '/images/',
  '/public/',
  '/api/auth/',   // login, register, logout, me
  '/api/health/', // health check
];

function isPublicPath(pathname) {
  if (PUBLIC_PATHS.includes(pathname)) return true;
  return ALWAYS_PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function loginRedirect(request, pathname) {
  const url = new URL('/login', request.url);
  // Only preserve relative destinations
  if (pathname.startsWith('/') && pathname !== '/login') {
    url.searchParams.set('callbackUrl', pathname);
  }
  return NextResponse.redirect(url);
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  try {
    const res = NextResponse.next();
    const session = await getIronSession(request.cookies, sessionOptions);
    const userId = session?.userId;
    const isActive = session?.isActive;

    // Check both authentication and active status
    if (!userId || isActive === false) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          {
            success: false,
            error: isActive === false ? 'Account suspended.' : 'Authentication required.',
          },
          { status: isActive === false ? 403 : 401 }
        );
      }
      return loginRedirect(request, pathname);
    }

    return res;
  } catch {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { success: false, error: 'Authentication required.' },
        { status: 401 }
      );
    }
    return loginRedirect(request, pathname);
  }
}

export const config = {
  // Run on all paths except Next.js internals and static files
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
