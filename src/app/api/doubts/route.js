import { NextResponse } from 'next/server';
import { getDoubts, createDoubtRecord } from '@/features/doubts/service';
import { validateDoubtInput } from '@/features/doubts/validation';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const subject = searchParams.get('subject') || undefined;
    const status = searchParams.get('status') || undefined;

    const doubts = await getDoubts({ subject, status });
    return NextResponse.json({ success: true, doubts });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validation = validateDoubtInput(body);

    if (!validation.isValid) {
      return NextResponse.json({ success: false, errors: validation.errors }, { status: 400 });
    }

    const doubt = await createDoubtRecord(body, user.id);
    return NextResponse.json({ success: true, doubt }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
