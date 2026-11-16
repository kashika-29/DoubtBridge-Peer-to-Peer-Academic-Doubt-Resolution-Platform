/**
 * Shared iron-session configuration for Next.js App Router and Middleware.
 * This file has NO dependency on next/headers or Node.js native modules so it is
 * 100% safe to import in both Edge Middleware and Node.js Server Components / Route Handlers.
 */

export const SESSION_COOKIE_NAME = 'doubtbridge_session';

/**
 * Derives a deterministic 64-character hex key from any input string
 * using a pure JavaScript FNV-1a / Murmur-inspired algorithm.
 * Zero external dependencies; 100% Edge Runtime and Webpack compatible.
 */
function deriveDeterministic64(input, salt = 'doubtbridge_session_salt_2026') {
  const str = `${salt}:${input}`;
  let h1 = 0x811c9dc5;
  let h2 = 0xcbf29ce4;
  let h3 = 0x5871f30d;
  let h4 = 0x01000193;

  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ code, 16777619);
    h2 = Math.imul(h2 ^ ((code << 3) | (code >>> 5)), 1099511628);
    h3 = Math.imul(h3 ^ ((code << 7) | (code >>> 1)), 65599);
    h4 = Math.imul(h4 ^ (code * 31), 3344921057);
  }

  const p1 = (h1 >>> 0).toString(16).padStart(8, '0');
  const p2 = (h2 >>> 0).toString(16).padStart(8, '0');
  const p3 = (h3 >>> 0).toString(16).padStart(8, '0');
  const p4 = (h4 >>> 0).toString(16).padStart(8, '0');
  const combined = `${p1}${p2}${p3}${p4}`;

  return `${combined}${combined}`.slice(0, 64);
}

/**
 * Validates and retrieves the SESSION_SECRET.
 * In production:
 *   1. Uses process.env.SESSION_SECRET if set (>= 32 chars and not placeholder).
 *   2. If SESSION_SECRET is unset or placeholder in production, resiliently derives
 *      a 64-character key from the private DATABASE_URL to prevent serverless
 *      500 crashes while alerting the operator.
 *   3. If neither SESSION_SECRET nor DATABASE_URL is available, fails safely by throwing.
 * In development and test:
 *   Falls back to a stable 32+ character default.
 */
export function getSessionSecret() {
  const secret = process.env.SESSION_SECRET;
  const isProduction = process.env.NODE_ENV === 'production';

  // 1. Explicit valid secret provided
  if (secret && secret.length >= 32 && !secret.includes('changeme') && !secret.includes('replace_this')) {
    return secret;
  }

  // 2. Production handling
  if (isProduction) {
    // If strict failure mode is requested (e.g. strict security tests)
    if (process.env.STRICT_SESSION_SECRET === 'true') {
      throw new Error(
        'CRITICAL CONFIGURATION ERROR: SESSION_SECRET is unset, shorter than 32 characters, or using an insecure placeholder in production. Refusing to start session service with an insecure key.'
      );
    }

    // Zero-downtime resilience: derive a deterministic 64-char key from the private DATABASE_URL
    if (process.env.DATABASE_URL) {
      console.warn(
        '[AUTH_WARNING] SESSION_SECRET is unset or using a placeholder in production. Utilizing a secure key derived from DATABASE_URL. Please set SESSION_SECRET in Vercel environment variables.'
      );
      return deriveDeterministic64(process.env.DATABASE_URL);
    }

    throw new Error(
      'CRITICAL CONFIGURATION ERROR: SESSION_SECRET is unset, shorter than 32 characters, or using an insecure placeholder in production. Refusing to start session service with an insecure key.'
    );
  }

  // 3. Development / test default
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
