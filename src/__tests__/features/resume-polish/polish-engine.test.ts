import { describe, it, expect } from 'vitest';
import {
  polishLine,
  generatePolishedText,
  calculateScore,
  generateSuggestions,
  matchJd,
} from '@/features/resume-polish/lib/polish-engine';

describe('polishLine', () => {
  it('빈 줄은 그대로 반환', () => {
    expect(polishLine('')).toBe('');
    expect(polishLine('   ')).toBe('   ');
  });

  it('헤더는 변환하지 않음', () => {
    expect(polishLine('## 경력')).toBe('## 경력');
    expect(polishLine('# 이력서')).toBe('# 이력서');
  });

  it('"담당했습니다" → "주도적으로 리드" 변환', () => {
    const result = polishLine('프로젝트를 담당했습니다');
    expect(result).toContain('주도적으로 리드');
  });

  it('"만들었습니다" → "구축하여" 변환', () => {
    const result = polishLine('쇼핑몰을 만들었습니다');
    expect(result).toContain('구축하여');
  });

  it('"프론트엔드 개발 담당" 패턴 변환', () => {
    const result = polishLine('프론트엔드 개발을 담당');
    expect(result).toContain('React/TypeScript');
  });

  it('불릿 포인트 유지', () => {
    const result = polishLine('- 프로젝트를 담당했습니다');
    expect(result.startsWith('- ')).toBe(true);
    expect(result).toContain('주도적으로 리드');
  });

  it('매칭 안 되면 원본 유지', () => {
    const original = 'Next.js와 TypeScript로 개발';
    expect(polishLine(original)).toBe(original);
  });

  it('가짜 수치를 삽입하지 않음', () => {
    const result = polishLine('- 프로젝트를 담당했습니다');
    expect(result).not.toMatch(/\d+%/);
    expect(result).not.toMatch(/\d+건/);
  });
});

describe('generatePolishedText', () => {
  it('여러 줄 변환', () => {
    const input = '## 경력\n- 프로젝트를 담당했습니다\n- 웹 개발';
    const result = generatePolishedText(input);
    const lines = result.split('\n');
    expect(lines[0]).toBe('## 경력');
    expect(lines[1]).toContain('주도적으로 리드');
    expect(lines[2]).toContain('웹 애플리케이션');
  });

  it('빈 텍스트 처리', () => {
    expect(generatePolishedText('')).toBe('');
  });
});

describe('calculateScore', () => {
  it('빈 이력서는 낮은 점수', () => {
    const score = calculateScore('짧은 텍스트');
    expect(score.overall).toBeLessThan(70);
    expect(score.impact).toBe(58);
    expect(score.clarity).toBe(65);
  });

  it('수치 포함 시 impact 높음', () => {
    const score = calculateScore('매출 30% 증가, 100건 처리, 50명 관리');
    expect(score.impact).toBe(78);
  });

  it('불릿 포함 시 clarity 높음', () => {
    const score = calculateScore('- 항목 1\n- 항목 2');
    expect(score.clarity).toBe(82);
  });

  it('헤더 포함 시 formatting 높음', () => {
    const score = calculateScore('## 경력\n내용');
    expect(score.formatting).toBe(88);
  });

  it('overall 최대 95 제한', () => {
    const longText = '## 경력\n' + '- 30% 개선\n'.repeat(100);
    const score = calculateScore(longText);
    expect(score.overall).toBeLessThanOrEqual(95);
  });

  it('모든 점수가 0-100 범위', () => {
    const score = calculateScore('## 경력\n- 매출 50% 증가\n- API 개발');
    expect(score.overall).toBeGreaterThanOrEqual(0);
    expect(score.overall).toBeLessThanOrEqual(100);
    expect(score.impact).toBeGreaterThanOrEqual(0);
    expect(score.clarity).toBeGreaterThanOrEqual(0);
    expect(score.keywords).toBeGreaterThanOrEqual(0);
    expect(score.formatting).toBeGreaterThanOrEqual(0);
  });
});

describe('generateSuggestions', () => {
  it('수치 없으면 "성과" 제안 포함', () => {
    const suggestions = generateSuggestions('프론트엔드 개발을 했습니다');
    expect(suggestions.some(s => s.section === '성과')).toBe(true);
  });

  it('불릿 없으면 "구조" 제안 포함', () => {
    const suggestions = generateSuggestions('프론트엔드 개발');
    expect(suggestions.some(s => s.section === '구조')).toBe(true);
  });

  it('헤더 없으면 "포맷" 제안 포함', () => {
    const suggestions = generateSuggestions('프론트엔드 개발');
    expect(suggestions.some(s => s.section === '포맷')).toBe(true);
  });

  it('짧으면 "내용" 제안 포함', () => {
    const suggestions = generateSuggestions('짧은 이력서');
    expect(suggestions.some(s => s.section === '내용')).toBe(true);
  });

  it('모든 조건 충족 시 "전반" 제안만', () => {
    const fullResume = '## 경력\n- 매출 30% 증가\n- 100건 처리\n' + '상세 내용 '.repeat(30);
    const suggestions = generateSuggestions(fullResume);
    expect(suggestions).toHaveLength(1);
    expect(suggestions[0].section).toBe('전반');
  });

  it('priority가 유효한 값', () => {
    const suggestions = generateSuggestions('테스트');
    suggestions.forEach(s => {
      expect(['high', 'medium', 'low']).toContain(s.priority);
    });
  });
});

describe('matchJd', () => {
  it('매칭 키워드 정확히 추출', () => {
    const resume = 'React와 TypeScript로 개발했습니다. Node.js 백엔드 경험';
    const jd = 'React, TypeScript, Node.js, Docker 경험 필수';
    const result = matchJd(resume, jd);

    expect(result.matchedKeywords).toContain('React');
    expect(result.matchedKeywords).toContain('TypeScript');
    expect(result.matchedKeywords).toContain('Node.js');
    expect(result.missingKeywords).toContain('Docker');
  });

  it('매칭 점수 정확히 계산', () => {
    const resume = 'React TypeScript';
    const jd = 'React TypeScript Docker Kubernetes';
    const result = matchJd(resume, jd);

    expect(result.matchScore).toBe(50); // 2/4 = 50%
  });

  it('대소문자 구분 없이 매칭', () => {
    const resume = 'react와 typescript로 개발';
    const jd = 'React, TypeScript 필수';
    const result = matchJd(resume, jd);

    expect(result.matchedKeywords).toContain('React');
    expect(result.matchedKeywords).toContain('TypeScript');
  });

  it('JD에 기술 키워드 없으면 0점', () => {
    const result = matchJd('이력서', '좋은 사람 구합니다');
    expect(result.matchScore).toBe(0);
  });

  it('모든 키워드 매칭 시 100점', () => {
    const resume = 'React TypeScript Next.js';
    const jd = 'React, TypeScript, Next.js 필수';
    const result = matchJd(resume, jd);

    expect(result.matchScore).toBe(100);
    expect(result.missingKeywords).toHaveLength(0);
  });

  it('누락 키워드에 대한 제안 생성', () => {
    const resume = 'React 개발';
    const jd = 'React, Docker, Kubernetes 경험';
    const result = matchJd(resume, jd);

    expect(result.suggestions.length).toBeGreaterThan(0);
    expect(result.suggestions.some(s => s.includes('Docker'))).toBe(true);
  });
});
