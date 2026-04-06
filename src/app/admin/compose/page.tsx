'use client';

import { useState } from 'react';
import { Box, Heading, Text, VStack, Input, Textarea, Button, Flex, Field } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';

const MotionBox = motion.create(Box);

export default function ComposePage() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSend = async () => {
    setSending(true);
    setStatus(null);
    try {
      const res = await fetch('/api/admin/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ to, subject, body }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', message: 'Email sent successfully!' });
        setTo('');
        setSubject('');
        setBody('');
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to send' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Failed to send email' });
    } finally {
      setSending(false);
    }
  };

  const handleAiAssist = async () => {
    if (!subject && !body) return;
    setAiLoading(true);
    try {
      const prompt = `Write a professional email body for Zyphon Systems. Subject: "${subject || 'Follow up'}". ${body ? `Draft notes: ${body}` : ''}. Keep it concise, professional, and warm. Do not include subject line or greeting — just the body paragraphs.`;
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.success && data.data?.response) {
        setBody(data.data.response);
      }
    } catch {
      // silent fail
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <VStack gap={8} align="stretch">
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Heading as="h1" size="xl" color="white">Compose Email</Heading>
        <Text color="gray.400" mt={2}>Send emails to clients and prospects</Text>
      </MotionBox>

      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        p={6}
        borderRadius="xl"
        borderWidth="1px"
        borderColor="whiteAlpha.100"
        bg="rgba(17, 17, 24, 0.7)"
      >
        <VStack gap={5} align="stretch">
          {status && (
            <Box
              p={3}
              borderRadius="lg"
              bg={status.type === 'success' ? 'green.500/10' : 'red.500/10'}
              borderWidth="1px"
              borderColor={status.type === 'success' ? 'green.500/30' : 'red.500/30'}
            >
              <Text color={status.type === 'success' ? 'green.400' : 'red.400'} fontSize="sm">
                {status.message}
              </Text>
            </Box>
          )}

          <Field.Root>
            <Field.Label color="gray.300" fontSize="sm">To</Field.Label>
            <Input
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="recipient@example.com"
              bg="gray.800"
              borderColor="gray.600"
              color="white"
            />
          </Field.Root>

          <Field.Root>
            <Field.Label color="gray.300" fontSize="sm">Subject</Field.Label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Email subject"
              bg="gray.800"
              borderColor="gray.600"
              color="white"
            />
          </Field.Root>

          <Field.Root>
            <Flex justify="space-between" align="center" mb={1}>
              <Field.Label color="gray.300" fontSize="sm">Body</Field.Label>
              <Button
                size="xs"
                variant="ghost"
                color="purple.400"
                _hover={{ bg: 'purple.500/10' }}
                onClick={handleAiAssist}
                loading={aiLoading}
              >
                <Sparkles size={14} />
                AI Assist
              </Button>
            </Flex>
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your email content..."
              bg="gray.800"
              borderColor="gray.600"
              color="white"
              rows={12}
              resize="vertical"
            />
          </Field.Root>

          <Flex justify="end" pt={2}>
            <Button
              bg="primary.500"
              color="white"
              _hover={{ bg: 'primary.600' }}
              onClick={handleSend}
              loading={sending}
              disabled={!to || !subject || !body}
            >
              <Send size={16} />
              Send Email
            </Button>
          </Flex>
        </VStack>
      </MotionBox>
    </VStack>
  );
}
