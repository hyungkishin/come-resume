'use client';

import { Button } from '@/shared/ui/button/Button';
import { Eye, Trash2 } from '@/shared/ui/icons';
import { cn } from '@/shared/lib/cn';
import { useEditorStore } from '../model/store';
import { SECTION_REGISTRY } from '../model/section-registry';
import { HeroEditor } from './sections/HeroEditor';
import { ProjectEditor } from './sections/ProjectEditor';
import { SkillEditor } from './sections/SkillEditor';
import { ExperienceEditor } from './sections/ExperienceEditor';
import { ContactEditor } from './sections/ContactEditor';
import type {
  HeroData,
  AboutData,
  ProjectsData,
  SkillsData,
  ExperienceData,
  ContactData,
} from '../model/types';
import { Input } from '@/shared/ui/input/Input';
import { Textarea } from '@/shared/ui/textarea/Textarea';

export function SectionEditor() {
  const { sections, activeSection, updateSectionData, toggleSectionVisibility, removeSection } =
    useEditorStore();

  const section = sections.find((s) => s.id === activeSection);
  if (!section) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-2 text-zinc-500">
        <p className="text-sm">섹션을 선택하세요</p>
      </div>
    );
  }

  const meta = SECTION_REGISTRY.find((r) => r.type === section.type);
  const label = meta?.label ?? section.type;

  const handleChange = (data: Record<string, unknown>) => {
    updateSectionData(section.id, data);
  };

  const renderEditor = () => {
    switch (section.type) {
      case 'hero':
        return (
          <HeroEditor
            data={section.data as unknown as HeroData}
            onChange={(d) => handleChange(d as unknown as Record<string, unknown>)}
          />
        );
      case 'about':
        return (
          <div className="flex flex-col gap-4">
            <Textarea
              id="about-bio"
              label="자기소개"
              placeholder="자신을 소개해주세요"
              value={(section.data as unknown as AboutData).bio}
              onChange={(e) =>
                handleChange({ ...(section.data as unknown as AboutData), bio: e.target.value })
              }
            />
          </div>
        );
      case 'projects':
        return (
          <ProjectEditor
            data={section.data as unknown as ProjectsData}
            onChange={(d) => handleChange(d as unknown as Record<string, unknown>)}
          />
        );
      case 'skills':
        return (
          <SkillEditor
            data={section.data as unknown as SkillsData}
            onChange={(d) => handleChange(d as unknown as Record<string, unknown>)}
          />
        );
      case 'experience':
        return (
          <ExperienceEditor
            data={section.data as unknown as ExperienceData}
            onChange={(d) => handleChange(d as unknown as Record<string, unknown>)}
          />
        );
      case 'education':
        return (
          <div className="text-sm text-zinc-400">학력 에디터 (ExperienceEditor와 동일 구조)</div>
        );
      case 'contact':
        return (
          <ContactEditor
            data={section.data as unknown as ContactData}
            onChange={(d) => handleChange(d as unknown as Record<string, unknown>)}
          />
        );
      case 'custom':
        return (
          <div className="flex flex-col gap-4">
            <Input
              id="custom-title"
              label="제목"
              placeholder="섹션 제목"
              value={(section.data as unknown as { title: string; content: string }).title}
              onChange={(e) =>
                handleChange({
                  ...(section.data as unknown as { title: string; content: string }),
                  title: e.target.value,
                })
              }
            />
            <Textarea
              id="custom-content"
              label="내용"
              placeholder="자유롭게 내용을 입력하세요"
              value={(section.data as unknown as { title: string; content: string }).content}
              onChange={(e) =>
                handleChange({
                  ...(section.data as unknown as { title: string; content: string }),
                  content: e.target.value,
                })
              }
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
        <span className="text-sm font-semibold text-zinc-100">{label}</span>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleSectionVisibility(section.id)}
            className={cn(!section.isVisible && 'text-zinc-600')}
            title={section.isVisible ? '숨기기' : '표시'}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => removeSection(section.id)}
            title="섹션 삭제"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">{renderEditor()}</div>
    </div>
  );
}
