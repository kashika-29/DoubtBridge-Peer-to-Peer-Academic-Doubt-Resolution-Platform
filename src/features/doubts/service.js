import { prisma } from '@/lib/prisma';

export async function getDoubts({ status, subject, limit = 20, offset = 0 } = {}) {
  const where = {};
  if (status) where.status = status;
  if (subject) where.subject = { contains: subject };

  return prisma.doubt.findMany({
    where,
    include: {
      student: { select: { id: true, name: true, reputation: true, avatar: true } },
      helper: { select: { id: true, name: true, reputation: true } },
      _count: { select: { answers: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: offset,
  });
}

export async function getDoubtById(doubtId) {
  return prisma.doubt.findUnique({
    where: { id: doubtId },
    include: {
      student: { select: { id: true, name: true, reputation: true, avatar: true } },
      helper: { select: { id: true, name: true, reputation: true, avatar: true } },
      answers: {
        include: {
          author: { select: { id: true, name: true, role: true, reputation: true, avatar: true } },
        },
        orderBy: [{ isAccepted: 'desc' }, { upvotes: 'desc' }, { createdAt: 'asc' }],
      },
    },
  });
}

export async function createDoubtRecord(data, studentId) {
  return prisma.doubt.create({
    data: {
      title: data.title,
      description: data.description,
      subject: data.subject,
      tags: data.tags || '',
      urgency: data.urgency || 'MEDIUM',
      studentId,
    },
  });
}

export async function claimDoubtRecord(doubtId, helperId) {
  return prisma.doubt.update({
    where: { id: doubtId },
    data: {
      helperId,
      status: 'CLAIMED',
    },
  });
}

export async function resolveDoubtRecord(doubtId) {
  return prisma.doubt.update({
    where: { id: doubtId },
    data: {
      status: 'RESOLVED',
    },
  });
}
