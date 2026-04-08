import { describe, it, expect } from 'vitest';
import { DEFAULT_SECTIONS, DEFAULT_THEME, TEMPLATE_THEMES } from '@/views/editor/ui/editorConstants';

const HEX_COLOR_REGEX = /^#[0-9a-fA-F]{6}$/;

describe('DEFAULT_SECTIONS', () => {
  it('배열이어야 한다', () => {
    expect(Array.isArray(DEFAULT_SECTIONS)).toBe(true);
    expect(DEFAULT_SECTIONS.length).toBeGreaterThan(0);
  });

  it('모든 섹션에 필수 필드(id, type, order, data, isVisible)가 존재한다', () => {
    for (const section of DEFAULT_SECTIONS) {
      expect(section).toHaveProperty('id');
      expect(section).toHaveProperty('type');
      expect(section).toHaveProperty('order');
      expect(section).toHaveProperty('data');
      expect(section).toHaveProperty('isVisible');
    }
  });

  it('모든 섹션 id는 문자열이어야 한다', () => {
    for (const section of DEFAULT_SECTIONS) {
      expect(typeof section.id).toBe('string');
      expect(section.id.length).toBeGreaterThan(0);
    }
  });

  it('섹션 id에 중복이 없어야 한다', () => {
    const ids = DEFAULT_SECTIONS.map(s => s.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('order 값이 숫자이고 음수가 아니어야 한다', () => {
    for (const section of DEFAULT_SECTIONS) {
      expect(typeof section.order).toBe('number');
      expect(section.order).toBeGreaterThanOrEqual(0);
    }
  });

  it('order 값에 중복이 없어야 한다', () => {
    const orders = DEFAULT_SECTIONS.map(s => s.order);
    const uniqueOrders = new Set(orders);
    expect(uniqueOrders.size).toBe(orders.length);
  });

  it('isVisible 값이 boolean이어야 한다', () => {
    for (const section of DEFAULT_SECTIONS) {
      expect(typeof section.isVisible).toBe('boolean');
    }
  });

  it('data 값이 객체이어야 한다', () => {
    for (const section of DEFAULT_SECTIONS) {
      expect(typeof section.data).toBe('object');
      expect(section.data).not.toBeNull();
    }
  });

  it('type 값이 알려진 섹션 타입이어야 한다', () => {
    const validTypes = ['hero', 'about', 'projects', 'skills', 'experience', 'education', 'contact', 'custom'];
    for (const section of DEFAULT_SECTIONS) {
      expect(validTypes).toContain(section.type);
    }
  });
});

describe('DEFAULT_THEME', () => {
  it('필수 필드(templateId, primaryColor, fontFamily, darkMode, customCSS)가 존재한다', () => {
    expect(DEFAULT_THEME).toHaveProperty('templateId');
    expect(DEFAULT_THEME).toHaveProperty('primaryColor');
    expect(DEFAULT_THEME).toHaveProperty('fontFamily');
    expect(DEFAULT_THEME).toHaveProperty('darkMode');
    expect(DEFAULT_THEME).toHaveProperty('customCSS');
  });

  it('primaryColor가 유효한 hex 색상 코드여야 한다', () => {
    expect(HEX_COLOR_REGEX.test(DEFAULT_THEME.primaryColor)).toBe(true);
  });

  it('darkMode가 boolean이어야 한다', () => {
    expect(typeof DEFAULT_THEME.darkMode).toBe('boolean');
  });

  it('templateId가 TEMPLATE_THEMES에 존재하는 키여야 한다', () => {
    expect(Object.keys(TEMPLATE_THEMES)).toContain(DEFAULT_THEME.templateId);
  });
});

describe('TEMPLATE_THEMES', () => {
  it('객체이어야 하고 하나 이상의 테마가 있어야 한다', () => {
    expect(typeof TEMPLATE_THEMES).toBe('object');
    expect(Object.keys(TEMPLATE_THEMES).length).toBeGreaterThan(0);
  });

  it('모든 테마에 primaryColor가 존재해야 한다', () => {
    for (const [, theme] of Object.entries(TEMPLATE_THEMES)) {
      expect(theme).toHaveProperty('primaryColor');
    }
  });

  it('모든 테마의 primaryColor가 유효한 hex 색상 코드여야 한다', () => {
    for (const [id, theme] of Object.entries(TEMPLATE_THEMES)) {
      if (theme.primaryColor !== undefined) {
        expect(HEX_COLOR_REGEX.test(theme.primaryColor), `${id}의 primaryColor가 유효하지 않음`).toBe(true);
      }
    }
  });

  it('모든 테마의 darkMode가 boolean이어야 한다 (존재하는 경우)', () => {
    for (const [id, theme] of Object.entries(TEMPLATE_THEMES)) {
      if (theme.darkMode !== undefined) {
        expect(typeof theme.darkMode, `${id}의 darkMode 타입 오류`).toBe('boolean');
      }
    }
  });

  it('테마 키(id)에 중복이 없어야 한다', () => {
    const keys = Object.keys(TEMPLATE_THEMES);
    const uniqueKeys = new Set(keys);
    expect(uniqueKeys.size).toBe(keys.length);
  });
});
