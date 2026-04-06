import { NextRequest, NextResponse } from 'next/server';
import { getPosts, createPost } from '@/lib/db';
import { verifyAdminSession } from '@/lib/auth';
import { slugify } from '@/lib/utils';
import { validateOrigin } from '@/lib/csrf';
import { log } from '@/lib/logger';
import { logActivity } from '@/lib/activity';

export async function GET(request: NextRequest) {
  if (!await verifyAdminSession(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const posts = await getPosts(false);
    return NextResponse.json({ posts });
  } catch (error) {
    log('error', 'Error fetching posts', { error: error instanceof Error ? error.message : 'Unknown', route: '/api/admin/posts' });
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!validateOrigin(request)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  if (!await verifyAdminSession(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, excerpt, content, tags, coverImageUrl, isPublished } = body;

    if (!title || !excerpt || !content) {
      return NextResponse.json({ error: 'Title, excerpt, and content are required' }, { status: 400 });
    }

    const slug = body.slug || slugify(title);

    const post = await createPost({
      slug,
      title: title.trim().slice(0, 500),
      excerpt: excerpt.trim().slice(0, 300),
      content: content.trim(),
      coverImageUrl: coverImageUrl?.trim() || undefined,
      tags: tags || [],
      isPublished: isPublished ?? false,
    });

    if (isPublished) {
      await logActivity('admin', 'post_published', 'post', post.id, { slug });
    }
    log('info', 'Post created', { id: post.id, slug, route: '/api/admin/posts' });

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    log('error', 'Error creating post', { error: error instanceof Error ? error.message : 'Unknown', route: '/api/admin/posts' });
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
