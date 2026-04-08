import type { ResumeScore, ResumeSuggestion } from '@/shared/types';

export interface PolishRequest {
  text: string;
  language: 'ko' | 'en';
  jobDescription?: string;
}

export interface PolishResult {
  originalText: string;
  polishedText: string;
  score: ResumeScore;
  suggestions: ResumeSuggestion[];
}

export interface JdMatchResult {
  matchScore: number;
  missingKeywords: string[];
  suggestions: string[];
}
