'use client';

import { Button } from '@/shared/ui/button/Button';
import { Plus, Trash2, X } from '@/shared/ui/icons';

interface SkillCategory {
  name: string;
  skills: string[];
}

interface SkillsFormProps {
  sectionId: string;
  categories: SkillCategory[];
  onUpdate: (id: string, data: Record<string, unknown>) => void;
}

export function SkillsForm({ sectionId, categories, onUpdate }: SkillsFormProps) {
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
                onUpdate(sectionId, { categories: next });
              }}
            />
            <button
              onClick={() => {
                const next = categories.filter((_, i) => i !== ci);
                onUpdate(sectionId, { categories: next });
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
                    onUpdate(sectionId, { categories: next });
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
                onUpdate(sectionId, { categories: next });
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
        onClick={() => onUpdate(sectionId, { categories: [...categories, { name: '', skills: [] }] })}
      >
        <Plus className="h-4 w-4" />
        카테고리 추가
      </Button>
    </div>
  );
}
