import { NextResponse } from 'next/server';
import { getReportedItems, submitReport, updateReportStatus } from '@/features/moderation/service';
import { getCurrentUser } from '@/lib/auth';
import { canModerate } from '@/lib/permissions';

export async function GET(request) {
  try {
    const user = await getCurrentUser();
    if (!user || !canModerate(user)) {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'PENDING';

    const reports = await getReportedItems({ status });
    return NextResponse.json({ success: true, reports });
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
    if (!body.reason) {
      return NextResponse.json({ success: false, error: 'Reason is required' }, { status: 400 });
    }

    const report = await submitReport({
      reason: body.reason,
      reporterId: user.id,
      doubtId: body.doubtId || null,
      answerId: body.answerId || null,
    });

    return NextResponse.json({ success: true, report }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const user = await getCurrentUser();
    if (!user || !canModerate(user)) {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    const { reportId, status } = await request.json();
    const updated = await updateReportStatus(reportId, status);

    return NextResponse.json({ success: true, report: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
