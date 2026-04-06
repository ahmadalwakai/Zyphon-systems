'use client';

import { useEffect, useState } from 'react';
import { Box, Container, Heading, Text, VStack, SimpleGrid, Badge, Flex, Spinner } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Mail, Calendar, Clock, Building, UserCog } from 'lucide-react';
import Link from 'next/link';

interface Customer {
  id: number;
  email: string;
  full_name: string;
  company_name: string | null;
  created_at: string;
}

interface Inquiry {
  id: number;
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  created_at: string;
}

interface Booking {
  id: number;
  name: string;
  email: string;
  company: string;
  service: string;
  date: string;
  time: string;
  notes: string;
  created_at: string;
}

const MotionBox = motion.create(Box);

function getRelativeTime(date: string) {
  const now = new Date();
  const d = new Date(date);
  const diff = now.getTime() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return d.toLocaleDateString();
}

export default function PortalDashboard() {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/customer/me', { credentials: 'include' }).then((r) => r.json()),
      fetch('/api/customer/inquiries', { credentials: 'include' }).then((r) => r.json()),
      fetch('/api/customer/bookings', { credentials: 'include' }).then((r) => r.json()),
    ])
      .then(([me, inqs, bks]) => {
        setCustomer(me.customer);
        setInquiries(inqs.inquiries || []);
        setBookings(bks.bookings || []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box minH="60vh" display="flex" alignItems="center" justifyContent="center">
        <Spinner color="primary.500" size="lg" />
      </Box>
    );
  }

  return (
    <Container maxW="6xl">
      <VStack gap={8} align="stretch">
        {/* Welcome */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Heading as="h1" size="xl" color={{ base: 'gray.900', _dark: 'white' }}>
            Welcome back, {customer?.full_name?.split(' ')[0]}
          </Heading>
          <Text color={{ base: 'gray.500', _dark: 'gray.400' }} mt={1}>
            {customer?.company_name && (
              <Flex as="span" display="inline-flex" align="center" gap={1} mr={3}>
                <Building size={14} /> {customer.company_name}
              </Flex>
            )}
            {customer?.email}
          </Text>
          <Link href="/portal/profile">
            <Flex
              align="center"
              gap={2}
              mt={3}
              color="primary.500"
              fontSize="sm"
              fontWeight="medium"
              _hover={{ color: 'primary.600' }}
              transition="color 0.2s"
            >
              <UserCog size={16} />
              Edit Profile
            </Flex>
          </Link>
        </MotionBox>

        {/* Stats */}
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
          {[
            { label: 'Inquiries', value: inquiries.length, icon: Mail },
            { label: 'Bookings', value: bookings.length, icon: Calendar },
            { label: 'Member Since', value: customer?.created_at ? new Date(customer.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '-', icon: Clock },
          ].map((stat, i) => (
            <MotionBox
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * (i + 1) }}
              p={5}
              borderRadius="xl"
              borderWidth="1px"
              borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}
              bg={{ base: 'white', _dark: 'rgba(17, 17, 24, 0.8)' }}
            >
              <Flex align="center" gap={3}>
                <Box color="primary.500">
                  <stat.icon size={20} />
                </Box>
                <Box>
                  <Text fontSize="2xl" fontWeight="bold" color={{ base: 'gray.900', _dark: 'white' }}>{stat.value}</Text>
                  <Text fontSize="xs" color={{ base: 'gray.500', _dark: 'gray.400' }}>{stat.label}</Text>
                </Box>
              </Flex>
            </MotionBox>
          ))}
        </SimpleGrid>

        {/* Inquiries */}
        <Box>
          <Heading as="h2" size="md" color={{ base: 'gray.900', _dark: 'white' }} mb={4}>My Inquiries</Heading>
          {inquiries.length === 0 ? (
            <Box
              p={6}
              borderRadius="xl"
              borderWidth="1px"
              borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}
              bg={{ base: 'white', _dark: 'rgba(17, 17, 24, 0.8)' }}
              textAlign="center"
            >
              <Text color={{ base: 'gray.500', _dark: 'gray.400' }}>No inquiries yet.</Text>
            </Box>
          ) : (
            <VStack gap={3} align="stretch">
              {inquiries.map((inq) => (
                <Box
                  key={inq.id}
                  p={5}
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}
                  bg={{ base: 'white', _dark: 'rgba(17, 17, 24, 0.8)' }}
                >
                  <Flex justify="space-between" align="start" wrap="wrap" gap={2}>
                    <Box>
                      <Flex align="center" gap={2} mb={1}>
                        <Badge colorPalette="blue" size="sm">{inq.service}</Badge>
                        {inq.budget && <Badge colorPalette="green" size="sm">{inq.budget}</Badge>}
                      </Flex>
                      <Text color={{ base: 'gray.700', _dark: 'gray.300' }} fontSize="sm" mt={2}>
                        {inq.message.length > 150 ? inq.message.slice(0, 150) + '...' : inq.message}
                      </Text>
                    </Box>
                    <Text fontSize="xs" color={{ base: 'gray.400', _dark: 'gray.500' }} flexShrink={0}>
                      {getRelativeTime(inq.created_at)}
                    </Text>
                  </Flex>
                </Box>
              ))}
            </VStack>
          )}
        </Box>

        {/* Bookings */}
        <Box>
          <Heading as="h2" size="md" color={{ base: 'gray.900', _dark: 'white' }} mb={4}>My Bookings</Heading>
          {bookings.length === 0 ? (
            <Box
              p={6}
              borderRadius="xl"
              borderWidth="1px"
              borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}
              bg={{ base: 'white', _dark: 'rgba(17, 17, 24, 0.8)' }}
              textAlign="center"
            >
              <Text color={{ base: 'gray.500', _dark: 'gray.400' }}>No bookings yet.</Text>
            </Box>
          ) : (
            <VStack gap={3} align="stretch">
              {bookings.map((bk) => (
                <Box
                  key={bk.id}
                  p={5}
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}
                  bg={{ base: 'white', _dark: 'rgba(17, 17, 24, 0.8)' }}
                >
                  <Flex justify="space-between" align="start" wrap="wrap" gap={2}>
                    <Box>
                      <Badge colorPalette="purple" size="sm" mb={2}>{bk.service}</Badge>
                      <Flex align="center" gap={3} mt={1}>
                        <Flex align="center" gap={1}>
                          <Calendar size={14} />
                          <Text fontSize="sm" color={{ base: 'gray.700', _dark: 'gray.300' }}>{bk.date}</Text>
                        </Flex>
                        <Flex align="center" gap={1}>
                          <Clock size={14} />
                          <Text fontSize="sm" color={{ base: 'gray.700', _dark: 'gray.300' }}>{bk.time}</Text>
                        </Flex>
                      </Flex>
                      {bk.notes && (
                        <Text fontSize="sm" color={{ base: 'gray.500', _dark: 'gray.400' }} mt={2}>
                          {bk.notes}
                        </Text>
                      )}
                    </Box>
                    <Text fontSize="xs" color={{ base: 'gray.400', _dark: 'gray.500' }} flexShrink={0}>
                      {getRelativeTime(bk.created_at)}
                    </Text>
                  </Flex>
                </Box>
              ))}
            </VStack>
          )}
        </Box>
      </VStack>
    </Container>
  );
}
