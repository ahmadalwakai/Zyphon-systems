'use client';

import { Box, Heading, Text, VStack, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const MotionBox = motion.create(Box);

export function SolutionsCTA() {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Box
        borderRadius="xl"
        borderWidth="1px"
        borderColor={{ base: 'primary.200', _dark: 'primary.500/30' }}
        bg={{ base: 'primary.50', _dark: 'primary.500/5' }}
        p={{ base: 8, md: 12 }}
        textAlign="center"
      >
        <VStack gap={6}>
          <Heading
            as="h2"
            fontSize={{ base: '2xl', md: '3xl' }}
            fontWeight="bold"
            color={{ base: 'gray.900', _dark: 'white' }}
          >
            Need a custom solution?
          </Heading>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            color={{ base: 'gray.600', _dark: 'gray.400' }}
            maxW="2xl"
          >
            Every business has unique operational needs. We can help define the right 
            system architecture and build it from the ground up.
          </Text>
          <Link href="/contact">
            <Button
              size="lg"
              bg="primary.500"
              color="white"
              _hover={{ bg: 'primary.600' }}
              px={8}
            >
              Discuss Your Project
              <ArrowRight size={18} style={{ marginLeft: '8px' }} />
            </Button>
          </Link>
        </VStack>
      </Box>
    </MotionBox>
  );
}
