import type { Project } from '@/types';

export const staticProjects: Project[] = [
  {
    id: 1,
    title: 'Hospitality Booking Platform',
    type: 'Mobile App + Admin Panel + Backend',
    description: 'A comprehensive booking platform for a hospitality business, featuring a customer-facing mobile app for reservations, an admin panel for managing bookings and availability, and a robust backend system handling payments and notifications.',
    outcome: 'Increased booking efficiency by 40% and reduced manual administrative work.',
    isVisible: true,
    displayOrder: 1,
  },
  {
    id: 2,
    title: 'Operational Admin Dashboard',
    type: 'Admin Panel + Backend',
    description: 'A centralized operations dashboard for a multi-location service business. Features include staff scheduling, inventory management, real-time reporting, and performance analytics across all branches.',
    outcome: 'Streamlined operations management and improved visibility across locations.',
    isVisible: true,
    displayOrder: 2,
  },
  {
    id: 3,
    title: 'Customer Booking Application',
    type: 'Mobile App + Backend',
    description: 'A sleek mobile application enabling customers to browse services, book appointments, manage their accounts, and receive notifications. Integrated with existing business systems.',
    outcome: 'Improved customer engagement and booking conversion rates.',
    isVisible: true,
    displayOrder: 3,
  },
  {
    id: 4,
    title: 'Multi-Branch Business Platform',
    type: 'Full Platform',
    description: 'Complete digital transformation for a growing business with multiple locations. Includes customer mobile app, comprehensive admin system, inventory management, staff tools, and enterprise-grade backend.',
    outcome: 'Unified operations across all branches with significant cost savings.',
    isVisible: true,
    displayOrder: 4,
  },
];
