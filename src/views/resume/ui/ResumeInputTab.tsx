'use client';

import type { RefObject } from 'react';
import { Button } from '@/shared/ui/button/Button';
import { Card } from '@/shared/ui/card/Card';
import { cn } from '@/shared/lib/cn';
import { Sparkles, FileText, ArrowRight } from '@/shared/ui/icons';

interface ResumeInputTabProps {
  text: string;
  setText: (value: string) => void;
  language: 'ko' | 'en';
  setLanguage: (lang: 'ko' | 'en') => void;
  isPdfLoading: boolean;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onPdfUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPolish: () => void;
  isPolishing: boolean;
}

export function ResumeInputTab({
  text,
  setText,
  language,
  setLanguage,
  isPdfLoading,
  fileInputRef,
  onPdfUpload,
  onPolish,
  isPolishing,
}: ResumeInputTabProps) {
  return (
    <>
      <Card className="p-0">
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
          <div className="flex gap-2">
            <button
              onClick={() => setLanguage('ko')}
              className={cn(
                'rounded-md px-3 py-1 text-xs font-medium transition-colors',
                language === 'ko' ? 'bg-zinc-700 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300',
              )}
            >
              한국어
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={cn(
                'rounded-md px-3 py-1 text-xs font-medium transition-colors',
                language === 'en' ? 'bg-zinc-700 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300',
              )}
            >
              English
            </button>
          </div>
          <span className="text-xs text-zinc-500">{text.length}자</span>
        </div>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="이력서 내용을 붙여넣으세요..."
          className="min-h-[400px] w-full bg-transparent px-4 py-4 text-sm leading-relaxed text-zinc-100 placeholder:text-zinc-600 focus:outline-none resize-none"
        />
      </Card>
      <div className="mt-4 flex items-center justify-between">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={onPdfUpload}
          className="hidden"
        />
        <Button
          variant="outline"
          size="sm"
          isLoading={isPdfLoading}
          onClick={() => fileInputRef.current?.click()}
        >
          <FileText className="mr-1.5 h-3.5 w-3.5" />
          {isPdfLoading ? 'PDF 읽는 중...' : 'PDF 업로드'}
        </Button>
        <Button
          size="md"
          onClick={onPolish}
          isLoading={isPolishing}
          disabled={!text.trim()}
          className="gap-2"
        >
          <Sparkles className="h-4 w-4" />
          AI 폴리싱 시작
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}
