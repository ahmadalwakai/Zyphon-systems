'use client';

import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionHeading = motion.create(Heading);
const MotionText = motion.create(Text);

export function ProjectsHero() {
  return (
    <Box py={{ base: 16, md: 24, lg: 32 }}>
      <Container maxW="7xl">
        <VStack gap={{ base: 6, md: 8 }} align="center" textAlign="center">
          <MotionHeading
            as="h1"
            fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
            fontWeight="bold"
            lineHeight="1.1"
            maxW="4xl"
            color={{ base: 'gray.900', _dark: 'white' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Projects
          </MotionHeading>

          <MotionText
            fontSize={{ base: 'lg', md: 'xl' }}
            color={{ base: 'gray.600', _dark: 'gray.400' }}
            maxW="3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            A selection of production-ready systems we&apos;ve built for businesses across various
            industries.
          </MotionText>
        </VStack>
      </Container>
    </Box>
  );
}
