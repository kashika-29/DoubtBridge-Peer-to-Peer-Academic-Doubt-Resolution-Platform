import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { logAuthError } from '@/lib/diagnostics';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Not authenticated.' }, { status: 401 });
    }
    return NextResponse.json({ success: true, user });
  } catch (error) {
    const correlationId = logAuthError({ route: '/api/auth/me', error });
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve user.', correlationId },
      { status: 500 }
    );
  }
}
