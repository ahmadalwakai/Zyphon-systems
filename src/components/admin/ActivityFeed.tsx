'use client';

import { Box, VStack, Flex, Text, Badge } from '@chakra-ui/react';
import { MessageSquare, CalendarDays, FileText, Users } from 'lucide-react';

interface ActivityItem {
  id: number;
  type: 'inquiry' | 'booking' | 'post' | 'customer';
  title: string;
  time: string;
}

const typeConfig = {
  inquiry: { icon: MessageSquare, color: 'blue', label: 'Inquiry' },
  booking: { icon: CalendarDays, color: 'purple', label: 'Booking' },
  post: { icon: FileText, color: 'green', label: 'Post' },
  customer: { icon: Users, color: 'orange', label: 'Customer' },
};

interface ActivityFeedProps {
  items: ActivityItem[];
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  if (!items || items.length === 0) {
    return (
      <Box p={4} textAlign="center">
        <Text color="gray.500" fontSize="sm">No recent activity</Text>
      </Box>
    );
  }

  return (
    <VStack gap={3} align="stretch">
      {items.map((item) => {
        const config = typeConfig[item.type];
        const Icon = config.icon;
        return (
          <Flex key={`${item.type}-${item.id}`} align="center" gap={3} p={3} borderRadius="lg" bg="whiteAlpha.50">
            <Box color={`${config.color}.400`}>
              <Icon size={16} />
            </Box>
            <Box flex={1}>
              <Text fontSize="sm" color="white" truncate>{item.title}</Text>
            </Box>
            <Flex align="center" gap={2}>
              <Badge
                fontSize="xs"
                px={2}
                py={0.5}
                borderRadius="full"
                bg={`${config.color}.500/20`}
                color={`${config.color}.400`}
              >
                {config.label}
              </Badge>
              <Text fontSize="xs" color="gray.500" flexShrink={0}>{item.time}</Text>
            </Flex>
          </Flex>
        );
      })}
    </VStack>
  );
}
