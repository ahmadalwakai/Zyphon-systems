'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, Container, Heading, Text, VStack, Input, Button, Field } from '@chakra-ui/react';
import Link from 'next/link';

export default function PortalLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const verified = searchParams.get('verified') === 'true';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/customer/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/portal');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch {
      setError('Login failed. Please try again.');
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
                Sign In
              </Heading>
              <Text color={{ base: 'gray.500', _dark: 'gray.400' }} fontSize="sm">
                Access your customer dashboard
              </Text>
            </VStack>

            {verified && (
              <Box w="full" p={3} borderRadius="lg" bg="green.500/10" borderWidth="1px" borderColor="green.500/30">
                <Text color="green.400" fontSize="sm">Email verified! You can now sign in.</Text>
              </Box>
            )}

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
              />
            </Field.Root>

            <Field.Root>
              <Field.Label color={{ base: 'gray.700', _dark: 'gray.300' }} fontSize="sm">Password</Field.Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                bg={{ base: 'gray.50', _dark: 'gray.800' }}
                borderColor={{ base: 'gray.200', _dark: 'gray.600' }}
                color={{ base: 'gray.900', _dark: 'white' }}
                required
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
              Sign In
            </Button>

            <Text fontSize="sm" color={{ base: 'gray.500', _dark: 'gray.400' }}>
              Don&apos;t have an account?{' '}
              <Link href="/portal/register">
                <Text as="span" color="primary.500" _hover={{ textDecoration: 'underline' }}>Register</Text>
              </Link>
            </Text>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}
