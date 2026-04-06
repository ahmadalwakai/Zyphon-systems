'use client';

import { useState } from 'react';
import { Box, Container, Heading, Text, VStack, Input, Button, Field } from '@chakra-ui/react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/customer/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.error || 'Something went wrong');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" py={12}>
      <Container maxW="sm">
        <Box
          p={8}
          borderRadius="xl"
          borderWidth="1px"
          borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}
          bg={{ base: 'white', _dark: 'rgba(17, 17, 24, 0.9)' }}
        >
          {submitted ? (
            <VStack gap={4}>
              <Heading as="h1" size="lg" color={{ base: 'gray.900', _dark: 'white' }}>
                Check Your Email
              </Heading>
              <Text color={{ base: 'gray.500', _dark: 'gray.400' }} fontSize="sm" textAlign="center">
                If an account with that email exists, we&apos;ve sent a password reset link. Please check your inbox.
              </Text>
              <Link href="/portal/login">
                <Text color="primary.500" fontSize="sm" _hover={{ textDecoration: 'underline' }}>
                  Back to Sign In
                </Text>
              </Link>
            </VStack>
          ) : (
            <VStack gap={6} as="form" onSubmit={handleSubmit}>
              <VStack gap={2}>
                <Heading as="h1" size="lg" color={{ base: 'gray.900', _dark: 'white' }}>
                  Forgot Password
                </Heading>
                <Text color={{ base: 'gray.500', _dark: 'gray.400' }} fontSize="sm" textAlign="center">
                  Enter your email and we&apos;ll send you a reset link.
                </Text>
              </VStack>

              {error && (
                <Box w="full" p={3} borderRadius="lg" bg="red.500/10" borderWidth="1px" borderColor="red.500/30">
                  <Text color="red.400" fontSize="sm">{error}</Text>
                </Box>
              )}

              <Field.Root>
                <Field.Label color={{ base: 'gray.700', _dark: 'gray.300' }} fontSize="sm">Email</Field.Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  bg={{ base: 'gray.50', _dark: 'gray.800' }}
                  borderColor={{ base: 'gray.200', _dark: 'gray.600' }}
                  color={{ base: 'gray.900', _dark: 'white' }}
                  required
                  aria-required="true"
                />
              </Field.Root>

              <Button
                type="submit"
                w="full"
                bg="primary.500"
                color="white"
                _hover={{ bg: 'primary.600' }}
                loading={isLoading}
              >
                Send Reset Link
              </Button>

              <Text fontSize="sm" color={{ base: 'gray.500', _dark: 'gray.400' }}>
                Remember your password?{' '}
                <Link href="/portal/login">
                  <Text as="span" color="primary.500" _hover={{ textDecoration: 'underline' }}>Sign In</Text>
                </Link>
              </Text>
            </VStack>
          )}
        </Box>
      </Container>
    </Box>
  );
}
