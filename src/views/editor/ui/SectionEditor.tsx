'use client';

import { X } from '@/shared/ui/icons';
import { Input } from '@/shared/ui/input/Input';
import type { PortfolioSection, SectionType } from '@/shared/types';
import { SkillsForm } from './section-forms/SkillsForm';
import { ExperienceForm } from './section-forms/ExperienceForm';
import { EducationForm } from './section-forms/EducationForm';
import { ProjectsForm } from './section-forms/ProjectsForm';

interface SectionMeta {
  label: string;
  icon: React.ReactNode;
}

interface SectionEditorProps {
  section: PortfolioSection;
  sectionMeta: Record<SectionType, SectionMeta>;
  onUpdate: (id: string, data: Record<string, unknown>) => void;
  onClose: () => void;
}

export function SectionEditor({ section, sectionMeta, onUpdate, onClose }: SectionEditorProps) {
  const data = section.data as Record<string, unknown>;

  return (
    <div className="w-80 border-r border-zinc-800 bg-zinc-900/30 overflow-y-auto">
      <div className="flex items-center justify-between border-b border-zinc-800 p-4">
        <h3 className="text-sm font-semibold text-zinc-100">
          {sectionMeta[section.type].label} 편집
        </h3>
        <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="space-y-4 p-4">
        {section.type === 'hero' && (
          <>
            <Input label="이름" value={(data as Record<string, string>).name || ''} onChange={e => onUpdate(section.id, { name: e.target.value })} />
            <Input label="직함" value={(data as Record<string, string>).title || ''} onChange={e => onUpdate(section.id, { title: e.target.value })} />
            <Input label="한줄 소개" value={(data as Record<string, string>).subtitle || ''} onChange={e => onUpdate(section.id, { subtitle: e.target.value })} />
          </>
        )}
        {section.type === 'about' && (
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-zinc-300">자기소개</label>
            <textarea
              className="min-h-[120px] w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={(data as Record<string, string>).bio || ''}
              onChange={e => onUpdate(section.id, { bio: e.target.value })}
            />
          </div>
        )}
        {section.type === 'contact' && (
          <>
            <Input label="이메일" value={(data as Record<string, string>).email || ''} onChange={e => onUpdate(section.id, { email: e.target.value })} />
            <Input label="GitHub" value={(data as Record<string, string>).github || ''} onChange={e => onUpdate(section.id, { github: e.target.value })} />
            <Input label="LinkedIn" value={(data as Record<string, string>).linkedin || ''} onChange={e => onUpdate(section.id, { linkedin: e.target.value })} />
            <Input label="웹사이트" value={(data as Record<string, string>).website || ''} onChange={e => onUpdate(section.id, { website: e.target.value })} />
          </>
        )}
        {section.type === 'skills' && (
          <SkillsForm
            sectionId={section.id}
            categories={(section.data as { categories?: Array<{ name: string; skills: string[] }> }).categories ?? []}
            onUpdate={onUpdate}
          />
        )}
        {section.type === 'experience' && (
          <ExperienceForm
            sectionId={section.id}
            items={(section.data as { items?: Array<{ company: string; role: string; period: string; description: string }> }).items ?? []}
            onUpdate={onUpdate}
          />
        )}
        {section.type === 'education' && (
          <EducationForm
            sectionId={section.id}
            items={(section.data as { items?: Array<{ school: string; degree: string; period: string; description: string }> }).items ?? []}
            onUpdate={onUpdate}
          />
        )}
        {section.type === 'projects' && (
          <ProjectsForm
            sectionId={section.id}
            items={(section.data as { items?: Array<{ title: string; description: string; technologies: string[]; githubUrl: string }> }).items ?? []}
            onUpdate={onUpdate}
          />
        )}
        {section.type === 'custom' && (
          <>
            <Input
              label="제목"
              value={(data as Record<string, string>).title || ''}
              onChange={e => onUpdate(section.id, { title: e.target.value })}
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-300">내용</label>
              <textarea
                className="min-h-[120px] w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={(data as Record<string, string>).content || ''}
                onChange={e => onUpdate(section.id, { content: e.target.value })}
                placeholder="내용을 입력하세요"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
