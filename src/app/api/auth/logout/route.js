import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { logAuthError } from '@/lib/diagnostics';

export async function POST() {
  try {
    const session = await getSession();
    session.destroy();
    return NextResponse.json({ success: true, message: 'Logged out successfully.' });
  } catch (error) {
    const correlationId = logAuthError({ route: '/api/auth/logout', error });
    return NextResponse.json(
      { success: false, error: 'Logout failed.', correlationId },
      { status: 500 }
    );
  }
}
