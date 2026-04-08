import type { SECTION_TYPES } from '@/shared/config/constants';

export type SectionType = (typeof SECTION_TYPES)[number];

export interface User {
  id: string;
  email: string;
  username: string;
  githubId: string;
  githubUsername: string;
  githubAvatarUrl: string;
  plan: 'free' | 'pro' | 'lifetime';
  stripeCustomerId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Portfolio {
  id: string;
  userId: string;
  slug: string;
  title: string;
  sections: PortfolioSection[];
  theme: PortfolioTheme;
  customDomain: string | null;
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioSection {
  id: string;
  type: SectionType;
  order: number;
  data: Record<string, unknown>;
  isVisible: boolean;
}

export interface PortfolioTheme {
  templateId: string;
  primaryColor: string;
  fontFamily: string;
  darkMode: boolean;
  customCSS: string | null;
}

export interface Project {
  id: string;
  portfolioId: string;
  githubRepoId: number | null;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  imageUrl: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  stars: number;
  order: number;
}

export interface Resume {
  id: string;
  userId: string;
  originalText: string;
  polishedText: string;
  score: ResumeScore;
  suggestions: ResumeSuggestion[];
  templateId: string;
  createdAt: string;
}

export interface ResumeScore {
  overall: number;
  impact: number;
  clarity: number;
  keywords: number;
  formatting: number;
}

export interface ResumeSuggestion {
  section: string;
  original: string;
  improved: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
}
