'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, Container, Heading, Text, VStack, Input, Button, Field } from '@chakra-ui/react';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (!token) {
      setError('Invalid reset link');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/customer/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/portal/login?reset=true');
      } else {
        setError(data.error || 'Failed to reset password');
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
          <VStack gap={6} as="form" onSubmit={handleSubmit}>
            <VStack gap={2}>
              <Heading as="h1" size="lg" color={{ base: 'gray.900', _dark: 'white' }}>
                Reset Password
              </Heading>
              <Text color={{ base: 'gray.500', _dark: 'gray.400' }} fontSize="sm" textAlign="center">
                Enter your new password below.
              </Text>
            </VStack>

            {error && (
              <Box w="full" p={3} borderRadius="lg" bg="red.500/10" borderWidth="1px" borderColor="red.500/30">
                <Text color="red.400" fontSize="sm">{error}</Text>
              </Box>
            )}

            <Field.Root>
              <Field.Label color={{ base: 'gray.700', _dark: 'gray.300' }} fontSize="sm">New Password</Field.Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                bg={{ base: 'gray.50', _dark: 'gray.800' }}
                borderColor={{ base: 'gray.200', _dark: 'gray.600' }}
                color={{ base: 'gray.900', _dark: 'white' }}
                required
                aria-required="true"
              />
            </Field.Root>

            <Field.Root>
              <Field.Label color={{ base: 'gray.700', _dark: 'gray.300' }} fontSize="sm">Confirm New Password</Field.Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
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
              Reset Password
            </Button>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
