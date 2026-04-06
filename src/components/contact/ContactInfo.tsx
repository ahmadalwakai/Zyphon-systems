'use client';

import { Box, Heading, Text, VStack, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle } from 'lucide-react';

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
  </svg>
);
import Link from 'next/link';

const MotionBox = motion.create(Box);

const contactDetails = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@zyphon.systems',
    href: 'mailto:hello@zyphon.systems',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+44 123 456 7890',
    href: 'https://wa.me/441234567890',
  },
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    value: 'Zyphon Systems',
    href: 'https://linkedin.com/company/zyphon',
  },
  {
    icon: GithubIcon,
    label: 'GitHub',
    value: '@zyphon',
    href: 'https://github.com/zyphon',
  },
];

const messageGuidelines = [
  'A brief description of your project or idea',
  'Your business context and target users',
  'Key features or functionality you need',
  'Your timeline expectations',
  'Budget range (if known)',
];

export function ContactInfo() {
  return (
    <VStack gap={6} align="stretch">
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Box
          borderRadius="xl"
          borderWidth="1px"
          borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}
          bg={{ base: 'white', _dark: 'rgba(17, 17, 24, 0.7)' }}
          backdropFilter="blur(12px)"
          p={{ base: 6, md: 8 }}
        >
          <VStack gap={6} align="stretch">
            <Heading
              as="h2"
              fontSize={{ base: 'xl', md: '2xl' }}
              fontWeight="semibold"
              color={{ base: 'gray.900', _dark: 'white' }}
            >
              Contact Details
            </Heading>

            <VStack gap={4} align="stretch">
              {contactDetails.map((contact) => (
                <Link key={contact.label} href={contact.href} target="_blank">
                  <HStack
                    gap={4}
                    p={3}
                    borderRadius="lg"
                    transition="all 0.2s"
                    _hover={{ bg: { base: 'gray.50', _dark: 'whiteAlpha.50' } }}
                  >
                    <Box
                      p={2}
                      borderRadius="lg"
                      bg={{ base: 'primary.50', _dark: 'primary.500/10' }}
                      color="primary.500"
                    >
                      <contact.icon size={20} />
                    </Box>
                    <VStack align="start" gap={0}>
                      <Text
                        fontSize="xs"
                        color={{ base: 'gray.500', _dark: 'gray.500' }}
                        fontWeight="medium"
                      >
                        {contact.label}
                      </Text>
                      <Text
                        fontSize="sm"
                        color={{ base: 'gray.900', _dark: 'white' }}
                        fontWeight="medium"
                      >
                        {contact.value}
                      </Text>
                    </VStack>
                  </HStack>
                </Link>
              ))}
            </VStack>
          </VStack>
        </Box>
      </MotionBox>

      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Box
          borderRadius="xl"
          borderWidth="1px"
          borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}
          bg={{ base: 'white', _dark: 'rgba(17, 17, 24, 0.7)' }}
          backdropFilter="blur(12px)"
          p={{ base: 6, md: 8 }}
        >
          <VStack gap={4} align="stretch">
            <Heading
              as="h3"
              fontSize={{ base: 'lg', md: 'xl' }}
              fontWeight="semibold"
              color={{ base: 'gray.900', _dark: 'white' }}
            >
              What to include in your message
            </Heading>

            <VStack gap={2} align="stretch">
              {messageGuidelines.map((item, index) => (
                <HStack key={index} gap={3} align="start">
                  <Box
                    w={1.5}
                    h={1.5}
                    borderRadius="full"
                    bg="primary.500"
                    mt={2}
                    flexShrink={0}
                  />
                  <Text
                    fontSize="sm"
                    color={{ base: 'gray.600', _dark: 'gray.400' }}
                  >
                    {item}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </VStack>
        </Box>
      </MotionBox>
    </VStack>
  );
}
