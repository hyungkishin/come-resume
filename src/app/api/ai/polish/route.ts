import { type NextRequest, NextResponse } from 'next/server';

interface ResumeSuggestion {
  id: string;
  type: 'improvement' | 'warning' | 'tip';
  message: string;
  line?: number;
}

function randomScore(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function POST(request: NextRequest) {
  const body = await request.json() as { text: string; language?: string };
  const { text } = body;

  const overall = randomScore(70, 90);

  const polished = text
    .replace(/담당했습니다/g, '주도적으로 리드하여 팀 생산성 향상에 기여했습니다')
    .replace(/만들었습니다/g, '구축하여 서비스 안정성과 확장성을 확보했습니다')
    .replace(/개발했습니다/g, '설계·개발하여 핵심 비즈니스 지표 개선에 기여했습니다')
    .replace(/했습니다\.?$/gm, '하여 성과를 달성했습니다.')
    .replace(/\s{2,}/g, ' ')
    .trim();

  const suggestions: ResumeSuggestion[] = [
    {
      id: 's1',
      type: 'improvement',
      message: '수치와 성과를 구체적으로 표현하면 임팩트가 높아집니다. 예: "성능 개선" → "API 응답시간 40% 단축"',
    },
    {
      id: 's2',
      type: 'tip',
      message: '능동형 동사로 시작하면 더 인상적입니다. 예: "개발했습니다", "구현했습니다", "주도했습니다"',
    },
    {
      id: 's3',
      type: 'warning',
      message: '업무 기술에서 팀 협업 관련 내용이 부족합니다. 협업 경험을 추가해보세요.',
    },
  ];

  return NextResponse.json({
    polished,
    score: {
      overall,
      impact: randomScore(70, 90),
      clarity: randomScore(70, 90),
      keywords: randomScore(70, 90),
      formatting: randomScore(70, 90),
    },
    suggestions,
  });
}
