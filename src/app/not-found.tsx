'use client';

import { Box, Container, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { SmartBackground } from '@/components/ui/SmartBackground';
import { GradientText } from '@/components/ui/GradientText';

const MotionBox = motion.create(Box);

export default function NotFound() {
  return (
    <>
      <SmartBackground />
      <Container maxW="2xl" minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          textAlign="center"
        >
          <VStack gap={6}>
            <GradientText
              as="span"
              fontSize={{ base: '6xl', md: '8xl', lg: '9xl' }}
              fontWeight="bold"
            >
              404
            </GradientText>
            <Heading
              as="h1"
              fontSize={{ base: 'xl', md: '2xl' }}
              fontWeight="semibold"
              color={{ base: 'gray.900', _dark: 'white' }}
            >
              Page not found
            </Heading>
            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              color={{ base: 'gray.600', _dark: 'gray.400' }}
              maxW="md"
            >
              This page doesn't exist or has been moved.
            </Text>
            <Link href="/">
              <Button
                size="lg"
                bg="primary.500"
                color="white"
                _hover={{ bg: 'primary.600' }}
                mt={4}
              >
                <Home size={18} style={{ marginRight: '8px' }} />
                Go Home
              </Button>
            </Link>
          </VStack>
        </MotionBox>
      </Container>
    </>
  );
}
