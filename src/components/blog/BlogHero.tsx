'use client';

import { Box, Heading, Text, VStack, Container } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

export function BlogHero() {
  return (
    <Container maxW="7xl" pt={{ base: 24, md: 32 }} pb={{ base: 8, md: 12 }}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <VStack gap={4} textAlign="center" maxW="2xl" mx="auto">
          <Heading
            as="h1"
            fontSize={{ base: '3xl', md: '5xl' }}
            fontWeight="bold"
            color={{ base: 'gray.900', _dark: 'white' }}
          >
            Insights
          </Heading>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            color={{ base: 'gray.600', _dark: 'gray.400' }}
            lineHeight="relaxed"
          >
            Articles on product engineering, system architecture, and building
            production-ready digital platforms.
          </Text>
        </VStack>
      </MotionBox>
    </Container>
  );
}
