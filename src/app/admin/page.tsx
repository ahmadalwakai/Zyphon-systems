'use client';

import { useEffect, useState } from 'react';
import { Box, Grid, Heading, Text, VStack, HStack, Badge } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { StatsCard } from '@/components/admin/StatsCard';
import { MessageSquare, MessageSquarePlus, CalendarDays, FolderKanban } from 'lucide-react';
import Link from 'next/link';

const MotionBox = motion.create(Box);

interface Stats {
  totalInquiries: number;
  newInquiries: number;
  pendingBookings: number;
  publishedProjects: number;
}

interface Inquiry {
  id: number;
  full_name: string;
  email: string;
  project_type?: string;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ totalInquiries: 0, newInquiries: 0, pendingBookings: 0, publishedProjects: 0 });
  const [recentInquiries, setRecentInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch inquiries
        const inquiriesRes = await fetch('/api/admin/inquiries', { credentials: 'include' });
        let inquiries: Inquiry[] = [];
        if (inquiriesRes.ok) {
          const data = await inquiriesRes.json();
          inquiries = data.data || [];
          setRecentInquiries(inquiries.slice(0, 5));
        }

        // Fetch bookings
        const bookingsRes = await fetch('/api/admin/bookings', { credentials: 'include' });
        let pendingBookings = 0;
        if (bookingsRes.ok) {
          const data = await bookingsRes.json();
          const bookings = data.bookings || [];
          pendingBookings = bookings.filter((b: { status: string }) => b.status === 'pending').length;
        }

        setStats({
          totalInquiries: inquiries.length,
          newInquiries: inquiries.filter((i: Inquiry) => i.status === 'new').length,
          pendingBookings,
          publishedProjects: 4, // Will be dynamic when projects are fetched
        });
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
    });
  };

  const statusColors: Record<string, { bg: string; color: string }> = {
    new: { bg: 'blue.500/20', color: 'blue.400' },
    reviewed: { bg: 'yellow.500/20', color: 'yellow.400' },
    responded: { bg: 'green.500/20', color: 'green.400' },
  };

  return (
    <VStack gap={8} align="stretch">
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Heading as="h1" size="xl" color="white">
          Dashboard
        </Heading>
        <Text color="gray.400" mt={2}>
          Welcome to the Zyphon Systems admin panel
        </Text>
      </MotionBox>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
        <StatsCard
          title="Total Inquiries"
          value={stats.totalInquiries}
          icon={MessageSquare}
          color="#0d9488"
          delay={0.1}
        />
        <StatsCard
          title="New Inquiries"
          value={stats.newInquiries}
          icon={MessageSquarePlus}
          color="#4f46e5"
          delay={0.2}
        />
        <StatsCard
          title="Pending Bookings"
          value={stats.pendingBookings}
          icon={CalendarDays}
          color="#0ea5e9"
          delay={0.3}
        />
        <StatsCard
          title="Published Projects"
          value={stats.publishedProjects}
          icon={FolderKanban}
          color="#7c3aed"
          delay={0.4}
        />
      </Grid>

      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Box
          borderRadius="xl"
          borderWidth="1px"
          borderColor="whiteAlpha.100"
          bg="rgba(17, 17, 24, 0.7)"
          p={6}
        >
          <HStack justify="space-between" mb={4}>
            <Text color="white" fontWeight="semibold" fontSize="lg">
              Recent Inquiries
            </Text>
            <Link href="/admin/inquiries">
              <Text color="primary.400" fontSize="sm" _hover={{ color: 'primary.300' }}>
                View all →
              </Text>
            </Link>
          </HStack>

          {recentInquiries.length === 0 ? (
            <Text color="gray.500">No inquiries yet</Text>
          ) : (
            <VStack gap={3} align="stretch">
              {recentInquiries.map((inquiry) => (
                <HStack
                  key={inquiry.id}
                  p={3}
                  borderRadius="lg"
                  bg="whiteAlpha.50"
                  justify="space-between"
                >
                  <VStack align="start" gap={0}>
                    <Text color="white" fontSize="sm" fontWeight="medium">
                      {inquiry.full_name}
                    </Text>
                    <Text color="gray.500" fontSize="xs">
                      {inquiry.project_type || 'General inquiry'}
                    </Text>
                  </VStack>
                  <HStack gap={3}>
                    <Badge
                      px={2}
                      py={1}
                      borderRadius="full"
                      fontSize="xs"
                      bg={statusColors[inquiry.status]?.bg}
                      color={statusColors[inquiry.status]?.color}
                    >
                      {inquiry.status}
                    </Badge>
                    <Text color="gray.500" fontSize="xs">
                      {formatDate(inquiry.created_at)}
                    </Text>
                  </HStack>
                </HStack>
              ))}
            </VStack>
          )}
        </Box>
      </MotionBox>
    </VStack>
  );
}
