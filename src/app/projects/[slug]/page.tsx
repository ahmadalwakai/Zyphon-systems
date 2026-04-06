import { notFound } from 'next/navigation';
import { Box, Container, Heading, Text, VStack, HStack, Badge, SimpleGrid, Flex } from '@chakra-ui/react';
import { staticProjects } from '@/data/projects';
import Link from 'next/link';
import { ArrowLeft, Quote } from 'lucide-react';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = staticProjects.find((p) => p.slug === slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.title} — Case Study | Zyphon Systems`,
    description: project.description,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = staticProjects.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <Box py={{ base: 16, md: 24 }}>
      <Container maxW="4xl">
        <VStack gap={12} align="stretch">
          {/* Back link */}
          <Link href="/projects">
            <Flex align="center" gap={2} color="primary.500" _hover={{ gap: 3 }} transition="all 0.2s">
              <ArrowLeft size={16} />
              <Text fontSize="sm" fontWeight="medium">Back to Projects</Text>
            </Flex>
          </Link>

          {/* Header */}
          <VStack align="start" gap={4}>
            <Badge
              px={3}
              py={1}
              borderRadius="full"
              bg={{ base: 'primary.50', _dark: 'primary.500/10' }}
              color="primary.500"
              fontSize="xs"
              fontWeight="semibold"
            >
              {project.type}
            </Badge>
            <Heading
              as="h1"
              fontSize={{ base: '3xl', md: '4xl' }}
              fontWeight="bold"
              color={{ base: 'gray.900', _dark: 'white' }}
            >
              {project.title}
            </Heading>
            <Text fontSize={{ base: 'md', md: 'lg' }} color={{ base: 'gray.600', _dark: 'gray.400' }} lineHeight="relaxed">
              {project.description}
            </Text>
          </VStack>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <Box>
              <Text fontSize="sm" fontWeight="semibold" color={{ base: 'gray.700', _dark: 'gray.300' }} mb={3}>
                Technologies Used
              </Text>
              <HStack gap={2} flexWrap="wrap">
                {project.technologies.map((tech) => (
                  <Badge
                    key={tech}
                    px={3}
                    py={1}
                    borderRadius="full"
                    bg={{ base: 'gray.100', _dark: 'whiteAlpha.100' }}
                    color={{ base: 'gray.700', _dark: 'gray.300' }}
                    fontSize="xs"
                  >
                    {tech}
                  </Badge>
                ))}
              </HStack>
            </Box>
          )}

          {/* Challenge / Approach / Results */}
          <SimpleGrid columns={{ base: 1, md: 1 }} gap={8}>
            {project.challenge && (
              <Box
                p={6}
                borderRadius="xl"
                borderWidth="1px"
                borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}
                bg={{ base: 'white', _dark: 'rgba(17, 17, 24, 0.7)' }}
              >
                <Text fontSize="sm" fontWeight="bold" color="red.400" textTransform="uppercase" letterSpacing="wider" mb={3}>
                  The Challenge
                </Text>
                <Text color={{ base: 'gray.600', _dark: 'gray.400' }} lineHeight="relaxed">
                  {project.challenge}
                </Text>
              </Box>
            )}

            {project.approach && (
              <Box
                p={6}
                borderRadius="xl"
                borderWidth="1px"
                borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}
                bg={{ base: 'white', _dark: 'rgba(17, 17, 24, 0.7)' }}
              >
                <Text fontSize="sm" fontWeight="bold" color="blue.400" textTransform="uppercase" letterSpacing="wider" mb={3}>
                  Our Approach
                </Text>
                <Text color={{ base: 'gray.600', _dark: 'gray.400' }} lineHeight="relaxed">
                  {project.approach}
                </Text>
              </Box>
            )}

            {project.results && (
              <Box
                p={6}
                borderRadius="xl"
                borderWidth="1px"
                borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}
                bg={{ base: 'white', _dark: 'rgba(17, 17, 24, 0.7)' }}
              >
                <Text fontSize="sm" fontWeight="bold" color="green.400" textTransform="uppercase" letterSpacing="wider" mb={3}>
                  Results
                </Text>
                <Text color={{ base: 'gray.600', _dark: 'gray.400' }} lineHeight="relaxed">
                  {project.results}
                </Text>
              </Box>
            )}
          </SimpleGrid>

          {/* Testimonial */}
          {project.testimonialQuote && (
            <Box
              p={8}
              borderRadius="xl"
              bg={{ base: 'primary.50', _dark: 'primary.500/5' }}
              borderWidth="1px"
              borderColor={{ base: 'primary.100', _dark: 'primary.500/20' }}
            >
              <Box color="primary.500" mb={3}>
                <Quote size={24} />
              </Box>
              <Text
                fontSize={{ base: 'lg', md: 'xl' }}
                fontStyle="italic"
                color={{ base: 'gray.700', _dark: 'gray.300' }}
                lineHeight="relaxed"
                mb={4}
              >
                &ldquo;{project.testimonialQuote}&rdquo;
              </Text>
              {project.testimonialAuthor && (
                <Text fontSize="sm" color={{ base: 'gray.500', _dark: 'gray.500' }} fontWeight="medium">
                  — {project.testimonialAuthor}
                </Text>
              )}
            </Box>
          )}

          {/* CTA */}
          <Box textAlign="center" pt={4}>
            <Text color={{ base: 'gray.500', _dark: 'gray.400' }} mb={4}>
              Interested in a similar solution for your business?
            </Text>
            <HStack gap={4} justify="center">
              <Link href="/contact">
                <Box
                  as="span"
                  bg="primary.500"
                  color="white"
                  px={6}
                  py={3}
                  borderRadius="lg"
                  fontWeight="semibold"
                  _hover={{ bg: 'primary.600' }}
                  transition="background 0.2s"
                >
                  Get Started
                </Box>
              </Link>
              <Link href="/book">
                <Box
                  as="span"
                  borderWidth="1px"
                  borderColor="primary.500"
                  color="primary.500"
                  px={6}
                  py={3}
                  borderRadius="lg"
                  fontWeight="semibold"
                  _hover={{ bg: 'primary.500/10' }}
                  transition="background 0.2s"
                >
                  Book a Meeting
                </Box>
              </Link>
            </HStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
