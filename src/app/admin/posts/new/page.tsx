'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Heading, Text, VStack, HStack, Input, Textarea, Button, Badge, Field } from '@chakra-ui/react';
import { X } from 'lucide-react';
import { slugify } from '@/lib/utils';
import { ImageUploader } from '@/components/admin/ImageUploader';

export default function NewPostPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImageUrl: '',
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState('');

  const handleTitleChange = (value: string) => {
    setFormData({
      ...formData,
      title: value,
      slug: slugify(value),
    });
  };

  const handleAddTag = () => {
    const tags = tagInput.split(',').map(t => t.trim()).filter(Boolean);
    const newTags = [...new Set([...formData.tags, ...tags])];
    setFormData({ ...formData, tags: newTags });
    setTagInput('');
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
  };

  const handleSubmit = async (publish: boolean) => {
    if (!formData.title || !formData.excerpt || !formData.content) return;
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          isPublished: publish,
        }),
      });

      if (res.ok) {
        router.push('/admin/posts');
      }
    } catch (error) {
      console.error('Failed to create post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box>
      <Heading as="h1" size="2xl" color="white" mb={2}>New Post</Heading>
      <Text color="gray.400" mb={8}>Create a new article or insight</Text>

      <VStack gap={6} align="stretch" maxW="3xl">
        <Field.Root>
          <Field.Label color="gray.300" fontSize="sm">Title</Field.Label>
          <Input
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Article title"
            bg="gray.800"
            borderColor="gray.600"
            color="white"
          />
        </Field.Root>

        <Field.Root>
          <Field.Label color="gray.300" fontSize="sm">Slug</Field.Label>
          <Input
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="auto-generated-from-title"
            bg="gray.800"
            borderColor="gray.600"
            color="white"
          />
        </Field.Root>

        <Field.Root>
          <Field.Label color="gray.300" fontSize="sm">
            Excerpt ({formData.excerpt.length}/300)
          </Field.Label>
          <Textarea
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value.slice(0, 300) })}
            placeholder="Brief summary of the article"
            rows={3}
            bg="gray.800"
            borderColor="gray.600"
            color="white"
          />
        </Field.Root>

        <Field.Root>
          <Field.Label color="gray.300" fontSize="sm">Content (HTML)</Field.Label>
          <Textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Full article content (HTML supported)"
            rows={16}
            bg="gray.800"
            borderColor="gray.600"
            color="white"
            fontFamily="mono"
            fontSize="sm"
          />
        </Field.Root>

        <Field.Root>
          <Field.Label color="gray.300" fontSize="sm">Tags</Field.Label>
          <HStack>
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); }
              }}
              placeholder="Add tags (comma-separated)"
              bg="gray.800"
              borderColor="gray.600"
              color="white"
            />
            <Button size="sm" bg="whiteAlpha.200" color="white" _hover={{ bg: 'whiteAlpha.300' }} onClick={handleAddTag}>
              Add
            </Button>
          </HStack>
          {formData.tags.length > 0 && (
            <HStack gap={2} flexWrap="wrap" mt={2}>
              {formData.tags.map((tag) => (
                <Badge
                  key={tag}
                  px={3}
                  py={1}
                  borderRadius="full"
                  bg="primary.500/20"
                  color="primary.400"
                  cursor="pointer"
                  onClick={() => handleRemoveTag(tag)}
                >
                  {tag} <X size={12} style={{ display: 'inline', marginLeft: 4 }} />
                </Badge>
              ))}
            </HStack>
          )}
        </Field.Root>

        <Field.Root>
          <Field.Label color="gray.300" fontSize="sm">Cover Image (optional)</Field.Label>
          <ImageUploader
            onUpload={(url) => setFormData({ ...formData, coverImageUrl: url })}
            currentImage={formData.coverImageUrl || undefined}
          />
        </Field.Root>

        <HStack gap={3} pt={4}>
          <Button
            bg="whiteAlpha.200"
            color="white"
            _hover={{ bg: 'whiteAlpha.300' }}
            onClick={() => handleSubmit(false)}
            loading={isSubmitting}
          >
            Save as Draft
          </Button>
          <Button
            bg="primary.500"
            color="white"
            _hover={{ bg: 'primary.600' }}
            onClick={() => handleSubmit(true)}
            loading={isSubmitting}
          >
            Publish
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
