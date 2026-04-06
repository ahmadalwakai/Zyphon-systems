'use client';

import { Box, Container, Flex, HStack, Button, IconButton } from '@chakra-ui/react';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { ZyphonLogo } from '@/components/brand/ZyphonLogo';
import { MobileDrawer } from './MobileDrawer';
import { mainNavigation } from '@/data/navigation';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

export function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <MotionBox
        as="nav"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={100}
        bg={{ base: 'rgba(255, 255, 255, 0.8)', _dark: 'rgba(10, 10, 15, 0.8)' }}
        backdropFilter="blur(12px)"
        borderBottomWidth="1px"
        borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Container maxW="7xl" py={4}>
          <Flex justify="space-between" align="center">
            <Link href="/">
              <ZyphonLogo size={36} />
            </Link>

            {/* Desktop Navigation */}
            <HStack gap={8} display={{ base: 'none', md: 'flex' }}>
              {mainNavigation.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Box
                    fontSize="sm"
                    fontWeight="medium"
                    color={{ base: 'gray.600', _dark: 'gray.300' }}
                    _hover={{ color: 'primary.500' }}
                    transition="color 0.2s"
                  >
                    {item.label}
                  </Box>
                </Link>
              ))}
            </HStack>

            {/* Desktop CTA */}
            <HStack gap={4} display={{ base: 'none', md: 'flex' }}>
              <Link href="/contact">
                <Button
                  bg="primary.500"
                  color="white"
                  fontWeight="semibold"
                  borderRadius="lg"
                  px={6}
                  _hover={{ bg: 'primary.600', transform: 'translateY(-2px)' }}
                  transition="all 0.2s"
                >
                  Get Started
                </Button>
              </Link>
            </HStack>

            {/* Mobile Menu Button */}
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              aria-label="Open menu"
              variant="ghost"
              onClick={() => setIsDrawerOpen(true)}
            >
              <Menu size={24} />
            </IconButton>
          </Flex>
        </Container>
      </MotionBox>

      {/* Spacer for fixed navbar */}
      <Box h="72px" />

      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}
