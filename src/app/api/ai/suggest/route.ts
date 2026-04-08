import { type NextRequest, NextResponse } from 'next/server';

interface Suggestion {
  section: string;
  original: string;
  improved: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
}

const SECTION_SUGGESTIONS: Record<string, Suggestion[]> = {
  experience: [
    {
      section: 'experience',
      original: '프론트엔드 개발 담당',
      improved: 'React/TypeScript 기반 SPA 개발 주도, 번들 사이즈 35% 감소 달성',
      reason: '역할을 구체적인 기술과 성과 수치로 표현하면 채용 담당자의 관심을 끕니다.',
      priority: 'high',
    },
    {
      section: 'experience',
      original: '팀원들과 협업',
      improved: '10명 규모 애자일 팀에서 프론트엔드 리드, 코드 리뷰 문화 정착',
      reason: '팀 규모와 구체적인 기여를 명시하면 실질적인 경험을 전달할 수 있습니다.',
      priority: 'medium',
    },
  ],
  skills: [
    {
      section: 'skills',
      original: 'React, JavaScript',
      improved: 'React 18, TypeScript 5, Next.js 16, Zustand, TailwindCSS',
      reason: '버전과 관련 기술 스택을 구체적으로 나열하면 기술 수준을 명확히 전달합니다.',
      priority: 'medium',
    },
  ],
  summary: [
    {
      section: 'summary',
      original: '열정적인 개발자입니다.',
      improved: '5년차 프론트엔드 엔지니어로, 사용자 경험을 중심에 두고 확장 가능한 웹 애플리케이션을 설계·개발합니다.',
      reason: '추상적 표현 대신 경력 연차와 전문성을 구체적으로 표현하세요.',
      priority: 'high',
    },
  ],
};

export async function POST(request: NextRequest) {
  const body = await request.json() as { section: string; text: string };
  const { section } = body;

  const suggestions: Suggestion[] =
    SECTION_SUGGESTIONS[section] ?? SECTION_SUGGESTIONS['experience'];

  return NextResponse.json({ suggestions });
}
