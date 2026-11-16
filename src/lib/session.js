import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import {
  SESSION_COOKIE_NAME,
  getSessionSecret,
  sessionOptions,
} from './sessionConfig';

export { SESSION_COOKIE_NAME, getSessionSecret, sessionOptions };

/**
 * Returns the iron-session for the current server request.
 * Usage (Server Component / Route Handler):
 *   const session = await getSession();
 *   session.userId  — string | undefined
 */
export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession(cookieStore, sessionOptions);
}
