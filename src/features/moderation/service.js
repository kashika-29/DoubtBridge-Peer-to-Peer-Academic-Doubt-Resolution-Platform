import { prisma } from '@/lib/prisma';

export async function getReportedItems({ status = 'PENDING', limit = 20 } = {}) {
  return prisma.report.findMany({
    where: { status },
    include: {
      reporter: { select: { id: true, name: true, email: true } },
      doubt: true,
      answer: true,
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

export async function submitReport({ reason, reporterId, doubtId = null, answerId = null }) {
  return prisma.report.create({
    data: {
      reason,
      reporterId,
      doubtId,
      answerId,
    },
  });
}

export async function updateReportStatus(reportId, status) {
  return prisma.report.update({
    where: { id: reportId },
    data: { status },
  });
}
