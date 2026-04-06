'use client';

import { Box, Container, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  Building2,
  Smartphone,
  LayoutDashboard,
  Calendar,
  Network,
  Server,
  Wrench,
  Workflow,
} from 'lucide-react';

const MotionBox = motion.create(Box);

const projectTypes = [
  { title: 'Hotel booking platforms', icon: Building2 },
  { title: 'Customer mobile apps', icon: Smartphone },
  { title: 'Admin dashboards', icon: LayoutDashboard },
  { title: 'Booking and scheduling systems', icon: Calendar },
  { title: 'Multi-branch business systems', icon: Network },
  { title: 'Backend and API platforms', icon: Server },
  { title: 'Internal operations tools', icon: Wrench },
  { title: 'Workflow digitization systems', icon: Workflow },
];

export function TypicalProjects() {
  return (
    <Box py={{ base: 16, md: 24 }}>
      <Container maxW="7xl">
        <VStack gap={{ base: 10, md: 12 }} align="stretch">
          <MotionBox
            textAlign="center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Heading
              as="h2"
              fontSize={{ base: '2xl', md: '4xl' }}
              fontWeight="bold"
              color={{ base: 'gray.900', _dark: 'white' }}
            >
              Typical projects we handle
            </Heading>
          </MotionBox>

          <Grid
            templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
            gap={{ base: 4, md: 6 }}
          >
            {projectTypes.map((project, index) => (
              <MotionBox
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <Box
                  borderRadius="lg"
                  borderWidth="1px"
                  borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}
                  bg={{ base: 'white', _dark: 'rgba(17, 17, 24, 0.7)' }}
                  backdropFilter="blur(12px)"
                  p={{ base: 4, md: 6 }}
                  textAlign="center"
                  transition="all 0.2s"
                  _hover={{
                    borderColor: 'primary.500',
                  }}
                >
                  <VStack gap={3}>
                    <Box color="primary.500">
                      <project.icon size={24} />
                    </Box>
                    <Text
                      fontSize={{ base: 'xs', md: 'sm' }}
                      fontWeight="medium"
                      color={{ base: 'gray.700', _dark: 'gray.300' }}
                    >
                      {project.title}
                    </Text>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
}
