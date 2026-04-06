'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Box, Container, Flex, Heading, Button, Text, Spinner } from '@chakra-ui/react';
import Link from 'next/link';
import { LogOut } from 'lucide-react';

interface Customer {
  id: number;
  email: string;
  full_name: string;
  company_name: string | null;
}

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthPage = pathname === '/portal/login' || pathname === '/portal/register';
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(!isAuthPage);

  useEffect(() => {
    if (isAuthPage) return;
    fetch('/api/customer/me', { credentials: 'include' })
      .then((res) => {
        if (!res.ok) throw new Error('Not authenticated');
        return res.json();
      })
      .then((data) => setCustomer(data.customer))
      .catch(() => router.push('/portal/login'))
      .finally(() => setLoading(false));
  }, [isAuthPage, router]);

  if (isAuthPage) return <>{children}</>;

  if (loading) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Spinner color="primary.500" size="lg" />
      </Box>
    );
  }

  const handleLogout = async () => {
    await fetch('/api/customer/logout', { method: 'POST', credentials: 'include' });
    router.push('/portal/login');
  };

  return (
    <Box minH="100vh" bg={{ base: 'gray.50', _dark: 'gray.900' }}>
      <Box
        as="header"
        borderBottomWidth="1px"
        borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}
        bg={{ base: 'white', _dark: 'rgba(17, 17, 24, 0.95)' }}
        position="sticky"
        top={0}
        zIndex={50}
      >
        <Container maxW="6xl">
          <Flex h="64px" align="center" justify="space-between">
            <Flex align="center" gap={3}>
              <Link href="/">
                <Heading size="sm" color="primary.500" fontWeight="bold">ZYPHON</Heading>
              </Link>
              <Text color={{ base: 'gray.400', _dark: 'gray.600' }}>|</Text>
              <Text color={{ base: 'gray.600', _dark: 'gray.400' }} fontSize="sm">Customer Portal</Text>
            </Flex>
            <Flex align="center" gap={4}>
              {customer && (
                <Text fontSize="sm" color={{ base: 'gray.600', _dark: 'gray.400' }}>
                  {customer.full_name}
                </Text>
              )}
              <Button
                size="sm"
                variant="ghost"
                color={{ base: 'gray.600', _dark: 'gray.400' }}
                _hover={{ color: 'red.400' }}
                onClick={handleLogout}
              >
                <LogOut size={16} />
                Sign Out
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Box>
      <Box py={8}>{children}</Box>
    </Box>
  );
}
