'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  Textarea,
  VStack,
  Grid,
  Field,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { CalendarCheck } from 'lucide-react';

const MotionBox = motion.create(Box);

const projectTypes = [
  'Mobile Application',
  'Admin Panel / Dashboard',
  'Full Platform (Mobile + Admin + Backend)',
  'Backend / API Development',
  'System Integration',
  'Other',
];

const timeSlots = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
];

interface BookingFormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  projectType: string;
  preferredDate: string;
  preferredTime: string;
  description: string;
}

export function BookingForm() {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    projectType: '',
    preferredDate: '',
    preferredTime: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name');
      return false;
    }
    if (!formData.email.trim()) {
      setErrorMessage('Please enter your email address');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }
    if (!formData.description.trim()) {
      setErrorMessage('Please provide a brief description of your project');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          companyName: '',
          email: '',
          phone: '',
          projectType: '',
          preferredDate: '',
          preferredTime: '',
          description: '',
        });
      } else {
        const data = await response.json();
        setErrorMessage(data.error || 'Failed to submit booking request');
        setSubmitStatus('error');
      }
    } catch {
      setErrorMessage('An error occurred. Please try again.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectStyles = {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid var(--chakra-colors-gray-600)',
    backgroundColor: 'var(--chakra-colors-gray-800)',
    color: 'white',
  };

  if (submitStatus === 'success') {
    return (
      <MotionBox
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Box
          borderRadius="xl"
          borderWidth="1px"
          borderColor="green.500/30"
          bg="green.500/10"
          p={{ base: 8, md: 12 }}
          textAlign="center"
        >
          <VStack gap={4}>
            <Box color="green.400">
              <CalendarCheck size={48} />
            </Box>
            <Heading
              as="h2"
              fontSize={{ base: 'xl', md: '2xl' }}
              fontWeight="semibold"
              color={{ base: 'gray.900', _dark: 'white' }}
            >
              Thank you!
            </Heading>
            <Text color={{ base: 'gray.600', _dark: 'gray.400' }}>
              We'll confirm your meeting within 24 hours.
            </Text>
          </VStack>
        </Box>
      </MotionBox>
    );
  }

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Box
        borderRadius="xl"
        borderWidth="1px"
        borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}
        bg={{ base: 'white', _dark: 'rgba(17, 17, 24, 0.7)' }}
        backdropFilter="blur(12px)"
        p={{ base: 6, md: 8 }}
      >
        <VStack gap={6} align="stretch">
          <Heading
            as="h2"
            fontSize={{ base: 'xl', md: '2xl' }}
            fontWeight="semibold"
            color={{ base: 'gray.900', _dark: 'white' }}
          >
            Request a Meeting
          </Heading>

          {errorMessage && (
            <Box
              p={4}
              borderRadius="lg"
              bg="red.500/10"
              borderWidth="1px"
              borderColor="red.500/30"
            >
              <Text color="red.400" fontSize="sm">
                {errorMessage}
              </Text>
            </Box>
          )}

          <form onSubmit={handleSubmit}>
            <VStack gap={5} align="stretch">
              <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={5}>
                <Field.Root required>
                  <Field.Label color={{ base: 'gray.700', _dark: 'gray.300' }} fontSize="sm">
                    Full Name *
                  </Field.Label>
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    bg={{ base: 'white', _dark: 'gray.800' }}
                    borderColor={{ base: 'gray.300', _dark: 'gray.600' }}
                    color={{ base: 'gray.900', _dark: 'white' }}
                    _placeholder={{ color: { base: 'gray.400', _dark: 'gray.500' } }}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label color={{ base: 'gray.700', _dark: 'gray.300' }} fontSize="sm">
                    Company Name
                  </Field.Label>
                  <Input
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Your company"
                    bg={{ base: 'white', _dark: 'gray.800' }}
                    borderColor={{ base: 'gray.300', _dark: 'gray.600' }}
                    color={{ base: 'gray.900', _dark: 'white' }}
                    _placeholder={{ color: { base: 'gray.400', _dark: 'gray.500' } }}
                  />
                </Field.Root>
              </Grid>

              <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={5}>
                <Field.Root required>
                  <Field.Label color={{ base: 'gray.700', _dark: 'gray.300' }} fontSize="sm">
                    Email Address *
                  </Field.Label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    bg={{ base: 'white', _dark: 'gray.800' }}
                    borderColor={{ base: 'gray.300', _dark: 'gray.600' }}
                    color={{ base: 'gray.900', _dark: 'white' }}
                    _placeholder={{ color: { base: 'gray.400', _dark: 'gray.500' } }}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label color={{ base: 'gray.700', _dark: 'gray.300' }} fontSize="sm">
                    Phone Number
                  </Field.Label>
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+44 123 456 7890"
                    bg={{ base: 'white', _dark: 'gray.800' }}
                    borderColor={{ base: 'gray.300', _dark: 'gray.600' }}
                    color={{ base: 'gray.900', _dark: 'white' }}
                    _placeholder={{ color: { base: 'gray.400', _dark: 'gray.500' } }}
                  />
                </Field.Root>
              </Grid>

              <Field.Root>
                <Field.Label color={{ base: 'gray.700', _dark: 'gray.300' }} fontSize="sm">
                  Project Type
                </Field.Label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleSelectChange}
                  style={selectStyles}
                >
                  <option value="">Select project type</option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </Field.Root>

              <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={5}>
                <Field.Root>
                  <Field.Label color={{ base: 'gray.700', _dark: 'gray.300' }} fontSize="sm">
                    Preferred Date
                  </Field.Label>
                  <Input
                    name="preferredDate"
                    type="date"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    bg={{ base: 'white', _dark: 'gray.800' }}
                    borderColor={{ base: 'gray.300', _dark: 'gray.600' }}
                    color={{ base: 'gray.900', _dark: 'white' }}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label color={{ base: 'gray.700', _dark: 'gray.300' }} fontSize="sm">
                    Preferred Time (GMT)
                  </Field.Label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleSelectChange}
                    style={selectStyles}
                  >
                    <option value="">Select time</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </Field.Root>
              </Grid>

              <Field.Root required>
                <Field.Label color={{ base: 'gray.700', _dark: 'gray.300' }} fontSize="sm">
                  Brief Description *
                </Field.Label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell us about your project idea, current challenges, and what you're looking to achieve..."
                  required
                  rows={5}
                  bg={{ base: 'white', _dark: 'gray.800' }}
                  borderColor={{ base: 'gray.300', _dark: 'gray.600' }}
                  color={{ base: 'gray.900', _dark: 'white' }}
                  _placeholder={{ color: { base: 'gray.400', _dark: 'gray.500' } }}
                />
              </Field.Root>

              <Button
                type="submit"
                size="lg"
                bg="primary.500"
                color="white"
                _hover={{ bg: 'primary.600' }}
                loading={isSubmitting}
                w="full"
              >
                Request Meeting
              </Button>
            </VStack>
          </form>
        </VStack>
      </Box>
    </MotionBox>
  );
}
