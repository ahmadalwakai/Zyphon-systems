// TypeScript interfaces for Zyphon Systems

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  includedItems: string[];
}

export interface Project {
  id: number;
  title: string;
  type: string;
  description: string;
  outcome?: string;
  isVisible: boolean;
  displayOrder: number;
  createdAt?: Date;
  slug?: string;
  challenge?: string;
  approach?: string;
  technologies?: string[];
  results?: string;
  testimonialQuote?: string;
  testimonialAuthor?: string;
}

export interface ProcessStep {
  id: number;
  number: string;
  title: string;
  description: string;
  deliverables?: string[];
}

export interface Inquiry {
  id: number;
  fullName: string;
  companyName?: string;
  email: string;
  phone?: string;
  projectType?: string;
  budget?: string;
  message: string;
  status: 'new' | 'reviewed' | 'responded';
  createdAt: Date;
}

export interface AdminUser {
  id: number;
  email: string;
  passwordHash: string;
  createdAt: Date;
}

export interface ContactFormData {
  fullName: string;
  companyName?: string;
  email: string;
  phone?: string;
  projectType: string;
  budget: string;
  message: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface SEOConfig {
  titleTemplate: string;
  defaultTitle: string;
  description: string;
  openGraph: {
    type: string;
    locale: string;
    siteName: string;
    images: { url: string; width: number; height: number; alt: string }[];
  };
}

export interface StatsData {
  totalInquiries: number;
  newInquiries: number;
  publishedProjects: number;
}
