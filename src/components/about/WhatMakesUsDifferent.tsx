'use client';

import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const MotionBox = motion.create(Box);

const differentiators = [
  'We scope and plan before we build — no surprises halfway through.',
  'We deliver working systems, not endless mockups or prototypes.',
  'We communicate clearly and predictably throughout the process.',
  'We focus on systems that actually support business operations.',
  'We build for maintainability and future growth, not just initial launch.',
];

export function WhatMakesUsDifferent() {
  return (
    <Box py={{ base: 12, md: 16 }}>
      <Container maxW="7xl">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box
            borderRadius="xl"
            borderWidth="1px"
            borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}
            bg={{ base: 'white', _dark: 'rgba(17, 17, 24, 0.7)' }}
            backdropFilter="blur(12px)"
            p={{ base: 8, md: 12 }}
          >
            <VStack gap={6} align="start">
              <Heading
                as="h2"
                fontSize={{ base: '2xl', md: '3xl' }}
                fontWeight="bold"
                color={{ base: 'gray.900', _dark: 'white' }}
              >
                What makes us different
              </Heading>
              <VStack gap={4} align="start" w="100%">
                {differentiators.map((item, index) => (
                  <MotionBox
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    display="flex"
                    alignItems="flex-start"
                    gap={3}
                  >
                    <Box color="primary.500" mt={1} flexShrink={0}>
                      <CheckCircle size={20} />
                    </Box>
                    <Text
                      fontSize={{ base: 'md', md: 'lg' }}
                      color={{ base: 'gray.600', _dark: 'gray.400' }}
                      lineHeight="relaxed"
                    >
                      {item}
                    </Text>
                  </MotionBox>
                ))}
              </VStack>
            </VStack>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
}
