// Design tokens for Zyphon Systems
// Chakra UI v3 token definitions

export const colors = {
  primary: {
    50: { value: '#f0fdfa' },
    100: { value: '#ccfbf1' },
    200: { value: '#99f6e4' },
    300: { value: '#5eead4' },
    400: { value: '#2dd4bf' },
    500: { value: '#0d9488' },
    600: { value: '#0d9488' },
    700: { value: '#0f766e' },
    800: { value: '#115e59' },
    900: { value: '#134e4a' },
  },
  accent: {
    50: { value: '#eef2ff' },
    100: { value: '#e0e7ff' },
    200: { value: '#c7d2fe' },
    300: { value: '#a5b4fc' },
    400: { value: '#818cf8' },
    500: { value: '#4f46e5' },
    600: { value: '#4338ca' },
    700: { value: '#3730a3' },
    800: { value: '#312e81' },
    900: { value: '#1e1b4b' },
  },
  surface: {
    dark: { value: '#111118' },
    light: { value: '#f7f7f8' },
  },
  background: {
    dark: { value: '#0a0a0f' },
    light: { value: '#ffffff' },
  },
  text: {
    primary: {
      dark: { value: '#e4e4e7' },
      light: { value: '#18181b' },
    },
    secondary: {
      dark: { value: '#a1a1aa' },
      light: { value: '#71717a' },
    },
  },
};

export const fonts = {
  heading: { value: '"Inter", sans-serif' },
  body: { value: '"Inter", sans-serif' },
};

export const fontWeights = {
  normal: { value: '400' },
  medium: { value: '500' },
  semibold: { value: '600' },
  bold: { value: '700' },
};

export const radii = {
  sm: { value: '0.375rem' },
  md: { value: '0.5rem' },
  lg: { value: '0.75rem' },
  xl: { value: '1rem' },
  '2xl': { value: '1.5rem' },
};

export const shadows = {
  card: { value: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' },
  cardHover: { value: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' },
  glow: { value: '0 0 40px rgba(13, 148, 136, 0.3)' },
};

export const semanticTokens = {
  colors: {
    'bg.canvas': {
      value: { base: '{colors.background.light}', _dark: '{colors.background.dark}' },
    },
    'bg.surface': {
      value: { base: '{colors.surface.light}', _dark: '{colors.surface.dark}' },
    },
    'fg.default': {
      value: { base: '{colors.text.primary.light}', _dark: '{colors.text.primary.dark}' },
    },
    'fg.muted': {
      value: { base: '{colors.text.secondary.light}', _dark: '{colors.text.secondary.dark}' },
    },
    'border.default': {
      value: { base: '#e4e4e7', _dark: '#27272a' },
    },
    'border.muted': {
      value: { base: '#f4f4f5', _dark: '#1c1c22' },
    },
  },
};
