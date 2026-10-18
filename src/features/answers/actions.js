import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function createAnswerAction(doubtId, content) {
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');

  if (!content || content.trim().length < 5) {
    throw new Error('Answer content must be at least 5 characters');
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

  return { success: true, answer };
}

export async function acceptAnswerAction(doubtId, answerId) {
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');

  const doubt = await prisma.doubt.findUnique({
    where: { id: doubtId },
  });

  if (doubt?.studentId !== user.id && user.role !== 'ADMIN') {
    throw new Error('Only the doubt creator can accept an answer');
  }

  // Update answer status
  const answer = await prisma.answer.update({
    where: { id: answerId },
    data: { isAccepted: true },
  });

  // Mark doubt resolved
  await prisma.doubt.update({
    where: { id: doubtId },
    data: { status: 'RESOLVED' },
  });

  // Reward helper with reputation points
  await prisma.user.update({
    where: { id: answer.authorId },
    data: { reputation: { increment: 25 } },
  });

  return { success: true, answer };
}

export async function upvoteAnswerAction(answerId) {
  const updated = await prisma.answer.update({
    where: { id: answerId },
    data: { upvotes: { increment: 1 } },
  });

  return { success: true, upvotes: updated.upvotes };
}
