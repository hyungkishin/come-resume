import { describe, it, expect } from 'vitest';
import { computeDiff } from '@/features/resume-polish/lib/diff-utils';
import type { DiffSegment } from '@/features/resume-polish/lib/diff-utils';

describe('computeDiff', () => {
  describe('빈 입력 처리', () => {
    it('original과 polished 모두 빈 문자열이면 unchanged 빈 문자열 세그먼트 하나를 반환한다', () => {
      // split('') -> [''] 이므로 빈 문자열 한 줄이 unchanged로 처리된다
      const result = computeDiff('', '');
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('unchanged');
      expect(result[0].text).toBe('');
    });

    it('original이 빈 문자열이면 polished 줄이 added로 반환된다', () => {
      const result = computeDiff('', '새로운 내용');
      const added = result.filter((s: DiffSegment) => s.type === 'added');
      expect(added.length).toBeGreaterThan(0);
      expect(added[0].text).toBe('새로운 내용');
    });

    it('polished가 빈 문자열이면 original 줄이 removed로 반환된다', () => {
      const result = computeDiff('기존 내용', '');
      const removed = result.filter((s: DiffSegment) => s.type === 'removed');
      expect(removed.length).toBeGreaterThan(0);
      expect(removed[0].text).toBe('기존 내용');
    });
  });

  describe('변경 없는 경우', () => {
    it('동일한 텍스트면 모든 세그먼트가 unchanged 타입이다', () => {
      const text = '변경 없는 내용';
      const result = computeDiff(text, text);
      const types = result.map((s: DiffSegment) => s.type);
      expect(types.every((t: string) => t === 'unchanged')).toBe(true);
    });

    it('동일한 여러 줄 텍스트면 unchanged 세그먼트가 줄 수만큼 반환된다', () => {
      const text = '줄1\n줄2\n줄3';
      const result = computeDiff(text, text);
      const unchanged = result.filter((s: DiffSegment) => s.type === 'unchanged');
      expect(unchanged).toHaveLength(3);
    });
  });

  describe('added 세그먼트', () => {
    it('polished에만 있는 줄은 added 타입으로 반환된다', () => {
      const original = '기존 내용';
      const polished = '기존 내용\n추가된 내용';
      const result = computeDiff(original, polished);
      const added = result.filter((s: DiffSegment) => s.type === 'added');
      expect(added).toHaveLength(1);
      expect(added[0].text).toBe('추가된 내용');
    });

    it('여러 추가된 줄은 모두 added 타입으로 반환된다', () => {
      const original = '기존';
      const polished = '기존\n추가1\n추가2\n추가3';
      const result = computeDiff(original, polished);
      const added = result.filter((s: DiffSegment) => s.type === 'added');
      expect(added).toHaveLength(3);
    });
  });

  describe('removed 세그먼트', () => {
    it('original에만 있는 줄은 removed 타입으로 반환된다', () => {
      const original = '기존 내용\n삭제될 내용';
      const polished = '기존 내용';
      const result = computeDiff(original, polished);
      const removed = result.filter((s: DiffSegment) => s.type === 'removed');
      expect(removed).toHaveLength(1);
      expect(removed[0].text).toBe('삭제될 내용');
    });

    it('여러 삭제된 줄은 모두 removed 타입으로 반환된다', () => {
      const original = '유지\n삭제1\n삭제2';
      const polished = '유지';
      const result = computeDiff(original, polished);
      const removed = result.filter((s: DiffSegment) => s.type === 'removed');
      expect(removed).toHaveLength(2);
    });
  });

  describe('복합 변경 케이스', () => {
    it('추가, 삭제, 유지가 혼재할 때 각 타입이 올바르게 분류된다', () => {
      const original = '유지되는 줄\n삭제되는 줄';
      const polished = '유지되는 줄\n추가되는 줄';
      const result = computeDiff(original, polished);

      const unchanged = result.filter((s: DiffSegment) => s.type === 'unchanged');
      const removed = result.filter((s: DiffSegment) => s.type === 'removed');
      const added = result.filter((s: DiffSegment) => s.type === 'added');

      expect(unchanged.length).toBeGreaterThan(0);
      expect(removed).toHaveLength(1);
      expect(added).toHaveLength(1);
    });

    it('DiffSegment는 type과 text 속성을 가진다', () => {
      const result = computeDiff('원본', '수정본');
      result.forEach((segment: DiffSegment) => {
        expect(segment).toHaveProperty('type');
        expect(segment).toHaveProperty('text');
        expect(['unchanged', 'added', 'removed']).toContain(segment.type);
        expect(typeof segment.text).toBe('string');
      });
    });

    it('original의 순서대로 unchanged/removed 세그먼트가 먼저 오고 added가 뒤에 온다', () => {
      const original = '줄A\n줄B';
      const polished = '줄A\n줄C';
      const result = computeDiff(original, polished);

      const lastUnchangedOrRemovedIndex = result.reduce(
        (acc: number, s: DiffSegment, i: number) =>
          s.type === 'unchanged' || s.type === 'removed' ? i : acc,
        -1,
      );
      const firstAddedIndex = result.findIndex((s: DiffSegment) => s.type === 'added');

      if (firstAddedIndex !== -1 && lastUnchangedOrRemovedIndex !== -1) {
        expect(firstAddedIndex).toBeGreaterThan(lastUnchangedOrRemovedIndex);
      }
    });
  });

  describe('실제 이력서 diff 시나리오', () => {
    it('이력서 다듬기 전후를 비교할 때 변경 사항을 올바르게 감지한다', () => {
      const original = [
        '## 경력사항',
        '프로젝트를 담당했습니다.',
        '팀 업무를 도왔습니다.',
      ].join('\n');

      const polished = [
        '## 경력사항',
        '프로젝트를 주도적으로 리드하여 성과를 달성했습니다.',
        '팀 협업을 통해 생산성을 향상시켰습니다.',
      ].join('\n');

      const result = computeDiff(original, polished);
      expect(result.length).toBeGreaterThan(0);

      const unchanged = result.filter((s: DiffSegment) => s.type === 'unchanged');
      expect(unchanged.some((s: DiffSegment) => s.text === '## 경력사항')).toBe(true);
    });
  });
});
