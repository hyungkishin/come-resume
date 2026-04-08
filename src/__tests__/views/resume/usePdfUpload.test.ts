import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePdfUpload } from '@/views/resume/lib/usePdfUpload';

// pdfjs-dist 모킹
const mockGetTextContent = vi.fn();
const mockGetPage = vi.fn();
const mockGetDocument = vi.fn();

vi.mock('pdfjs-dist', () => ({
  GlobalWorkerOptions: { workerSrc: '' },
  getDocument: mockGetDocument,
}));

// useToastStore 모킹
const mockAddToast = vi.fn();
vi.mock('@/shared/ui/toast/Toast', () => ({
  useToastStore: (selector: (state: { addToast: typeof mockAddToast }) => unknown) =>
    selector({ addToast: mockAddToast }),
}));

// import.meta.url 폴리필 (vitest jsdom 환경)
// vitest는 기본적으로 import.meta.url을 지원하므로 별도 처리 불필요

function createMockFile(name: string, type: string, content = 'test content'): File {
  return new File([content], name, { type });
}

function createMockChangeEvent(file: File | null): React.ChangeEvent<HTMLInputElement> {
  return {
    target: {
      files: file ? [file] : null,
      value: '',
    },
  } as unknown as React.ChangeEvent<HTMLInputElement>;
}

