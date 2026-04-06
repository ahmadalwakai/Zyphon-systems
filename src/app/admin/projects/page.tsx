'use client';

import { useEffect, useState } from 'react';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ProjectEditor } from '@/components/admin/ProjectEditor';

const MotionBox = motion.create(Box);

interface Project {
  id: number;
  title: string;
  type: string;
  description: string;
  outcome?: string;
  is_visible: boolean;
  display_order: number;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/admin/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (project: Partial<Project>) => {
    try {
      if (project.id) {
        // Update existing project
        const res = await fetch('/api/admin/projects', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(project),
        });

        if (res.ok) {
          const data = await res.json();
          setProjects(
            projects.map((p) => (p.id === project.id ? data.data : p))
          );
        }
      } else {
        // Create new project
        const res = await fetch('/api/admin/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(project),
        });

        if (res.ok) {
          const data = await res.json();
          setProjects([...projects, data.data]);
        }
      }
    } catch (error) {
      console.error('Failed to save project:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  const handleToggleVisibility = async (id: number, isVisible: boolean) => {
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isVisible }),
      });

      if (res.ok) {
        setProjects(
          projects.map((p) => (p.id === id ? { ...p, is_visible: isVisible } : p))
        );
      }
    } catch (error) {
      console.error('Failed to update visibility:', error);
    }
  };

  if (isLoading) {
    return (
      <VStack gap={4}>
        <Heading as="h1" size="xl" color="white">
          Projects
        </Heading>
        <Text color="gray.400">Loading...</Text>
      </VStack>
    );
  }

  return (
    <VStack gap={8} align="stretch">
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Heading as="h1" size="xl" color="white">
          Projects
        </Heading>
        <Text color="gray.400" mt={2}>
          Manage displayed projects
        </Text>
      </MotionBox>

      <ProjectEditor
        projects={projects}
        onSave={handleSave}
        onDelete={handleDelete}
        onToggleVisibility={handleToggleVisibility}
      />
    </VStack>
  );
}
