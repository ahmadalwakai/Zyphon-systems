import type { Metadata } from 'next';
import { Box, Container, Grid, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { ProjectsHero } from '@/components/projects/ProjectsHero';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { staticProjects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'A selection of production-ready mobile apps, admin panels, and digital platforms we have built for businesses across various industries.',
};

export default function ProjectsPage() {
  // In production, this would fetch from the Neon DB
  // For now, using static projects as fallback
  const projects = staticProjects;

  return (
    <>
      <ProjectsHero />
      <Box py={{ base: 8, md: 12 }}>
        <Container maxW="7xl">
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
            gap={{ base: 6, md: 8 }}
          >
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </Grid>
          <Box textAlign="center" mt={{ base: 12, md: 16 }}>
            <Link href="/contact">
              <Button
                size="lg"
                bg="primary.500"
                color="white"
                fontWeight="semibold"
                borderRadius="lg"
                px={8}
                _hover={{ bg: 'primary.600', transform: 'translateY(-2px)' }}
                transition="all 0.2s"
              >
                Start Your Project
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>
    </>
  );
}
