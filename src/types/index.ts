export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  image?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  description: string;
  image: string;
  logoImage?: string;
  screenshotImage?: string;
  tags: string[];
  year: number;
  hasDetailPage: boolean;
  results?: {
    metric: string;
    value: string;
  }[];
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  bio: string;
  linkedin?: string;
}

export interface Technology {
  id: string;
  name: string;
  category: string;
  icon: string;
  level: 'expert' | 'advanced' | 'intermediate';
}

export interface NavigationItem {
  label: string;
  href: string;
  submenu?: NavigationItem[];
}

export interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  message: string;
  service?: string;
  budget?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  image: string;
  tags: string[];
  readTime: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  position: string;
  company: string;
  image?: string;
}

export type Language = 'es' | 'en' | 'ca';

export interface LocalizedContent {
  es: string;
  en: string;
  ca: string;
}
