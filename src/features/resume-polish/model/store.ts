import { create } from 'zustand';
import type { ResumeScore, ResumeSuggestion } from '@/shared/types';
import type { JdMatchResult } from './types';

type ActiveTab = 'input' | 'result' | 'jd';

interface ResumePolishState {
  originalText: string;
  polishedText: string;
  score: ResumeScore | null;
  suggestions: ResumeSuggestion[];
  jobDescription: string;
  jdMatch: JdMatchResult | null;
  isPolishing: boolean;
  language: 'ko' | 'en';
  activeTab: ActiveTab;
  setOriginalText: (text: string) => void;
  setJobDescription: (jd: string) => void;
  setLanguage: (lang: 'ko' | 'en') => void;
  setActiveTab: (tab: ActiveTab) => void;
  polish: () => Promise<void>;
  matchJd: () => Promise<void>;
  reset: () => void;
}

const DUMMY_SCORE: ResumeScore = {
  overall: 78,
  impact: 72,
  clarity: 85,
  keywords: 68,
  formatting: 88,
};

const DUMMY_SUGGESTIONS: ResumeSuggestion[] = [
  {
    section: '경력 사항',
    original: '업무를 수행하였음',
    improved: '핵심 지표 30% 개선을 달성하며 프로젝트를 성공적으로 완료함',
    reason: '수치화된 성과를 명시하면 임팩트가 강해집니다.',
    priority: 'high',
  },
  {
    section: '기술 스택',
    original: 'React, JavaScript',
    improved: 'React 18, TypeScript, Next.js 16',
    reason: '버전 및 관련 기술을 구체적으로 기재하면 신뢰도가 높아집니다.',
    priority: 'medium',
  },
  {
    section: '자기소개',
    original: '열심히 일하겠습니다.',
    improved: '문제 해결 중심의 사고로 팀의 성과를 극대화하는 개발자입니다.',
    reason: '추상적인 표현 대신 구체적인 강점을 강조하세요.',
    priority: 'low',
  },
];

export const useResumePolishStore = create<ResumePolishState>((set, get) => ({
  originalText: '',
  polishedText: '',
  score: null,
  suggestions: [],
  jobDescription: '',
  jdMatch: null,
  isPolishing: false,
  language: 'ko',
  activeTab: 'input',

  setOriginalText: (text) => set({ originalText: text }),
  setJobDescription: (jd) => set({ jobDescription: jd }),
  setLanguage: (lang) => set({ language: lang }),
  setActiveTab: (tab) => set({ activeTab: tab }),

  polish: async () => {
    const { originalText } = get();
    if (!originalText.trim()) return;

    set({ isPolishing: true });

    await new Promise<void>((resolve) => setTimeout(resolve, 1500));

    set({
      isPolishing: false,
      polishedText: `${originalText}\n\n[AI 개선됨: 주요 성과 수치화 및 키워드 최적화 완료]`,
      score: DUMMY_SCORE,
      suggestions: DUMMY_SUGGESTIONS,
      activeTab: 'result',
    });
  },

  matchJd: async () => {
    set({ isPolishing: true });

    await new Promise<void>((resolve) => setTimeout(resolve, 1500));

    set({
      isPolishing: false,
      jdMatch: {
        matchScore: 73,
        missingKeywords: ['Kubernetes', 'CI/CD', 'Agile'],
        suggestions: [
          'CI/CD 파이프라인 구축 경험을 경력 사항에 추가하세요.',
          'Agile 방법론 기반의 스프린트 경험을 자기소개에 언급하세요.',
        ],
      },
    });
  },

  reset: () =>
    set({
      originalText: '',
      polishedText: '',
      score: null,
      suggestions: [],
      jobDescription: '',
      jdMatch: null,
      isPolishing: false,
      activeTab: 'input',
    }),
}));
