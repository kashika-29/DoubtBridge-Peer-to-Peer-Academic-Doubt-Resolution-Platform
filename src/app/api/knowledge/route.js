import { NextResponse } from 'next/server';
import { getKnowledgeArticles, createKnowledgeArticle } from '@/features/knowledge/service';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const subject = searchParams.get('subject') || undefined;
    const search = searchParams.get('search') || undefined;

    const articles = await getKnowledgeArticles({ subject, search });
    return NextResponse.json({ success: true, articles });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    if (!body.title || !body.content || !body.subject) {
      return NextResponse.json(
        { success: false, error: 'Title, content, and subject are required.' },
        { status: 400 }
      );
    }

    const article = await createKnowledgeArticle({
      ...body,
      authorId: user.id,
    });

    return NextResponse.json({ success: true, article }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
