import { prisma } from '@/lib/prisma';

export async function getKnowledgeArticles({ subject, search, limit = 20 } = {}) {
  const where = {};
  if (subject) where.subject = subject;
  if (search) {
    where.OR = [
      { title: { contains: search } },
      { content: { contains: search } },
      { tags: { contains: search } },
    ];
  }

  return prisma.knowledgeArticle.findMany({
    where,
    include: {
      author: { select: { id: true, name: true, reputation: true } },
    },
    orderBy: [{ views: 'desc' }, { createdAt: 'desc' }],
    take: limit,
  });
}

export async function createKnowledgeArticle({ title, content, subject, tags, authorId }) {
  return prisma.knowledgeArticle.create({
    data: {
      title,
      content,
      subject,
      tags,
      authorId,
    },
  });
}

export async function incrementArticleViews(articleId) {
  return prisma.knowledgeArticle.update({
    where: { id: articleId },
    data: { views: { increment: 1 } },
  });
}
