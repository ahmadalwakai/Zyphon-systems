'use client';

import { useState } from 'react';
import { Box, Text, VStack, HStack } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const MotionBox = motion.create(Box);

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

function FAQItem({ item, index }: { item: FAQItem; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Box
        borderWidth="1px"
        borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}
        borderRadius="xl"
        overflow="hidden"
        bg={{ base: 'white', _dark: 'rgba(17, 17, 24, 0.7)' }}
      >
        <HStack
          as="button"
          w="full"
          p={{ base: 4, md: 6 }}
          justify="space-between"
          align="center"
          onClick={() => setIsOpen(!isOpen)}
          cursor="pointer"
          _hover={{ bg: { base: 'gray.50', _dark: 'whiteAlpha.50' } }}
          transition="background 0.2s"
        >
          <Text
            fontWeight="medium"
            color={{ base: 'gray.900', _dark: 'white' }}
            textAlign="left"
            pr={4}
          >
            {item.question}
          </Text>
          <Box
            color={{ base: 'gray.400', _dark: 'gray.500' }}
            flexShrink={0}
            transform={isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}
            transition="transform 0.2s"
          >
            <ChevronDown size={20} />
          </Box>
        </HStack>

        <AnimatePresence>
          {isOpen && (
            <MotionBox
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              overflow="hidden"
            >
              <Box
                px={{ base: 4, md: 6 }}
                pb={{ base: 4, md: 6 }}
                pt={0}
              >
                <Box
                  pt={4}
                  borderTopWidth="1px"
                  borderColor={{ base: 'gray.100', _dark: 'whiteAlpha.100' }}
                >
                  <Text
                    color={{ base: 'gray.600', _dark: 'gray.400' }}
                    lineHeight="tall"
                  >
                    {item.answer}
                  </Text>
                </Box>
              </Box>
            </MotionBox>
          )}
        </AnimatePresence>
      </Box>
    </MotionBox>
  );
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <VStack gap={3} align="stretch">
      {items.map((item, index) => (
        <FAQItem key={item.question} item={item} index={index} />
      ))}
    </VStack>
  );
}
