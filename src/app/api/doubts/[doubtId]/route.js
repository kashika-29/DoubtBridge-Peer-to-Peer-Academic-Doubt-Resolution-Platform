import { NextResponse } from 'next/server';
import { getDoubtById } from '@/features/doubts/service';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request, { params }) {
  try {
    const { doubtId } = await params;
    const doubt = await getDoubtById(doubtId);

    if (!doubt) {
      return NextResponse.json({ success: false, error: 'Doubt not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, doubt });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const { doubtId } = await params;
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const updated = await prisma.doubt.update({
      where: { id: doubtId },
      data: body,
    });

    return NextResponse.json({ success: true, doubt: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { doubtId } = await params;
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.doubt.delete({
      where: { id: doubtId },
    });

    return NextResponse.json({ success: true, message: 'Doubt deleted' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
