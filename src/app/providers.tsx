'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { system } from '@/theme';
import { ColorModeProvider } from '@/components/ui/ColorModeProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider>
        {children}
      </ColorModeProvider>
    </ChakraProvider>
  );
}
