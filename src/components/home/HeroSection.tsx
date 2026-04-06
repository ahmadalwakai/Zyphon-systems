'use client';

import { Box, Container, Flex, Heading, Text, VStack, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);
const MotionHeading = motion.create(Heading);
const MotionText = motion.create(Text);

export function HeroSection() {
  return (
    <Box py={{ base: 16, md: 24, lg: 32 }}>
      <Container maxW="7xl">
        <VStack gap={{ base: 8, md: 10 }} align="center" textAlign="center">
          <MotionHeading
            as="h1"
            fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
            fontWeight="bold"
            lineHeight="1.1"
            maxW="5xl"
            color={{ base: 'gray.900', _dark: 'white' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            We build production-ready mobile apps, admin panels, and scalable digital platforms.
          </MotionHeading>

          <MotionText
            fontSize={{ base: 'lg', md: 'xl' }}
            color={{ base: 'gray.600', _dark: 'gray.400' }}
            maxW="3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            We help businesses turn ideas, workflows, and operational needs into structured digital
            products — from customer-facing applications to complete backend and admin systems.
          </MotionText>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Flex
              direction={{ base: 'column', sm: 'row' }}
              gap={4}
              justify="center"
            >
              <Link href="/book">
                <Button
                  size="lg"
                  bg="primary.500"
                  color="white"
                  fontWeight="semibold"
                  borderRadius="lg"
                  px={8}
                  _hover={{ bg: 'primary.600', transform: 'translateY(-2px)' }}
                  transition="all 0.2s"
                >
                  Book a Meeting
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  borderWidth="1px"
                  borderColor={{ base: 'gray.300', _dark: 'gray.600' }}
                  color={{ base: 'gray.700', _dark: 'white' }}
                  fontWeight="semibold"
                  borderRadius="lg"
                  px={8}
                  _hover={{
                    bg: { base: 'gray.100', _dark: 'whiteAlpha.100' },
                    borderColor: { base: 'gray.400', _dark: 'gray.500' },
                  }}
                  transition="all 0.2s"
                >
                  View Services
                </Button>
              </Link>
            </Flex>
          </MotionBox>

          <MotionText
            fontSize="sm"
            color={{ base: 'gray.500', _dark: 'gray.500' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Mobile Apps • Admin Panels • Backend Systems • Full Product Development
          </MotionText>
        </VStack>
      </Container>
    </Box>
  );
}
