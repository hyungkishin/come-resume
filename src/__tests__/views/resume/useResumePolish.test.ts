import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useResumePolish } from '@/views/resume/lib/useResumePolish';

// polish-engine 전체 모킹
vi.mock('@/features/resume-polish/lib/polish-engine', () => ({
  generatePolishedText: vi.fn((text: string) => `[POLISHED] ${text}`),
  calculateScore: vi.fn(() => ({ overall: 80, impact: 75, clarity: 78, keywords: 70, formatting: 85 })),
  generateSuggestions: vi.fn(() => [{ section: '성과', priority: 'high', suggestion: '수치를 추가하세요' }]),
  matchJd: vi.fn(() => ({
    matchScore: 75,
    matchedKeywords: ['React', 'TypeScript'],
    missingKeywords: ['Docker'],
    suggestions: ['Docker 경험을 추가하세요'],
  })),
}));

describe('useResumePolish', () => {
  beforeEach(() => {
    vi.useFakeTimers();

    // clipboard API 모킹
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  describe('초기 상태', () => {
    it('isPolishing이 false로 시작된다', () => {
      const { result } = renderHook(() => useResumePolish());
      expect(result.current.isPolishing).toBe(false);
    });

    it('result가 null로 시작된다', () => {
      const { result } = renderHook(() => useResumePolish());
      expect(result.current.result).toBeNull();
    });

    it('isMatching이 false로 시작된다', () => {
      const { result } = renderHook(() => useResumePolish());
      expect(result.current.isMatching).toBe(false);
    });

    it('matchResult가 null로 시작된다', () => {
      const { result } = renderHook(() => useResumePolish());
      expect(result.current.matchResult).toBeNull();
    });

    it('copied가 false로 시작된다', () => {
      const { result } = renderHook(() => useResumePolish());
      expect(result.current.copied).toBe(false);
    });

    it('exportOpen이 false로 시작된다', () => {
      const { result } = renderHook(() => useResumePolish());
      expect(result.current.exportOpen).toBe(false);
    });
  });

  describe('handlePolish', () => {
    it('빈 문자열을 전달하면 아무 동작도 하지 않는다', async () => {
      const { result } = renderHook(() => useResumePolish());
      const onDone = vi.fn();

      await act(async () => {
        await result.current.handlePolish('', onDone);
      });

      expect(result.current.result).toBeNull();
      expect(onDone).not.toHaveBeenCalled();
    });

    it('공백만 있는 문자열을 전달하면 아무 동작도 하지 않는다', async () => {
      const { result } = renderHook(() => useResumePolish());
      const onDone = vi.fn();

      await act(async () => {
        await result.current.handlePolish('   ', onDone);
      });

      expect(result.current.result).toBeNull();
      expect(onDone).not.toHaveBeenCalled();
    });

    it('정상 텍스트 전달 시 isPolishing이 true로 바뀐 후 false로 복원된다', async () => {
      const { result } = renderHook(() => useResumePolish());
      const onDone = vi.fn();

      const polishPromise = act(async () => {
        const promise = result.current.handlePolish('이력서 내용', onDone);
        // setTimeout(1500ms) 경과
        vi.advanceTimersByTime(1500);
        await promise;
      });

      await polishPromise;
      expect(result.current.isPolishing).toBe(false);
    });

    it('정상 텍스트 전달 시 result가 업데이트된다', async () => {
      const { result } = renderHook(() => useResumePolish());
      const onDone = vi.fn();

      await act(async () => {
        const promise = result.current.handlePolish('이력서 내용', onDone);
        vi.advanceTimersByTime(1500);
        await promise;
      });

      expect(result.current.result).not.toBeNull();
      expect(result.current.result?.polished).toBe('[POLISHED] 이력서 내용');
    });

    it('정상 텍스트 전달 시 score와 suggestions가 함께 설정된다', async () => {
      const { result } = renderHook(() => useResumePolish());
      const onDone = vi.fn();

      await act(async () => {
        const promise = result.current.handlePolish('이력서 내용', onDone);
        vi.advanceTimersByTime(1500);
        await promise;
      });

      expect(result.current.result?.score.overall).toBe(80);
      expect(result.current.result?.suggestions).toHaveLength(1);
    });

    it('폴리싱 완료 후 onDone 콜백이 호출된다', async () => {
      const { result } = renderHook(() => useResumePolish());
      const onDone = vi.fn();

      await act(async () => {
        const promise = result.current.handlePolish('이력서 내용', onDone);
        vi.advanceTimersByTime(1500);
        await promise;
      });

      expect(onDone).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleMatch', () => {
    it('텍스트가 빈 문자열이면 아무 동작도 하지 않는다', async () => {
      const { result } = renderHook(() => useResumePolish());

      await act(async () => {
        await result.current.handleMatch('', 'JD 내용');
      });

      expect(result.current.matchResult).toBeNull();
      expect(result.current.isMatching).toBe(false);
    });

    it('jdText가 빈 문자열이면 아무 동작도 하지 않는다', async () => {
      const { result } = renderHook(() => useResumePolish());

      await act(async () => {
        await result.current.handleMatch('이력서 내용', '');
      });

      expect(result.current.matchResult).toBeNull();
    });

    it('텍스트와 jdText 모두 공백이면 아무 동작도 하지 않는다', async () => {
      const { result } = renderHook(() => useResumePolish());

      await act(async () => {
        await result.current.handleMatch('   ', '   ');
      });

      expect(result.current.matchResult).toBeNull();
    });

    it('정상 입력 시 matchResult가 업데이트된다', async () => {
      const { result } = renderHook(() => useResumePolish());

      await act(async () => {
        const promise = result.current.handleMatch('React 개발자', 'React TypeScript Docker');
        vi.advanceTimersByTime(1500);
        await promise;
      });

      expect(result.current.matchResult).not.toBeNull();
      expect(result.current.matchResult?.matchScore).toBe(75);
    });

    it('정상 입력 시 matchedKeywords와 missingKeywords가 설정된다', async () => {
      const { result } = renderHook(() => useResumePolish());

      await act(async () => {
        const promise = result.current.handleMatch('React 개발자', 'React TypeScript Docker');
        vi.advanceTimersByTime(1500);
        await promise;
      });

      expect(result.current.matchResult?.matchedKeywords).toContain('React');
      expect(result.current.matchResult?.missingKeywords).toContain('Docker');
    });

    it('매칭 완료 후 isMatching이 false로 복원된다', async () => {
      const { result } = renderHook(() => useResumePolish());

      await act(async () => {
        const promise = result.current.handleMatch('React 개발자', 'React TypeScript');
        vi.advanceTimersByTime(1500);
        await promise;
      });

      expect(result.current.isMatching).toBe(false);
    });
  });

  describe('handleCopy', () => {
    it('result가 null이면 클립보드에 복사하지 않는다', () => {
      const { result } = renderHook(() => useResumePolish());

      act(() => {
        result.current.handleCopy();
      });

      expect(navigator.clipboard.writeText).not.toHaveBeenCalled();
      expect(result.current.copied).toBe(false);
    });

    it('result가 있을 때 클립보드에 polished 텍스트를 복사한다', async () => {
      const { result } = renderHook(() => useResumePolish());
      const onDone = vi.fn();

      // 먼저 폴리싱 완료
      await act(async () => {
        const promise = result.current.handlePolish('이력서 내용', onDone);
        vi.advanceTimersByTime(1500);
        await promise;
      });

      act(() => {
        result.current.handleCopy();
      });

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('[POLISHED] 이력서 내용');
    });

    it('복사 후 copied가 true로 바뀐다', async () => {
      const { result } = renderHook(() => useResumePolish());
      const onDone = vi.fn();

      await act(async () => {
        const promise = result.current.handlePolish('이력서 내용', onDone);
        vi.advanceTimersByTime(1500);
        await promise;
      });

      act(() => {
        result.current.handleCopy();
      });

      expect(result.current.copied).toBe(true);
    });

    it('복사 후 2초가 지나면 copied가 false로 초기화된다', async () => {
      const { result } = renderHook(() => useResumePolish());
      const onDone = vi.fn();

      await act(async () => {
        const promise = result.current.handlePolish('이력서 내용', onDone);
        vi.advanceTimersByTime(1500);
        await promise;
      });

      act(() => {
        result.current.handleCopy();
      });

      expect(result.current.copied).toBe(true);

      act(() => {
        vi.advanceTimersByTime(2000);
      });

      expect(result.current.copied).toBe(false);
    });

    it('2초 이전에는 copied가 true로 유지된다', async () => {
      const { result } = renderHook(() => useResumePolish());
      const onDone = vi.fn();

      await act(async () => {
        const promise = result.current.handlePolish('이력서 내용', onDone);
        vi.advanceTimersByTime(1500);
        await promise;
      });

      act(() => {
        result.current.handleCopy();
      });

      act(() => {
        vi.advanceTimersByTime(1999);
      });

      expect(result.current.copied).toBe(true);
    });
  });

  describe('setExportOpen', () => {
    it('setExportOpen(true) 호출 시 exportOpen이 true가 된다', () => {
      const { result } = renderHook(() => useResumePolish());

      act(() => {
        result.current.setExportOpen(true);
      });

      expect(result.current.exportOpen).toBe(true);
    });

    it('setExportOpen(false) 호출 시 exportOpen이 false가 된다', () => {
      const { result } = renderHook(() => useResumePolish());

      act(() => {
        result.current.setExportOpen(true);
      });

      act(() => {
        result.current.setExportOpen(false);
      });

      expect(result.current.exportOpen).toBe(false);
    });
  });
});
