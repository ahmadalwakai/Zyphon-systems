'use client';

import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';
import { colors, fonts, fontWeights, radii, shadows, semanticTokens } from './tokens';

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors,
      fonts,
      fontWeights,
      radii,
      shadows,
    },
    semanticTokens,
  },
});

export const system = createSystem(defaultConfig, customConfig);
