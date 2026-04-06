'use client';

import { useState } from 'react';
import { Box, Heading, Text, VStack, Input, Button, Spinner } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

interface EmailDiagnostics {
  hasResendKey: boolean;
  resendKeyPrefix?: string | null;
  fromEmail: string;
  adminEmail: string;
  siteUrl: string;
  nodeEnv?: string;
}

interface EmailTestResult {
  success: boolean;
  sent?: boolean;
  diagnostics?: EmailDiagnostics;
  message?: string;
  error?: string;
}

export default function SettingsPage() {
  const [testEmail, setTestEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [diagLoading, setDiagLoading] = useState(false);
  const [result, setResult] = useState<EmailTestResult | null>(null);
  const [diagnostics, setDiagnostics] = useState<EmailDiagnostics | null>(null);

  const fetchDiagnostics = async () => {
    setDiagLoading(true);
    try {
      const res = await fetch('/api/admin/email-test');
      const data = await res.json();
      if (data.success) {
        setDiagnostics(data.diagnostics);
      }
    } catch {
      // Ignore errors
    } finally {
      setDiagLoading(false);
    }
  };

  const sendTestEmail = async () => {
    if (!testEmail) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/admin/email-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: testEmail }),
      });
      const data = await res.json();
      setResult(data);
      if (data.diagnostics) {
        setDiagnostics(data.diagnostics);
      }
    } catch (err) {
      setResult({ success: false, error: err instanceof Error ? err.message : 'Unknown error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack gap={8} align="stretch">
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Heading as="h1" size="xl" color="white">
          Settings
        </Heading>
        <Text color="gray.400" mt={2}>
          Configure site settings
        </Text>
      </MotionBox>

      <Box
        borderRadius="xl"
        borderWidth="1px"
        borderColor="whiteAlpha.100"
        bg="rgba(17, 17, 24, 0.7)"
        p={8}
      >
        <VStack gap={6} align="start">
          <Box width="100%">
            <Text color="white" fontWeight="semibold" mb={2}>
              Email Diagnostics
            </Text>
            <Text color="gray.400" fontSize="sm" mb={4}>
              Test email delivery and view configuration.
            </Text>
            
            <Box p={4} borderRadius="lg" bg="whiteAlpha.50" mb={4}>
              <Button
                size="sm"
                colorScheme="teal"
                variant="outline"
                onClick={fetchDiagnostics}
                disabled={diagLoading}
                mb={3}
              >
                {diagLoading ? <Spinner size="sm" /> : 'Load Configuration'}
              </Button>
              
              {diagnostics && (
                <VStack align="start" gap={1} mt={2}>
                  <Text color="gray.300" fontSize="sm">
                    <strong>Resend Key:</strong>{' '}
                    <Text as="span" color={diagnostics.hasResendKey ? 'green.400' : 'red.400'}>
                      {diagnostics.hasResendKey ? `Configured (${diagnostics.resendKeyPrefix})` : 'Not configured'}
                    </Text>
                  </Text>
                  <Text color="gray.300" fontSize="sm">
                    <strong>From Email:</strong> {diagnostics.fromEmail}
                  </Text>
                  <Text color="gray.300" fontSize="sm">
                    <strong>Admin Email:</strong> {diagnostics.adminEmail}
                  </Text>
                  <Text color="gray.300" fontSize="sm">
                    <strong>Site URL:</strong> {diagnostics.siteUrl}
                  </Text>
                </VStack>
              )}
            </Box>

            <Box p={4} borderRadius="lg" bg="whiteAlpha.50">
              <Text color="gray.300" fontSize="sm" mb={3}>
                Send a test email to verify delivery:
              </Text>
              <Box display="flex" gap={2} flexWrap="wrap">
                <Input
                  placeholder="test@example.com"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  bg="whiteAlpha.100"
                  borderColor="whiteAlpha.200"
                  color="white"
                  size="sm"
                  width="250px"
                  _placeholder={{ color: 'gray.500' }}
                />
                <Button
                  size="sm"
                  colorScheme="teal"
                  onClick={sendTestEmail}
                  disabled={loading || !testEmail}
                >
                  {loading ? <Spinner size="sm" /> : 'Send Test'}
                </Button>
              </Box>
              
              {result && (
                <Box mt={3} p={3} borderRadius="md" bg={result.success && result.sent ? 'green.900' : 'red.900'}>
                  <Text color="white" fontSize="sm" fontWeight="semibold">
                    {result.success && result.sent ? '✓ Email sent successfully' : '✗ Email failed'}
                  </Text>
                  {result.message && (
                    <Text color="gray.300" fontSize="xs" mt={1}>{result.message}</Text>
                  )}
                  {result.error && (
                    <Text color="red.300" fontSize="xs" mt={1}>{result.error}</Text>
                  )}
                </Box>
              )}
            </Box>
          </Box>

          <Box>
            <Text color="white" fontWeight="semibold" mb={2}>
              Contact Information
            </Text>
            <Text color="gray.400" fontSize="sm">
              Manage contact details displayed on the website.
            </Text>
            <Box mt={3} p={4} borderRadius="lg" bg="whiteAlpha.50">
              <VStack align="start" gap={2}>
                <Text color="gray.300" fontSize="sm">
                  <strong>Email:</strong> hello@zyphonsystems.com
                </Text>
                <Text color="gray.300" fontSize="sm">
                  <strong>Phone:</strong> +44 (0) 7901 846 297
                </Text>
              </VStack>
            </Box>
          </Box>

          <Box>
            <Text color="white" fontWeight="semibold" mb={2}>
              SEO Defaults
            </Text>
            <Text color="gray.400" fontSize="sm">
              Configure default meta tags and SEO settings.
            </Text>
            <Text color="gray.500" fontSize="xs" mt={2}>
              Coming soon
            </Text>
          </Box>

          <Box>
            <Text color="white" fontWeight="semibold" mb={2}>
              Database Initialization
            </Text>
            <Text color="gray.400" fontSize="sm">
              The database tables are automatically created when the first request is made to the
              API endpoints.
            </Text>
          </Box>
        </VStack>
      </Box>
    </VStack>
  );
}
