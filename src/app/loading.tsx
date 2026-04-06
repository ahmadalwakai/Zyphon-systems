'use client';

import { Box, Container, VStack, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ZyphonLogo } from '@/components/brand/ZyphonLogo';

const MotionBox = motion.create(Box);

export default function Loading() {
  return (
    <Container maxW="2xl" minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <VStack gap={6}>
        <MotionBox
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
        >
          <ZyphonLogo size={60} animated={false} />
        </MotionBox>
        <Text
          fontSize="sm"
          color={{ base: 'gray.500', _dark: 'gray.500' }}
          fontWeight="medium"
        >
          Loading...
        </Text>
      </VStack>
    </Container>
  );
}
