'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Text, HStack, Button, Flex } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const MotionBox = motion.create(Box);

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('zyphon_cookie_consent');
    if (consent !== 'accepted') {
      // Slight delay so it doesn't flash on page load
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('zyphon_cookie_consent', 'accepted');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <MotionBox
          position="fixed"
          bottom={0}
          left={0}
          right={0}
          zIndex={200}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <Box
            bg={{ base: 'white', _dark: 'rgba(17, 17, 24, 0.95)' }}
            backdropFilter="blur(16px)"
            borderTopWidth="1px"
            borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}
            py={4}
          >
            <Container maxW="7xl">
              <Flex
                direction={{ base: 'column', md: 'row' }}
                align={{ base: 'stretch', md: 'center' }}
                justify="space-between"
                gap={4}
              >
                <Text
                  fontSize="sm"
                  color={{ base: 'gray.600', _dark: 'gray.400' }}
                  maxW="2xl"
                >
                  We use essential cookies to ensure our website works properly. By continuing to use our site, you agree to our use of cookies.
                </Text>
                <HStack gap={3} flexShrink={0}>
                  <Link href="/privacy">
                    <Button
                      size="sm"
                      variant="ghost"
                      color={{ base: 'gray.500', _dark: 'gray.400' }}
                      _hover={{ color: 'primary.500' }}
                    >
                      Learn More
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    bg="primary.500"
                    color="white"
                    _hover={{ bg: 'primary.600' }}
                    onClick={handleAccept}
                  >
                    Accept
                  </Button>
                </HStack>
              </Flex>
            </Container>
          </Box>
        </MotionBox>
      )}
    </AnimatePresence>
  );
}
