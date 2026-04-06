'use client';

import { Box, Heading, Text, VStack, HStack, Badge } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const MotionBox = motion.create(Box);

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  publishedAt: string;
  coverImageUrl?: string;
}

export function BlogCard({ slug, title, excerpt, tags, publishedAt, coverImageUrl }: BlogCardProps) {
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(publishedAt));

  const truncatedExcerpt = excerpt.length > 120 ? excerpt.slice(0, 120) + '...' : excerpt;

  return (
    <Link href={`/blog/${slug}`}>
      <MotionBox
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ duration: 0.2 }}
      >
        <Box
          borderRadius="xl"
          borderWidth="1px"
          borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}
          bg={{ base: 'white', _dark: 'rgba(17, 17, 24, 0.7)' }}
          backdropFilter="blur(12px)"
          overflow="hidden"
          h="100%"
          _hover={{
            borderColor: 'primary.500',
            boxShadow: '0 0 30px rgba(13, 148, 136, 0.15)',
          }}
          transition="all 0.3s ease-in-out"
        >
          {/* Cover Image or Gradient Placeholder */}
          <Box
            h="180px"
            bg={coverImageUrl ? `url(${coverImageUrl})` : 'linear-gradient(135deg, #0d9488 0%, #4f46e5 100%)'}
            backgroundSize="cover"
            backgroundPosition="center"
          />

          <VStack align="start" gap={3} p={6}>
            <HStack gap={2} flexWrap="wrap">
              {tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  px={2}
                  py={0.5}
                  borderRadius="full"
                  bg={{ base: 'primary.50', _dark: 'primary.500/10' }}
                  color="primary.500"
                  fontSize="xs"
                >
                  {tag}
                </Badge>
              ))}
            </HStack>

            <Heading
              as="h3"
              fontSize={{ base: 'lg', md: 'xl' }}
              fontWeight="semibold"
              color={{ base: 'gray.900', _dark: 'white' }}
              lineHeight="tight"
            >
              {title}
            </Heading>

            <Text
              fontSize="sm"
              color={{ base: 'gray.600', _dark: 'gray.400' }}
              lineHeight="relaxed"
            >
              {truncatedExcerpt}
            </Text>

            <HStack justify="space-between" w="100%" pt={2}>
              <Text fontSize="xs" color={{ base: 'gray.500', _dark: 'gray.500' }}>
                {formattedDate}
              </Text>
              <Text
                fontSize="sm"
                color="primary.500"
                fontWeight="medium"
              >
                Read More →
              </Text>
            </HStack>
          </VStack>
        </Box>
      </MotionBox>
    </Link>
  );
}
