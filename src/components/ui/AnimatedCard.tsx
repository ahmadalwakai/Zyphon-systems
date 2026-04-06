'use client';

import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const MotionBox = motion.create(Box);

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
}

export function AnimatedCard({ children, delay = 0 }: AnimatedCardProps) {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -4, transition: { duration: 0.3 } }}
      borderRadius="xl"
      borderWidth="1px"
      borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}
      bg={{ base: 'white', _dark: 'rgba(17, 17, 24, 0.7)' }}
      backdropFilter="blur(12px)"
      p={{ base: 6, md: 8 }}
      cursor="pointer"
    >
      {children}
    </MotionBox>
  );
}
