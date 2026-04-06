'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

type ColorMode = 'light' | 'dark';

interface ColorModeContextType {
  colorMode: ColorMode;
  toggleColorMode: () => void;
}

const ColorModeContext = createContext<ColorModeContextType>({
  colorMode: 'dark',
  toggleColorMode: () => {},
});

export function useColorMode() {
  return useContext(ColorModeContext);
}

export function ColorModeProvider({ children }: { children: React.ReactNode }) {
  const [colorMode, setColorMode] = useState<ColorMode>('dark');

  useEffect(() => {
    const stored = localStorage.getItem('zyphon-color-mode') as ColorMode | null;
    if (stored === 'light' || stored === 'dark') {
      // Using flushSync-equivalent pattern: apply DOM changes and sync state from external storage
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setColorMode(stored);
      document.documentElement.classList.toggle('dark', stored === 'dark');
      document.documentElement.classList.toggle('light', stored === 'light');
      document.documentElement.style.colorScheme = stored;
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    }
  }, []);

  const toggleColorMode = useCallback(() => {
    setColorMode((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('zyphon-color-mode', next);
      document.documentElement.classList.toggle('dark', next === 'dark');
      document.documentElement.classList.toggle('light', next === 'light');
      document.documentElement.style.colorScheme = next;
      return next;
    });
  }, []);

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
}
