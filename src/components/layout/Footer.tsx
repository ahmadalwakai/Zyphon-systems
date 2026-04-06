'use client';

import { Box, Container, Flex, Grid, HStack, VStack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { ZyphonLogo } from '@/components/brand/ZyphonLogo';
import { footerNavigation } from '@/data/navigation';
import { contactInfo } from '@/data/contact';
import { Mail, Phone } from 'lucide-react';

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
  </svg>
);

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      as="footer"
      role="contentinfo"
      aria-label="Site footer"
      bg={{ base: 'gray.50', _dark: '#080810' }}
      borderTopWidth="1px"
      borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}
      py={{ base: 12, md: 16 }}
    >
      <Container maxW="7xl">
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
          gap={{ base: 8, md: 12 }}
        >
          {/* Brand Section */}
          <VStack align="start" gap={4}>
            <ZyphonLogo size={36} animated={false} />
            <Text
              fontSize="sm"
              color={{ base: 'gray.600', _dark: 'gray.400' }}
              maxW="280px"
            >
              Product Engineering for Modern Businesses
            </Text>
            <HStack gap={4} pt={2}>
              <Link href={`mailto:${contactInfo.email}`}>
                <Box
                  p={2}
                  borderRadius="lg"
                  bg={{ base: 'gray.100', _dark: 'whiteAlpha.100' }}
                  color={{ base: 'gray.600', _dark: 'gray.400' }}
                  _hover={{ color: 'primary.500', bg: { base: 'gray.200', _dark: 'whiteAlpha.200' } }}
                  transition="all 0.2s"
                >
                  <Mail size={18} />
                </Box>
              </Link>
              <Link href={contactInfo.linkedinUrl} target="_blank">
                <Box
                  p={2}
                  borderRadius="lg"
                  bg={{ base: 'gray.100', _dark: 'whiteAlpha.100' }}
                  color={{ base: 'gray.600', _dark: 'gray.400' }}
                  _hover={{ color: 'primary.500', bg: { base: 'gray.200', _dark: 'whiteAlpha.200' } }}
                  transition="all 0.2s"
                >
                  <LinkedinIcon />
                </Box>
              </Link>
              <Link href={contactInfo.githubUrl} target="_blank">
                <Box
                  p={2}
                  borderRadius="lg"
                  bg={{ base: 'gray.100', _dark: 'whiteAlpha.100' }}
                  color={{ base: 'gray.600', _dark: 'gray.400' }}
                  _hover={{ color: 'primary.500', bg: { base: 'gray.200', _dark: 'whiteAlpha.200' } }}
                  transition="all 0.2s"
                >
                  <GithubIcon />
                </Box>
              </Link>
            </HStack>
          </VStack>

          {/* Navigation Links */}
          <VStack align="start" gap={4}>
            <Text fontWeight="semibold" color={{ base: 'gray.900', _dark: 'white' }}>
              Pages
            </Text>
            <VStack align="start" gap={2}>
              {footerNavigation.pages.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Text
                    fontSize="sm"
                    color={{ base: 'gray.600', _dark: 'gray.400' }}
                    _hover={{ color: 'primary.500' }}
                    transition="color 0.2s"
                  >
                    {item.label}
                  </Text>
                </Link>
              ))}
            </VStack>
          </VStack>

          {/* Services Links */}
          <VStack align="start" gap={4}>
            <Text fontWeight="semibold" color={{ base: 'gray.900', _dark: 'white' }}>
              Services
            </Text>
            <VStack align="start" gap={2}>
              {footerNavigation.services.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Text
                    fontSize="sm"
                    color={{ base: 'gray.600', _dark: 'gray.400' }}
                    _hover={{ color: 'primary.500' }}
                    transition="color 0.2s"
                  >
                    {item.label}
                  </Text>
                </Link>
              ))}
            </VStack>
          </VStack>

          {/* Contact & Resources */}
          <VStack align="start" gap={4}>
            <Text fontWeight="semibold" color={{ base: 'gray.900', _dark: 'white' }}>
              Resources
            </Text>
            <VStack align="start" gap={2}>
              {footerNavigation.resources.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Text
                    fontSize="sm"
                    color={{ base: 'gray.600', _dark: 'gray.400' }}
                    _hover={{ color: 'primary.500' }}
                    transition="color 0.2s"
                  >
                    {item.label}
                  </Text>
                </Link>
              ))}
            </VStack>
            <VStack align="start" gap={3} pt={2}>
              <HStack gap={3}>
                <Mail size={16} color="#a1a1aa" />
                <Text fontSize="sm" color={{ base: 'gray.600', _dark: 'gray.400' }}>
                  {contactInfo.email}
                </Text>
              </HStack>
              <HStack gap={3}>
                <Phone size={16} color="#a1a1aa" />
                <Text fontSize="sm" color={{ base: 'gray.600', _dark: 'gray.400' }}>
                  {contactInfo.phone}
                </Text>
              </HStack>
            </VStack>
            <VStack align="start" gap={2} pt={2}>
              {footerNavigation.legal.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Text
                    fontSize="xs"
                    color={{ base: 'gray.500', _dark: 'gray.500' }}
                    _hover={{ color: 'primary.500' }}
                    transition="color 0.2s"
                  >
                    {item.label}
                  </Text>
                </Link>
              ))}
            </VStack>
          </VStack>
        </Grid>

        {/* Bottom Bar */}
        <Flex
          mt={{ base: 8, md: 12 }}
          pt={8}
          borderTopWidth="1px"
          borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          gap={4}
        >
          <Text fontSize="xs" color={{ base: 'gray.500', _dark: 'gray.500' }}>
            © {currentYear} Zyphon Systems. All rights reserved.
          </Text>
          <Text fontSize="xs" color={{ base: 'gray.500', _dark: 'gray.500' }}>
            Built with precision.
          </Text>
        </Flex>
      </Container>
    </Box>
  );
}
