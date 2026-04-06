'use client';

import { useState, useEffect, useCallback } from 'react';
import { Box, Container, Text, VStack, HStack, Badge, Flex, Button, Spinner } from '@chakra-ui/react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Activity, ChevronLeft, ChevronRight } from 'lucide-react';

interface ActivityEntry {
  id: number;
  actor: string;
  action: string;
  entity_type: string | null;
  entity_id: string | null;
  details: Record<string, unknown> | null;
  created_at: string;
}

const actionColors: Record<string, string> = {
  inquiry_received: 'blue',
  booking_received: 'purple',
  customer_registered: 'green',
  post_published: 'teal',
  post_deleted: 'red',
  email_sent: 'orange',
};

export default function ActivityLogPage() {
  const [logs, setLogs] = useState<ActivityEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/activity?page=${page}`);
      if (res.ok) {
        const data = await res.json();
        setLogs(data);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return (
    <Flex minH="100vh">
      <AdminSidebar />
      <Box flex={1} ml={{ base: 0, md: '64' }} py={8}>
        <Container maxW="5xl">
          <Flex align="center" gap={3} mb={8}>
            <Activity size={24} />
            <Text fontSize="2xl" fontWeight="bold" color={{ base: 'gray.900', _dark: 'white' }}>
              Activity Log
            </Text>
          </Flex>

          {loading ? (
            <Flex justify="center" py={12}>
              <Spinner size="lg" color="primary.500" />
            </Flex>
          ) : logs.length === 0 ? (
            <Text color={{ base: 'gray.500', _dark: 'gray.400' }}>No activity recorded yet.</Text>
          ) : (
            <VStack gap={3} align="stretch">
              {logs.map((entry) => {
                const colorKey = actionColors[entry.action] || 'gray';
                const time = new Intl.DateTimeFormat('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                }).format(new Date(entry.created_at));

                return (
                  <Box
                    key={entry.id}
                    p={4}
                    borderRadius="lg"
                    bg={{ base: 'white', _dark: 'whiteAlpha.50' }}
                    borderWidth="1px"
                    borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}
                  >
                    <Flex justify="space-between" align="start" gap={4} flexWrap="wrap">
                      <VStack align="start" gap={1}>
                        <HStack gap={2}>
                          <Badge
                            colorPalette={colorKey}
                            fontSize="xs"
                            px={2}
                            py={0.5}
                            borderRadius="full"
                          >
                            {entry.action.replace(/_/g, ' ')}
                          </Badge>
                          <Badge
                            variant="outline"
                            fontSize="xs"
                            px={2}
                            py={0.5}
                            borderRadius="full"
                          >
                            {entry.actor}
                          </Badge>
                        </HStack>
                        {entry.entity_type && (
                          <Text fontSize="sm" color={{ base: 'gray.600', _dark: 'gray.400' }}>
                            {entry.entity_type}
                            {entry.entity_id ? `: ${entry.entity_id}` : ''}
                          </Text>
                        )}
                        {entry.details && (
                          <Text fontSize="xs" color={{ base: 'gray.500', _dark: 'gray.500' }}>
                            {JSON.stringify(entry.details)}
                          </Text>
                        )}
                      </VStack>
                      <Text fontSize="xs" color={{ base: 'gray.400', _dark: 'gray.500' }} flexShrink={0}>
                        {time}
                      </Text>
                    </Flex>
                  </Box>
                );
              })}
            </VStack>
          )}

          <HStack justify="center" gap={4} mt={8}>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft size={16} />
              Previous
            </Button>
            <Text fontSize="sm" color={{ base: 'gray.500', _dark: 'gray.400' }}>
              Page {page}
            </Text>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setPage((p) => p + 1)}
              disabled={logs.length < 50}
            >
              Next
              <ChevronRight size={16} />
            </Button>
          </HStack>
        </Container>
      </Box>
    </Flex>
  );
}
