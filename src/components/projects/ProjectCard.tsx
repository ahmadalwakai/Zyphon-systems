'use client';

import { Box, Heading, Text, VStack, Badge, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { Project } from '@/types';

const MotionBox = motion.create(Box);

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const content = (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -4 }}
    >
      <Box
        borderRadius="xl"
        borderWidth="1px"
        borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}
        bg={{ base: 'white', _dark: 'rgba(17, 17, 24, 0.7)' }}
        backdropFilter="blur(12px)"
        p={{ base: 6, md: 8 }}
        h="100%"
        transition="all 0.3s ease-in-out"
        _hover={{
          borderColor: 'primary.500',
          boxShadow: '0 0 30px rgba(13, 148, 136, 0.15)',
        }}
      >
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
            as="h3"
            fontSize={{ base: 'xl', md: '2xl' }}
            fontWeight="semibold"
            color={{ base: 'gray.900', _dark: 'white' }}
          >
            {project.title}
          </Heading>
          <Text
            fontSize={{ base: 'sm', md: 'md' }}
            color={{ base: 'gray.600', _dark: 'gray.400' }}
            lineHeight="relaxed"
          >
            {project.description}
          </Text>
          {project.outcome && (
            <Box
              w="100%"
              pt={4}
              borderTopWidth="1px"
              borderColor={{ base: 'gray.100', _dark: 'whiteAlpha.50' }}
            >
              <Text
                fontSize="sm"
                fontWeight="semibold"
                color={{ base: 'gray.700', _dark: 'gray.300' }}
                mb={2}
              >
                Outcome:
              </Text>
              <Text
                fontSize="sm"
                color={{ base: 'gray.600', _dark: 'gray.400' }}
              >
                {project.outcome}
              </Text>
            </Box>
          )}
          {project.slug && (
            <Flex align="center" gap={2} pt={2}>
              <Text fontSize="sm" color="primary.500" fontWeight="medium">View Case Study</Text>
              <ArrowRight size={14} color="#0d9488" />
            </Flex>
          )}
        </VStack>
      </Box>
    </MotionBox>
  );

  if (project.slug) {
    return <Link href={`/projects/${project.slug}`}>{content}</Link>;
  }
  return content;
}
