import type { Metadata } from 'next';
import { Container, Box, Text, VStack, HStack, Badge } from '@chakra-ui/react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getPostBySlug, getRelatedPosts, getPosts } from '@/lib/db';
import { JsonLd } from '@/components/seo/JsonLd';
import { BlogCard } from '@/components/blog/BlogCard';
import { ArrowLeft } from 'lucide-react';

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const posts = await getPosts(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return posts.map((p: any) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug, true);
    if (!post) return { title: 'Post Not Found' };
    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.published_at,
        authors: [post.author],
      },
    };
  } catch {
    return { title: 'Post Not Found' };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  
  let post;
  try {
    post = await getPostBySlug(slug, true);
  } catch {
    notFound();
  }

  if (!post) notFound();

  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(post.published_at));

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Person', name: post.author },
    datePublished: post.published_at,
    publisher: {
      '@type': 'Organization',
      name: 'Zyphon Systems',
      url: 'https://zyphonsystems.com',
    },
    ...(post.cover_image_url && { image: post.cover_image_url }),
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let relatedPosts: any[] = [];
  try {
    relatedPosts = await getRelatedPosts(slug, post.tags || [], 3);
  } catch {
    // ignore
  }

  return (
    <Container maxW="4xl" py={{ base: 24, md: 32 }}>
      <JsonLd data={articleSchema} />
      <Link href="/blog">
        <HStack
          gap={2}
          color={{ base: 'gray.500', _dark: 'gray.400' }}
          _hover={{ color: 'primary.500' }}
          transition="color 0.2s"
          mb={8}
        >
          <ArrowLeft size={16} />
          <Text fontSize="sm">All Articles</Text>
        </HStack>
      </Link>

      <VStack align="start" gap={6} mb={12}>
        <HStack gap={2} flexWrap="wrap">
          {(post.tags || []).map((tag: string) => (
            <Badge
              key={tag}
              px={3}
              py={1}
              borderRadius="full"
              bg={{ base: 'primary.50', _dark: 'primary.500/10' }}
              color="primary.500"
              fontSize="xs"
            >
              {tag}
            </Badge>
          ))}
        </HStack>

        <Text
          as="h1"
          fontSize={{ base: '2xl', md: '4xl' }}
          fontWeight="bold"
          color={{ base: 'gray.900', _dark: 'white' }}
          lineHeight="tight"
        >
          {post.title}
        </Text>

        <HStack gap={4} color={{ base: 'gray.500', _dark: 'gray.400' }} fontSize="sm">
          <Text>{post.author}</Text>
          <Text>·</Text>
          <Text>{formattedDate}</Text>
        </HStack>
      </VStack>

      {post.cover_image_url && (
        <Box
          borderRadius="xl"
          overflow="hidden"
          mb={12}
          maxH="480px"
        >
          {post.cover_image_url.startsWith('/uploads/') ? (
            <Image
              src={post.cover_image_url}
              alt={post.title}
              width={1200}
              height={480}
              style={{ objectFit: 'cover', width: '100%', maxHeight: '480px' }}
            />
          ) : (
            <Box
              h="400px"
              bg={`url(${post.cover_image_url})`}
              backgroundSize="cover"
              backgroundPosition="center"
            />
          )}
        </Box>
      )}

      <Box
        className="blog-content"
        color={{ base: 'gray.700', _dark: 'gray.300' }}
        lineHeight="1.8"
        fontSize={{ base: 'md', md: 'lg' }}
        css={{
          '& h2': { fontSize: '1.5rem', fontWeight: 'bold', marginTop: '2rem', marginBottom: '1rem' },
          '& h3': { fontSize: '1.25rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' },
          '& p': { marginBottom: '1rem' },
          '& ul, & ol': { paddingLeft: '1.5rem', marginBottom: '1rem' },
          '& li': { marginBottom: '0.5rem' },
          '& a': { color: '#0d9488', textDecoration: 'underline' },
          '& blockquote': {
            borderLeft: '4px solid #0d9488',
            paddingLeft: '1rem',
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
            marginTop: '1rem',
            marginBottom: '1rem',
            fontStyle: 'italic',
          },
          '& code': {
            padding: '0.125rem 0.5rem',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
          },
          '& pre': {
            padding: '1rem',
            borderRadius: '0.75rem',
            overflowX: 'auto',
            marginBottom: '1rem',
          },
        }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {relatedPosts.length > 0 && (
        <Box mt={16} pt={12} borderTopWidth="1px" borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}>
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color={{ base: 'gray.900', _dark: 'white' }}
            mb={8}
          >
            Related Articles
          </Text>
          <Box
            display="grid"
            gridTemplateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
            gap={6}
          >
            {relatedPosts.map((related) => (
              <BlogCard
                key={related.slug}
                slug={related.slug}
                title={related.title}
                excerpt={related.excerpt}
                tags={related.tags || []}
                publishedAt={related.published_at}
                coverImageUrl={related.cover_image_url}
              />
            ))}
          </Box>
        </Box>
      )}
    </Container>
  );
}
