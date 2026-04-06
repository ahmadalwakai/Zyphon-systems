'use client';

import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

export function WhoWeWorkWith() {
  return (
    <Box py={{ base: 16, md: 24 }}>
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
            textAlign="center"
          >
            <VStack gap={6}>
              <Heading
                as="h2"
                fontSize={{ base: '2xl', md: '4xl' }}
                fontWeight="bold"
                color={{ base: 'gray.900', _dark: 'white' }}
              >
                Who we work with
              </Heading>
              <Text
                fontSize={{ base: 'md', md: 'lg' }}
                color={{ base: 'gray.600', _dark: 'gray.400' }}
                maxW="3xl"
                lineHeight="relaxed"
              >
                We work with businesses that need structured digital systems to support real
                operations. This includes hospitality, booking platforms, internal business tools,
                multi-branch operations, service businesses, and custom workflow-driven products.
              </Text>
            </VStack>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
}
