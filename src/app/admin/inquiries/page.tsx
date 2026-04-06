'use client';

import { useEffect, useState } from 'react';
import { Box, Heading, Text, VStack, Textarea, Button, HStack } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { InquiryTable } from '@/components/admin/InquiryTable';
import { X, Copy, Check } from 'lucide-react';

const MotionBox = motion.create(Box);

interface Inquiry {
  id: number;
  full_name: string;
  company_name?: string;
  email: string;
  phone?: string;
  project_type?: string;
  budget?: string;
  message: string;
  status: string;
  created_at: string;
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/admin/inquiries');
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch inquiries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });

      if (res.ok) {
        setInquiries(
          inquiries.map((i) => (i.id === id ? { ...i, status } : i))
        );
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleGenerateResponse = async (inquiry: Inquiry) => {
    setIsGenerating(true);
    setAiResponse(null);

    const prompt = `Please draft a professional response to this client inquiry:

Name: ${inquiry.full_name}
Company: ${inquiry.company_name || 'Not provided'}
Email: ${inquiry.email}
Project Type: ${inquiry.project_type || 'Not specified'}
Budget: ${inquiry.budget || 'Not specified'}
Message: ${inquiry.message}

Draft a friendly but professional email response that:
1. Thanks them for their inquiry
2. Acknowledges their specific project needs
3. Briefly mentions how Zyphon Systems can help
4. Suggests next steps (e.g., scheduling a call)

Keep the tone professional but warm. Use British English.`;

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (res.ok) {
        const data = await res.json();
        setAiResponse(data.data.response);
      } else {
        setAiResponse('Failed to generate response. The AI service may be unavailable.');
      }
    } catch (error) {
      console.error('AI generation error:', error);
      setAiResponse('Failed to generate response. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (aiResponse) {
      navigator.clipboard.writeText(aiResponse);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <VStack gap={4}>
        <Heading as="h1" size="xl" color="white">
          Inquiries
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
        <HStack justify="space-between" align="start">
          <Box>
            <Heading as="h1" size="xl" color="white">
              Inquiries
            </Heading>
            <Text color="gray.400" mt={2}>
              Manage contact form submissions
            </Text>
          </Box>
          <a href="/api/admin/export/inquiries" download>
            <Button
              size="sm"
              variant="outline"
              borderColor="primary.500"
              color="primary.400"
              _hover={{ bg: 'primary.500/10' }}
            >
              Export CSV
            </Button>
          </a>
        </HStack>
      </MotionBox>

      <InquiryTable
        inquiries={inquiries}
        onStatusChange={handleStatusChange}
        onGenerateResponse={handleGenerateResponse}
      />

      {/* AI Response Modal */}
      <AnimatePresence>
        {(aiResponse || isGenerating) && (
          <MotionBox
            position="fixed"
            inset={0}
            bg="blackAlpha.800"
            zIndex={100}
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={4}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MotionBox
              maxW="2xl"
              w="full"
              borderRadius="xl"
              borderWidth="1px"
              borderColor="whiteAlpha.100"
              bg="rgba(17, 17, 24, 0.95)"
              p={6}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <HStack justify="space-between" mb={4}>
                <Text color="white" fontWeight="semibold" fontSize="lg">
                  AI Generated Response
                </Text>
                <Button
                  size="sm"
                  variant="ghost"
                  color="gray.400"
                  _hover={{ bg: 'whiteAlpha.100' }}
                  onClick={() => setAiResponse(null)}
                >
                  <X size={20} />
                </Button>
              </HStack>

              {isGenerating ? (
                <VStack py={8}>
                  <Text color="gray.400">Generating response...</Text>
                </VStack>
              ) : (
                <>
                  <Textarea
                    value={aiResponse || ''}
                    onChange={(e) => setAiResponse(e.target.value)}
                    rows={12}
                    bg="gray.800"
                    borderColor="gray.600"
                    color="white"
                    mb={4}
                  />
                  <HStack justify="flex-end">
                    <Button
                      size="sm"
                      bg="primary.500"
                      color="white"
                      _hover={{ bg: 'primary.600' }}
                      onClick={handleCopy}
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                      <Text ml={2}>{copied ? 'Copied!' : 'Copy to Clipboard'}</Text>
                    </Button>
                  </HStack>
                </>
              )}
            </MotionBox>
          </MotionBox>
        )}
      </AnimatePresence>
    </VStack>
  );
}
