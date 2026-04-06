import type { Metadata } from 'next';
import { Container, Grid, Box, Text, VStack } from '@chakra-ui/react';
import { BlogHero } from '@/components/blog/BlogHero';
import { BlogCard } from '@/components/blog/BlogCard';
import { getPosts } from '@/lib/db';
import { FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Insights',
  description: 'Articles on product engineering, mobile app development, system architecture, and digital platform strategy.',
};

export const revalidate = 3600;

export default async function BlogPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let posts: any[] = [];
  
  try {
    posts = await getPosts(true);
  } catch {
    // DB may not be ready
  }

  return (
    <>
      <BlogHero />
      <Box py={{ base: 8, md: 12 }}>
        <Container maxW="7xl">
          {posts.length === 0 ? (
            <VStack py={16} gap={4}>
              <FileText size={48} color="#6b7280" />
              <Text color={{ base: 'gray.500', _dark: 'gray.400' }} fontSize="lg">
                No articles yet. Check back soon.
              </Text>
            </VStack>
          ) : (
            <Grid
              templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
              gap={{ base: 6, md: 8 }}
            >
              {posts.map((post) => (
                <BlogCard
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  tags={post.tags || []}
                  publishedAt={post.published_at}
                  coverImageUrl={post.cover_image_url}
                />
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    </>
  );
}
