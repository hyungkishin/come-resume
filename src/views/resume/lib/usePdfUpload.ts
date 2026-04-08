'use client';

import { useState, useRef } from 'react';
import { useToastStore } from '@/shared/ui/toast/Toast';

interface UsePdfUploadResult {
  isPdfLoading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handlePdfUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export function usePdfUpload(onTextExtracted: (text: string) => void): UsePdfUploadResult {
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addToast = useToastStore((state) => state.addToast);

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== 'application/pdf') return;
    setIsPdfLoading(true);
    try {
      const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
      const pdfjsWorker = await import('pdfjs-dist/legacy/build/pdf.worker.mjs');
      pdfjsLib.GlobalWorkerOptions.workerPort = new pdfjsWorker.default();
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
      const pages: string[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const lines: string[] = [];
        let lastY: number | null = null;
        for (const item of content.items) {
          if (!('str' in item)) continue;
          const y = 'transform' in item ? (item.transform as number[])[5] : 0;
          if (lastY !== null && Math.abs(y - lastY) > 2) {
            lines.push('\n');
          }
          lines.push(item.str);
          lastY = y;
        }
        pages.push(lines.join(''));
      }
      onTextExtracted(pages.join('\n\n'));
      addToast('success', `PDF에서 ${pdf.numPages}페이지 텍스트를 추출했습니다`);
    } catch {
      // Fallback: FileReader로 텍스트 추출 시도
      try {
        const fileText = await file.text();
        if (fileText.trim().length > 50) {
          onTextExtracted(fileText);
          addToast('info', 'PDF에서 텍스트를 추출했습니다 (기본 모드)');
        } else {
          addToast('error', '이 PDF에서 텍스트를 추출할 수 없습니다. 텍스트를 직접 붙여넣어 주세요.');
        }
      } catch {
        addToast('error', 'PDF 파일을 읽을 수 없습니다. 텍스트를 직접 붙여넣어 주세요.');
      }
    } finally {
      setIsPdfLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return { isPdfLoading, fileInputRef, handlePdfUpload };
}
