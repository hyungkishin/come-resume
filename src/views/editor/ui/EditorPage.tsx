'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/button/Button';
import { Tabs } from '@/shared/ui/tabs/Tabs';
import { cn } from '@/shared/lib/cn';
import {
  Plus, Eye, Grip, Trash2, Zap, FileText, Code2,
  Briefcase, GraduationCap, Mail, BarChart3,
  Rocket, X, Check, ExternalLink,
} from '@/shared/ui/icons';
import type { PortfolioSection, SectionType, PortfolioTheme } from '@/shared/types';
import { Input } from '@/shared/ui/input/Input';
import { Badge } from '@/shared/ui/badge/Badge';

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

const DEFAULT_SECTIONS: PortfolioSection[] = [
  { id: '1', type: 'hero', order: 0, data: { name: '홍길동', title: 'Frontend Developer', subtitle: '사용자 경험을 만드는 개발자' }, isVisible: true },
  { id: '2', type: 'about', order: 1, data: { bio: '3년차 프론트엔드 개발자로, React와 TypeScript를 주력으로 사용합니다.' }, isVisible: true },
  { id: '3', type: 'projects', order: 2, data: { projectIds: [] }, isVisible: true },
  { id: '4', type: 'skills', order: 3, data: { categories: [{ name: 'Frontend', skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'] }, { name: 'Backend', skills: ['Node.js', 'PostgreSQL'] }] }, isVisible: true },
  { id: '5', type: 'experience', order: 4, data: { items: [{ company: '스타트업 A', role: 'Frontend Developer', period: '2024.01 - 현재', description: 'React 기반 대시보드 개발' }] }, isVisible: true },
  { id: '7', type: 'education', order: 5, data: { items: [{ school: '한국대학교', degree: '컴퓨터공학과', period: '2018.03 - 2022.02', description: '학점 3.9/4.5' }] }, isVisible: true },
  { id: '6', type: 'contact', order: 6, data: { email: 'hello@example.com', github: 'username', linkedin: '', website: '' }, isVisible: true },
];

const DEFAULT_THEME: PortfolioTheme = {
  templateId: 'minimal-dark',
  primaryColor: '#3b82f6',
  fontFamily: 'Geist Sans',
  darkMode: true,
  customCSS: null,
};

function PreviewSection({ section }: { section: PortfolioSection }) {
  if (!section.isVisible) return null;
  const data = section.data as Record<string, unknown>;
  const meta = SECTION_META[section.type];

  return (
    <div className="rounded-lg border border-zinc-800/50 bg-zinc-900/30 p-6">
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
        {meta.label}
      </p>
      {section.type === 'hero' && (
        <div>
          <h2 className="text-2xl font-bold text-zinc-50">{(data.name as string) || '이름'}</h2>
          <p className="text-lg text-blue-400">{(data.title as string) || '직함'}</p>
          <p className="mt-1 text-sm text-zinc-400">{(data.subtitle as string) || '소개'}</p>
        </div>
      )}
      {section.type === 'about' && (
        <p className="text-sm leading-relaxed text-zinc-300">{(data.bio as string) || '자기소개를 입력하세요'}</p>
      )}
      {section.type === 'skills' && (
        <div className="flex flex-wrap gap-2">
          {((data.categories as Array<{ name: string; skills: string[] }>) || []).flatMap(c => c.skills).map(s => (
            <span key={s} className="rounded-full bg-blue-500/10 px-2.5 py-1 text-xs text-blue-400">{s}</span>
          ))}
        </div>
      )}
      {section.type === 'experience' && (
        <div className="space-y-2">
          {((data.items as Array<{ company: string; role: string; period: string }>) || []).map((item, i) => (
            <div key={i}>
              <p className="font-medium text-zinc-200">{item.role}</p>
              <p className="text-xs text-zinc-400">{item.company} · {item.period}</p>
            </div>
          ))}
        </div>
      )}
      {section.type === 'contact' && (
        <p className="text-sm text-zinc-400">{(data.email as string) || 'email@example.com'}</p>
      )}
      {section.type === 'projects' && (
        <div className="space-y-2">
          {((data.items as Array<{ title: string; description: string; technologies: string[]; githubUrl: string }>) || []).map((item, i) => (
            <div key={i}>
              <p className="font-medium text-zinc-200">{item.title}</p>
              <p className="text-xs text-zinc-400">{item.description}</p>
              <div className="mt-1 flex flex-wrap gap-1">
                {(item.technologies || []).map(t => (
                  <span key={t} className="rounded-full bg-zinc-700/50 px-2 py-0.5 text-xs text-zinc-300">{t}</span>
                ))}
              </div>
            </div>
          ))}
          {!(data.items as unknown[])?.length && <p className="text-sm text-zinc-500">프로젝트를 추가하세요</p>}
        </div>
      )}
      {section.type === 'education' && (
        <div className="space-y-2">
          {((data.items as Array<{ school: string; degree: string; period: string }>) || []).map((item, i) => (
            <div key={i}>
              <p className="font-medium text-zinc-200">{item.degree}</p>
              <p className="text-xs text-zinc-400">{item.school} · {item.period}</p>
            </div>
          ))}
          {!(data.items as unknown[])?.length && <p className="text-sm text-zinc-500">학력을 추가하세요</p>}
        </div>
      )}
      {section.type === 'custom' && (
        <div>
          <p className="font-medium text-zinc-200">{(data.title as string) || '커스텀 섹션'}</p>
          <p className="mt-1 text-sm text-zinc-400">{(data.content as string) || '내용을 입력하세요'}</p>
        </div>
      )}
    </div>
  );
}

export function EditorPage() {
  const [sections, setSections] = useState<PortfolioSection[]>(DEFAULT_SECTIONS);
  const [activeId, setActiveId] = useState<string | null>('1');
  const [sideTab, setSideTab] = useState('sections');
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [theme, setTheme] = useState<PortfolioTheme>(DEFAULT_THEME);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [deployState, setDeployState] = useState<'idle' | 'deploying' | 'deployed'>('idle');

  const activeSection = sections.find(s => s.id === activeId);

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

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* 좌측 사이드바 */}
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
            onTabChange={setSideTab}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          {sideTab === 'sections' && (
            <div className="space-y-1">
              {sections.map(s => {
                const meta = SECTION_META[s.type];
                return (
                  <div
                    key={s.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveId(s.id)}
                    onKeyDown={(e) => { if (e.key === 'Enter') setActiveId(s.id); }}
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
                      onClick={(e) => { e.stopPropagation(); toggleVisibility(s.id); }}
                      className={cn('p-0.5', s.isVisible ? 'text-zinc-500' : 'text-zinc-700')}
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); removeSection(s.id); }}
                      className="p-0.5 text-zinc-600 hover:text-red-400"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                );
              })}
              <button
                onClick={() => setPaletteOpen(true)}
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
                    onChange={e => setTheme(prev => ({ ...prev, primaryColor: e.target.value }))}
                    className="h-8 w-8 cursor-pointer rounded border-0 bg-transparent"
                  />
                  <span className="text-xs text-zinc-500">{theme.primaryColor}</span>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-400">폰트</label>
                <select
                  value={theme.fontFamily}
                  onChange={e => setTheme(prev => ({ ...prev, fontFamily: e.target.value }))}
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
                <Button
                  size="sm"
                  className="w-full gap-2"
                  onClick={() => setDeployState('idle')}
                >
                  <Rocket className="h-4 w-4" />
                  다시 배포
                </Button>
              ) : (
                <Button
                  size="sm"
                  className="w-full gap-2"
                  disabled={deployState === 'deploying'}
                  onClick={() => {
                    setDeployState('deploying');
                    setTimeout(() => setDeployState('deployed'), 2000);
                  }}
                >
                  <Rocket className="h-4 w-4" />
                  {deployState === 'deploying' ? '배포 중...' : '배포하기'}
                </Button>
              )}
            </div>
          )}
        </div>

        <div className="border-t border-zinc-800 p-3">
          <Button variant="primary" size="sm" className="w-full">저장</Button>
        </div>
      </div>

      {/* 중앙 편집 영역 */}
      {activeSection && sideTab === 'sections' ? (
        <div className="w-80 border-r border-zinc-800 bg-zinc-900/30 overflow-y-auto">
          <div className="flex items-center justify-between border-b border-zinc-800 p-4">
            <h3 className="text-sm font-semibold text-zinc-100">
              {SECTION_META[activeSection.type].label} 편집
            </h3>
            <button onClick={() => setActiveId(null)} className="text-zinc-500 hover:text-zinc-300">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-4 p-4">
            {activeSection.type === 'hero' && (
              <>
                <Input label="이름" value={(activeSection.data as Record<string, string>).name || ''} onChange={e => updateSectionData(activeSection.id, { name: e.target.value })} />
                <Input label="직함" value={(activeSection.data as Record<string, string>).title || ''} onChange={e => updateSectionData(activeSection.id, { title: e.target.value })} />
                <Input label="한줄 소개" value={(activeSection.data as Record<string, string>).subtitle || ''} onChange={e => updateSectionData(activeSection.id, { subtitle: e.target.value })} />
              </>
            )}
            {activeSection.type === 'about' && (
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-zinc-300">자기소개</label>
                <textarea
                  className="min-h-[120px] w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={(activeSection.data as Record<string, string>).bio || ''}
                  onChange={e => updateSectionData(activeSection.id, { bio: e.target.value })}
                />
              </div>
            )}
            {activeSection.type === 'contact' && (
              <>
                <Input label="이메일" value={(activeSection.data as Record<string, string>).email || ''} onChange={e => updateSectionData(activeSection.id, { email: e.target.value })} />
                <Input label="GitHub" value={(activeSection.data as Record<string, string>).github || ''} onChange={e => updateSectionData(activeSection.id, { github: e.target.value })} />
                <Input label="LinkedIn" value={(activeSection.data as Record<string, string>).linkedin || ''} onChange={e => updateSectionData(activeSection.id, { linkedin: e.target.value })} />
                <Input label="웹사이트" value={(activeSection.data as Record<string, string>).website || ''} onChange={e => updateSectionData(activeSection.id, { website: e.target.value })} />
              </>
            )}
            {activeSection.type === 'skills' && (() => {
              const skillData = activeSection.data as { categories?: Array<{ name: string; skills: string[] }> };
              const categories = skillData.categories ?? [];
              return (
                <div className="space-y-4">
                  {categories.map((cat, ci) => (
                    <div key={ci} className="rounded-lg border border-zinc-800 p-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="카테고리명"
                          value={cat.name}
                          onChange={e => {
                            const next = categories.map((c, i) => i === ci ? { ...c, name: e.target.value } : c);
                            updateSectionData(activeSection.id, { categories: next });
                          }}
                        />
                        <button
                          onClick={() => {
                            const next = categories.filter((_, i) => i !== ci);
                            updateSectionData(activeSection.id, { categories: next });
                          }}
                          className="text-zinc-600 hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.skills.map((skill, si) => (
                          <span key={si} className="flex items-center gap-1 rounded-full bg-blue-500/10 px-2.5 py-1 text-xs text-blue-400">
                            {skill}
                            <button
                              onClick={() => {
                                const next = categories.map((c, i) => i === ci ? { ...c, skills: c.skills.filter((_, j) => j !== si) } : c);
                                updateSectionData(activeSection.id, { categories: next });
                              }}
                              className="hover:text-red-400"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <input
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="스킬 입력 후 Enter"
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            const val = (e.target as HTMLInputElement).value.trim();
                            if (!val) return;
                            const next = categories.map((c, i) => i === ci ? { ...c, skills: [...c.skills, val] } : c);
                            updateSectionData(activeSection.id, { categories: next });
                            (e.target as HTMLInputElement).value = '';
                          }
                        }}
                      />
                    </div>
                  ))}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-full gap-2"
                    onClick={() => updateSectionData(activeSection.id, { categories: [...categories, { name: '', skills: [] }] })}
                  >
                    <Plus className="h-4 w-4" />
                    카테고리 추가
                  </Button>
                </div>
              );
            })()}
            {activeSection.type === 'experience' && (() => {
              const expData = activeSection.data as { items?: Array<{ company: string; role: string; period: string; description: string }> };
              const items = expData.items ?? [];
              return (
                <div className="space-y-4">
                  {items.map((item, idx) => (
                    <div key={idx} className="rounded-lg border border-zinc-800 p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-zinc-400">경력 {idx + 1}</span>
                        <button
                          onClick={() => {
                            const next = items.filter((_, i) => i !== idx);
                            updateSectionData(activeSection.id, { items: next });
                          }}
                          className="text-zinc-600 hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <Input label="회사명" value={item.company} onChange={e => {
                        const next = items.map((it, i) => i === idx ? { ...it, company: e.target.value } : it);
                        updateSectionData(activeSection.id, { items: next });
                      }} />
                      <Input label="직함" value={item.role} onChange={e => {
                        const next = items.map((it, i) => i === idx ? { ...it, role: e.target.value } : it);
                        updateSectionData(activeSection.id, { items: next });
                      }} />
                      <Input label="기간" value={item.period} placeholder="예: 2024.01 - 현재" onChange={e => {
                        const next = items.map((it, i) => i === idx ? { ...it, period: e.target.value } : it);
                        updateSectionData(activeSection.id, { items: next });
                      }} />
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-zinc-300">설명</label>
                        <textarea
                          className="min-h-[80px] w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={item.description}
                          onChange={e => {
                            const next = items.map((it, i) => i === idx ? { ...it, description: e.target.value } : it);
                            updateSectionData(activeSection.id, { items: next });
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-full gap-2"
                    onClick={() => updateSectionData(activeSection.id, { items: [...items, { company: '', role: '', period: '', description: '' }] })}
                  >
                    <Plus className="h-4 w-4" />
                    경력 추가
                  </Button>
                </div>
              );
            })()}
            {activeSection.type === 'education' && (() => {
              const eduData = activeSection.data as { items?: Array<{ school: string; degree: string; period: string; description: string }> };
              const items = eduData.items ?? [];
              return (
                <div className="space-y-4">
                  {items.map((item, idx) => (
                    <div key={idx} className="rounded-lg border border-zinc-800 p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-zinc-400">학력 {idx + 1}</span>
                        <button
                          onClick={() => {
                            const next = items.filter((_, i) => i !== idx);
                            updateSectionData(activeSection.id, { items: next });
                          }}
                          className="text-zinc-600 hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <Input label="학교명" value={item.school} onChange={e => {
                        const next = items.map((it, i) => i === idx ? { ...it, school: e.target.value } : it);
                        updateSectionData(activeSection.id, { items: next });
                      }} />
                      <Input label="학과/전공" value={item.degree} onChange={e => {
                        const next = items.map((it, i) => i === idx ? { ...it, degree: e.target.value } : it);
                        updateSectionData(activeSection.id, { items: next });
                      }} />
                      <Input label="기간" value={item.period} placeholder="예: 2018.03 - 2022.02" onChange={e => {
                        const next = items.map((it, i) => i === idx ? { ...it, period: e.target.value } : it);
                        updateSectionData(activeSection.id, { items: next });
                      }} />
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-zinc-300">설명</label>
                        <textarea
                          className="min-h-[80px] w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={item.description}
                          onChange={e => {
                            const next = items.map((it, i) => i === idx ? { ...it, description: e.target.value } : it);
                            updateSectionData(activeSection.id, { items: next });
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-full gap-2"
                    onClick={() => updateSectionData(activeSection.id, { items: [...items, { school: '', degree: '', period: '', description: '' }] })}
                  >
                    <Plus className="h-4 w-4" />
                    학력 추가
                  </Button>
                </div>
              );
            })()}
            {activeSection.type === 'projects' && (() => {
              const projData = activeSection.data as { items?: Array<{ title: string; description: string; technologies: string[]; githubUrl: string }> };
              const items = projData.items ?? [];
              return (
                <div className="space-y-4">
                  {items.map((item, idx) => (
                    <div key={idx} className="rounded-lg border border-zinc-800 p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-zinc-400">프로젝트 {idx + 1}</span>
                        <button
                          onClick={() => {
                            const next = items.filter((_, i) => i !== idx);
                            updateSectionData(activeSection.id, { items: next });
                          }}
                          className="text-zinc-600 hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <Input label="프로젝트명" value={item.title} onChange={e => {
                        const next = items.map((it, i) => i === idx ? { ...it, title: e.target.value } : it);
                        updateSectionData(activeSection.id, { items: next });
                      }} />
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-zinc-300">설명</label>
                        <textarea
                          className="min-h-[80px] w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={item.description}
                          onChange={e => {
                            const next = items.map((it, i) => i === idx ? { ...it, description: e.target.value } : it);
                            updateSectionData(activeSection.id, { items: next });
                          }}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-zinc-300">기술 스택</label>
                        <div className="flex flex-wrap gap-1.5 mb-1">
                          {(item.technologies || []).map((tech, ti) => (
                            <span key={ti} className="flex items-center gap-1 rounded-full bg-zinc-700/50 px-2.5 py-1 text-xs text-zinc-300">
                              {tech}
                              <button
                                onClick={() => {
                                  const next = items.map((it, i) => i === idx ? { ...it, technologies: it.technologies.filter((_, j) => j !== ti) } : it);
                                  updateSectionData(activeSection.id, { items: next });
                                }}
                                className="hover:text-red-400"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                        <input
                          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="기술 입력 후 Enter"
                          onKeyDown={e => {
                            if (e.key === 'Enter') {
                              const val = (e.target as HTMLInputElement).value.trim();
                              if (!val) return;
                              const next = items.map((it, i) => i === idx ? { ...it, technologies: [...(it.technologies || []), val] } : it);
                              updateSectionData(activeSection.id, { items: next });
                              (e.target as HTMLInputElement).value = '';
                            }
                          }}
                        />
                      </div>
                      <Input label="GitHub URL" value={item.githubUrl} placeholder="https://github.com/..." onChange={e => {
                        const next = items.map((it, i) => i === idx ? { ...it, githubUrl: e.target.value } : it);
                        updateSectionData(activeSection.id, { items: next });
                      }} />
                    </div>
                  ))}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-full gap-2"
                    onClick={() => updateSectionData(activeSection.id, { items: [...items, { title: '', description: '', technologies: [], githubUrl: '' }] })}
                  >
                    <Plus className="h-4 w-4" />
                    프로젝트 추가
                  </Button>
                </div>
              );
            })()}
            {activeSection.type === 'custom' && (
              <>
                <Input
                  label="제목"
                  value={(activeSection.data as Record<string, string>).title || ''}
                  onChange={e => updateSectionData(activeSection.id, { title: e.target.value })}
                />
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-zinc-300">내용</label>
                  <textarea
                    className="min-h-[120px] w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={(activeSection.data as Record<string, string>).content || ''}
                    onChange={e => updateSectionData(activeSection.id, { content: e.target.value })}
                    placeholder="내용을 입력하세요"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      ) : null}

      {/* 미리보기 */}
      <div className="flex-1 overflow-y-auto bg-zinc-950 p-8">
        <div className="mb-4 flex items-center justify-between">
          <Tabs
            tabs={[{ id: 'desktop', label: '데스크탑' }, { id: 'mobile', label: '모바일' }]}
            activeTab={viewMode}
            onTabChange={(id) => setViewMode(id as 'desktop' | 'mobile')}
          />
          <Button variant="ghost" size="sm" className="gap-1.5">
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

      {/* 섹션 추가 팔레트 */}
      {paletteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setPaletteOpen(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="mb-4 text-lg font-semibold text-zinc-50">섹션 추가</h3>
            <div className="grid grid-cols-2 gap-2">
              {(Object.entries(SECTION_META) as [SectionType, { label: string; icon: React.ReactNode }][]).map(([type, meta]) => (
                <button
                  key={type}
                  onClick={() => addSection(type)}
                  className="flex items-center gap-3 rounded-xl border border-zinc-800 p-3 text-left transition-colors hover:border-zinc-600 hover:bg-zinc-800"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400">
                    {meta.icon}
                  </div>
                  <span className="text-sm font-medium text-zinc-200">{meta.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