describe('usePdfUpload', () => {
  let onTextExtracted: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onTextExtracted = vi.fn();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('초기 상태', () => {
    it('isPdfLoading이 false로 시작된다', () => {
      const { result } = renderHook(() => usePdfUpload(onTextExtracted));
      expect(result.current.isPdfLoading).toBe(false);
    });

    it('fileInputRef가 null로 시작된다', () => {
      const { result } = renderHook(() => usePdfUpload(onTextExtracted));
      expect(result.current.fileInputRef.current).toBeNull();
    });
  });

  describe('handlePdfUpload - 파일 타입 검증', () => {
    it('파일이 없으면 아무 동작도 하지 않는다', async () => {
      const { result } = renderHook(() => usePdfUpload(onTextExtracted));
      const event = createMockChangeEvent(null);

      await act(async () => {
        await result.current.handlePdfUpload(event);
      });

      expect(onTextExtracted).not.toHaveBeenCalled();
      expect(mockAddToast).not.toHaveBeenCalled();
      expect(result.current.isPdfLoading).toBe(false);
    });

    it('PDF가 아닌 파일(image/jpeg)을 거부한다', async () => {
      const { result } = renderHook(() => usePdfUpload(onTextExtracted));
      const file = createMockFile('photo.jpg', 'image/jpeg');
      const event = createMockChangeEvent(file);

      await act(async () => {
        await result.current.handlePdfUpload(event);
      });

      expect(onTextExtracted).not.toHaveBeenCalled();
      expect(mockAddToast).not.toHaveBeenCalled();
      expect(result.current.isPdfLoading).toBe(false);
    });

    it('PDF가 아닌 파일(text/plain)을 거부한다', async () => {
      const { result } = renderHook(() => usePdfUpload(onTextExtracted));
      const file = createMockFile('readme.txt', 'text/plain');
      const event = createMockChangeEvent(file);

      await act(async () => {
        await result.current.handlePdfUpload(event);
      });

      expect(onTextExtracted).not.toHaveBeenCalled();
      expect(result.current.isPdfLoading).toBe(false);
    });
  });

  describe('handlePdfUpload - 정상 PDF 파싱', () => {
    beforeEach(() => {
      // pdfjs 정상 동작 설정
      mockGetTextContent.mockResolvedValue({
        items: [
          { str: '안녕하세요', transform: [1, 0, 0, 1, 0, 100] },
          { str: ' 이력서', transform: [1, 0, 0, 1, 0, 100] },
          { str: '경력 사항', transform: [1, 0, 0, 1, 0, 50] },
        ],
      });
      mockGetPage.mockResolvedValue({ getTextContent: mockGetTextContent });
      mockGetDocument.mockReturnValue({
        promise: Promise.resolve({ numPages: 1, getPage: mockGetPage }),
      });
    });

    it('PDF 파싱 성공 시 onTextExtracted 콜백이 호출된다', async () => {
      const { result } = renderHook(() => usePdfUpload(onTextExtracted));
      const file = createMockFile('resume.pdf', 'application/pdf');
      const event = createMockChangeEvent(file);

      await act(async () => {
        await result.current.handlePdfUpload(event);
      });

      expect(onTextExtracted).toHaveBeenCalledTimes(1);
    });

    it('PDF 파싱 성공 시 success 토스트를 표시한다', async () => {
      const { result } = renderHook(() => usePdfUpload(onTextExtracted));
      const file = createMockFile('resume.pdf', 'application/pdf');
      const event = createMockChangeEvent(file);

      await act(async () => {
        await result.current.handlePdfUpload(event);
      });

      expect(mockAddToast).toHaveBeenCalledWith('success', expect.stringContaining('1페이지'));
    });

    it('PDF 파싱 완료 후 isPdfLoading이 false로 복원된다', async () => {
      const { result } = renderHook(() => usePdfUpload(onTextExtracted));
      const file = createMockFile('resume.pdf', 'application/pdf');
      const event = createMockChangeEvent(file);

      await act(async () => {
        await result.current.handlePdfUpload(event);
      });

      expect(result.current.isPdfLoading).toBe(false);
    });

    it('여러 페이지 PDF의 경우 페이지 수를 포함한 토스트를 표시한다', async () => {
      mockGetDocument.mockReturnValue({
        promise: Promise.resolve({ numPages: 3, getPage: mockGetPage }),
      });

      const { result } = renderHook(() => usePdfUpload(onTextExtracted));
      const file = createMockFile('resume.pdf', 'application/pdf');
      const event = createMockChangeEvent(file);

      await act(async () => {
        await result.current.handlePdfUpload(event);
      });

      expect(mockAddToast).toHaveBeenCalledWith('success', expect.stringContaining('3페이지'));
    });

    it('y좌표 차이가 2 초과인 항목은 줄바꿈으로 구분된다', async () => {
      mockGetTextContent.mockResolvedValue({
        items: [
          { str: '줄1', transform: [1, 0, 0, 1, 0, 100] },
          { str: '줄2', transform: [1, 0, 0, 1, 0, 50] }, // 차이 50 > 2
        ],
      });

      const { result } = renderHook(() => usePdfUpload(onTextExtracted));
      const file = createMockFile('resume.pdf', 'application/pdf');
      const event = createMockChangeEvent(file);

      await act(async () => {
        await result.current.handlePdfUpload(event);
      });

      const extractedText = onTextExtracted.mock.calls[0][0] as string;
      expect(extractedText).toContain('\n');
    });
  });

  describe('handlePdfUpload - 에러 처리', () => {
    it('pdfjs 파싱 실패 시 FileReader 폴백을 시도한다', async () => {
      mockGetDocument.mockReturnValue({
        promise: Promise.reject(new Error('PDF parse error')),
      });

      // File.text() 모킹 - 충분한 텍스트 반환
      const longText = '이력서 내용 '.repeat(20);
      const file = createMockFile('resume.pdf', 'application/pdf', longText);
      vi.spyOn(file, 'text').mockResolvedValue(longText);

      const { result } = renderHook(() => usePdfUpload(onTextExtracted));
      const event = createMockChangeEvent(file);

      await act(async () => {
        await result.current.handlePdfUpload(event);
      });

      expect(onTextExtracted).toHaveBeenCalledWith(longText);
      expect(mockAddToast).toHaveBeenCalledWith('info', expect.stringContaining('기본 모드'));
    });

    it('폴백 텍스트가 50자 이하이면 error 토스트를 표시한다', async () => {
      mockGetDocument.mockReturnValue({
        promise: Promise.reject(new Error('PDF parse error')),
      });

      const file = createMockFile('resume.pdf', 'application/pdf', 'short');
      vi.spyOn(file, 'text').mockResolvedValue('short');

      const { result } = renderHook(() => usePdfUpload(onTextExtracted));
      const event = createMockChangeEvent(file);

      await act(async () => {
        await result.current.handlePdfUpload(event);
      });

      expect(onTextExtracted).not.toHaveBeenCalled();
      expect(mockAddToast).toHaveBeenCalledWith(
        'error',
        expect.stringContaining('텍스트를 추출할 수 없습니다')
      );
    });

    it('폴백도 실패하면 error 토스트를 표시한다', async () => {
      mockGetDocument.mockReturnValue({
        promise: Promise.reject(new Error('PDF parse error')),
      });

      const file = createMockFile('resume.pdf', 'application/pdf');
      vi.spyOn(file, 'text').mockRejectedValue(new Error('File read error'));

      const { result } = renderHook(() => usePdfUpload(onTextExtracted));
      const event = createMockChangeEvent(file);

      await act(async () => {
        await result.current.handlePdfUpload(event);
      });

      expect(onTextExtracted).not.toHaveBeenCalled();
      expect(mockAddToast).toHaveBeenCalledWith(
        'error',
        expect.stringContaining('읽을 수 없습니다')
      );
    });

    it('에러 발생 후에도 isPdfLoading이 false로 복원된다', async () => {
      mockGetDocument.mockReturnValue({
        promise: Promise.reject(new Error('PDF parse error')),
      });

      const file = createMockFile('resume.pdf', 'application/pdf', 'short');
      vi.spyOn(file, 'text').mockResolvedValue('short');

      const { result } = renderHook(() => usePdfUpload(onTextExtracted));
      const event = createMockChangeEvent(file);

      await act(async () => {
        await result.current.handlePdfUpload(event);
      });

      expect(result.current.isPdfLoading).toBe(false);
    });
  });
});
