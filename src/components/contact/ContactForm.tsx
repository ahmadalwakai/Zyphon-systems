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
  Field,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { projectTypes, budgetRanges } from '@/data/services';
import type { ContactFormData } from '@/types';

const MotionBox = motion.create(Box);

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
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
          budget: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
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
            Send us a message
          </Heading>

          {submitStatus === 'success' && (
            <Box
              p={4}
              borderRadius="lg"
              bg="green.500/10"
              borderWidth="1px"
              borderColor="green.500/30"
            >
              <Text color="green.500" fontWeight="medium">
                Thank you for your message! We&apos;ll be in touch soon.
              </Text>
            </Box>
          )}

          {submitStatus === 'error' && (
            <Box
              p={4}
              borderRadius="lg"
              bg="red.500/10"
              borderWidth="1px"
              borderColor="red.500/30"
            >
              <Text color="red.500" fontWeight="medium">
                Something went wrong. Please try again or email us directly.
              </Text>
            </Box>
          )}

          <form onSubmit={handleSubmit}>
            <VStack gap={4} align="stretch">
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
                  borderRadius="lg"
                  borderColor={{ base: 'gray.300', _dark: 'gray.600' }}
                  bg={{ base: 'white', _dark: 'gray.800' }}
                  _hover={{ borderColor: { base: 'gray.400', _dark: 'gray.500' } }}
                  _focus={{
                    borderColor: 'primary.500',
                    boxShadow: '0 0 0 1px var(--chakra-colors-primary-500)',
                  }}
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
                  placeholder="Your company name"
                  borderRadius="lg"
                  borderColor={{ base: 'gray.300', _dark: 'gray.600' }}
                  bg={{ base: 'white', _dark: 'gray.800' }}
                  _hover={{ borderColor: { base: 'gray.400', _dark: 'gray.500' } }}
                  _focus={{
                    borderColor: 'primary.500',
                    boxShadow: '0 0 0 1px var(--chakra-colors-primary-500)',
                  }}
                />
              </Field.Root>

              <Field.Root required>
                <Field.Label color={{ base: 'gray.700', _dark: 'gray.300' }} fontSize="sm">
                  Email *
                </Field.Label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  borderRadius="lg"
                  borderColor={{ base: 'gray.300', _dark: 'gray.600' }}
                  bg={{ base: 'white', _dark: 'gray.800' }}
                  _hover={{ borderColor: { base: 'gray.400', _dark: 'gray.500' } }}
                  _focus={{
                    borderColor: 'primary.500',
                    boxShadow: '0 0 0 1px var(--chakra-colors-primary-500)',
                  }}
                />
              </Field.Root>

              <Field.Root>
                <Field.Label color={{ base: 'gray.700', _dark: 'gray.300' }} fontSize="sm">
                  Phone
                </Field.Label>
                <Input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+44 123 456 7890"
                  borderRadius="lg"
                  borderColor={{ base: 'gray.300', _dark: 'gray.600' }}
                  bg={{ base: 'white', _dark: 'gray.800' }}
                  _hover={{ borderColor: { base: 'gray.400', _dark: 'gray.500' } }}
                  _focus={{
                    borderColor: 'primary.500',
                    boxShadow: '0 0 0 1px var(--chakra-colors-primary-500)',
                  }}
                />
              </Field.Root>

              <Field.Root>
                <Field.Label color={{ base: 'gray.700', _dark: 'gray.300' }} fontSize="sm">
                  Project Type
                </Field.Label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleSelectChange}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--chakra-colors-gray-600)',
                    backgroundColor: 'var(--chakra-colors-gray-800)',
                    color: 'white',
                  }}
                >
                  <option value="">Select project type</option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </Field.Root>

              <Field.Root>
                <Field.Label color={{ base: 'gray.700', _dark: 'gray.300' }} fontSize="sm">
                  Estimated Budget
                </Field.Label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleSelectChange}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--chakra-colors-gray-600)',
                    backgroundColor: 'var(--chakra-colors-gray-800)',
                    color: 'white',
                  }}
                >
                  <option value="">Select budget range</option>
                  {budgetRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </Field.Root>

              <Field.Root required>
                <Field.Label color={{ base: 'gray.700', _dark: 'gray.300' }} fontSize="sm">
                  Message *
                </Field.Label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  required
                  rows={5}
                  borderRadius="lg"
                  borderColor={{ base: 'gray.300', _dark: 'gray.600' }}
                  bg={{ base: 'white', _dark: 'gray.800' }}
                  _hover={{ borderColor: { base: 'gray.400', _dark: 'gray.500' } }}
                  _focus={{
                    borderColor: 'primary.500',
                    boxShadow: '0 0 0 1px var(--chakra-colors-primary-500)',
                  }}
                />
              </Field.Root>

              <Button
                type="submit"
                size="lg"
                bg="primary.500"
                color="white"
                fontWeight="semibold"
                borderRadius="lg"
                w="100%"
                loading={isSubmitting}
                _hover={{ bg: 'primary.600' }}
                transition="all 0.2s"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </VStack>
          </form>
        </VStack>
      </Box>
    </MotionBox>
  );
}
