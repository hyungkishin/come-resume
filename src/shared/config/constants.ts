export const APP_NAME = 'Foliofy';
export const APP_DESCRIPTION = 'AI 포트폴리오 빌더 & 이력서 폴리셔';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const PLANS = {
  FREE: {
    name: 'Free',
    price: 0,
    polishLimit: 3,
    features: [
      '기본 템플릿 1종',
      'AI 이력서 폴리싱 3회/월',
      'foliofy.dev 서브도메인',
    ],
  },
  PRO: {
    name: 'Pro',
    price: 8,
    polishLimit: Infinity,
    features: [
      '전체 프리미엄 템플릿',
      'AI 이력서 무제한 폴리싱',
      '커스텀 도메인 연결',
      'PDF 이력서 익스포트',
      '워터마크 제거',
      '우선 지원',
    ],
  },
  LIFETIME: {
    name: 'Lifetime',
    price: 79,
    polishLimit: Infinity,
    features: ['Pro 플랜 영구 이용', '얼리버드 전용'],
  },
} as const;

export const SECTION_TYPES = [
  'hero',
  'about',
  'projects',
  'skills',
  'experience',
  'education',
  'contact',
  'custom',
] as const;
