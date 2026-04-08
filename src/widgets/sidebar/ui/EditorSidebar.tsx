'use client';

import { useState } from 'react';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button/Button';
import { Tabs } from '@/shared/ui/tabs/Tabs';
import { Eye, Trash2, Plus } from '@/shared/ui/icons';
import type { PortfolioSection } from '@/shared/types';

interface EditorSidebarProps {
  sections: PortfolioSection[];
  onTabChange?: (tab: string) => void;
  onAddSection?: () => void;
  onToggleVisibility?: (id: string) => void;
  onDeleteSection?: (id: string) => void;
  onSave?: () => void;
  onPreview?: () => void;
  className?: string;
}

const TABS = [
  { id: 'sections', label: '섹션' },
  { id: 'style', label: '스타일' },
  { id: 'settings', label: '설정' },
];

const SECTION_LABELS: Record<string, string> = {
  hero: '히어로',
  about: '소개',
  projects: '프로젝트',
  skills: '기술 스택',
  experience: '경력',
  education: '학력',
  contact: '연락처',
  custom: '커스텀',
};

export function EditorSidebar({
  sections,
  onTabChange,
  onAddSection,
  onToggleVisibility,
  onDeleteSection,
  onSave,
  onPreview,
  className,
}: EditorSidebarProps) {
  const [activeTab, setActiveTab] = useState('sections');

  function handleTabChange(tab: string) {
    setActiveTab(tab);
    onTabChange?.(tab);
  }

  return (
    <aside
      className={cn(
        'flex h-full w-72 flex-col border-r border-zinc-800 bg-zinc-900/50',
        className
      )}
    >
      <div className="flex items-center border-b border-zinc-800 px-4 py-3">
        <h2 className="text-sm font-semibold text-zinc-100">편집</h2>
      </div>

      <div className="px-4 pt-3">
        <Tabs tabs={TABS} activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3">
        {activeTab === 'sections' && (
          <div className="flex flex-col gap-1">
            {sections.map((section) => (
              <div
                key={section.id}
                className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2"
              >
                <span className="text-sm text-zinc-300">
                  {SECTION_LABELS[section.type] ?? section.type}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onToggleVisibility?.(section.id)}
                    className={cn(
                      'rounded p-1 transition-colors',
                      section.isVisible
                        ? 'text-zinc-400 hover:text-zinc-200'
                        : 'text-zinc-600 hover:text-zinc-400'
                    )}
                    title={section.isVisible ? '숨기기' : '보이기'}
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteSection?.(section.id)}
                    className="rounded p-1 text-zinc-600 transition-colors hover:text-red-400"
                    title="삭제"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              size="sm"
              className="mt-2 w-full"
              onClick={onAddSection}
            >
              <Plus className="h-3.5 w-3.5" />
              섹션 추가
            </Button>
          </div>
        )}

        {activeTab === 'style' && (
          <div className="flex flex-col gap-3">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
              <p className="text-xs text-zinc-500">컬러 / 폰트 / 다크모드 설정</p>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="flex flex-col gap-3">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
              <p className="text-xs text-zinc-500">배포 / 도메인 설정</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 border-t border-zinc-800 px-4 py-3">
        <Button variant="outline" size="sm" className="flex-1" onClick={onPreview}>
          미리보기
        </Button>
        <Button variant="primary" size="sm" className="flex-1" onClick={onSave}>
          저장
        </Button>
      </div>
    </aside>
  );
}
