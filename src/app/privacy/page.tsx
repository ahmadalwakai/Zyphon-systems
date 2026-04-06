import type { Metadata } from 'next';
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Zyphon Systems. Learn how we collect, use, and protect your data.',
};

export default function PrivacyPage() {
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
              Privacy Policy
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
              <Section title="Introduction">
                <Text>
                  Zyphon Systems (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your
                  privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard
                  your information when you visit our website or use our services.
                </Text>
              </Section>

              <Section title="Information We Collect">
                <Text>We may collect the following types of information:</Text>
                <VStack align="stretch" gap={2} mt={3}>
                  <BulletPoint>
                    <strong>Contact Information:</strong> Name, email address, phone number, and
                    company name when you submit an inquiry.
                  </BulletPoint>
                  <BulletPoint>
                    <strong>Project Information:</strong> Details about your project requirements,
                    budget, and timeline.
                  </BulletPoint>
                  <BulletPoint>
                    <strong>Usage Data:</strong> Information about how you interact with our website,
                    including pages visited and time spent.
                  </BulletPoint>
                  <BulletPoint>
                    <strong>Device Information:</strong> Browser type, IP address, and device type
                    for analytics purposes.
                  </BulletPoint>
                </VStack>
              </Section>

              <Section title="How We Use Your Information">
                <Text>We use the information we collect to:</Text>
                <VStack align="stretch" gap={2} mt={3}>
                  <BulletPoint>Respond to your inquiries and communicate with you</BulletPoint>
                  <BulletPoint>Provide and improve our services</BulletPoint>
                  <BulletPoint>Send relevant updates about our services (with your consent)</BulletPoint>
                  <BulletPoint>Analyze website usage to improve user experience</BulletPoint>
                  <BulletPoint>Comply with legal obligations</BulletPoint>
                </VStack>
              </Section>

              <Section title="Communication">
                <Text>
                  When you submit an inquiry through our contact form, you agree to receive
                  communications from us regarding your inquiry. You may opt out of marketing
                  communications at any time by contacting us directly.
                </Text>
              </Section>

              <Section title="Data Protection">
                <Text>
                  We implement appropriate technical and organizational measures to protect your
                  personal information against unauthorized access, alteration, disclosure, or
                  destruction. This includes encryption, secure servers, and access controls.
                </Text>
              </Section>

              <Section title="Third-Party Services">
                <Text>
                  We may use third-party services for analytics, hosting, and communication. These
                  services have their own privacy policies and may collect information as described
                  in their respective policies. We currently use:
                </Text>
                <VStack align="stretch" gap={2} mt={3}>
                  <BulletPoint>Vercel for website hosting</BulletPoint>
                  <BulletPoint>Neon for database services</BulletPoint>
                  <BulletPoint>Analytics tools for website performance monitoring</BulletPoint>
                </VStack>
              </Section>

              <Section title="Data Retention">
                <Text>
                  We retain your personal information only for as long as necessary to fulfill the
                  purposes outlined in this policy, unless a longer retention period is required by
                  law. Inquiry data is typically retained for up to 3 years after our last
                  communication.
                </Text>
              </Section>

              <Section title="Your Rights">
                <Text>You have the right to:</Text>
                <VStack align="stretch" gap={2} mt={3}>
                  <BulletPoint>Access the personal information we hold about you</BulletPoint>
                  <BulletPoint>Request correction of inaccurate information</BulletPoint>
                  <BulletPoint>Request deletion of your information</BulletPoint>
                  <BulletPoint>Object to processing of your information</BulletPoint>
                  <BulletPoint>Request data portability</BulletPoint>
                </VStack>
              </Section>

              <Section title="GDPR Compliance">
                <Text>
                  If you are located in the European Economic Area (EEA) or the United Kingdom,
                  you have additional rights under the General Data Protection Regulation (GDPR):
                </Text>
                <VStack align="stretch" gap={2} mt={3}>
                  <BulletPoint>
                    <strong>Right to Erasure:</strong> You can request deletion of your personal data
                    at any time by contacting us.
                  </BulletPoint>
                  <BulletPoint>
                    <strong>Right to Restrict Processing:</strong> You can ask us to limit the use
                    of your data.
                  </BulletPoint>
                  <BulletPoint>
                    <strong>Right to Data Portability:</strong> You can request a copy of your data
                    in a machine-readable format.
                  </BulletPoint>
                  <BulletPoint>
                    <strong>Right to Withdraw Consent:</strong> Where processing is based on consent,
                    you may withdraw it at any time.
                  </BulletPoint>
                  <BulletPoint>
                    <strong>Right to Lodge a Complaint:</strong> You can file a complaint with the
                    Information Commissioner&apos;s Office (ICO) or your local supervisory authority.
                  </BulletPoint>
                </VStack>
              </Section>

              <Section title="Cookies">
                <Text>
                  Our website uses essential cookies to ensure proper functionality. We display a
                  cookie consent banner on first visit, allowing you to accept the use of cookies.
                  Essential cookies do not track personal information and are required for the
                  website to function correctly.
                </Text>
                <VStack align="stretch" gap={2} mt={3}>
                  <BulletPoint>
                    <strong>Essential Cookies:</strong> Required for site functionality (e.g.,
                    session management, security tokens).
                  </BulletPoint>
                  <BulletPoint>
                    <strong>Preference Cookies:</strong> Store your cookie consent preference
                    (zyphon_cookie_consent).
                  </BulletPoint>
                </VStack>
              </Section>

              <Section title="Customer Portal">
                <Text>
                  When you register for our Customer Portal, we collect and store additional
                  information including your full name, email address, company name, and hashed
                  password. Your password is stored using industry-standard PBKDF2 hashing with
                  100,000 iterations and is never stored in plain text. You can update your profile
                  information and change your password through the portal at any time.
                </Text>
              </Section>

              <Section title="Contact Us">
                <Text>
                  If you have any questions about this Privacy Policy or wish to exercise your
                  rights, please contact us at:
                </Text>
                <Box mt={3}>
                  <Text fontWeight="medium">Zyphon Systems</Text>
                  <Text color={{ base: 'gray.600', _dark: 'gray.400' }}>
                    Email: privacy@zyphon.systems
                  </Text>
                </Box>
              </Section>

              <Section title="Changes to This Policy">
                <Text>
                  We may update this Privacy Policy from time to time. We will notify you of any
                  changes by posting the new policy on this page and updating the &quot;Last
                  updated&quot; date.
                </Text>
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
