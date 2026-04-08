import { type NextRequest, NextResponse } from 'next/server';

const INTRO_TEXTS = [
  '안녕하세요. 5년차 프론트엔드 엔지니어 신형기입니다. React와 TypeScript를 중심으로 사용자 중심의 웹 애플리케이션을 개발해왔으며, 성능 최적화와 개발자 경험 향상에 깊은 관심을 갖고 있습니다. 복잡한 문제를 단순하고 우아하게 해결하는 것을 즐기며, 팀과 함께 성장하는 것을 중요하게 여깁니다.',
  '프론트엔드 개발자로서 사용자가 매일 사용하는 제품을 만드는 것에 보람을 느낍니다. Next.js와 TailwindCSS로 빠르고 아름다운 인터페이스를 구현하고, AI 도구를 활용해 개발 생산성을 높이는 데 관심이 많습니다.',
  '5년간 스타트업과 대기업에서 프론트엔드 개발을 담당하며, 사용자 경험을 핵심 가치로 두고 작업해왔습니다. 코드 품질과 팀 문화를 동시에 개선하는 데 관심이 많으며, 최근에는 AI를 활용한 개발자 도구 프로젝트를 진행하고 있습니다.',
];

const PROJECT_DESCS = [
  'Next.js 16과 Supabase를 기반으로 개발한 AI 포트폴리오 빌더입니다. GitHub API를 연동해 레포지토리 정보를 자동으로 가져오고, Claude API를 활용해 이력서 내용을 다듬어주는 기능을 구현했습니다. Vercel Edge Functions를 활용해 전 세계 사용자에게 빠른 응답을 제공합니다.',
  '사용자가 GitHub 계정을 연결하면 자동으로 포트폴리오 사이트를 생성해주는 서비스입니다. Framer Motion으로 부드러운 애니메이션을 구현했으며, Stripe를 연동해 프리미엄 템플릿 결제 기능을 추가했습니다.',
  'AI 기반 이력서 최적화 서비스로, 취업 공고와 이력서를 비교 분석해 맞춤형 개선 제안을 제공합니다. 실시간 편집 기능과 버전 관리를 지원하며, PDF 내보내기 기능도 구현되어 있습니다.',
];

export async function POST(request: NextRequest) {
  const body = await request.json() as { type: string; context?: string };
  const { type } = body;

  if (type === 'intro') {
    const [text, ...alternatives] = INTRO_TEXTS;
    return NextResponse.json({ text, alternatives });
  }

  if (type === 'project-desc') {
    const [text, ...alternatives] = PROJECT_DESCS;
    return NextResponse.json({ text, alternatives });
  }

  return NextResponse.json(
    { error: '지원하지 않는 생성 타입입니다.' },
    { status: 400 }
  );
}
