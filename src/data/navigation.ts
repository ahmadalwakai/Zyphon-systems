import type { NavItem } from '@/types';

export const mainNavigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Process', href: '/process' },
  { label: 'Projects', href: '/projects' },
  { label: 'Insights', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export const footerNavigation = {
  pages: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Process', href: '/process' },
    { label: 'Projects', href: '/projects' },
    { label: 'Insights', href: '/blog' },
    { label: 'Contact', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
  ],
  resources: [
    { label: 'Company Profile (PDF)', href: '/api/profile' },
    { label: 'Book a Meeting', href: '/book' },
    { label: 'Customer Portal', href: '/portal/login' },
  ],
  services: [
    { label: 'Mobile App Development', href: '/services#mobile-apps' },
    { label: 'Admin Panel Development', href: '/services#admin-panels' },
    { label: 'Backend Development', href: '/services#backend' },
    { label: 'Full Platform Development', href: '/services#full-platform' },
    { label: 'Product Discovery', href: '/services#discovery' },
    { label: 'View Solutions', href: '/solutions' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

export const adminNavigation: NavItem[] = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Inquiries', href: '/admin/inquiries' },
  { label: 'Bookings', href: '/admin/bookings' },
  { label: 'Projects', href: '/admin/projects' },
  { label: 'Posts', href: '/admin/posts' },
  { label: 'Compose', href: '/admin/compose' },
  { label: 'Activity', href: '/admin/activity' },
  { label: 'Settings', href: '/admin/settings' },
];
