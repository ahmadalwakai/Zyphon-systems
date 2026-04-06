'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { Box, Input, VStack, Text, Flex, Kbd } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, Briefcase, HelpCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { searchablePages, searchableServices, searchableFAQs } from '@/data/searchable';

const MotionBox = motion.create(Box);

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  title: string;
  description: string;
  href: string;
  type: 'page' | 'service' | 'faq';
}

const typeIcons = {
  page: FileText,
  service: Briefcase,
  faq: HelpCircle,
};

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const search = useCallback((q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    const lower = q.toLowerCase();
    const matched: SearchResult[] = [];

    searchablePages.forEach((p) => {
      if (p.title.toLowerCase().includes(lower) || p.keywords.some((k) => k.includes(lower))) {
        matched.push({ title: p.title, description: p.keywords.join(', '), href: p.href, type: 'page' });
      }
    });
    searchableServices.forEach((s) => {
      if (s.title.toLowerCase().includes(lower) || s.keywords.some((k) => k.includes(lower))) {
        matched.push({ title: s.title, description: s.keywords.join(', '), href: s.href, type: 'service' });
      }
    });
    searchableFAQs.forEach((f) => {
      if (f.question.toLowerCase().includes(lower) || f.keywords.some((k) => k.includes(lower))) {
        matched.push({ title: f.question, description: f.keywords.join(', '), href: f.href, type: 'faq' });
      }
    });

    setResults(matched.slice(0, 8));
    setSelectedIndex(0);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // toggle handled by parent
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      router.push(results[selectedIndex].href);
      onClose();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleSelect = (result: SearchResult) => {
    router.push(result.href);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <MotionBox
            position="fixed"
            inset={0}
            zIndex={300}
            bg="blackAlpha.700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <MotionBox
            position="fixed"
            top="20%"
            left="50%"
            zIndex={301}
            w={{ base: '90%', md: '560px' }}
            maxH="70vh"
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            transition={{ duration: 0.2 }}
          >
            <Box
              borderRadius="xl"
              borderWidth="1px"
              borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.200' }}
              bg={{ base: 'white', _dark: '#111118' }}
              overflow="hidden"
              boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.5)"
            >
              <Flex align="center" gap={3} px={4} borderBottomWidth="1px" borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}>
                <Search size={18} color="#71717a" />
                <Input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); search(e.target.value); }}
                  onKeyDown={handleKeyDown}
                  placeholder="Search pages, services, FAQ..."
                  variant="flushed"
                  py={4}
                  fontSize="md"
                  color={{ base: 'gray.900', _dark: 'white' }}
                  _placeholder={{ color: 'gray.500' }}
                />
                <Kbd fontSize="xs" bg={{ base: 'gray.100', _dark: 'whiteAlpha.100' }} color={{ base: 'gray.500', _dark: 'gray.400' }}>ESC</Kbd>
              </Flex>

              {results.length > 0 && (
                <VStack gap={0} align="stretch" maxH="50vh" overflowY="auto" py={2}>
                  {results.map((result, i) => {
                    const Icon = typeIcons[result.type];
                    return (
                      <Flex
                        key={result.href}
                        align="center"
                        gap={3}
                        px={4}
                        py={3}
                        cursor="pointer"
                        bg={i === selectedIndex ? { base: 'gray.50', _dark: 'whiteAlpha.100' } : 'transparent'}
                        _hover={{ bg: { base: 'gray.50', _dark: 'whiteAlpha.50' } }}
                        onClick={() => handleSelect(result)}
                        onMouseEnter={() => setSelectedIndex(i)}
                      >
                        <Box color={{ base: 'gray.400', _dark: 'gray.500' }}>
                          <Icon size={16} />
                        </Box>
                        <Box flex={1}>
                          <Text fontSize="sm" color={{ base: 'gray.900', _dark: 'white' }} fontWeight="medium">{result.title}</Text>
                          <Text fontSize="xs" color={{ base: 'gray.500', _dark: 'gray.500' }} truncate>{result.description}</Text>
                        </Box>
                      </Flex>
                    );
                  })}
                </VStack>
              )}

              {query && results.length === 0 && (
                <Box p={6} textAlign="center">
                  <Text fontSize="sm" color="gray.500">No results found for &ldquo;{query}&rdquo;</Text>
                </Box>
              )}

              {!query && (
                <Box px={4} py={3} borderTopWidth="1px" borderColor={{ base: 'gray.100', _dark: 'whiteAlpha.50' }}>
                  <Text fontSize="xs" color="gray.500">
                    Type to search • ↑↓ to navigate • Enter to select
                  </Text>
                </Box>
              )}
            </Box>
          </MotionBox>
        </>
      )}
    </AnimatePresence>
  );
}
