import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function toggleHelperAvailability() {
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');

  const current = await prisma.user.findUnique({
    where: { id: user.id },
    select: { isAvailable: true },
  });

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: { isAvailable: !current?.isAvailable },
  });

  return { success: true, isAvailable: updated.isAvailable };
}

export async function updateHelperSubjects(subjectsList) {
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');

  const formatted = Array.isArray(subjectsList) ? subjectsList.join(',') : subjectsList;

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: { subjects: formatted },
  });

  return { success: true, user: updated };
}
