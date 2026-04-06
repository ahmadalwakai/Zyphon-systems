'use client';

import { Box, Container } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const MotionBox = motion.create(Box);

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  py?: { base: number; md: number };
}

export function SectionWrapper({ children, id, py }: SectionWrapperProps) {
  return (
    <MotionBox
      as="section"
      id={id}
      py={py || { base: 16, md: 24 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      <Container maxW="7xl">
        {children}
      </Container>
    </MotionBox>
  );
}
