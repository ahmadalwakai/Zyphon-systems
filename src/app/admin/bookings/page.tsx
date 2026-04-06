'use client';

import { useEffect, useState } from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  VStack, 
  HStack, 
  Badge, 
  Button,
  Spinner,
  Flex
} from '@chakra-ui/react';
import { CalendarDays, Clock, User, Mail, MessageSquare, Building2 } from 'lucide-react';

interface Booking {
  id: number;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  preferred_date: string;
  preferred_time: string;
  topic: string;
  notes?: string;
  status: string;
  created_at: string;
}

const statusColors: Record<string, { bg: string; color: string }> = {
  pending: { bg: 'yellow.500/20', color: 'yellow.400' },
  confirmed: { bg: 'blue.500/20', color: 'blue.400' },
  completed: { bg: 'green.500/20', color: 'green.400' },
  cancelled: { bg: 'red.500/20', color: 'red.400' },
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/admin/bookings', {
        credentials: 'include'
      });
      if (res.ok) {
        const data = await res.json();
        setBookings(data.bookings || []);
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: number, status: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch('/api/admin/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id, status }),
      });

      if (res.ok) {
        setBookings(
          bookings.map((b) => (b.id === id ? { ...b, status } : b))
        );
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setUpdatingId(null);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <Box>
        <Heading as="h1" size="2xl" color="white" mb={8}>
          Meeting Bookings
        </Heading>
        <Box textAlign="center" py={12}>
          <Spinner color="primary.400" size="xl" />
        </Box>
      </Box>
    );
  }

  return (
    <Box>
        <Flex justify="space-between" align="start" mb={2}>
          <Heading as="h1" size="2xl" color="white">
            Meeting Bookings
          </Heading>
          <a href="/api/admin/export/bookings" download>
            <Button
              size="sm"
              variant="outline"
              borderColor="primary.500"
              color="primary.400"
              _hover={{ bg: 'primary.500/10' }}
            >
              Export CSV
            </Button>
          </a>
        </Flex>

      {bookings.length === 0 ? (
        <Box
          p={8}
          borderRadius="xl"
          borderWidth="1px"
          borderColor="whiteAlpha.100"
          bg="rgba(17, 17, 24, 0.6)"
          textAlign="center"
        >
          <CalendarDays size={48} color="#6b7280" style={{ margin: '0 auto 16px' }} />
          <Text color="gray.400">No bookings yet</Text>
        </Box>
      ) : (
        <VStack gap={4} align="stretch">
          {bookings.map((booking) => (
            <Box
              key={booking.id}
              p={6}
              borderRadius="xl"
              borderWidth="1px"
              borderColor="whiteAlpha.100"
              bg="rgba(17, 17, 24, 0.6)"
              _hover={{ borderColor: 'whiteAlpha.200' }}
              transition="border-color 0.2s"
            >
              <HStack justify="space-between" align="start" mb={4}>
                <VStack align="start" gap={1}>
                  <HStack>
                    <User size={16} color="#9ca3af" />
                    <Text color="white" fontWeight="semibold">
                      {booking.name}
                    </Text>
                    {booking.company && (
                      <>
                        <Building2 size={14} color="#9ca3af" />
                        <Text color="gray.400" fontSize="sm">
                          {booking.company}
                        </Text>
                      </>
                    )}
                  </HStack>
                  <HStack>
                    <Mail size={14} color="#9ca3af" />
                    <Text color="gray.400" fontSize="sm">
                      {booking.email}
                    </Text>
                    {booking.phone && (
                      <Text color="gray.500" fontSize="sm">
                        • {booking.phone}
                      </Text>
                    )}
                  </HStack>
                </VStack>
                <Badge
                  px={3}
                  py={1}
                  borderRadius="full"
                  bg={statusColors[booking.status]?.bg || 'gray.500/20'}
                  color={statusColors[booking.status]?.color || 'gray.400'}
                  fontWeight="medium"
                  fontSize="xs"
                  textTransform="capitalize"
                >
                  {booking.status}
                </Badge>
              </HStack>

              <HStack gap={6} mb={4}>
                <HStack>
                  <CalendarDays size={16} color="#0ea5e9" />
                  <Text color="white" fontSize="sm">
                    {formatDate(booking.preferred_date)}
                  </Text>
                </HStack>
                <HStack>
                  <Clock size={16} color="#0ea5e9" />
                  <Text color="white" fontSize="sm">
                    {booking.preferred_time}
                  </Text>
                </HStack>
              </HStack>

              <Box
                p={3}
                borderRadius="lg"
                bg="whiteAlpha.50"
                mb={4}
              >
                <HStack align="start" gap={2}>
                  <MessageSquare size={16} color="#9ca3af" style={{ marginTop: 2 }} />
                  <VStack align="start" gap={1}>
                    <Text color="gray.300" fontSize="sm" fontWeight="medium">
                      Topic: {booking.topic}
                    </Text>
                    {booking.notes && (
                      <Text color="gray.400" fontSize="sm">
                        {booking.notes}
                      </Text>
                    )}
                  </VStack>
                </HStack>
              </Box>

              <HStack justify="space-between" align="center">
                <Text color="gray.500" fontSize="xs">
                  Submitted {formatDate(booking.created_at)}
                </Text>
                <HStack gap={2}>
                  {booking.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        bg="blue.500"
                        color="white"
                        _hover={{ bg: 'blue.600' }}
                        onClick={() => handleStatusChange(booking.id, 'confirmed')}
                        loading={updatingId === booking.id}
                      >
                        Confirm
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        borderColor="red.500/50"
                        color="red.400"
                        _hover={{ bg: 'red.500/10' }}
                        onClick={() => handleStatusChange(booking.id, 'cancelled')}
                        loading={updatingId === booking.id}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                  {booking.status === 'confirmed' && (
                    <Button
                      size="sm"
                      bg="green.500"
                      color="white"
                      _hover={{ bg: 'green.600' }}
                      onClick={() => handleStatusChange(booking.id, 'completed')}
                      loading={updatingId === booking.id}
                    >
                      Mark Complete
                    </Button>
                  )}
                  {(booking.status === 'completed' || booking.status === 'cancelled') && (
                    <Text color="gray.500" fontSize="sm" fontStyle="italic">
                      {booking.status === 'completed' ? 'Meeting completed' : 'Booking cancelled'}
                    </Text>
                  )}
                </HStack>
              </HStack>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
}
