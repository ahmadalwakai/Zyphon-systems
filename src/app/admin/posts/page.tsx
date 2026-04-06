'use client';

import { useEffect, useState } from 'react';
import { Box, Heading, Text, VStack, HStack, Badge, Button, Spinner } from '@chakra-ui/react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';

interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  is_published: boolean;
  published_at: string | null;
  created_at: string;
}

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/admin/posts', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePublish = async (id: number, isPublished: boolean) => {
    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ isPublished: !isPublished }),
      });
      if (res.ok) {
        setPosts(posts.map((p) => (p.id === id ? { ...p, is_published: !isPublished } : p)));
      }
    } catch (error) {
      console.error('Failed to toggle publish:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this post?')) return;
    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        setPosts(posts.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <Box>
        <Heading as="h1" size="2xl" color="white" mb={8}>Blog Posts</Heading>
        <Box textAlign="center" py={12}><Spinner color="primary.400" size="xl" /></Box>
      </Box>
    );
  }

  return (
    <Box>
      <HStack justify="space-between" align="center" mb={8}>
        <Box>
          <Heading as="h1" size="2xl" color="white" mb={2}>Blog Posts</Heading>
          <Text color="gray.400">Manage your articles and insights</Text>
        </Box>
        <Link href="/admin/posts/new">
          <Button bg="primary.500" color="white" _hover={{ bg: 'primary.600' }}>
            <Plus size={16} />
            <Text ml={2}>New Post</Text>
          </Button>
        </Link>
      </HStack>

      {posts.length === 0 ? (
        <Box p={8} borderRadius="xl" borderWidth="1px" borderColor="whiteAlpha.100" bg="rgba(17, 17, 24, 0.6)" textAlign="center">
          <Text color="gray.400">No posts yet. Create your first article.</Text>
        </Box>
      ) : (
        <VStack gap={3} align="stretch">
          {posts.map((post) => (
            <HStack
              key={post.id}
              p={4}
              borderRadius="xl"
              borderWidth="1px"
              borderColor="whiteAlpha.100"
              bg="rgba(17, 17, 24, 0.6)"
              justify="space-between"
              _hover={{ borderColor: 'whiteAlpha.200' }}
              transition="border-color 0.2s"
            >
              <VStack align="start" gap={1} flex={1}>
                <HStack>
                  <Text color="white" fontWeight="semibold" fontSize="sm">{post.title}</Text>
                  <Badge
                    px={2}
                    py={0.5}
                    borderRadius="full"
                    fontSize="xs"
                    bg={post.is_published ? 'green.500/20' : 'gray.500/20'}
                    color={post.is_published ? 'green.400' : 'gray.400'}
                  >
                    {post.is_published ? 'Published' : 'Draft'}
                  </Badge>
                </HStack>
                <HStack gap={2} flexWrap="wrap">
                  {(post.tags || []).slice(0, 3).map((tag) => (
                    <Badge key={tag} fontSize="xs" bg="whiteAlpha.100" color="gray.400" borderRadius="full" px={2}>
                      {tag}
                    </Badge>
                  ))}
                  <Text color="gray.500" fontSize="xs">{formatDate(post.created_at)}</Text>
                </HStack>
              </VStack>

              <HStack gap={1}>
                <Button
                  size="sm"
                  variant="ghost"
                  color="gray.400"
                  _hover={{ color: 'white', bg: 'whiteAlpha.100' }}
                  onClick={() => handleTogglePublish(post.id, post.is_published)}
                  title={post.is_published ? 'Unpublish' : 'Publish'}
                >
                  {post.is_published ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
                <Link href={`/admin/posts/${post.id}/edit`}>
                  <Button size="sm" variant="ghost" color="gray.400" _hover={{ color: 'white', bg: 'whiteAlpha.100' }}>
                    <Edit size={16} />
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="ghost"
                  color="gray.400"
                  _hover={{ color: 'red.400', bg: 'red.500/10' }}
                  onClick={() => handleDelete(post.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </HStack>
            </HStack>
          ))}
        </VStack>
      )}
    </Box>
  );
}
