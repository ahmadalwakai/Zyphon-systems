'use client';

import { Box, Container, Heading, Text, VStack, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

export function OurGoal() {
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
            borderRadius="2xl"
            bg="linear-gradient(135deg, rgba(13, 148, 136, 0.1) 0%, rgba(79, 70, 229, 0.1) 100%)"
            borderWidth="1px"
            borderColor={{ base: 'primary.200', _dark: 'primary.500/30' }}
            p={{ base: 8, md: 12 }}
            textAlign="center"
          >
            <VStack gap={6}>
              <Heading
                as="h2"
                fontSize={{ base: '2xl', md: '3xl' }}
                fontWeight="bold"
                color={{ base: 'gray.900', _dark: 'white' }}
              >
                Our goal
              </Heading>
              <Text
                fontSize={{ base: 'md', md: 'lg' }}
                color={{ base: 'gray.600', _dark: 'gray.400' }}
                maxW="3xl"
                lineHeight="relaxed"
              >
                To be the engineering partner that businesses can rely on when they need structured,
                production-ready digital systems. Not just ideas or designs — but real products that
                work in the real world, supporting real operations, day after day.
              </Text>
              <Link href="/contact">
                <Button
                  size="lg"
                  bg="primary.500"
                  color="white"
                  fontWeight="semibold"
                  borderRadius="lg"
                  px={8}
                  _hover={{ bg: 'primary.600', transform: 'translateY(-2px)' }}
                  transition="all 0.2s"
                >
                  Start a Conversation
                </Button>
              </Link>
            </VStack>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
}
