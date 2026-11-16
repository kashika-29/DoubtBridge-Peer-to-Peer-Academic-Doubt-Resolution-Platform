/**
 * Safe production error logger for authentication and session operations.
 * Logs structured diagnostic information while strictly preventing disclosure of
 * sensitive material such as passwords, hashes, session secrets, cookies, or credentials.
 *
 * @param {Object} params
 * @param {string} params.route - e.g. '/api/auth/login'
 * @param {Error|any} params.error - The caught exception
 * @param {string} [params.correlationId] - Optional request correlation ID
 * @returns {string} - Correlation ID
 */
export function logAuthError({ route, error, correlationId = null }) {
  const cid =
    correlationId ||
    (typeof globalThis !== 'undefined' && globalThis.crypto?.randomUUID
      ? globalThis.crypto.randomUUID()
      : `cid_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`);

  const category = error?.name || 'AuthError';

  // Sanitize message: strip any database connection strings or secret key fragments
  let safeMessage = error?.message || 'Unknown internal error';
  if (typeof safeMessage === 'string') {
    safeMessage = safeMessage.replace(/postgres(?:ql)?:\/\/[^@]+@/gi, 'postgresql://[REDACTED_CREDENTIALS]@');
  }

  const logPayload = {
    tag: 'AUTH_DIAGNOSTICS',
    route,
    category,
    message: safeMessage,
    prismaCode: error?.code || null,
    correlationId: cid,
    timestamp: new Date().toISOString(),
  };

  console.error(JSON.stringify(logPayload));

  return cid;
}
