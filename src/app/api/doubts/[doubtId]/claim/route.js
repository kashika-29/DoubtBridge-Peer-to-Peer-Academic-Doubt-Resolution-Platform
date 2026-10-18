import { NextResponse } from 'next/server';
import { claimDoubtRecord } from '@/features/doubts/service';
import { getCurrentUser } from '@/lib/auth';
import { canClaimDoubt } from '@/lib/permissions';

export async function POST(request, { params }) {
  try {
    const { doubtId } = await params;
    const user = await getCurrentUser();

    if (!user || !canClaimDoubt(user)) {
      return NextResponse.json(
        { success: false, error: 'Only authorized peer helpers can claim doubts.' },
        { status: 403 }
      );
    }

    const updated = await claimDoubtRecord(doubtId, user.id);
    return NextResponse.json({ success: true, doubt: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
