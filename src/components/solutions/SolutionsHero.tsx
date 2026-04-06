'use client';

import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

export function SolutionsHero() {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      textAlign="center"
    >
      <VStack gap={4}>
        <Heading
          as="h1"
          fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
          fontWeight="bold"
          color={{ base: 'gray.900', _dark: 'white' }}
          lineHeight="shorter"
        >
          Solutions we build
        </Heading>
        <Text
          fontSize={{ base: 'lg', md: 'xl' }}
          color={{ base: 'gray.600', _dark: 'gray.400' }}
          maxW="3xl"
        >
          We build digital systems around real business operations — not just isolated 
          screens or standalone apps.
        </Text>
      </VStack>
    </MotionBox>
  );
}
