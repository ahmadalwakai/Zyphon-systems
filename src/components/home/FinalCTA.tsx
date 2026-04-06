'use client';

import { Box, Container, Flex, Heading, Text, VStack, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

export function FinalCTA() {
  return (
    <Box py={{ base: 16, md: 24 }}>
      <Container maxW="7xl">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box
            borderRadius="2xl"
            bg="linear-gradient(135deg, rgba(13, 148, 136, 0.1) 0%, rgba(79, 70, 229, 0.1) 100%)"
            borderWidth="1px"
            borderColor={{ base: 'primary.200', _dark: 'primary.500/30' }}
            p={{ base: 8, md: 16 }}
            textAlign="center"
          >
            <VStack gap={{ base: 6, md: 8 }}>
              <Heading
                as="h2"
                fontSize={{ base: '2xl', md: '4xl' }}
                fontWeight="bold"
                color={{ base: 'gray.900', _dark: 'white' }}
              >
                Let&apos;s turn your workflow into a real product
              </Heading>
              <Text
                fontSize={{ base: 'md', md: 'lg' }}
                color={{ base: 'gray.600', _dark: 'gray.400' }}
                maxW="2xl"
              >
                Whether you need a mobile app, an admin platform, a backend system, or a complete
                digital product from scratch, we can help define the right scope and execution path.
              </Text>
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
                    Schedule a Meeting
                  </Button>
                </Link>
                <Link href="/contact">
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
                    Contact Us
                  </Button>
                </Link>
              </Flex>
            </VStack>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
}
