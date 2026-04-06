'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Text, VStack, Input, Button, Flex, Spinner } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, User, Lock } from 'lucide-react';

const MotionBox = motion.create(Box);

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    fetch('/api/customer/me')
      .then((res) => {
        if (!res.ok) {
          window.location.href = '/portal/login';
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data?.customer) {
          setFullName(data.customer.full_name || '');
          setCompanyName(data.customer.company_name || '');
          setEmail(data.customer.email || '');
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleProfileUpdate = async () => {
    setSaving(true);
    setMessage('');
    setError('');

    try {
      const res = await fetch('/api/customer/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, companyName }),
      });
      if (res.ok) {
        setMessage('Profile updated successfully');
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to update profile');
      }
    } catch {
      setError('Network error');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setSaving(true);
    setMessage('');
    setError('');

    try {
      const res = await fetch('/api/customer/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      if (res.ok) {
        setMessage('Password updated successfully');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to change password');
      }
    } catch {
      setError('Network error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Flex minH="100vh" justify="center" align="center">
        <Spinner size="lg" color="primary.500" />
      </Flex>
    );
  }

  return (
    <Box py={{ base: 24, md: 32 }}>
      <Container maxW="2xl">
        <Link href="/portal">
          <Flex
            align="center"
            gap={2}
            color={{ base: 'gray.500', _dark: 'gray.400' }}
            _hover={{ color: 'primary.500' }}
            transition="color 0.2s"
            mb={8}
          >
            <ArrowLeft size={16} />
            <Text fontSize="sm">Back to Portal</Text>
          </Flex>
        </Link>

        {message && (
          <Box mb={6} p={4} borderRadius="lg" bg="green.500/10" borderWidth="1px" borderColor="green.500/20">
            <Text color="green.500" fontSize="sm">{message}</Text>
          </Box>
        )}
        {error && (
          <Box mb={6} p={4} borderRadius="lg" bg="red.500/10" borderWidth="1px" borderColor="red.500/20">
            <Text color="red.400" fontSize="sm">{error}</Text>
          </Box>
        )}

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Profile Section */}
          <Box
            p={6}
            borderRadius="xl"
            bg={{ base: 'white', _dark: 'whiteAlpha.50' }}
            borderWidth="1px"
            borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}
            mb={6}
          >
            <Flex align="center" gap={2} mb={6}>
              <User size={20} />
              <Text fontSize="lg" fontWeight="semibold" color={{ base: 'gray.900', _dark: 'white' }}>
                Profile Information
              </Text>
            </Flex>

            <VStack gap={4}>
              <Box w="full">
                <Text fontSize="sm" fontWeight="medium" mb={1} color={{ base: 'gray.700', _dark: 'gray.300' }}>
                  Email
                </Text>
                <Input value={email} readOnly variant="flushed" color={{ base: 'gray.500', _dark: 'gray.500' }} />
              </Box>
              <Box w="full">
                <Text fontSize="sm" fontWeight="medium" mb={1} color={{ base: 'gray.700', _dark: 'gray.300' }}>
                  Full Name
                </Text>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  variant="outline"
                  placeholder="Your full name"
                />
              </Box>
              <Box w="full">
                <Text fontSize="sm" fontWeight="medium" mb={1} color={{ base: 'gray.700', _dark: 'gray.300' }}>
                  Company Name
                </Text>
                <Input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  variant="outline"
                  placeholder="Your company name"
                />
              </Box>
              <Button
                w="full"
                bg="primary.500"
                color="white"
                _hover={{ bg: 'primary.600' }}
                onClick={handleProfileUpdate}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Update Profile'}
              </Button>
            </VStack>
          </Box>

          {/* Password Section */}
          <Box
            p={6}
            borderRadius="xl"
            bg={{ base: 'white', _dark: 'whiteAlpha.50' }}
            borderWidth="1px"
            borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}
          >
            <Flex align="center" gap={2} mb={6}>
              <Lock size={20} />
              <Text fontSize="lg" fontWeight="semibold" color={{ base: 'gray.900', _dark: 'white' }}>
                Change Password
              </Text>
            </Flex>

            <VStack gap={4}>
              <Box w="full">
                <Text fontSize="sm" fontWeight="medium" mb={1} color={{ base: 'gray.700', _dark: 'gray.300' }}>
                  Current Password
                </Text>
                <Input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  variant="outline"
                  placeholder="Enter current password"
                />
              </Box>
              <Box w="full">
                <Text fontSize="sm" fontWeight="medium" mb={1} color={{ base: 'gray.700', _dark: 'gray.300' }}>
                  New Password
                </Text>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  variant="outline"
                  placeholder="Enter new password"
                />
              </Box>
              <Box w="full">
                <Text fontSize="sm" fontWeight="medium" mb={1} color={{ base: 'gray.700', _dark: 'gray.300' }}>
                  Confirm New Password
                </Text>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  variant="outline"
                  placeholder="Confirm new password"
                />
              </Box>
              <Button
                w="full"
                bg="primary.500"
                color="white"
                _hover={{ bg: 'primary.600' }}
                onClick={handlePasswordChange}
                disabled={saving || !currentPassword || !newPassword}
              >
                {saving ? 'Saving...' : 'Change Password'}
              </Button>
            </VStack>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
}
