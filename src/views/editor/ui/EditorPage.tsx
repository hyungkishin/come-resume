'use client';

import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/button/Button';
import { Tabs } from '@/shared/ui/tabs/Tabs';
import { cn } from '@/shared/lib/cn';
import {
  Plus, Eye, Zap, FileText, Code2,
  Briefcase, GraduationCap, Mail, BarChart3,
} from '@/shared/ui/icons';
import type { PortfolioSection, SectionType, PortfolioTheme } from '@/shared/types';
import { PortfolioPreview } from './PortfolioPreview';
import { PreviewSection } from './PreviewSection';
import { SectionEditor } from './SectionEditor';
import { EditorSidebar } from './EditorSidebar';
import { SectionPalette } from './SectionPalette';
import { DEFAULT_SECTIONS, DEFAULT_THEME, TEMPLATE_THEMES } from './editorConstants';

const SECTION_META: Record<SectionType, { label: string; icon: React.ReactNode }> = {
  hero: { label: '히어로', icon: <Zap className="h-4 w-4" /> },
  about: { label: '소개', icon: <FileText className="h-4 w-4" /> },
  projects: { label: '프로젝트', icon: <Code2 className="h-4 w-4" /> },
  skills: { label: '기술 스택', icon: <BarChart3 className="h-4 w-4" /> },
  experience: { label: '경력', icon: <Briefcase className="h-4 w-4" /> },
  education: { label: '학력', icon: <GraduationCap className="h-4 w-4" /> },
  contact: { label: '연락처', icon: <Mail className="h-4 w-4" /> },
  custom: { label: '커스텀', icon: <Plus className="h-4 w-4" /> },
};

export function EditorPage() {
  const [sections, setSections] = useState<PortfolioSection[]>(() => {
    if (typeof window === 'undefined') return DEFAULT_SECTIONS;
    try {
      const saved = localStorage.getItem('foliofy-editor-sections');
      if (saved) return JSON.parse(saved) as PortfolioSection[];
    } catch { /* ignore */ }
    return DEFAULT_SECTIONS;
  });
  const [activeId, setActiveId] = useState<string | null>('1');
  const [sideTab, setSideTab] = useState('sections');
  const [paletteOpen, setPaletteOpen] = useState(false);
  const searchParams = useSearchParams();
  const [theme, setTheme] = useState<PortfolioTheme>(() => {
    const templateId = searchParams.get('template');
    if (templateId && TEMPLATE_THEMES[templateId]) {
      return { ...DEFAULT_THEME, templateId, ...TEMPLATE_THEMES[templateId] };
    }
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('foliofy-editor-theme');
        if (saved) return JSON.parse(saved) as PortfolioTheme;
      } catch { /* ignore */ }
    }
    return DEFAULT_THEME;
  });
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [deployState, setDeployState] = useState<'idle' | 'deploying' | 'deployed'>('idle');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('foliofy-editor-sections', JSON.stringify(sections));
      localStorage.setItem('foliofy-editor-theme', JSON.stringify(theme));
    }, 1000);
    return () => clearTimeout(timer);
  }, [sections, theme]);

  const handleSave = useCallback(() => {
    localStorage.setItem('foliofy-editor-sections', JSON.stringify(sections));
    localStorage.setItem('foliofy-editor-theme', JSON.stringify(theme));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  }, [sections, theme]);

  const toggleVisibility = useCallback((id: string) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, isVisible: !s.isVisible } : s));
  }, []);

  const removeSection = useCallback((id: string) => {
    setSections(prev => prev.filter(s => s.id !== id));
    if (activeId === id) setActiveId(null);
  }, [activeId]);

  const addSection = useCallback((type: SectionType) => {
    const newSection: PortfolioSection = {
      id: crypto.randomUUID(),
      type,
      order: sections.length,
      data: {},
      isVisible: true,
    };
    setSections(prev => [...prev, newSection]);
    setActiveId(newSection.id);
    setPaletteOpen(false);
  }, [sections.length]);

  const updateSectionData = useCallback((id: string, newData: Record<string, unknown>) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, data: { ...s.data as Record<string, unknown>, ...newData } } : s));
  }, []);

  const handleDeploy = useCallback(() => {
    if (deployState === 'deployed') {
      setDeployState('idle');
    } else {
      setDeployState('deploying');
      setTimeout(() => setDeployState('deployed'), 2000);
    }
  }, [deployState]);

  const activeSection = sections.find(s => s.id === activeId);

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <EditorSidebar
        sections={sections}
        activeId={activeId}
        sideTab={sideTab}
        theme={theme}
        deployState={deployState}
        isSaved={isSaved}
        sectionMeta={SECTION_META}
        onTabChange={setSideTab}
        onSelectSection={setActiveId}
        onToggleVisibility={toggleVisibility}
        onRemoveSection={removeSection}
        onOpenPalette={() => setPaletteOpen(true)}
        onThemeChange={(patch) => setTheme(prev => ({ ...prev, ...patch }))}
        onDeploy={handleDeploy}
        onSave={handleSave}
      />

      {activeSection && sideTab === 'sections' && (
        <SectionEditor
          section={activeSection}
          sectionMeta={SECTION_META}
          onUpdate={updateSectionData}
          onClose={() => setActiveId(null)}
        />
      )}

      <div className="flex-1 overflow-y-auto bg-zinc-950 p-8">
        <div className="mb-4 flex items-center justify-between">
          <Tabs
            tabs={[{ id: 'desktop', label: '데스크탑' }, { id: 'mobile', label: '모바일' }]}
            activeTab={viewMode}
            onTabChange={(id) => setViewMode(id as 'desktop' | 'mobile')}
          />
          <Button variant="ghost" size="sm" className="gap-1.5" onClick={() => setPreviewOpen(true)}>
            <Eye className="h-3.5 w-3.5" />
            전체 미리보기
          </Button>
        </div>
        <div className={cn('mx-auto space-y-4', viewMode === 'mobile' ? 'max-w-sm' : 'max-w-3xl')}>
          {sections.map(s => (
            <motion.div
              key={s.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                'cursor-pointer transition-shadow',
                activeId === s.id && 'ring-2 ring-blue-500/50 rounded-lg'
              )}
              onClick={() => { setActiveId(s.id); setSideTab('sections'); }}
            >
              <PreviewSection section={s} />
            </motion.div>
          ))}
        </div>
      </div>

      {paletteOpen && (
        <SectionPalette
          sectionMeta={SECTION_META}
          onAdd={addSection}
          onClose={() => setPaletteOpen(false)}
        />
      )}

      <PortfolioPreview
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        sections={sections}
        theme={theme}
      />
    </div>
  );
}
