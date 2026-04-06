'use client';

import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import type { ProcessStep as ProcessStepType } from '@/types';

const MotionBox = motion.create(Box);

interface ProcessStepProps {
  step: ProcessStepType;
  index: number;
  isLast: boolean;
}

export function ProcessStep({ step, index, isLast }: ProcessStepProps) {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      position="relative"
    >
      <Flex gap={{ base: 4, md: 8 }}>
        {/* Timeline */}
        <Flex
          direction="column"
          alignItems="center"
          flexShrink={0}
        >
          <Flex
            align="center"
            justify="center"
            w={{ base: '12', md: '16' }}
            h={{ base: '12', md: '16' }}
            borderRadius="full"
            bg="primary.500"
            color="white"
            fontWeight="bold"
            fontSize={{ base: 'md', md: 'lg' }}
            position="relative"
            zIndex={1}
          >
            {step.number}
          </Flex>
          {!isLast && (
            <MotionBox
              w="2px"
              flex={1}
              minH="40px"
              bg={{ base: 'gray.200', _dark: 'whiteAlpha.200' }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              transformOrigin="top"
            />
          )}
        </Flex>

        {/* Content */}
        <Box
          flex={1}
          pb={{ base: 8, md: 12 }}
        >
          <Box
            borderRadius="xl"
            borderWidth="1px"
            borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}
            bg={{ base: 'white', _dark: 'rgba(17, 17, 24, 0.7)' }}
            backdropFilter="blur(12px)"
            p={{ base: 6, md: 8 }}
          >
            <VStack align="start" gap={4}>
              <Heading
                as="h3"
                fontSize={{ base: 'xl', md: '2xl' }}
                fontWeight="semibold"
                color={{ base: 'gray.900', _dark: 'white' }}
              >
                {step.title}
              </Heading>
              <Text
                fontSize={{ base: 'sm', md: 'md' }}
                color={{ base: 'gray.600', _dark: 'gray.400' }}
                lineHeight="relaxed"
              >
                {step.description}
              </Text>
              {step.deliverables && step.deliverables.length > 0 && (
                <Box w="100%">
                  <Text
                    fontSize="sm"
                    fontWeight="semibold"
                    color={{ base: 'gray.700', _dark: 'gray.300' }}
                    mb={3}
                  >
                    Deliverables:
                  </Text>
                  <Flex flexWrap="wrap" gap={2}>
                    {step.deliverables.map((deliverable, i) => (
                      <Box
                        key={i}
                        px={3}
                        py={1}
                        borderRadius="full"
                        bg={{ base: 'gray.100', _dark: 'whiteAlpha.100' }}
                        fontSize="xs"
                        color={{ base: 'gray.600', _dark: 'gray.400' }}
                      >
                        {deliverable}
                      </Box>
                    ))}
                  </Flex>
                </Box>
              )}
            </VStack>
          </Box>
        </Box>
      </Flex>
    </MotionBox>
  );
}
