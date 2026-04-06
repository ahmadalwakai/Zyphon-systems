'use client';

import { useEffect, useState } from 'react';
import { Box, Grid, Heading, Text, VStack, HStack, Flex, SimpleGrid } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { StatsCard } from '@/components/admin/StatsCard';
import { InquiryChart } from '@/components/admin/InquiryChart';
import { ActivityFeed } from '@/components/admin/ActivityFeed';
import { MessageSquare, MessageSquarePlus, CalendarDays, FolderKanban, FileText, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const MotionBox = motion.create(Box);

interface AnalyticsData {
  totalInquiries: number;
  newInquiries: number;
  totalBookings: number;
  pendingBookings: number;
  totalPosts: number;
  publishedPosts: number;
  totalCustomers: number;
  verifiedCustomers: number;
  inquiriesByMonth: { label: string; value: number }[];
  recentActivity: { id: number; type: 'inquiry' | 'booking' | 'post' | 'customer'; title: string; time: string }[];
}

export default function AdminDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    fetch('/api/admin/analytics', { credentials: 'include' })
      .then((r) => r.json())
      .then((res) => {
        if (res.success) setData(res.data);
      })
      .catch(console.error);
  }, []);

  const stats = data || {
    totalInquiries: 0,
    newInquiries: 0,
    totalBookings: 0,
    pendingBookings: 0,
    totalPosts: 0,
    publishedPosts: 0,
    totalCustomers: 0,
    verifiedCustomers: 0,
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
          Zyphon Systems overview
        </Text>
      </MotionBox>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
        <StatsCard title="Total Inquiries" value={stats.totalInquiries} icon={MessageSquare} color="#0d9488" delay={0.1} />
        <StatsCard title="New Inquiries" value={stats.newInquiries} icon={MessageSquarePlus} color="#4f46e5" delay={0.2} />
        <StatsCard title="Pending Bookings" value={stats.pendingBookings} icon={CalendarDays} color="#0ea5e9" delay={0.3} />
        <StatsCard title="Published Posts" value={stats.publishedPosts} icon={FileText} color="#7c3aed" delay={0.4} />
      </Grid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
        {/* Inquiry Chart */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          borderRadius="xl"
          borderWidth="1px"
          borderColor="whiteAlpha.100"
          bg="rgba(17, 17, 24, 0.7)"
          p={6}
        >
          <Text color="white" fontWeight="semibold" fontSize="lg" mb={4}>
            Inquiries by Month
          </Text>
          <InquiryChart data={data?.inquiriesByMonth || []} />
        </MotionBox>

        {/* Activity Feed */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          borderRadius="xl"
          borderWidth="1px"
          borderColor="whiteAlpha.100"
          bg="rgba(17, 17, 24, 0.7)"
          p={6}
        >
          <Text color="white" fontWeight="semibold" fontSize="lg" mb={4}>
            Recent Activity
          </Text>
          <ActivityFeed items={data?.recentActivity || []} />
        </MotionBox>
      </SimpleGrid>

      {/* Quick Actions */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Text color="white" fontWeight="semibold" fontSize="lg" mb={4}>
          Quick Actions
        </Text>
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={4}>
          {[
            { label: 'View Inquiries', href: '/admin/inquiries', icon: MessageSquare, color: 'blue' },
            { label: 'Manage Bookings', href: '/admin/bookings', icon: CalendarDays, color: 'purple' },
            { label: 'Write a Post', href: '/admin/posts/new', icon: FileText, color: 'green' },
            { label: 'Compose Email', href: '/admin/compose', icon: Users, color: 'orange' },
          ].map((action) => (
            <Link key={action.href} href={action.href}>
              <Flex
                p={4}
                borderRadius="xl"
                borderWidth="1px"
                borderColor="whiteAlpha.100"
                bg="rgba(17, 17, 24, 0.7)"
                align="center"
                justify="space-between"
                _hover={{ borderColor: 'primary.500', bg: 'whiteAlpha.50' }}
                transition="all 0.2s"
              >
                <HStack gap={3}>
                  <Box color={`${action.color}.400`}>
                    <action.icon size={18} />
                  </Box>
                  <Text color="white" fontSize="sm" fontWeight="medium">{action.label}</Text>
                </HStack>
                <ArrowRight size={14} color="#71717a" />
              </Flex>
            </Link>
          ))}
        </SimpleGrid>
      </MotionBox>
    </VStack>
  );
}
