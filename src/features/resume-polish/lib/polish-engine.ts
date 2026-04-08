import type { ResumeScore, ResumeSuggestion } from '@/shared/types';

export function polishLine(line: string): string {
  const trimmed = line.trim();

  if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('##')) return line;

  const bullet = trimmed.startsWith('-') || trimmed.startsWith('•');
  const content = bullet ? trimmed.slice(1).trim() : trimmed;
  const prefix = bullet ? '- ' : '';

  const transformations: [RegExp, string][] = [
    [/프론트엔드.*개발.*담당/, 'React/TypeScript 기반 프론트엔드 아키텍처를 설계하고 핵심 기능을 개발하여 사용자 경험 개선에 기여'],
    [/백엔드.*개발.*담당/, 'Node.js/Express 기반 RESTful API를 설계·구현'],
    [/웹.*개발/, '웹 애플리케이션 전체 개발 라이프사이클을 주도하여 프로젝트를 성공적으로 런칭'],
    [/유지.*보수/, '레거시 코드 리팩토링 및 테스트 커버리지 향상으로 배포 안정성 확보'],
    [/개발했습니다/, '설계·개발하여 핵심 비즈니스 지표 개선에 기여했습니다'],
    [/담당했습니다/, '주도적으로 리드하여 팀 생산성 향상에 기여했습니다'],
    [/만들었습니다/, '구축하여 서비스 안정성과 확장성을 확보했습니다'],
    [/했습니다$/, '하여 성과를 달성했습니다'],
    [/참여/, '핵심 역할을 수행'],
    [/다양한.*경험/, '폭넓은 기술 스택을 활용한 실무 경험'],
    [/열정적/, '목표 지향적이며 성과 중심의'],
    [/노력/, '체계적인 접근과 지속적 개선을 통해'],
    [/잘합니다/, '에 대한 깊은 이해와 실전 경험을 보유하고 있습니다'],
    [/관심이 많습니다/, '에 대한 실무 경험을 바탕으로 지속적으로 역량을 확장하고 있습니다'],
  ];

  let result = content;
  for (const [pattern, replacement] of transformations) {
    if (pattern.test(result)) {
      result = result.replace(pattern, replacement);
      break;
    }
  }

  return prefix + result;
}

export function generatePolishedText(original: string): string {
  return original
    .split('\n')
    .map(line => polishLine(line))
    .join('\n');
}

export function calculateScore(original: string): ResumeScore {
  const lines = original.split('\n').filter(l => l.trim());
  const hasNumbers = /\d+%|\d+건|\d+명/.test(original);
  const hasBullets = original.includes('-') || original.includes('•');
  const hasHeaders = /^#+\s/m.test(original) || /^##/m.test(original);
  const length = original.length;

  return {
    overall: Math.min(95, 55 + (hasNumbers ? 10 : 0) + (hasBullets ? 8 : 0) + (hasHeaders ? 7 : 0) + Math.min(20, Math.floor(length / 50))),
    impact: hasNumbers ? 78 : 58,
    clarity: hasBullets ? 82 : 65,
    keywords: Math.min(85, 50 + lines.length * 3),
    formatting: hasHeaders ? 88 : (hasBullets ? 75 : 55),
  };
}

export function generateSuggestions(original: string): ResumeSuggestion[] {
  const suggestions: ResumeSuggestion[] = [];
  const hasNumbers = /\d+%|\d+건|\d+명/.test(original);
  const hasBullets = original.includes('-') || original.includes('•');
  const hasHeaders = /^#+\s/m.test(original) || /^##/m.test(original);
  const isShort = original.trim().length < 200;

  if (!hasNumbers) {
    suggestions.push({
      section: '성과',
      original: '구체적인 수치가 없는 경력 설명',
      improved: 'React 기반 대시보드를 개발하여 페이지 로딩 속도 40% 개선, 사용자 이탈률 15% 감소',
      reason: '구체적 성과 수치를 추가하세요 (%, 건수, 명, 기간 등)',
      priority: 'high',
    });
  }

  if (!hasBullets) {
    suggestions.push({
      section: '구조',
      original: '단락 형태로 서술된 경력',
      improved: '- 주요 기능 개발 및 아키텍처 설계\n- 성능 최적화로 응답 시간 30% 단축\n- 팀 코드 리뷰 문화 도입',
      reason: '불릿 포인트로 구조화하면 채용 담당자가 빠르게 파악할 수 있습니다',
      priority: 'high',
    });
  }

  if (!hasHeaders) {
    suggestions.push({
      section: '포맷',
      original: '섹션 구분 없이 작성된 이력서',
      improved: '## 경력\n### 회사명 | 직책 (기간)\n\n## 프로젝트\n## 기술 스택',
      reason: '섹션을 명확히 구분하세요 (경력, 프로젝트, 기술 스택, 교육)',
      priority: 'medium',
    });
  }

  if (isShort) {
    suggestions.push({
      section: '내용',
      original: '내용이 부족한 이력서',
      improved: '각 경력 항목에 담당 업무, 사용 기술, 측정 가능한 성과를 3-5개 항목으로 작성하세요',
      reason: '각 경력에 3-5개의 성과를 추가하세요',
      priority: 'medium',
    });
  }

  if (suggestions.length === 0) {
    suggestions.push({
      section: '전반',
      original: '현재 이력서',
      improved: 'STAR 포맷(상황-과제-행동-결과)을 적용하면 더욱 설득력 있는 이력서가 됩니다',
      reason: 'STAR 포맷으로 각 경험을 재구성하면 면접관에게 강한 인상을 남길 수 있습니다',
      priority: 'low',
    });
  }

  return suggestions;
}

const TECH_KEYWORDS = [
  'React', 'TypeScript', 'JavaScript', 'Python', 'Java', 'Go', 'Rust',
  'Node.js', 'Next.js', 'Vue', 'Angular', 'Docker', 'Kubernetes',
  'AWS', 'GCP', 'Azure', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis',
  'GraphQL', 'REST', 'CI/CD', 'Git', 'Agile', 'Scrum', 'Figma',
  'Tailwind', 'CSS', 'HTML', 'Spring', 'Django', 'Flask', 'Express',
  'Prisma', 'Supabase', 'Firebase', 'Vercel', 'Linux', 'Terraform',
];

export function matchJd(resumeText: string, jdText: string): {
  matchScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
} {
  const resumeLower = resumeText.toLowerCase();
  const jdLower = jdText.toLowerCase();

  const jdKeywords = TECH_KEYWORDS.filter(kw => jdLower.includes(kw.toLowerCase()));

  if (jdKeywords.length === 0) {
    return { matchScore: 0, matchedKeywords: [], missingKeywords: [], suggestions: ['JD에서 기술 키워드를 찾을 수 없습니다'] };
  }

  const matched = jdKeywords.filter(kw => resumeLower.includes(kw.toLowerCase()));
  const missing = jdKeywords.filter(kw => !resumeLower.includes(kw.toLowerCase()));
  const score = Math.round((matched.length / jdKeywords.length) * 100);

  const suggestions = missing.slice(0, 5).map(kw => `${kw} 경험을 이력서에 추가하세요`);
  if (missing.length === 0) {
    suggestions.push('키워드 매칭이 우수합니다. STAR 포맷으로 각 경험을 구체화하세요.');
  }

  return { matchScore: score, matchedKeywords: matched, missingKeywords: missing, suggestions };
}
