// Component recipes for Chakra UI v3
import { defineRecipe } from '@chakra-ui/react';

export const buttonRecipe = defineRecipe({
  base: {
    fontWeight: 'semibold',
    borderRadius: 'lg',
    transition: 'all 0.2s ease-in-out',
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'primary.500',
      outlineOffset: '2px',
    },
  },
  variants: {
    variant: {
      primary: {
        bg: 'primary.500',
        color: 'white',
        _hover: {
          bg: 'primary.600',
          transform: 'translateY(-2px)',
        },
        _active: {
          bg: 'primary.700',
          transform: 'translateY(0)',
        },
      },
      secondary: {
        bg: 'transparent',
        color: { base: 'gray.900', _dark: 'white' },
        borderWidth: '1px',
        borderColor: { base: 'gray.300', _dark: 'gray.600' },
        _hover: {
          bg: { base: 'gray.100', _dark: 'whiteAlpha.100' },
          borderColor: { base: 'gray.400', _dark: 'gray.500' },
        },
      },
      ghost: {
        bg: 'transparent',
        color: { base: 'gray.600', _dark: 'gray.300' },
        _hover: {
          bg: { base: 'gray.100', _dark: 'whiteAlpha.100' },
        },
      },
    },
    size: {
      sm: {
        px: '3',
        py: '1.5',
        fontSize: 'sm',
      },
      md: {
        px: '4',
        py: '2',
        fontSize: 'md',
      },
      lg: {
        px: '6',
        py: '3',
        fontSize: 'lg',
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export const cardRecipe = defineRecipe({
  base: {
    borderRadius: 'xl',
    borderWidth: '1px',
    borderColor: { base: 'gray.200', _dark: 'whiteAlpha.100' },
    bg: { base: 'white', _dark: 'rgba(17, 17, 24, 0.7)' },
    backdropFilter: 'blur(12px)',
    p: { base: '6', md: '8' },
    transition: 'all 0.3s ease-in-out',
  },
  variants: {
    variant: {
      elevated: {
        boxShadow: 'card',
        _hover: {
          boxShadow: 'cardHover',
        },
      },
      outline: {
        boxShadow: 'none',
      },
    },
  },
  defaultVariants: {
    variant: 'elevated',
  },
});

export const inputRecipe = defineRecipe({
  base: {
    width: '100%',
    borderRadius: 'lg',
    borderWidth: '1px',
    borderColor: { base: 'gray.300', _dark: 'gray.600' },
    bg: { base: 'white', _dark: 'gray.800' },
    color: { base: 'gray.900', _dark: 'white' },
    px: '4',
    py: '2',
    transition: 'all 0.2s ease-in-out',
    _placeholder: {
      color: { base: 'gray.400', _dark: 'gray.500' },
    },
    _focusVisible: {
      outline: 'none',
      borderColor: 'primary.500',
      boxShadow: '0 0 0 1px var(--chakra-colors-primary-500)',
    },
    _invalid: {
      borderColor: 'red.500',
    },
  },
});
