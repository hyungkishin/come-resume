'use client';

import { Button } from '@/shared/ui/button/Button';
import { Input } from '@/shared/ui/input/Input';
import { Plus, Trash2, X } from '@/shared/ui/icons';

interface ProjectItem {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
}

interface ProjectsFormProps {
  sectionId: string;
  items: ProjectItem[];
  onUpdate: (id: string, data: Record<string, unknown>) => void;
}

export function ProjectsForm({ sectionId, items, onUpdate }: ProjectsFormProps) {
  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div key={idx} className="rounded-lg border border-zinc-800 p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">프로젝트 {idx + 1}</span>
            <button
              onClick={() => {
                const next = items.filter((_, i) => i !== idx);
                onUpdate(sectionId, { items: next });
              }}
              className="text-zinc-600 hover:text-red-400"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <Input label="프로젝트명" value={item.title} onChange={e => {
            const next = items.map((it, i) => i === idx ? { ...it, title: e.target.value } : it);
            onUpdate(sectionId, { items: next });
          }} />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-zinc-300">설명</label>
            <textarea
              className="min-h-[80px] w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={item.description}
              onChange={e => {
                const next = items.map((it, i) => i === idx ? { ...it, description: e.target.value } : it);
                onUpdate(sectionId, { items: next });
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
                      onUpdate(sectionId, { items: next });
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
                  onUpdate(sectionId, { items: next });
                  (e.target as HTMLInputElement).value = '';
                }
              }}
            />
          </div>
          <Input label="GitHub URL" value={item.githubUrl} placeholder="https://github.com/..." onChange={e => {
            const next = items.map((it, i) => i === idx ? { ...it, githubUrl: e.target.value } : it);
            onUpdate(sectionId, { items: next });
          }} />
        </div>
      ))}
      <Button
        size="sm"
        variant="ghost"
        className="w-full gap-2"
        onClick={() => onUpdate(sectionId, { items: [...items, { title: '', description: '', technologies: [], githubUrl: '' }] })}
      >
        <Plus className="h-4 w-4" />
        프로젝트 추가
      </Button>
    </div>
  );
}
