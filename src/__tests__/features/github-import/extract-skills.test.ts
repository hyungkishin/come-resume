import { describe, it, expect } from 'vitest';
import { extractSkills } from '@/features/github-import/lib/extract-skills';
import type { GitHubRepo } from '@/features/github-import/model/types';

const makeRepo = (overrides: Partial<GitHubRepo> = {}): GitHubRepo => ({
  id: 1,
  name: 'repo',
  fullName: 'user/repo',
  description: null,
  language: null,
  stars: 0,
  forks: 0,
  updatedAt: '',
  htmlUrl: '',
  homepage: null,
  topics: [],
  isPinned: false,
  ...overrides,
});

describe('extractSkills', () => {
  it('language 추출', () => {
    const repos = [
      makeRepo({ language: 'TypeScript' }),
      makeRepo({ language: 'Python' }),
    ];
    const skills = extractSkills(repos);

    expect(skills).toContain('TypeScript');
    expect(skills).toContain('Python');
  });

  it('topics 추출', () => {
    const repos = [makeRepo({ topics: ['react', 'nextjs'] })];
    const skills = extractSkills(repos);

    expect(skills).toContain('react');
    expect(skills).toContain('nextjs');
  });

  it('빈도순 정렬 (가장 많이 사용된 것이 먼저)', () => {
    const repos = [
      makeRepo({ language: 'TypeScript', topics: ['react'] }),
      makeRepo({ language: 'TypeScript', topics: ['vue'] }),
      makeRepo({ language: 'Python', topics: ['react'] }),
    ];
    const skills = extractSkills(repos);

    expect(skills[0]).toBe('TypeScript'); // 2회
    expect(skills[1]).toBe('react');      // 2회
  });

  it('중복 제거', () => {
    const repos = [
      makeRepo({ language: 'TypeScript' }),
      makeRepo({ language: 'TypeScript' }),
    ];
    const skills = extractSkills(repos);

    const tsCount = skills.filter(s => s === 'TypeScript').length;
    expect(tsCount).toBe(1);
  });

  it('빈 배열 입력 시 빈 배열 반환', () => {
    expect(extractSkills([])).toHaveLength(0);
  });

  it('language null이면 무시', () => {
    const repos = [makeRepo({ language: null, topics: ['docker'] })];
    const skills = extractSkills(repos);

    expect(skills).toEqual(['docker']);
  });
});
