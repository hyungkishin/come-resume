'use client';

import { useRef, useEffect } from 'react';
import { Check, Palette } from '@/shared/ui/icons';

const TEMPLATES = [
  { id: 'minimal', label: '미니멀', desc: '깔끔하고 단순한 레이아웃', color: 'from-zinc-700 to-zinc-800' },
  { id: 'creative', label: '크리에이티브', desc: '개성 있는 포트폴리오', color: 'from-violet-700 to-purple-800' },
  { id: 'corporate', label: '전문가형', desc: '비즈니스에 적합한 스타일', color: 'from-blue-700 to-blue-900' },
  { id: 'bold', label: '볼드', desc: '강렬한 첫인상을 주는 디자인', color: 'from-orange-600 to-red-700' },
] as const;

export type TemplateId = (typeof TEMPLATES)[number]['id'];

interface Step3TemplateSelectProps {
  selected: TemplateId;
  onSelect: (id: TemplateId) => void;
  isFocusTarget: boolean;
}

export function Step3TemplateSelect({ selected, onSelect, isFocusTarget }: Step3TemplateSelectProps) {
  const firstBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isFocusTarget) {
      firstBtnRef.current?.focus();
    }
  }, [isFocusTarget]);

  return (
    <div
      role="radiogroup"
      aria-label="포트폴리오 템플릿 선택"
      className="grid grid-cols-2 gap-3"
    >
      {TEMPLATES.map((tpl, index) => (
        <button
          key={tpl.id}
          ref={index === 0 ? firstBtnRef : undefined}
          role="radio"
          aria-checked={selected === tpl.id}
          aria-label={`${tpl.label} 템플릿: ${tpl.desc}`}
          onClick={() => onSelect(tpl.id)}
          className={[
            'relative rounded-xl border p-0 text-left transition-all duration-200 overflow-hidden',
            selected === tpl.id
              ? 'border-blue-500 ring-2 ring-blue-500/30'
              : 'border-zinc-700 hover:border-zinc-600',
          ].join(' ')}
        >
          {/* 미리보기 영역 */}
          <div
            className={`h-20 w-full bg-gradient-to-br ${tpl.color} flex items-center justify-center`}
            aria-hidden="true"
          >
            <Palette className="h-6 w-6 text-white/60" />
          </div>
          <div className="p-3">
            <p className="text-sm font-medium text-zinc-100">{tpl.label}</p>
            <p className="mt-0.5 text-xs text-zinc-500">{tpl.desc}</p>
          </div>
          {selected === tpl.id && (
            <div
              aria-hidden="true"
              className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500"
            >
              <Check className="h-3 w-3 text-white" />
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
