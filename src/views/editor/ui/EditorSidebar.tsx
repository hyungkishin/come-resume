'use client';

import { Button } from '@/shared/ui/button/Button';
import { Tabs } from '@/shared/ui/tabs/Tabs';
import { Input } from '@/shared/ui/input/Input';
import { Badge } from '@/shared/ui/badge/Badge';
import { cn } from '@/shared/lib/cn';
import { Plus, Eye, Grip, Trash2, Rocket, Check, ExternalLink } from '@/shared/ui/icons';
import type { PortfolioSection, PortfolioTheme, SectionType } from '@/shared/types';

interface SectionMeta {
  label: string;
  icon: React.ReactNode;
}

interface EditorSidebarProps {
  sections: PortfolioSection[];
  activeId: string | null;
  sideTab: string;
  theme: PortfolioTheme;
  deployState: 'idle' | 'deploying' | 'deployed';
  isSaved: boolean;
  sectionMeta: Record<SectionType, SectionMeta>;
  onTabChange: (tab: string) => void;
  onSelectSection: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onRemoveSection: (id: string) => void;
  onOpenPalette: () => void;
  onThemeChange: (patch: Partial<PortfolioTheme>) => void;
  onDeploy: () => void;
  onSave: () => void;
}

export function EditorSidebar({
  sections,
  activeId,
  sideTab,
  theme,
  deployState,
  isSaved,
  sectionMeta,
  onTabChange,
  onSelectSection,
  onToggleVisibility,
  onRemoveSection,
  onOpenPalette,
  onThemeChange,
  onDeploy,
  onSave,
}: EditorSidebarProps) {
  return (
    <div className="flex w-72 flex-col border-r border-zinc-800 bg-zinc-900/50">
      <div className="border-b border-zinc-800 p-4">
        <h2 className="text-sm font-semibold text-zinc-100">포트폴리오 편집</h2>
      </div>
      <div className="p-3">
        <Tabs
          tabs={[
            { id: 'sections', label: '섹션' },
            { id: 'style', label: '스타일' },
            { id: 'settings', label: '설정' },
          ]}
          activeTab={sideTab}
          onTabChange={onTabChange}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {sideTab === 'sections' && (
          <div className="space-y-1">
            {sections.map(s => {
              const meta = sectionMeta[s.type];
              return (
                <div
                  key={s.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelectSection(s.id)}
                  onKeyDown={(e) => { if (e.key === 'Enter') onSelectSection(s.id); }}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors cursor-pointer',
                    activeId === s.id
                      ? 'bg-blue-500/10 text-blue-400'
                      : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                  )}
                >
                  <Grip className="h-3.5 w-3.5 cursor-grab text-zinc-600" />
                  <span className="flex-1">{meta.label}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); onToggleVisibility(s.id); }}
                    className={cn('p-0.5', s.isVisible ? 'text-zinc-500' : 'text-zinc-700')}
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); onRemoveSection(s.id); }}
                    className="p-0.5 text-zinc-600 hover:text-red-400"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              );
            })}
            <button
              onClick={onOpenPalette}
              className="flex w-full items-center gap-2 rounded-lg border border-dashed border-zinc-700 px-3 py-2 text-sm text-zinc-500 transition-colors hover:border-zinc-500 hover:text-zinc-300"
            >
              <Plus className="h-3.5 w-3.5" />
              섹션 추가
            </button>
          </div>
        )}

        {sideTab === 'style' && (
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">메인 컬러</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={theme.primaryColor}
                  onChange={e => onThemeChange({ primaryColor: e.target.value })}
                  className="h-8 w-8 cursor-pointer rounded border-0 bg-transparent"
                />
                <span className="text-xs text-zinc-500">{theme.primaryColor}</span>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">폰트</label>
              <select
                value={theme.fontFamily}
                onChange={e => onThemeChange({ fontFamily: e.target.value })}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-200"
              >
                <option>Geist Sans</option>
                <option>Inter</option>
                <option>Pretendard</option>
              </select>
            </div>
          </div>
        )}

        {sideTab === 'settings' && (
          <div className="space-y-4">
            <Input label="슬러그" defaultValue="username" />
            <div className="rounded-lg bg-zinc-800/50 p-3">
              <p className="text-xs text-zinc-400">배포 URL</p>
              {deployState === 'deployed' ? (
                <a
                  href="https://username.foliofy.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 flex items-center gap-1 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                >
                  username.foliofy.dev
                  <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                <p className="mt-1 text-sm font-medium text-zinc-200">username.foliofy.dev</p>
              )}
            </div>
            {deployState === 'deployed' && (
              <Badge variant="green" className="flex items-center gap-1.5 w-fit">
                <Check className="h-3 w-3" />
                배포 완료
              </Badge>
            )}
            {deployState === 'deployed' ? (
              <Button size="sm" className="w-full gap-2" onClick={onDeploy}>
                <Rocket className="h-4 w-4" />
                다시 배포
              </Button>
            ) : (
              <Button
                size="sm"
                className="w-full gap-2"
                disabled={deployState === 'deploying'}
                onClick={onDeploy}
              >
                <Rocket className="h-4 w-4" />
                {deployState === 'deploying' ? '배포 중...' : '배포하기'}
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="border-t border-zinc-800 p-3">
        <Button variant="primary" size="sm" className="w-full" onClick={onSave}>
          {isSaved ? '저장됨 ✓' : '저장'}
        </Button>
      </div>
    </div>
  );
}
