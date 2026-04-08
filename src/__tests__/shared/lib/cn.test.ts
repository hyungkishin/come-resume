import { describe, it, expect } from 'vitest';
import { cn } from '@/shared/lib/cn';

describe('cn (classname merge)', () => {
  it('단일 클래스 반환', () => {
    expect(cn('text-red-500')).toBe('text-red-500');
  });

  it('여러 클래스 합침', () => {
    expect(cn('px-2', 'py-1')).toBe('px-2 py-1');
  });

  it('falsy 값 무시', () => {
    expect(cn('px-2', false && 'py-1', null, undefined, 'text-sm')).toBe('px-2 text-sm');
  });

  it('tailwind 충돌 해결 (twMerge)', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('조건부 클래스', () => {
    const active = true;
    expect(cn('base', active && 'active')).toBe('base active');
  });

  it('빈 입력', () => {
    expect(cn()).toBe('');
  });
});
