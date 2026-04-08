import { describe, it, expect } from 'vitest';
import { getSectionDefaults } from '@/features/portfolio-editor/lib/section-defaults';

describe('getSectionDefaults', () => {
  it('hero 기본값', () => {
    const defaults = getSectionDefaults('hero');
    expect(defaults).toHaveProperty('name', '');
    expect(defaults).toHaveProperty('title', '');
    expect(defaults).toHaveProperty('subtitle', '');
    expect(defaults).toHaveProperty('avatarUrl', null);
  });

  it('about 기본값', () => {
    const defaults = getSectionDefaults('about');
    expect(defaults).toHaveProperty('bio', '');
    expect(defaults).toHaveProperty('highlights');
    expect(Array.isArray(defaults.highlights)).toBe(true);
  });

  it('skills 기본값 — 빈 categories', () => {
    const defaults = getSectionDefaults('skills');
    expect(defaults.categories).toEqual([]);
  });

  it('experience 기본값 — 빈 items', () => {
    const defaults = getSectionDefaults('experience');
    expect(defaults.items).toEqual([]);
  });

  it('education 기본값 — 빈 items', () => {
    const defaults = getSectionDefaults('education');
    expect(defaults.items).toEqual([]);
  });

  it('contact 기본값', () => {
    const defaults = getSectionDefaults('contact');
    expect(defaults.email).toBe('');
    expect(defaults.github).toBe('');
    expect(defaults.linkedin).toBe('');
    expect(defaults.website).toBe('');
  });

  it('custom 기본값', () => {
    const defaults = getSectionDefaults('custom');
    expect(defaults.title).toBe('');
    expect(defaults.content).toBe('');
  });

  it('projects 기본값 — 빈 projectIds', () => {
    const defaults = getSectionDefaults('projects');
    expect(defaults.projectIds).toEqual([]);
  });
});
