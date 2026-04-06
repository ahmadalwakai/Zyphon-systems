import type { NavItem } from '@/types';

export const mainNavigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Process', href: '/process' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
];

export const footerNavigation = {
  main: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Process', href: '/process' },
    { label: 'Projects', href: '/projects' },
    { label: 'Contact', href: '/contact' },
  ],
  services: [
    { label: 'Mobile App Development', href: '/services#mobile-apps' },
    { label: 'Admin Panel Development', href: '/services#admin-panels' },
    { label: 'Backend Development', href: '/services#backend' },
    { label: 'Full Platform Development', href: '/services#full-platform' },
    { label: 'Product Discovery', href: '/services#discovery' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

export const adminNavigation: NavItem[] = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Inquiries', href: '/admin/inquiries' },
  { label: 'Projects', href: '/admin/projects' },
  { label: 'Settings', href: '/admin/settings' },
];
