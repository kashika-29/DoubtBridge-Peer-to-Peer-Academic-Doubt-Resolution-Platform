/**
 * Shared iron-session configuration for Next.js App Router and Middleware.
 * This file has NO dependency on next/headers so it is safe to import
 * in both Edge Middleware and Node.js Server Components / Route Handlers.
 */

export const SESSION_COOKIE_NAME = 'doubtbridge_session';

/**
 * Validates and retrieves the SESSION_SECRET.
 * In production, fails safely by throwing an error if SESSION_SECRET is unset,
 * shorter than 32 characters, or using a known insecure placeholder.
 * In development and test, falls back safely to a 32+ character default.
 */
export function getSessionSecret() {
  const secret = process.env.SESSION_SECRET;
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    if (!secret || secret.length < 32 || secret.includes('changeme') || secret.includes('replace_this')) {
      throw new Error(
        'CRITICAL CONFIGURATION ERROR: SESSION_SECRET is unset, shorter than 32 characters, or using an insecure placeholder in production. Refusing to start session service with an insecure key.'
      );
    }
    return secret;
  }

  return secret || 'development_fallback_secret_must_be_at_least_32_chars_long!';
}

/**
 * iron-session cookie configuration.
 * Single source of truth across Route Handlers, Middleware, and Server Components.
 */
export const sessionOptions = {
  cookieName: SESSION_COOKIE_NAME,
  get password() {
    return getSessionSecret();
  },
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
};

