import { describe, it, expect } from 'vitest';
import { MOCK_TEMPLATES } from '@/features/template-select/model/types';
import type { Template } from '@/entities/template';

describe('MOCK_TEMPLATES 데이터 구조', () => {
  describe('기본 데이터 무결성', () => {
    it('MOCK_TEMPLATES는 배열이다', () => {
      expect(Array.isArray(MOCK_TEMPLATES)).toBe(true);
    });

    it('최소 1개 이상의 템플릿이 존재한다', () => {
      expect(MOCK_TEMPLATES.length).toBeGreaterThan(0);
    });

    it('각 템플릿은 필수 필드를 모두 가진다', () => {
      MOCK_TEMPLATES.forEach((template: Template) => {
        expect(template).toHaveProperty('id');
        expect(template).toHaveProperty('name');
        expect(template).toHaveProperty('description');
        expect(template).toHaveProperty('previewUrl');
        expect(template).toHaveProperty('category');
        expect(template).toHaveProperty('isPremium');
        expect(template).toHaveProperty('colors');
      });
    });

    it('각 템플릿의 id는 비어있지 않은 문자열이다', () => {
      MOCK_TEMPLATES.forEach((template: Template) => {
        expect(typeof template.id).toBe('string');
        expect(template.id.length).toBeGreaterThan(0);
      });
    });

    it('각 템플릿의 id는 유일하다', () => {
      const ids = MOCK_TEMPLATES.map((t: Template) => t.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(MOCK_TEMPLATES.length);
    });
  });

  describe('카테고리 유효성', () => {
    const validCategories = ['minimal', 'creative', 'professional', 'developer'];

    it('각 템플릿의 category는 유효한 값이다', () => {
      MOCK_TEMPLATES.forEach((template: Template) => {
        expect(validCategories).toContain(template.category);
      });
    });

    it('minimal 카테고리의 템플릿이 존재한다', () => {
      const minimal = MOCK_TEMPLATES.filter((t: Template) => t.category === 'minimal');
      expect(minimal.length).toBeGreaterThan(0);
    });

    it('developer 카테고리의 템플릿이 존재한다', () => {
      const developer = MOCK_TEMPLATES.filter((t: Template) => t.category === 'developer');
      expect(developer.length).toBeGreaterThan(0);
    });
  });

  describe('premium 여부', () => {
    it('isPremium은 boolean 타입이다', () => {
      MOCK_TEMPLATES.forEach((template: Template) => {
        expect(typeof template.isPremium).toBe('boolean');
      });
    });

    it('무료 템플릿(isPremium=false)이 최소 1개 존재한다', () => {
      const freeTemplates = MOCK_TEMPLATES.filter((t: Template) => !t.isPremium);
      expect(freeTemplates.length).toBeGreaterThan(0);
    });

    it('유료 템플릿(isPremium=true)이 최소 1개 존재한다', () => {
      const premiumTemplates = MOCK_TEMPLATES.filter((t: Template) => t.isPremium);
      expect(premiumTemplates.length).toBeGreaterThan(0);
    });
  });

  describe('colors 배열', () => {
    it('각 템플릿의 colors는 배열이다', () => {
      MOCK_TEMPLATES.forEach((template: Template) => {
        expect(Array.isArray(template.colors)).toBe(true);
      });
    });

    it('각 템플릿은 최소 1개의 색상을 가진다', () => {
      MOCK_TEMPLATES.forEach((template: Template) => {
        expect(template.colors.length).toBeGreaterThan(0);
      });
    });

    it('각 색상은 # 으로 시작하는 hex 코드 형식이다', () => {
      MOCK_TEMPLATES.forEach((template: Template) => {
        template.colors.forEach((color: string) => {
          expect(color).toMatch(/^#[0-9a-fA-F]{3,8}$/);
        });
      });
    });
  });

  describe('특정 템플릿 존재 여부', () => {
    it("'minimal-dark' 템플릿이 존재한다", () => {
      const found = MOCK_TEMPLATES.find((t: Template) => t.id === 'minimal-dark');
      expect(found).toBeDefined();
    });

    it("'minimal-dark' 템플릿은 무료이다", () => {
      const found = MOCK_TEMPLATES.find((t: Template) => t.id === 'minimal-dark');
      expect(found?.isPremium).toBe(false);
    });

    it("'developer-pro' 템플릿이 존재한다", () => {
      const found = MOCK_TEMPLATES.find((t: Template) => t.id === 'developer-pro');
      expect(found).toBeDefined();
    });
  });

  describe('카테고리별 필터링 동작 (실제 사용 시나리오)', () => {
    it('카테고리로 필터링하면 해당 카테고리 템플릿만 반환된다', () => {
      const category = 'minimal';
      const filtered = MOCK_TEMPLATES.filter((t: Template) => t.category === category);
      filtered.forEach((t: Template) => {
        expect(t.category).toBe(category);
      });
    });

    it('무료 템플릿만 필터링할 수 있다', () => {
      const freeOnly = MOCK_TEMPLATES.filter((t: Template) => !t.isPremium);
      freeOnly.forEach((t: Template) => {
        expect(t.isPremium).toBe(false);
      });
    });

    it('id로 단일 템플릿을 조회할 수 있다', () => {
      const target = MOCK_TEMPLATES[0];
      const found = MOCK_TEMPLATES.find((t: Template) => t.id === target.id);
      expect(found).toBe(target);
    });

    it('존재하지 않는 id 조회 시 undefined를 반환한다', () => {
      const found = MOCK_TEMPLATES.find((t: Template) => t.id === 'non-existent-id');
      expect(found).toBeUndefined();
    });
  });
});
