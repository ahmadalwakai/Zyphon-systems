import { NextResponse } from 'next/server';
import { getPostBySlug } from '@/lib/db';
import { log } from '@/lib/logger';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const post = await getPostBySlug(slug, true);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ post }, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
    });
  } catch (error) {
    log('error', 'Error fetching post', { error: error instanceof Error ? error.message : 'Unknown', route: '/api/blog/[slug]' });
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}
