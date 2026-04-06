import type { Metadata } from 'next';
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for Zyphon Systems. Understand the conditions for using our services.',
};

export default function TermsPage() {
  return (
    <Box py={{ base: 16, md: 24 }}>
      <Container maxW="4xl">
        <VStack gap={{ base: 8, md: 12 }} align="stretch">
          <VStack gap={4} align="center" textAlign="center">
            <Heading
              as="h1"
              fontSize={{ base: '3xl', md: '5xl' }}
              fontWeight="bold"
              color={{ base: 'gray.900', _dark: 'white' }}
            >
              Terms of Service
            </Heading>
            <Text fontSize="sm" color={{ base: 'gray.500', _dark: 'gray.500' }}>
              Last updated: April 2026
            </Text>
          </VStack>

          <Box
            borderRadius="xl"
            borderWidth="1px"
            borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}
            bg={{ base: 'white', _dark: 'rgba(17, 17, 24, 0.7)' }}
            backdropFilter="blur(12px)"
            p={{ base: 6, md: 10 }}
          >
            <VStack gap={8} align="stretch">
              <Section title="Acceptance of Terms">
                <Text>
                  By accessing and using the Zyphon Systems website and services, you accept and
                  agree to be bound by these Terms of Service. If you do not agree to these terms,
                  please do not use our services.
                </Text>
              </Section>

              <Section title="General Use">
                <Text>
                  This website is provided for informational purposes and to facilitate
                  communication regarding potential projects. You agree to use this website only for
                  lawful purposes and in a way that does not infringe upon or restrict the use of
                  this website by others.
                </Text>
                <VStack align="stretch" gap={2} mt={3}>
                  <BulletPoint>
                    You must not use this website to transmit any harmful, offensive, or illegal
                    content
                  </BulletPoint>
                  <BulletPoint>
                    You must not attempt to gain unauthorized access to any part of the website or
                    its systems
                  </BulletPoint>
                  <BulletPoint>
                    You must not use automated tools to scrape or extract data from this website
                  </BulletPoint>
                </VStack>
              </Section>

              <Section title="Inquiry Terms">
                <Text>
                  When you submit an inquiry through our contact form:
                </Text>
                <VStack align="stretch" gap={2} mt={3}>
                  <BulletPoint>
                    You agree to provide accurate and complete information
                  </BulletPoint>
                  <BulletPoint>
                    You understand that submitting an inquiry does not create a contractual
                    obligation on either party
                  </BulletPoint>
                  <BulletPoint>
                    You consent to us contacting you regarding your inquiry using the information
                    provided
                  </BulletPoint>
                  <BulletPoint>
                    You acknowledge that all information shared may be used to assess project
                    requirements and provide a response
                  </BulletPoint>
                </VStack>
              </Section>

              <Section title="Intellectual Property">
                <Text>
                  All content on this website, including but not limited to text, graphics, logos,
                  images, and software, is the property of Zyphon Systems and is protected by
                  intellectual property laws.
                </Text>
                <VStack align="stretch" gap={2} mt={3}>
                  <BulletPoint>
                    You may not reproduce, distribute, or create derivative works from any content
                    without explicit permission
                  </BulletPoint>
                  <BulletPoint>
                    The Zyphon Systems name and logo are trademarks of Zyphon Systems
                  </BulletPoint>
                  <BulletPoint>
                    Any materials you submit become subject to our review and may be referenced in
                    future communications
                  </BulletPoint>
                </VStack>
              </Section>

              <Section title="Proposals and Estimates">
                <Text>
                  Any proposals, estimates, or quotes provided by Zyphon Systems:
                </Text>
                <VStack align="stretch" gap={2} mt={3}>
                  <BulletPoint>
                    Are provided for informational purposes based on initial discussions
                  </BulletPoint>
                  <BulletPoint>
                    Are not binding until a formal agreement is signed by both parties
                  </BulletPoint>
                  <BulletPoint>
                    May be subject to change based on detailed requirements analysis
                  </BulletPoint>
                  <BulletPoint>
                    Are valid for the period specified in the proposal (typically 30 days)
                  </BulletPoint>
                </VStack>
              </Section>

              <Section title="No Guarantee Before Agreement">
                <Text>
                  Until a formal project agreement is signed:
                </Text>
                <VStack align="stretch" gap={2} mt={3}>
                  <BulletPoint>
                    Zyphon Systems is not obligated to commence any work
                  </BulletPoint>
                  <BulletPoint>
                    Project timelines, deliverables, and pricing are subject to negotiation
                  </BulletPoint>
                  <BulletPoint>
                    Either party may terminate discussions without liability
                  </BulletPoint>
                  <BulletPoint>
                    Confidential information shared during discussions should be treated
                    appropriately by both parties
                  </BulletPoint>
                </VStack>
              </Section>

              <Section title="Limitation of Liability">
                <Text>
                  To the fullest extent permitted by law:
                </Text>
                <VStack align="stretch" gap={2} mt={3}>
                  <BulletPoint>
                    Zyphon Systems shall not be liable for any indirect, incidental, or
                    consequential damages arising from use of this website
                  </BulletPoint>
                  <BulletPoint>
                    We make no warranties regarding the accuracy, completeness, or reliability of
                    any information on this website
                  </BulletPoint>
                  <BulletPoint>
                    We are not responsible for any third-party websites linked from this site
                  </BulletPoint>
                  <BulletPoint>
                    Our total liability shall not exceed the amount paid (if any) for the services
                    in question
                  </BulletPoint>
                </VStack>
              </Section>

              <Section title="Governing Law">
                <Text>
                  These Terms of Service shall be governed by and construed in accordance with the
                  laws of England and Wales, without regard to its conflict of law provisions.
                </Text>
              </Section>

              <Section title="Changes to Terms">
                <Text>
                  We reserve the right to modify these terms at any time. Changes will be effective
                  immediately upon posting to this website. Your continued use of the website
                  following any changes constitutes acceptance of those changes.
                </Text>
              </Section>

              <Section title="Customer Portal">
                <Text>
                  By registering for the Zyphon Systems Customer Portal, you agree to:
                </Text>
                <VStack align="stretch" gap={2} mt={3}>
                  <BulletPoint>
                    Provide accurate and up-to-date information during registration
                  </BulletPoint>
                  <BulletPoint>
                    Keep your login credentials secure and not share them with third parties
                  </BulletPoint>
                  <BulletPoint>
                    Accept responsibility for all activity that occurs under your account
                  </BulletPoint>
                  <BulletPoint>
                    Notify us immediately of any unauthorized access to your account
                  </BulletPoint>
                </VStack>
                <Text mt={3}>
                  We reserve the right to suspend or terminate portal accounts that violate these
                  terms or are inactive for an extended period.
                </Text>
              </Section>

              <Section title="Cookie Policy">
                <Text>
                  Our website uses essential cookies to provide core functionality. By continuing
                  to use our website after accepting the cookie consent banner, you agree to our use
                  of cookies as described in our Privacy Policy.
                </Text>
              </Section>

              <Section title="Contact Information">
                <Text>
                  If you have any questions about these Terms of Service, please contact us at:
                </Text>
                <Box mt={3}>
                  <Text fontWeight="medium">Zyphon Systems</Text>
                  <Text color={{ base: 'gray.600', _dark: 'gray.400' }}>
                    Email: legal@zyphonsystems.com
                  </Text>
                </Box>
              </Section>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <VStack align="stretch" gap={3}>
      <Heading
        as="h2"
        fontSize={{ base: 'lg', md: 'xl' }}
        fontWeight="semibold"
        color={{ base: 'gray.900', _dark: 'white' }}
      >
        {title}
      </Heading>
      <Box color={{ base: 'gray.600', _dark: 'gray.400' }} lineHeight="relaxed">
        {children}
      </Box>
    </VStack>
  );
}

function BulletPoint({ children }: { children: React.ReactNode }) {
  return (
    <Box display="flex" gap={3} alignItems="flex-start">
      <Box
        w={1.5}
        h={1.5}
        borderRadius="full"
        bg="primary.500"
        mt={2.5}
        flexShrink={0}
      />
      <Text>{children}</Text>
    </Box>
  );
}
