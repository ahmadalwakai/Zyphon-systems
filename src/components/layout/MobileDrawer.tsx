'use client';

import { Box, Flex, VStack, IconButton } from '@chakra-ui/react';
import { X } from 'lucide-react';
import Link from 'next/link';
import { ZyphonLogo } from '@/components/brand/ZyphonLogo';
import { mainNavigation } from '@/data/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion.create(Box);

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <MotionBox
            position="fixed"
            inset={0}
            zIndex={200}
            bg="blackAlpha.700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <MotionBox
            position="fixed"
            top={0}
            right={0}
            bottom={0}
            width="80%"
            maxW="320px"
            zIndex={201}
            bg={{ base: 'white', _dark: '#0a0a0f' }}
            borderLeftWidth="1px"
            borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <Flex direction="column" h="100%">
              {/* Header */}
              <Flex justify="space-between" align="center" p={4} borderBottomWidth="1px" borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}>
                <ZyphonLogo size={32} animated={false} />
                <IconButton
                  aria-label="Close menu"
                  variant="ghost"
                  onClick={onClose}
                >
                  <X size={24} />
                </IconButton>
              </Flex>

              {/* Navigation Links */}
              <VStack align="stretch" gap={0} flex={1} py={4}>
                {mainNavigation.map((item, index) => (
                  <MotionBox
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link href={item.href} onClick={onClose}>
                      <Box
                        px={6}
                        py={4}
                        fontSize="lg"
                        fontWeight="medium"
                        color={{ base: 'gray.700', _dark: 'gray.200' }}
                        _hover={{ bg: { base: 'gray.50', _dark: 'whiteAlpha.50' }, color: 'primary.500' }}
                        transition="all 0.2s"
                      >
                        {item.label}
                      </Box>
                    </Link>
                  </MotionBox>
                ))}
              </VStack>

              {/* CTA */}
              <Box p={6} borderTopWidth="1px" borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}>
                <Link href="/contact" onClick={onClose}>
                  <Box
                    bg="primary.500"
                    color="white"
                    fontWeight="semibold"
                    borderRadius="lg"
                    py={3}
                    textAlign="center"
                    _hover={{ bg: 'primary.600' }}
                    transition="background 0.2s"
                  >
                    Get Started
                  </Box>
                </Link>
              </Box>
            </Flex>
          </MotionBox>
        </>
      )}
    </AnimatePresence>
  );
}
