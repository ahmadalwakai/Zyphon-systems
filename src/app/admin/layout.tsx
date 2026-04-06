'use client';

import { useState, useEffect } from 'react';
import { Box, Flex, Input, Button, VStack, Text, Heading } from '@chakra-ui/react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if already authenticated by trying to fetch protected data
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/inquiries');
        setIsAuthenticated(res.ok);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        setError('Invalid password');
      }
    } catch {
      setError('Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (isAuthenticated === null) {
    return (
      <Flex
        minH="100vh"
        bg="#0a0a0f"
        align="center"
        justify="center"
      >
        <Text color="gray.400">Loading...</Text>
      </Flex>
    );
  }

  // Login screen
  if (!isAuthenticated) {
    return (
      <Flex
        minH="100vh"
        bg="#0a0a0f"
        align="center"
        justify="center"
      >
        <Box
          maxW="sm"
          w="full"
          mx={4}
          p={8}
          borderRadius="xl"
          borderWidth="1px"
          borderColor="whiteAlpha.100"
          bg="rgba(17, 17, 24, 0.9)"
        >
          <VStack gap={6} as="form" onSubmit={handleLogin}>
            <VStack gap={2}>
              <Heading as="h1" size="lg" color="white">
                Admin Login
              </Heading>
              <Text color="gray.400" fontSize="sm">
                Enter the admin password to continue
              </Text>
            </VStack>

            {error && (
              <Box
                w="full"
                p={3}
                borderRadius="lg"
                bg="red.500/10"
                borderWidth="1px"
                borderColor="red.500/30"
              >
                <Text color="red.400" fontSize="sm">
                  {error}
                </Text>
              </Box>
            )}

            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              bg="gray.800"
              borderColor="gray.600"
              color="white"
              _placeholder={{ color: 'gray.500' }}
              _focus={{
                borderColor: 'primary.500',
                boxShadow: '0 0 0 1px var(--chakra-colors-primary-500)',
              }}
            />

            <Button
              type="submit"
              w="full"
              bg="primary.500"
              color="white"
              _hover={{ bg: 'primary.600' }}
              loading={isLoading}
            >
              Login
            </Button>
          </VStack>
        </Box>
      </Flex>
    );
  }

  // Authenticated admin layout
  return (
    <Flex minH="100vh" bg="#0a0a0f">
      <AdminSidebar />
      <Box
        flex={1}
        ml={{ base: 0, md: '64' }}
        p={{ base: 4, md: 8 }}
      >
        {children}
      </Box>
    </Flex>
  );
}
