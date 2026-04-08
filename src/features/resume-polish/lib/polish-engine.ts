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

interface ParsedSection {
  title: string;
  content: string[];
}

const SECTION_KEYWORDS: Record<string, string[]> = {
  '자기소개': ['자기소개', '소개', 'about', 'summary', 'introduction', '자기 소개'],
  '경력': ['경력', '경험', 'experience', 'work', '직무', '이력', '근무', '회사', '재직', '정규직', '계약직'],
  '프로젝트': ['프로젝트', 'project', '사이드', '토이', '포트폴리오'],
  '기술 스택': ['기술', 'skill', 'tech', 'stack', '스택', '사용 기술', '보유 기술', '역량'],
  '학력': ['학력', 'education', '대학', '학교', '졸업', '학과', '학사', '석사', '박사'],
  '자격증': ['자격', 'certification', '수료', '이수', '자격증', 'license'],
  '활동': ['활동', '수상', 'award', '봉사', '커뮤니티', '기여', '오픈소스'],
};

function detectSection(line: string): string | null {
  const lower = line.toLowerCase().replace(/[#\-*_|[\]]/g, '').trim();
  if (lower.length < 1 || lower.length > 30) return null;

  for (const [section, keywords] of Object.entries(SECTION_KEYWORDS)) {
    if (keywords.some(kw => lower.includes(kw.toLowerCase()))) {
      return section;
    }
  }
  return null;
}

function isCompanyLine(line: string): boolean {
  return /\d{4}[\.\-\/]/.test(line) || /현재/.test(line) || /~\s*(현재|present)/i.test(line);
}

function parseResumeSections(text: string): ParsedSection[] {
  const lines = text.split('\n');
  const sections: ParsedSection[] = [];
  let currentSection: ParsedSection = { title: '자기소개', content: [] };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (currentSection.content.length > 0) {
        currentSection.content.push('');
      }
      continue;
    }

    const detectedSection = detectSection(trimmed);
    if (detectedSection && currentSection.content.filter(c => c.trim()).length > 0) {
      sections.push(currentSection);
      currentSection = { title: detectedSection, content: [] };
      continue;
    } else if (detectedSection && currentSection.content.length === 0) {
      currentSection.title = detectedSection;
      continue;
    }

    currentSection.content.push(trimmed);
  }

  if (currentSection.content.filter(c => c.trim()).length > 0) {
    sections.push(currentSection);
  }

  return sections;
}

function formatSection(section: ParsedSection): string {
  const lines: string[] = [`## ${section.title}`, ''];

  for (const line of section.content) {
    if (!line.trim()) {
      lines.push('');
      continue;
    }

    if (isCompanyLine(line)) {
      lines.push(`### ${polishLine(line)}`);
    } else if (line.startsWith('-') || line.startsWith('•') || line.startsWith('·')) {
      lines.push(polishLine(line));
    } else if (section.title === '기술 스택') {
      lines.push(`- ${line}`);
    } else {
      const polished = polishLine(line);
      if (section.title === '경력' || section.title === '프로젝트') {
        lines.push(`- ${polished}`);
      } else {
        lines.push(polished);
      }
    }
  }

  return lines.join('\n');
}

export function generatePolishedText(original: string): string {
  const trimmed = original.trim();
  if (!trimmed) return '';

  // 이미 마크다운 구조가 있으면 줄 단위 폴리싱만
  if (/^##\s/m.test(trimmed)) {
    return trimmed
      .split('\n')
      .map(line => polishLine(line))
      .join('\n');
  }

  // 구조 없는 텍스트 → 섹션 파싱 후 템플릿 포맷으로 재구성
  const sections = parseResumeSections(trimmed);

  if (sections.length === 0) {
    return trimmed.split('\n').map(line => polishLine(line)).join('\n');
  }

  // 섹션이 1개뿐이고 내용이 긴 경우 → 줄 기반으로 섹션 추론
  if (sections.length === 1 && sections[0].content.length > 5) {
    const content = sections[0].content;
    const autoSections: ParsedSection[] = [];
    let current: ParsedSection = { title: '자기소개', content: [] };

    for (const line of content) {
      if (!line.trim()) {
        if (current.content.filter(c => c.trim()).length > 0) {
          current.content.push('');
        }
        continue;
      }

      if (isCompanyLine(line)) {
        if (current.content.filter(c => c.trim()).length > 0) {
          autoSections.push(current);
        }
        current = { title: '경력', content: [line] };
      } else if (/^(React|Vue|Angular|Node|Python|Java|Go|TypeScript|JavaScript|Docker|AWS|Spring|Next)/i.test(line)) {
        if (current.title !== '기술 스택') {
          if (current.content.filter(c => c.trim()).length > 0) {
            autoSections.push(current);
          }
          current = { title: '기술 스택', content: [line] };
        } else {
          current.content.push(line);
        }
      } else {
        current.content.push(line);
      }
    }
    if (current.content.filter(c => c.trim()).length > 0) {
      autoSections.push(current);
    }

    if (autoSections.length > 1) {
      return autoSections.map(formatSection).join('\n\n');
    }
  }

  return sections.map(formatSection).join('\n\n');
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
