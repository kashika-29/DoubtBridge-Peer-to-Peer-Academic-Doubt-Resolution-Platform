import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request, { params }) {
  try {
    const { doubtId } = await params;
    const answers = await prisma.answer.findMany({
      where: { doubtId },
      include: {
        author: { select: { id: true, name: true, role: true, reputation: true } },
      },
      orderBy: [{ isAccepted: 'desc' }, { upvotes: 'desc' }],
    });

    return NextResponse.json({ success: true, answers });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  try {
    const { doubtId } = await params;
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { content } = await request.json();
    if (!content || content.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: 'Answer content must be at least 5 characters.' },
        { status: 400 }
      );
    }

    const answer = await prisma.answer.create({
      data: {
        doubtId,
        authorId: user.id,
        content,
      },
      include: {
        author: { select: { id: true, name: true, role: true, reputation: true } },
      },
    });

    return NextResponse.json({ success: true, answer }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
