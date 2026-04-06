import type { Service } from '@/types';

export const services: Service[] = [
  {
    id: 'mobile-apps',
    title: 'Mobile App Development',
    description: 'Modern mobile applications for booking, account management, service access, notifications, and customer engagement. We build native-quality apps using cross-platform technologies for iOS and Android.',
    icon: 'Smartphone',
    includedItems: [
      'iOS and Android applications',
      'User authentication and account management',
      'Push notifications',
      'Booking and scheduling features',
      'Payment integration',
      'Offline capabilities',
      'Real-time updates',
      'App Store and Play Store submission',
    ],
  },
  {
    id: 'admin-panels',
    title: 'Admin Panel Development',
    description: 'Clear and structured admin systems for managing operations, users, content, bookings, pricing, workflows, and reporting. Designed for efficiency and ease of use by your team.',
    icon: 'LayoutDashboard',
    includedItems: [
      'Dashboard with key metrics',
      'User management',
      'Content management',
      'Booking and order management',
      'Pricing and inventory control',
      'Reporting and analytics',
      'Role-based access control',
      'Activity logging',
    ],
  },
  {
    id: 'backend',
    title: 'Backend & API Development',
    description: 'Reliable backend architecture, business logic, secure APIs, database systems, and scalable technical foundations that power your applications.',
    icon: 'Server',
    includedItems: [
      'RESTful API design and development',
      'Database architecture and optimization',
      'Authentication and authorization',
      'Third-party integrations',
      'Payment processing',
      'File storage and CDN',
      'Email and notification systems',
      'Caching and performance optimization',
    ],
  },
  {
    id: 'full-platform',
    title: 'Full Platform Development',
    description: 'End-to-end product development covering the customer-facing experience, internal admin systems, workflows, and platform core. Complete digital solutions from concept to launch.',
    icon: 'Layers',
    includedItems: [
      'Customer mobile app',
      'Admin dashboard',
      'Backend infrastructure',
      'API development',
      'Database design',
      'User experience design',
      'Testing and QA',
      'Deployment and hosting setup',
      'Documentation',
      'Post-launch support',
    ],
  },
  {
    id: 'discovery',
    title: 'Product Discovery',
    description: 'Strategic planning sessions to understand your business, define product scope, map workflows, and create a clear technical roadmap before development begins.',
    icon: 'Compass',
    includedItems: [
      'Business requirements analysis',
      'User journey mapping',
      'Feature prioritization',
      'Technical architecture planning',
      'Scope definition',
      'Timeline and milestone planning',
      'Budget estimation',
      'Risk assessment',
    ],
  },
];

export const projectTypes = [
  'Mobile App',
  'Admin Panel',
  'Backend System',
  'Full Platform',
  'Product Discovery',
  'Other',
];

export const budgetRanges = [
  'Under £5,000',
  '£5,000–£15,000',
  '£15,000–£30,000',
  '£30,000–£50,000',
  '£50,000+',
];
