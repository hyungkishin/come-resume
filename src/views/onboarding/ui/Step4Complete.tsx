'use client';

import { useRef, useEffect } from 'react';
import { Sparkles } from '@/shared/ui/icons';

const TEMPLATE_LABELS: Record<string, string> = {
  minimal: '미니멀',
  creative: '크리에이티브',
  corporate: '전문가형',
  bold: '볼드',
};

interface Step4CompleteProps {
  profileName: string;
  selectedTemplate: string;
  isFocusTarget: boolean;
}

export function Step4Complete({ profileName, selectedTemplate, isFocusTarget }: Step4CompleteProps) {
  const headingRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (isFocusTarget) {
      headingRef.current?.focus();
    }
  }, [isFocusTarget]);

  const templateLabel = TEMPLATE_LABELS[selectedTemplate] ?? selectedTemplate;

  return (
    <div className="py-4 text-center">
      <div
        aria-hidden="true"
        className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10"
      >
        <Sparkles className="h-8 w-8 text-blue-400" />
      </div>
      <p
        ref={headingRef}
        tabIndex={-1}
        className="text-sm text-zinc-300 focus:outline-none"
      >
        <span className="font-semibold text-zinc-100">{profileName || '포트폴리오'}</span>가 준비되었어요.
      </p>
      <p className="mt-1.5 text-sm text-zinc-400">선택한 템플릿으로 편집 화면으로 이동합니다.</p>
      <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-800/50 px-4 py-3 text-left">
        <p className="text-xs text-zinc-500">선택한 템플릿</p>
        <p className="mt-0.5 text-sm font-medium text-zinc-200">{templateLabel}</p>
      </div>
    </div>
  );
}
