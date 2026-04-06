'use client';

import { useState } from 'react';
import { Box, Flex, Text, Badge, VStack, HStack, Button } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

const MotionBox = motion.create(Box);

interface Inquiry {
  id: number;
  full_name: string;
  company_name?: string;
  email: string;
  phone?: string;
  project_type?: string;
  budget?: string;
  message: string;
  status: string;
  created_at: string;
}

interface InquiryTableProps {
  inquiries: Inquiry[];
  onStatusChange: (id: number, status: string) => void;
  onGenerateResponse: (inquiry: Inquiry) => void;
}

const statusColors: Record<string, { bg: string; color: string }> = {
  new: { bg: 'blue.500/20', color: 'blue.400' },
  reviewed: { bg: 'yellow.500/20', color: 'yellow.400' },
  responded: { bg: 'green.500/20', color: 'green.400' },
};

export function InquiryTable({ inquiries, onStatusChange, onGenerateResponse }: InquiryTableProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <VStack gap={4} align="stretch">
      {inquiries.length === 0 ? (
        <Box
          borderRadius="xl"
          borderWidth="1px"
          borderColor="whiteAlpha.100"
          bg="rgba(17, 17, 24, 0.7)"
          p={8}
          textAlign="center"
        >
          <Text color="gray.400">No inquiries yet</Text>
        </Box>
      ) : (
        inquiries.map((inquiry, index) => (
          <MotionBox
            key={inquiry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Box
              borderRadius="xl"
              borderWidth="1px"
              borderColor="whiteAlpha.100"
              bg="rgba(17, 17, 24, 0.7)"
              overflow="hidden"
            >
              <Flex
                p={4}
                justify="space-between"
                align="center"
                cursor="pointer"
                onClick={() => setExpandedId(expandedId === inquiry.id ? null : inquiry.id)}
                _hover={{ bg: 'whiteAlpha.50' }}
                transition="background 0.2s"
              >
                <HStack gap={4} flex={1}>
                  <VStack align="start" gap={0} minW="150px">
                    <Text color="white" fontWeight="medium" fontSize="sm">
                      {inquiry.full_name}
                    </Text>
                    <Text color="gray.500" fontSize="xs">
                      {inquiry.email}
                    </Text>
                  </VStack>
                  <Text color="gray.400" fontSize="sm" display={{ base: 'none', md: 'block' }}>
                    {inquiry.project_type || '-'}
                  </Text>
                  <Text color="gray.400" fontSize="sm" display={{ base: 'none', lg: 'block' }}>
                    {inquiry.budget || '-'}
                  </Text>
                  <Badge
                    px={2}
                    py={1}
                    borderRadius="full"
                    fontSize="xs"
                    bg={statusColors[inquiry.status]?.bg || statusColors.new.bg}
                    color={statusColors[inquiry.status]?.color || statusColors.new.color}
                  >
                    {inquiry.status}
                  </Badge>
                  <Text color="gray.500" fontSize="xs" display={{ base: 'none', md: 'block' }}>
                    {formatDate(inquiry.created_at)}
                  </Text>
                </HStack>
                <Box color="gray.400">
                  {expandedId === inquiry.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </Box>
              </Flex>

              <AnimatePresence>
                {expandedId === inquiry.id && (
                  <MotionBox
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Box
                      p={4}
                      borderTopWidth="1px"
                      borderColor="whiteAlpha.100"
                      bg="whiteAlpha.50"
                    >
                      <VStack align="stretch" gap={4}>
                        <Box>
                          <Text color="gray.500" fontSize="xs" mb={1}>
                            Message
                          </Text>
                          <Text color="gray.300" fontSize="sm" whiteSpace="pre-wrap">
                            {inquiry.message}
                          </Text>
                        </Box>

                        <HStack gap={2} flexWrap="wrap">
                          {inquiry.company_name && (
                            <Box>
                              <Text color="gray.500" fontSize="xs">
                                Company
                              </Text>
                              <Text color="gray.300" fontSize="sm">
                                {inquiry.company_name}
                              </Text>
                            </Box>
                          )}
                          {inquiry.phone && (
                            <Box>
                              <Text color="gray.500" fontSize="xs">
                                Phone
                              </Text>
                              <Text color="gray.300" fontSize="sm">
                                {inquiry.phone}
                              </Text>
                            </Box>
                          )}
                        </HStack>

                        <Flex gap={2} flexWrap="wrap">
                          <Button
                            size="sm"
                            variant={inquiry.status === 'new' ? 'solid' : 'outline'}
                            bg={inquiry.status === 'new' ? 'blue.500' : 'transparent'}
                            borderColor="blue.500"
                            color={inquiry.status === 'new' ? 'white' : 'blue.400'}
                            onClick={(e) => {
                              e.stopPropagation();
                              onStatusChange(inquiry.id, 'new');
                            }}
                          >
                            New
                          </Button>
                          <Button
                            size="sm"
                            variant={inquiry.status === 'reviewed' ? 'solid' : 'outline'}
                            bg={inquiry.status === 'reviewed' ? 'yellow.500' : 'transparent'}
                            borderColor="yellow.500"
                            color={inquiry.status === 'reviewed' ? 'black' : 'yellow.400'}
                            onClick={(e) => {
                              e.stopPropagation();
                              onStatusChange(inquiry.id, 'reviewed');
                            }}
                          >
                            Reviewed
                          </Button>
                          <Button
                            size="sm"
                            variant={inquiry.status === 'responded' ? 'solid' : 'outline'}
                            bg={inquiry.status === 'responded' ? 'green.500' : 'transparent'}
                            borderColor="green.500"
                            color={inquiry.status === 'responded' ? 'white' : 'green.400'}
                            onClick={(e) => {
                              e.stopPropagation();
                              onStatusChange(inquiry.id, 'responded');
                            }}
                          >
                            Responded
                          </Button>
                          <Button
                            size="sm"
                            ml="auto"
                            bg="purple.500/20"
                            color="purple.400"
                            _hover={{ bg: 'purple.500/30' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              onGenerateResponse(inquiry);
                            }}
                          >
                            <Sparkles size={16} />
                            <Text ml={2}>Generate AI Response</Text>
                          </Button>
                        </Flex>
                      </VStack>
                    </Box>
                  </MotionBox>
                )}
              </AnimatePresence>
            </Box>
          </MotionBox>
        ))
      )}
    </VStack>
  );
}
