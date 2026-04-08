'use client';

import { useState } from 'react';
import { cn } from '@/shared/lib/cn';
import type { PortfolioSection, PortfolioTheme } from '@/shared/types';

interface PreviewFrameProps {
  sections: PortfolioSection[];
  theme: PortfolioTheme;
  className?: string;
}

function DesktopIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

function MobileIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <circle cx="12" cy="18" r="1" fill="currentColor" />
    </svg>
  );
}

function SectionPlaceholder({ section }: { section: PortfolioSection }) {
  const data = section.data as Record<string, string>;

  switch (section.type) {
    case 'hero':
      return (
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <h1 className="text-3xl font-bold text-zinc-100">{data.name ?? '이름'}</h1>
          <p className="text-lg text-zinc-400">{data.title ?? '직함'}</p>
        </div>
      );
    case 'about':
      return (
        <div className="py-8">
          <h2 className="mb-3 text-xl font-semibold text-zinc-100">소개</h2>
          <p className="text-sm leading-relaxed text-zinc-400">
            {data.bio ?? '자기소개 텍스트가 여기에 표시됩니다.'}
          </p>
        </div>
      );
    case 'projects':
      return (
        <div className="py-8">
          <h2 className="mb-3 text-xl font-semibold text-zinc-100">프로젝트</h2>
          <div className="rounded-lg border border-zinc-800 bg-zinc-800/30 p-4">
            <p className="text-xs text-zinc-500">프로젝트 섹션</p>
          </div>
        </div>
      );
    case 'skills': {
      const tags = (data.skills ?? '').split(',').filter(Boolean);
      return (
        <div className="py-8">
          <h2 className="mb-3 text-xl font-semibold text-zinc-100">기술 스택</h2>
          <div className="flex flex-wrap gap-2">
            {tags.length > 0
              ? tags.map((tag) => (
                  <span key={tag} className="rounded-md bg-zinc-800 px-2.5 py-1 text-xs text-zinc-300">
                    {tag.trim()}
                  </span>
                ))
              : ['TypeScript', 'React', 'Next.js'].map((tag) => (
                  <span key={tag} className="rounded-md bg-zinc-800 px-2.5 py-1 text-xs text-zinc-300">
                    {tag}
                  </span>
                ))}
          </div>
        </div>
      );
    }
    case 'experience':
      return (
        <div className="py-8">
          <h2 className="mb-3 text-xl font-semibold text-zinc-100">경력</h2>
          <ul className="flex flex-col gap-2">
            <li className="rounded-lg border border-zinc-800 bg-zinc-800/30 p-3">
              <p className="text-xs text-zinc-500">경력 항목</p>
            </li>
          </ul>
        </div>
      );
    case 'education':
      return (
        <div className="py-8">
          <h2 className="mb-3 text-xl font-semibold text-zinc-100">학력</h2>
          <ul className="flex flex-col gap-2">
            <li className="rounded-lg border border-zinc-800 bg-zinc-800/30 p-3">
              <p className="text-xs text-zinc-500">학력 항목</p>
            </li>
          </ul>
        </div>
      );
    case 'contact':
      return (
        <div className="py-8">
          <h2 className="mb-3 text-xl font-semibold text-zinc-100">연락처</h2>
          <p className="text-sm text-zinc-400">{data.email ?? 'email@example.com'}</p>
        </div>
      );
    case 'custom':
      return (
        <div className="py-8">
          <h2 className="mb-3 text-xl font-semibold text-zinc-100">커스텀</h2>
          <div className="rounded-lg border border-zinc-800 bg-zinc-800/30 p-4">
            <p className="text-xs text-zinc-500">커스텀 콘텐츠</p>
          </div>
        </div>
      );
    default:
      return null;
  }
}

export function PreviewFrame({ sections, theme, className }: PreviewFrameProps) {
  const [isMobile, setIsMobile] = useState(false);

  const visibleSections = sections
    .filter((s) => s.isVisible)
    .sort((a, b) => a.order - b.order);

  return (
    <div className={cn('flex h-full flex-col', className)}>
      <div className="flex items-center justify-end gap-1 border-b border-zinc-800 px-4 py-2">
        <button
          onClick={() => setIsMobile(false)}
          className={cn(
            'rounded-md p-1.5 transition-colors',
            !isMobile ? 'bg-zinc-700 text-zinc-200' : 'text-zinc-500 hover:text-zinc-300'
          )}
          title="데스크탑"
        >
          <DesktopIcon className="h-4 w-4" />
        </button>
        <button
          onClick={() => setIsMobile(true)}
          className={cn(
            'rounded-md p-1.5 transition-colors',
            isMobile ? 'bg-zinc-700 text-zinc-200' : 'text-zinc-500 hover:text-zinc-300'
          )}
          title="모바일"
        >
          <MobileIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-1 items-start justify-center overflow-y-auto p-6">
        <div
          className={cn(
            'w-full rounded-xl border border-zinc-800 px-6',
            isMobile && 'max-w-sm mx-auto',
            theme.darkMode ? 'bg-zinc-950' : 'bg-white'
          )}
        >
          {visibleSections.length === 0 ? (
            <div className="flex items-center justify-center py-16">
              <p className="text-sm text-zinc-600">섹션을 추가해 주세요.</p>
            </div>
          ) : (
            visibleSections.map((section) => (
              <SectionPlaceholder key={section.id} section={section} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
