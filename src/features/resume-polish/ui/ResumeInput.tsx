'use client';

import { Sparkles, Upload } from 'lucide-react';
import { Button } from '@/shared/ui/button/Button';
import { Textarea } from '@/shared/ui/textarea/Textarea';
import { cn } from '@/shared/lib/cn';
import { useResumePolishStore } from '../model/store';

export function ResumeInput() {
  const {
    originalText,
    isPolishing,
    language,
    setOriginalText,
    setLanguage,
    polish,
  } = useResumePolishStore();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex rounded-lg border border-zinc-700 bg-zinc-800/50 p-0.5">
          <button
            onClick={() => setLanguage('ko')}
            className={cn(
              'rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-150',
              language === 'ko'
                ? 'bg-zinc-700 text-zinc-50 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            )}
          >
            한국어
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={cn(
              'rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-150',
              language === 'en'
                ? 'bg-zinc-700 text-zinc-50 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            )}
          >
            English
          </button>
        </div>

        <Button
          variant="outline"
          size="sm"
          disabled
          className="gap-1.5 cursor-not-allowed"
        >
          <Upload className="h-3.5 w-3.5" />
          PDF 업로드
          <span className="ml-1 rounded bg-zinc-700 px-1.5 py-0.5 text-xs text-zinc-400">
            준비 중
          </span>
        </Button>
      </div>

      <div className="relative">
        <Textarea
          label="이력서 텍스트"
          id="resume-input"
          value={originalText}
          onChange={(e) => setOriginalText(e.target.value)}
          placeholder="이력서 내용을 붙여넣기 하세요..."
          className="min-h-[320px]"
        />
        <span className="absolute bottom-2.5 right-3 text-xs text-zinc-500">
          {originalText.length.toLocaleString()}자
        </span>
      </div>

      <Button
        onClick={() => void polish()}
        isLoading={isPolishing}
        disabled={!originalText.trim()}
        size="lg"
        className="w-full"
      >
        <Sparkles className="h-4 w-4" />
        AI 폴리싱 시작
      </Button>
    </div>
  );
}
