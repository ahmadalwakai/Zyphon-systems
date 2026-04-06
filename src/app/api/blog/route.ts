import { NextRequest, NextResponse } from 'next/server';
import { getPosts, getPostsByTag, searchPosts } from '@/lib/db';
import { sanitizeString } from '@/lib/sanitize';
import { log } from '@/lib/logger';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');

    let posts;
    if (search) {
      posts = await searchPosts(sanitizeString(search));
    } else if (tag) {
      posts = await getPostsByTag(tag);
    } else {
      posts = await getPosts(true);
    }

    return NextResponse.json({ posts }, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
    });
  } catch (error) {
    log('error', 'Error fetching posts', { error: error instanceof Error ? error.message : 'Unknown', route: '/api/blog' });
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
