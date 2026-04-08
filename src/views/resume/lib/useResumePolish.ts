'use client';

import { useState } from 'react';
import type { ResumeScore, ResumeSuggestion } from '@/shared/types';
import { generatePolishedText, calculateScore, generateSuggestions, matchJd } from '@/features/resume-polish/lib/polish-engine';

interface JdMatchResult {
  matchScore: number;
  missingKeywords: string[];
  matchedKeywords: string[];
  suggestions: string[];
}

interface PolishResult {
  polished: string;
  score: ResumeScore;
  suggestions: ResumeSuggestion[];
}

interface UseResumePolishResult {
  isPolishing: boolean;
  result: PolishResult | null;
  handlePolish: (text: string, onDone: () => void) => Promise<void>;
  isMatching: boolean;
  matchResult: JdMatchResult | null;
  handleMatch: (text: string, jdText: string) => Promise<void>;
  copied: boolean;
  handleCopy: () => void;
  exportOpen: boolean;
  setExportOpen: (open: boolean) => void;
}

export function useResumePolish(): UseResumePolishResult {
  const [isPolishing, setIsPolishing] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [result, setResult] = useState<PolishResult | null>(null);
  const [matchResult, setMatchResult] = useState<JdMatchResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  const handlePolish = async (text: string, onDone: () => void) => {
    if (!text.trim()) return;
    setIsPolishing(true);
    await new Promise(r => setTimeout(r, 1500));
    setResult({
      polished: generatePolishedText(text),
      score: calculateScore(text),
      suggestions: generateSuggestions(text),
    });
    setIsPolishing(false);
    onDone();
  };

  const handleMatch = async (text: string, jdText: string) => {
    if (!jdText.trim() || !text.trim()) return;
    setIsMatching(true);
    setMatchResult(null);
    await new Promise(r => setTimeout(r, 1500));
    setMatchResult(matchJd(text, jdText));
    setIsMatching(false);
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result.polished);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return {
    isPolishing,
    result,
    handlePolish,
    isMatching,
    matchResult,
    handleMatch,
    copied,
    handleCopy,
    exportOpen,
    setExportOpen,
  };
}
