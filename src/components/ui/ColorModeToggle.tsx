'use client';

import { IconButton } from '@chakra-ui/react';
import { Sun, Moon } from 'lucide-react';
import { useColorMode } from './ColorModeProvider';
import { motion, AnimatePresence } from 'framer-motion';

export function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Toggle color mode"
      variant="ghost"
      size="sm"
      color={{ base: 'gray.600', _dark: 'gray.400' }}
      _hover={{ color: 'primary.500', bg: { base: 'gray.100', _dark: 'whiteAlpha.100' } }}
      onClick={toggleColorMode}
    >
      <AnimatePresence mode="wait" initial={false}>
        {colorMode === 'dark' ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun size={18} />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon size={18} />
          </motion.div>
        )}
      </AnimatePresence>
    </IconButton>
  );
}
