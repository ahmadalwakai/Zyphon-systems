'use client';

import { Text } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  fontSize?: { base: string; md?: string; lg?: string } | string;
  fontWeight?: string | number;
}

export function GradientText({
  children,
  as = 'span',
  fontSize,
  fontWeight = 'bold',
}: GradientTextProps) {
  return (
    <Text
      as={as}
      fontSize={fontSize}
      fontWeight={fontWeight}
      bgGradient="linear(to-r, primary.400, accent.400, primary.500)"
      bgClip="text"
      display="inline-block"
    >
      {children}
    </Text>
  );
}
