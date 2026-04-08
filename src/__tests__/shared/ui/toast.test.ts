import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useToastStore } from '@/shared/ui/toast/Toast';

// framer-motion과 React 컴포넌트 의존성 제거 (스토어 단위 테스트)
vi.mock('framer-motion', () => ({
  AnimatePresence: ({ children }: { children: unknown }) => children,
  motion: {
    div: ({ children }: { children: unknown }) => children,
  },
}));

vi.mock('@/shared/ui/icons', () => ({
  Check: () => null,
  X: () => null,
  Sparkles: () => null,
}));

describe('useToastStore', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // 각 테스트 전 스토어를 초기화
    useToastStore.setState({ toasts: [] });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  describe('초기 상태', () => {
    it('toasts 배열이 빈 상태로 시작된다', () => {
      const { toasts } = useToastStore.getState();
      expect(toasts).toEqual([]);
    });
  });

  describe('addToast', () => {
    it('토스트를 추가하면 toasts 배열에 추가된다', () => {
      const { addToast } = useToastStore.getState();
      addToast('success', '저장되었습니다');

      const { toasts } = useToastStore.getState();
      expect(toasts).toHaveLength(1);
    });

    it('추가된 토스트에 올바른 type과 message가 설정된다', () => {
      const { addToast } = useToastStore.getState();
      addToast('error', '오류가 발생했습니다');

      const { toasts } = useToastStore.getState();
      expect(toasts[0].type).toBe('error');
      expect(toasts[0].message).toBe('오류가 발생했습니다');
    });

    it('추가된 토스트는 고유한 id를 가진다', () => {
      const { addToast } = useToastStore.getState();
      addToast('success', '첫 번째 토스트');
      addToast('info', '두 번째 토스트');

      const { toasts } = useToastStore.getState();
      expect(toasts[0].id).toBeDefined();
      expect(toasts[1].id).toBeDefined();
      expect(toasts[0].id).not.toBe(toasts[1].id);
    });

    it('여러 토스트를 추가하면 모두 배열에 쌓인다', () => {
      const { addToast } = useToastStore.getState();
      addToast('success', '첫 번째');
      addToast('warning', '두 번째');
      addToast('info', '세 번째');

      const { toasts } = useToastStore.getState();
      expect(toasts).toHaveLength(3);
    });

    it('success 타입 토스트를 추가할 수 있다', () => {
      const { addToast } = useToastStore.getState();
      addToast('success', '성공');

      expect(useToastStore.getState().toasts[0].type).toBe('success');
    });

    it('error 타입 토스트를 추가할 수 있다', () => {
      const { addToast } = useToastStore.getState();
      addToast('error', '에러');

      expect(useToastStore.getState().toasts[0].type).toBe('error');
    });

    it('warning 타입 토스트를 추가할 수 있다', () => {
      const { addToast } = useToastStore.getState();
      addToast('warning', '경고');

      expect(useToastStore.getState().toasts[0].type).toBe('warning');
    });

    it('info 타입 토스트를 추가할 수 있다', () => {
      const { addToast } = useToastStore.getState();
      addToast('info', '정보');

      expect(useToastStore.getState().toasts[0].type).toBe('info');
    });

    it('빈 메시지도 토스트로 추가된다', () => {
      const { addToast } = useToastStore.getState();
      addToast('info', '');

      const { toasts } = useToastStore.getState();
      expect(toasts).toHaveLength(1);
      expect(toasts[0].message).toBe('');
    });
  });

  describe('removeToast', () => {
    it('id로 특정 토스트를 제거한다', () => {
      const { addToast } = useToastStore.getState();
      addToast('success', '제거할 토스트');

      const { toasts: before } = useToastStore.getState();
      const targetId = before[0].id;

      useToastStore.getState().removeToast(targetId);
      const { toasts: after } = useToastStore.getState();
      expect(after).toHaveLength(0);
    });

    it('특정 토스트 제거 시 나머지 토스트는 유지된다', () => {
      const { addToast } = useToastStore.getState();
      addToast('success', '첫 번째');
      addToast('error', '두 번째');
      addToast('info', '세 번째');

      const { toasts: before } = useToastStore.getState();
      const targetId = before[1].id; // 두 번째 제거

      useToastStore.getState().removeToast(targetId);
      const { toasts: after } = useToastStore.getState();

      expect(after).toHaveLength(2);
      expect(after.some((t) => t.message === '첫 번째')).toBe(true);
      expect(after.some((t) => t.message === '세 번째')).toBe(true);
      expect(after.some((t) => t.message === '두 번째')).toBe(false);
    });

    it('존재하지 않는 id로 제거 시 배열이 변경되지 않는다', () => {
      const { addToast } = useToastStore.getState();
      addToast('success', '토스트');

      useToastStore.getState().removeToast('non-existent-id');
      expect(useToastStore.getState().toasts).toHaveLength(1);
    });

    it('빈 배열에서 제거해도 오류가 발생하지 않는다', () => {
      expect(() => {
        useToastStore.getState().removeToast('any-id');
      }).not.toThrow();
    });
  });

  describe('자동 제거 타이머', () => {
    it('토스트 추가 후 3초가 지나면 자동으로 제거된다', () => {
      const { addToast } = useToastStore.getState();
      addToast('success', '자동 제거 토스트');

      expect(useToastStore.getState().toasts).toHaveLength(1);

      vi.advanceTimersByTime(3000);

      expect(useToastStore.getState().toasts).toHaveLength(0);
    });

    it('3초가 지나기 전에는 토스트가 유지된다', () => {
      const { addToast } = useToastStore.getState();
      addToast('success', '아직 살아있는 토스트');

      vi.advanceTimersByTime(2999);

      expect(useToastStore.getState().toasts).toHaveLength(1);
    });

    it('여러 토스트는 각자 독립적인 타이머로 자동 제거된다', () => {
      const { addToast } = useToastStore.getState();
      addToast('success', '첫 번째');

      vi.advanceTimersByTime(1000);
      addToast('error', '두 번째'); // 1초 뒤 추가

      vi.advanceTimersByTime(2000); // 첫 번째는 총 3초 경과 → 제거됨

      const { toasts } = useToastStore.getState();
      expect(toasts).toHaveLength(1);
      expect(toasts[0].message).toBe('두 번째');
    });

    it('수동으로 제거하면 타이머가 동작해도 이미 제거된 토스트는 영향 없다', () => {
      const { addToast } = useToastStore.getState();
      addToast('info', '수동 제거 토스트');

      const { toasts } = useToastStore.getState();
      const id = toasts[0].id;

      // 수동 제거
      useToastStore.getState().removeToast(id);
      expect(useToastStore.getState().toasts).toHaveLength(0);

      // 3초 뒤 타이머 발동 — 이미 없으므로 오류 없이 동작
      expect(() => {
        vi.advanceTimersByTime(3000);
      }).not.toThrow();

      expect(useToastStore.getState().toasts).toHaveLength(0);
    });

    it('타이머 만료 후에도 addToast를 통해 새 토스트를 추가할 수 있다', () => {
      const { addToast } = useToastStore.getState();
      addToast('success', '첫 번째');

      vi.advanceTimersByTime(3000);
      expect(useToastStore.getState().toasts).toHaveLength(0);

      addToast('info', '두 번째');
      expect(useToastStore.getState().toasts).toHaveLength(1);
    });
  });
});
