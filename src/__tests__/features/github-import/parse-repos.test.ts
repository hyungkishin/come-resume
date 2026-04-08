import { describe, it, expect } from 'vitest';
import { parsReposToProjects } from '@/features/github-import/lib/parse-repos';
import type { GitHubRepo } from '@/features/github-import/model/types';

const mockRepo: GitHubRepo = {
  id: 1,
  name: 'my-project',
  fullName: 'user/my-project',
  description: 'A cool project',
  language: 'TypeScript',
  stars: 42,
  forks: 5,
  updatedAt: '2026-01-01T00:00:00Z',
  htmlUrl: 'https://github.com/user/my-project',
  homepage: 'https://myproject.dev',
  topics: ['react', 'nextjs'],
  isPinned: true,
};

describe('parsReposToProjects', () => {
  it('레포를 프로젝트로 변환', () => {
    const projects = parsReposToProjects([mockRepo]);

    expect(projects).toHaveLength(1);
    expect(projects[0].title).toBe('my-project');
    expect(projects[0].description).toBe('A cool project');
    expect(projects[0].stars).toBe(42);
    expect(projects[0].githubUrl).toBe('https://github.com/user/my-project');
    expect(projects[0].liveUrl).toBe('https://myproject.dev');
  });

  it('language + topics → technologies 합침', () => {
    const projects = parsReposToProjects([mockRepo]);

    expect(projects[0].technologies).toContain('TypeScript');
    expect(projects[0].technologies).toContain('react');
    expect(projects[0].technologies).toContain('nextjs');
  });

  it('language 중복 방지', () => {
    const repo: GitHubRepo = {
      ...mockRepo,
      language: 'react',
      topics: ['react', 'nextjs'],
    };
    const projects = parsReposToProjects([repo]);

    const reactCount = projects[0].technologies.filter(t => t === 'react').length;
    expect(reactCount).toBe(1);
  });

  it('description null이면 빈 문자열', () => {
    const repo: GitHubRepo = { ...mockRepo, description: null };
    const projects = parsReposToProjects([repo]);

    expect(projects[0].description).toBe('');
  });

  it('빈 배열 입력 시 빈 배열 반환', () => {
    expect(parsReposToProjects([])).toHaveLength(0);
  });

  it('id를 문자열로 변환', () => {
    const projects = parsReposToProjects([mockRepo]);
    expect(typeof projects[0].id).toBe('string');
  });

  it('githubRepoId 유지', () => {
    const projects = parsReposToProjects([mockRepo]);
    expect(projects[0].githubRepoId).toBe(1);
  });
});
