import { describe, it, expect } from 'vitest';
import { PLANS, SECTION_TYPES } from '@/shared/config/constants';

describe('constants', () => {
  describe('PLANS', () => {
    it('Free 플랜 존재', () => {
      expect(PLANS.FREE.name).toBe('Free');
      expect(PLANS.FREE.price).toBe(0);
    });

    it('Pro 플랜 가격 $8', () => {
      expect(PLANS.PRO.price).toBe(8);
    });

    it('Lifetime 플랜 가격 $79', () => {
      expect(PLANS.LIFETIME.price).toBe(79);
    });

    it('Pro는 무제한 폴리싱', () => {
      expect(PLANS.PRO.polishLimit).toBe(Infinity);
    });

    it('Free는 3회 제한', () => {
      expect(PLANS.FREE.polishLimit).toBe(3);
    });

    it('모든 플랜에 features 배열 존재', () => {
      expect(PLANS.FREE.features.length).toBeGreaterThan(0);
      expect(PLANS.PRO.features.length).toBeGreaterThan(0);
      expect(PLANS.LIFETIME.features.length).toBeGreaterThan(0);
    });
  });

  describe('SECTION_TYPES', () => {
    it('8개 섹션 타입 존재', () => {
      expect(SECTION_TYPES).toHaveLength(8);
    });

    it('필수 섹션 타입 포함', () => {
      expect(SECTION_TYPES).toContain('hero');
      expect(SECTION_TYPES).toContain('about');
      expect(SECTION_TYPES).toContain('projects');
      expect(SECTION_TYPES).toContain('skills');
      expect(SECTION_TYPES).toContain('experience');
      expect(SECTION_TYPES).toContain('education');
      expect(SECTION_TYPES).toContain('contact');
      expect(SECTION_TYPES).toContain('custom');
    });
  });
});
