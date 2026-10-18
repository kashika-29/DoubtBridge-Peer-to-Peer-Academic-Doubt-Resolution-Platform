const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding academic database...');

  // 1. Create Users
  const student = await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      name: 'Alex Rivera',
      email: 'student@example.com',
      role: 'STUDENT',
      reputation: 120,
      subjects: 'Data Structures,Calculus,Physics',
    },
  });

  const helper = await prisma.user.upsert({
    where: { email: 'helper@example.com' },
    update: {},
    create: {
      name: 'Dr. Priya Sharma',
      email: 'helper@example.com',
      role: 'HELPER',
      reputation: 890,
      subjects: 'Algorithms,Calculus,Linear Algebra',
      isAvailable: true,
    },
  });

  const moderator = await prisma.user.upsert({
    where: { email: 'moderator@example.com' },
    update: {},
    create: {
      name: 'Marcus Chen',
      email: 'moderator@example.com',
      role: 'MODERATOR',
      reputation: 1500,
      subjects: 'General Academics,Ethics',
    },
  });

  // 2. Create Doubts
  const doubt1 = await prisma.doubt.create({
    data: {
      title: 'How does Dijkstra algorithm handle negative weight cycles?',
      description: 'I understand Dijkstra greedy approach for shortest paths, but why does it fail or enter infinite loops with negative edge weights compared to Bellman-Ford?',
      subject: 'Algorithms',
      tags: 'graphs,dijkstra,bellman-ford,shortest-path',
      urgency: 'HIGH',
      status: 'CLAIMED',
      studentId: student.id,
      helperId: helper.id,
    },
  });

  const doubt2 = await prisma.doubt.create({
    data: {
      title: 'Evaluating improper integrals with infinite discontinuities',
      description: 'Can someone walk me through the step-by-step limit evaluation for integral of 1/(x-2) from 0 to 4?',
      subject: 'Calculus',
      tags: 'calculus,integrals,limits',
      urgency: 'MEDIUM',
      status: 'OPEN',
      studentId: student.id,
    },
  });

  // 3. Create Answers
  await prisma.answer.create({
    data: {
      doubtId: doubt1.id,
      authorId: helper.id,
      content: 'Dijkstra assumes that once a vertex is marked visited (extracted from the priority queue), its shortest distance is finalized. With negative edges, a previously settled vertex could achieve a shorter path later, violating this greedy premise.',
      isAccepted: true,
      upvotes: 14,
    },
  });

  // 4. Create Knowledge Articles
  await prisma.knowledgeArticle.create({
    data: {
      title: 'Mastering Asymptotic Notation (Big-O, Big-Theta, Big-Omega)',
      content: 'A comprehensive guide to understanding theoretical time and space complexity in algorithms...',
      subject: 'Computer Science',
      tags: 'algorithms,big-o,complexity',
      authorId: helper.id,
      views: 342,
    },
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
