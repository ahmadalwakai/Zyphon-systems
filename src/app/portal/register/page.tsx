'use client';

import { useState } from 'react';
import { Box, Container, Heading, Text, VStack, Input, Button, Field } from '@chakra-ui/react';
import Link from 'next/link';

export default function PortalRegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/customer/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, fullName, companyName }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" py={12}>
        <Container maxW="sm">
          <Box
            p={8}
            borderRadius="xl"
            borderWidth="1px"
            borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}
            bg={{ base: 'white', _dark: 'rgba(17, 17, 24, 0.9)' }}
            textAlign="center"
          >
            <VStack gap={4}>
              <Box fontSize="4xl">📧</Box>
              <Heading as="h2" size="md" color={{ base: 'gray.900', _dark: 'white' }}>Check Your Email</Heading>
              <Text color={{ base: 'gray.500', _dark: 'gray.400' }} fontSize="sm">
                We&apos;ve sent a verification link to <strong>{email}</strong>. Click the link to verify your account, then sign in.
              </Text>
              <Link href="/portal/login">
                <Button variant="outline" borderColor="primary.500" color="primary.500" _hover={{ bg: 'primary.500/10' }}>
                  Back to Sign In
                </Button>
              </Link>
            </VStack>
          </Box>
        </Container>
      </Box>
    );
  }

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
          <VStack gap={5} as="form" onSubmit={handleSubmit}>
            <VStack gap={2}>
              <Heading as="h1" size="lg" color={{ base: 'gray.900', _dark: 'white' }}>
                Create Account
              </Heading>
              <Text color={{ base: 'gray.500', _dark: 'gray.400' }} fontSize="sm">
                Register for a customer portal account
              </Text>
            </VStack>

            {error && (
              <Box w="full" p={3} borderRadius="lg" bg="red.500/10" borderWidth="1px" borderColor="red.500/30">
                <Text color="red.400" fontSize="sm">{error}</Text>
              </Box>
            )}

            <Field.Root>
              <Field.Label color={{ base: 'gray.700', _dark: 'gray.300' }} fontSize="sm">Full Name</Field.Label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                bg={{ base: 'gray.50', _dark: 'gray.800' }}
                borderColor={{ base: 'gray.200', _dark: 'gray.600' }}
                color={{ base: 'gray.900', _dark: 'white' }}
                required
              />
            </Field.Root>

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
              <Field.Label color={{ base: 'gray.700', _dark: 'gray.300' }} fontSize="sm">Company Name (Optional)</Field.Label>
              <Input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Acme Inc."
                bg={{ base: 'gray.50', _dark: 'gray.800' }}
                borderColor={{ base: 'gray.200', _dark: 'gray.600' }}
                color={{ base: 'gray.900', _dark: 'white' }}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label color={{ base: 'gray.700', _dark: 'gray.300' }} fontSize="sm">Password</Field.Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 8 characters"
                bg={{ base: 'gray.50', _dark: 'gray.800' }}
                borderColor={{ base: 'gray.200', _dark: 'gray.600' }}
                color={{ base: 'gray.900', _dark: 'white' }}
                required
              />
            </Field.Root>

            <Field.Root>
              <Field.Label color={{ base: 'gray.700', _dark: 'gray.300' }} fontSize="sm">Confirm Password</Field.Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              Create Account
            </Button>

            <Text fontSize="sm" color={{ base: 'gray.500', _dark: 'gray.400' }}>
              Already have an account?{' '}
              <Link href="/portal/login">
                <Text as="span" color="primary.500" _hover={{ textDecoration: 'underline' }}>Sign in</Text>
              </Link>
            </Text>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}
