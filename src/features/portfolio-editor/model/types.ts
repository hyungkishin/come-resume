import type { SectionType } from '@/shared/types';

export type { SectionType };

export interface HeroData {
  name: string;
  title: string;
  subtitle: string;
  avatarUrl: string | null;
}

export interface AboutData {
  bio: string;
  highlights: string[];
}

export interface ProjectsData {
  projectIds: string[];
}

export interface SkillsData {
  categories: { name: string; skills: string[] }[];
}

export interface ExperienceData {
  items: {
    company: string;
    role: string;
    period: string;
    description: string;
  }[];
}

export interface EducationData {
  items: {
    school: string;
    degree: string;
    period: string;
    description: string;
  }[];
}

export interface ContactData {
  email: string;
  github: string;
  linkedin: string;
  website: string;
}

export type SectionDataMap = {
  hero: HeroData;
  about: AboutData;
  projects: ProjectsData;
  skills: SkillsData;
  experience: ExperienceData;
  education: EducationData;
  contact: ContactData;
  custom: { title: string; content: string };
};
