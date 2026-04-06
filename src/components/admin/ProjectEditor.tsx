'use client';

import { useState } from 'react';
import { Box, Flex, Text, VStack, HStack, Button, Input, Textarea, Field } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, EyeOff, GripVertical } from 'lucide-react';

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

interface ProjectEditorProps {
  projects: Project[];
  onSave: (project: Partial<Project>) => void;
  onDelete: (id: number) => void;
  onToggleVisibility: (id: number, isVisible: boolean) => void;
}

export function ProjectEditor({
  projects,
  onSave,
  onDelete,
  onToggleVisibility,
}: ProjectEditorProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    description: '',
    outcome: '',
  });

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      type: project.type,
      description: project.description,
      outcome: project.outcome || '',
    });
    setIsAdding(false);
  };

  const handleAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({ title: '', type: '', description: '', outcome: '' });
  };

  const handleSave = () => {
    if (!formData.title || !formData.type || !formData.description) return;

    if (isAdding) {
      onSave(formData);
    } else if (editingId) {
      onSave({ id: editingId, ...formData });
    }

    setEditingId(null);
    setIsAdding(false);
    setFormData({ title: '', type: '', description: '', outcome: '' });
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({ title: '', type: '', description: '', outcome: '' });
  };

  return (
    <VStack gap={4} align="stretch">
      <Flex justify="space-between" align="center">
        <Text color="white" fontWeight="semibold" fontSize="lg">
          Projects
        </Text>
        <Button
          size="sm"
          bg="primary.500"
          color="white"
          _hover={{ bg: 'primary.600' }}
          onClick={handleAdd}
          disabled={isAdding}
        >
          <Plus size={16} />
          <Text ml={2}>Add Project</Text>
        </Button>
      </Flex>

      {(isAdding || editingId) && (
        <MotionBox
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          borderRadius="xl"
          borderWidth="1px"
          borderColor="primary.500/50"
          bg="rgba(17, 17, 24, 0.9)"
          p={6}
        >
          <VStack gap={4} align="stretch">
            <Text color="white" fontWeight="medium">
              {isAdding ? 'Add New Project' : 'Edit Project'}
            </Text>

            <Field.Root>
              <Field.Label color="gray.300" fontSize="sm">Title</Field.Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Project title"
                bg="gray.800"
                borderColor="gray.600"
                color="white"
              />
            </Field.Root>

            <Field.Root>
              <Field.Label color="gray.300" fontSize="sm">Type</Field.Label>
              <Input
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                placeholder="e.g., Mobile App + Admin Panel"
                bg="gray.800"
                borderColor="gray.600"
                color="white"
              />
            </Field.Root>

            <Field.Root>
              <Field.Label color="gray.300" fontSize="sm">Description</Field.Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Project description"
                rows={3}
                bg="gray.800"
                borderColor="gray.600"
                color="white"
              />
            </Field.Root>

            <Field.Root>
              <Field.Label color="gray.300" fontSize="sm">Outcome (optional)</Field.Label>
              <Textarea
                value={formData.outcome}
                onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                placeholder="Project outcome"
                rows={2}
                bg="gray.800"
                borderColor="gray.600"
                color="white"
              />
            </Field.Root>

            <HStack gap={2} justify="flex-end">
              <Button
                size="sm"
                variant="ghost"
                color="gray.400"
                _hover={{ bg: 'whiteAlpha.100' }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                bg="primary.500"
                color="white"
                _hover={{ bg: 'primary.600' }}
                onClick={handleSave}
              >
                Save
              </Button>
            </HStack>
          </VStack>
        </MotionBox>
      )}

      {projects.length === 0 ? (
        <Box
          borderRadius="xl"
          borderWidth="1px"
          borderColor="whiteAlpha.100"
          bg="rgba(17, 17, 24, 0.7)"
          p={8}
          textAlign="center"
        >
          <Text color="gray.400">No projects yet. Add your first project above.</Text>
        </Box>
      ) : (
        projects.map((project, index) => (
          <MotionBox
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            borderRadius="xl"
            borderWidth="1px"
            borderColor="whiteAlpha.100"
            bg="rgba(17, 17, 24, 0.7)"
            p={4}
            opacity={project.is_visible ? 1 : 0.6}
          >
            <Flex gap={4} align="start">
              <Box color="gray.600" cursor="grab" pt={1}>
                <GripVertical size={20} />
              </Box>

              <VStack align="start" gap={1} flex={1}>
                <Flex gap={2} align="center">
                  <Text color="white" fontWeight="medium">
                    {project.title}
                  </Text>
                  {!project.is_visible && (
                    <Text color="gray.500" fontSize="xs">
                      (Hidden)
                    </Text>
                  )}
                </Flex>
                <Text color="gray.500" fontSize="sm">
                  {project.type}
                </Text>
                <Text color="gray.400" fontSize="sm" lineClamp={2}>
                  {project.description}
                </Text>
              </VStack>

              <HStack gap={1}>
                <Button
                  size="sm"
                  variant="ghost"
                  color="gray.400"
                  _hover={{ bg: 'whiteAlpha.100', color: 'white' }}
                  onClick={() => onToggleVisibility(project.id, !project.is_visible)}
                >
                  {project.is_visible ? <Eye size={16} /> : <EyeOff size={16} />}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  color="gray.400"
                  _hover={{ bg: 'whiteAlpha.100', color: 'white' }}
                  onClick={() => handleEdit(project)}
                >
                  <Edit size={16} />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  color="gray.400"
                  _hover={{ bg: 'red.500/20', color: 'red.400' }}
                  onClick={() => onDelete(project.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </HStack>
            </Flex>
          </MotionBox>
        ))
      )}
    </VStack>
  );
}
