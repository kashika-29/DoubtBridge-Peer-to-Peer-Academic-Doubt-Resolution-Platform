import { prisma } from '@/lib/prisma';

/**
 * Intelligent helper matching algorithm based on subject expertise,
 * active availability, and peer reputation score.
 */
export async function matchHelpersForDoubt(doubtSubject) {
  const helpers = await prisma.user.findMany({
    where: {
      role: 'HELPER',
      isAvailable: true,
      subjects: { contains: doubtSubject },
    },
    select: {
      id: true,
      name: true,
      email: true,
      reputation: true,
      subjects: true,
      avatar: true,
    },
    orderBy: { reputation: 'desc' },
    take: 5,
  });

  return helpers;
}

export function calculateHelperMatchScore(helper, subject) {
  let score = 50;
  if (helper.subjects && helper.subjects.includes(subject)) {
    score += 30;
  }
  score += Math.min(helper.reputation / 10, 20);
  return Math.round(score);
}
