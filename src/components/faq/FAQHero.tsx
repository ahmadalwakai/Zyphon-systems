'use client';

import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

export function FAQHero() {
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
          fontSize={{ base: '3xl', md: '5xl' }}
          fontWeight="bold"
          color={{ base: 'gray.900', _dark: 'white' }}
          lineHeight="shorter"
        >
          Frequently Asked Questions
        </Heading>
        <Text
          fontSize={{ base: 'lg', md: 'xl' }}
          color={{ base: 'gray.600', _dark: 'gray.400' }}
          maxW="2xl"
        >
          Common questions about our services, process, and how we work.
        </Text>
      </VStack>
    </MotionBox>
  );
}
