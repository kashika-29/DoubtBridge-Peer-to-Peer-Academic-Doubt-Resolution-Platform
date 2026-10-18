import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const subject = searchParams.get('subject') || undefined;

    const where = {
      role: 'HELPER',
      ...(subject ? { subjects: { contains: subject } } : {}),
    };

    const helpers = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        reputation: true,
        subjects: true,
        isAvailable: true,
        avatar: true,
        _count: { select: { answers: true } },
      },
      orderBy: { reputation: 'desc' },
    });

    return NextResponse.json({ success: true, helpers });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
