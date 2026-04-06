'use client';

import { Box, VStack, Text, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ZyphonLogo } from '@/components/brand/ZyphonLogo';
import { adminNavigation } from '@/data/navigation';
import { LayoutDashboard, MessageSquare, FolderKanban, Settings, LogOut } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Dashboard: LayoutDashboard,
  Inquiries: MessageSquare,
  Projects: FolderKanban,
  Settings: Settings,
};

export function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
      window.location.href = '/admin';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Box
      as="aside"
      w={{ base: 'full', md: '64' }}
      minH={{ md: '100vh' }}
      bg={{ base: 'gray.900', _dark: '#0a0a0f' }}
      borderRightWidth={{ md: '1px' }}
      borderColor="whiteAlpha.100"
      position={{ md: 'fixed' }}
      left={0}
      top={0}
    >
      <VStack h="full" justify="space-between" py={6}>
        <VStack gap={8} align="stretch" w="full">
          <Box px={6}>
            <Link href="/admin">
              <ZyphonLogo size={32} animated={false} />
            </Link>
          </Box>

          <VStack gap={1} align="stretch" px={3}>
            {adminNavigation.map((item) => {
              const Icon = iconMap[item.label] || LayoutDashboard;
              const isActive = pathname === item.href;

              return (
                <Link key={item.href} href={item.href}>
                  <Flex
                    align="center"
                    gap={3}
                    px={4}
                    py={3}
                    borderRadius="lg"
                    bg={isActive ? 'whiteAlpha.100' : 'transparent'}
                    color={isActive ? 'white' : 'gray.400'}
                    _hover={{ bg: 'whiteAlpha.50', color: 'white' }}
                    transition="all 0.2s"
                  >
                    <Icon size={20} />
                    <Text fontSize="sm" fontWeight="medium">
                      {item.label}
                    </Text>
                  </Flex>
                </Link>
              );
            })}
          </VStack>
        </VStack>

        <Box px={3} w="full">
          <Flex
            as="button"
            onClick={handleLogout}
            align="center"
            gap={3}
            px={4}
            py={3}
            w="full"
            borderRadius="lg"
            color="gray.400"
            _hover={{ bg: 'red.500/10', color: 'red.400' }}
            transition="all 0.2s"
          >
            <LogOut size={20} />
            <Text fontSize="sm" fontWeight="medium">
              Logout
            </Text>
          </Flex>
        </Box>
      </VStack>
    </Box>
  );
}
