import { NextRequest, NextResponse } from 'next/server';
import { getPostById, updatePost, deletePost } from '@/lib/db';
import { verifyAdminSession } from '@/lib/auth';
import { validateOrigin } from '@/lib/csrf';
import { log } from '@/lib/logger';
import { logActivity } from '@/lib/activity';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!await verifyAdminSession(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const post = await getPostById(parseInt(id, 10));
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json({ post });
  } catch (error) {
    log('error', 'Error fetching post', { error: error instanceof Error ? error.message : 'Unknown', route: '/api/admin/posts/[id]' });
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!validateOrigin(request)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  if (!await verifyAdminSession(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { title, slug, excerpt, content, tags, coverImageUrl, isPublished } = body;

    const post = await updatePost(parseInt(id, 10), {
      title: title?.trim(),
      slug: slug?.trim(),
      excerpt: excerpt?.trim(),
      content: content?.trim(),
      coverImageUrl: coverImageUrl?.trim() || undefined,
      tags,
      isPublished,
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    if (isPublished) {
      await logActivity('admin', 'post_published', 'post', id, { slug: post.slug });
    }

    return NextResponse.json({ post });
  } catch (error) {
    log('error', 'Error updating post', { error: error instanceof Error ? error.message : 'Unknown', route: '/api/admin/posts/[id]' });
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!validateOrigin(request)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  if (!await verifyAdminSession(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    await deletePost(parseInt(id, 10));
    await logActivity('admin', 'post_deleted', 'post', id);
    return NextResponse.json({ success: true });
  } catch (error) {
    log('error', 'Error deleting post', { error: error instanceof Error ? error.message : 'Unknown', route: '/api/admin/posts/[id]' });
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
