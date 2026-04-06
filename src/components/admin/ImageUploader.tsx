'use client';

import { useState, useRef, useCallback } from 'react';
import { Box, Text, VStack, Button, HStack } from '@chakra-ui/react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onUpload: (url: string) => void;
  currentImage?: string;
}

export function ImageUploader({ onUpload, currentImage }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    setError('');

    if (!['image/png', 'image/jpeg', 'image/webp', 'image/gif'].includes(file.type)) {
      setError('Invalid file type. Allowed: PNG, JPEG, WebP, GIF');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File too large. Maximum 5MB.');
      return;
    }

    // Show local preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);

    // Upload
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Upload failed');
      }

      const data = await res.json();
      onUpload(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      setPreview(currentImage || null);
    } finally {
      setIsUploading(false);
    }
  }, [onUpload, currentImage]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleClear = () => {
    setPreview(null);
    onUpload('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <VStack gap={3} align="stretch">
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        onChange={handleChange}
        style={{ display: 'none' }}
      />

      {preview ? (
        <Box position="relative">
          <Box
            borderRadius="lg"
            overflow="hidden"
            borderWidth="1px"
            borderColor="whiteAlpha.200"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Upload preview"
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
          </Box>
          <HStack position="absolute" top={2} right={2} gap={2}>
            <Button
              size="xs"
              bg="blackAlpha.700"
              color="white"
              _hover={{ bg: 'blackAlpha.800' }}
              onClick={() => inputRef.current?.click()}
            >
              Change
            </Button>
            <Button
              size="xs"
              bg="red.500/80"
              color="white"
              _hover={{ bg: 'red.600' }}
              onClick={handleClear}
            >
              <X size={14} />
            </Button>
          </HStack>
        </Box>
      ) : (
        <Box
          p={8}
          borderRadius="lg"
          borderWidth="2px"
          borderStyle="dashed"
          borderColor={isDragging ? 'primary.500' : 'whiteAlpha.200'}
          bg={isDragging ? 'primary.500/5' : 'transparent'}
          cursor="pointer"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          transition="all 0.2s"
          _hover={{ borderColor: 'primary.500' }}
        >
          <VStack gap={2}>
            {isUploading ? (
              <Text color="gray.400" fontSize="sm">Uploading...</Text>
            ) : (
              <>
                <Box color="gray.500">
                  {isDragging ? <ImageIcon size={24} /> : <Upload size={24} />}
                </Box>
                <Text color="gray.400" fontSize="sm" textAlign="center">
                  Drag and drop an image, or click to select
                </Text>
                <Text color="gray.500" fontSize="xs">
                  PNG, JPEG, WebP, GIF — Max 5MB
                </Text>
              </>
            )}
          </VStack>
        </Box>
      )}

      {error && (
        <Text color="red.400" fontSize="xs">{error}</Text>
      )}
    </VStack>
  );
}
