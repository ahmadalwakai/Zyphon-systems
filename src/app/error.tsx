'use client';

import { Box, Container, Heading, Text, Button, VStack, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { RefreshCcw, Home } from 'lucide-react';

const MotionBox = motion.create(Box);

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container maxW="2xl" minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        textAlign="center"
      >
        <VStack gap={6}>
          <Box
            p={4}
            borderRadius="full"
            bg="red.500/10"
            color="red.400"
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </Box>
          <Heading
            as="h1"
            fontSize={{ base: '2xl', md: '3xl' }}
            fontWeight="bold"
            color={{ base: 'gray.900', _dark: 'white' }}
          >
            Something went wrong
          </Heading>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            color={{ base: 'gray.600', _dark: 'gray.400' }}
            maxW="md"
          >
            We encountered an unexpected error. Please try again.
          </Text>
          
          {error.message && (
            <Box
              p={4}
              borderRadius="lg"
              bg={{ base: 'gray.100', _dark: 'whiteAlpha.50' }}
              maxW="md"
              w="full"
            >
              <Text
                fontSize="sm"
                color={{ base: 'gray.600', _dark: 'gray.400' }}
                fontFamily="mono"
              >
                {error.message}
              </Text>
            </Box>
          )}

          <HStack gap={4} mt={4}>
            <Button
              size="lg"
              bg="primary.500"
              color="white"
              _hover={{ bg: 'primary.600' }}
              onClick={reset}
            >
              <RefreshCcw size={18} style={{ marginRight: '8px' }} />
              Try Again
            </Button>
            <Link href="/">
              <Button
                size="lg"
                variant="outline"
                borderColor={{ base: 'gray.300', _dark: 'gray.600' }}
                color={{ base: 'gray.700', _dark: 'gray.300' }}
                _hover={{ bg: { base: 'gray.100', _dark: 'whiteAlpha.100' } }}
              >
                <Home size={18} style={{ marginRight: '8px' }} />
                Go Home
              </Button>
            </Link>
          </HStack>
        </VStack>
      </MotionBox>
    </Container>
  );
}
