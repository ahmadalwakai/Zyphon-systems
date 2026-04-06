import { NextRequest, NextResponse } from 'next/server';
import { getPosts, getPostsByTag, searchPosts } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');

    let posts;
    if (search) {
      posts = await searchPosts(search);
    } else if (tag) {
      posts = await getPostsByTag(tag);
    } else {
      posts = await getPosts(true);
    }

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
