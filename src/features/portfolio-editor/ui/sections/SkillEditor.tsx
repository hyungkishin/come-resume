'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button/Button';
import { Input } from '@/shared/ui/input/Input';
import { Badge } from '@/shared/ui/badge/Badge';
import { Plus, Trash2, X } from '@/shared/ui/icons';
import type { SkillsData } from '../../model/types';

interface SkillEditorProps {
  data: SkillsData;
  onChange: (data: SkillsData) => void;
}

export function SkillEditor({ data, onChange }: SkillEditorProps) {
  const [newSkillInputs, setNewSkillInputs] = useState<Record<number, string>>({});

  const addCategory = () => {
    onChange({
      categories: [...data.categories, { name: '', skills: [] }],
    });
  };

  const removeCategory = (index: number) => {
    onChange({ categories: data.categories.filter((_, i) => i !== index) });
  };

  const updateCategoryName = (index: number, name: string) => {
    const updated = [...data.categories];
    updated[index] = { ...updated[index], name };
    onChange({ categories: updated });
  };

  const addSkill = (categoryIndex: number) => {
    const skill = (newSkillInputs[categoryIndex] ?? '').trim();
    if (!skill) return;
    const updated = [...data.categories];
    updated[categoryIndex] = {
      ...updated[categoryIndex],
      skills: [...updated[categoryIndex].skills, skill],
    };
    onChange({ categories: updated });
    setNewSkillInputs((prev) => ({ ...prev, [categoryIndex]: '' }));
  };

  const removeSkill = (categoryIndex: number, skillIndex: number) => {
    const updated = [...data.categories];
    updated[categoryIndex] = {
      ...updated[categoryIndex],
      skills: updated[categoryIndex].skills.filter((_, i) => i !== skillIndex),
    };
    onChange({ categories: updated });
  };

  return (
    <div className="flex flex-col gap-5">
      {data.categories.map((category, catIndex) => (
        <div key={catIndex} className="rounded-lg border border-zinc-800 p-4 flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            <Input
              id={`category-name-${catIndex}`}
              placeholder="카테고리명 (예: Frontend)"
              value={category.name}
              onChange={(e) => updateCategoryName(catIndex, e.target.value)}
              className="flex-1"
            />
            <Button
              variant="danger"
              size="sm"
              onClick={() => removeCategory(catIndex)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 min-h-[28px]">
            {category.skills.map((skill, skillIndex) => (
              <Badge key={skillIndex} variant="blue" className="gap-1 pr-1">
                {skill}
                <button
                  onClick={() => removeSkill(catIndex, skillIndex)}
                  className="ml-0.5 rounded-full hover:bg-blue-500/20 p-0.5 transition-colors"
                >
                  <X className="h-2.5 w-2.5" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              id={`new-skill-${catIndex}`}
              placeholder="스킬 추가"
              value={newSkillInputs[catIndex] ?? ''}
              onChange={(e) =>
                setNewSkillInputs((prev) => ({ ...prev, [catIndex]: e.target.value }))
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addSkill(catIndex);
                }
              }}
              className="flex-1"
            />
            <Button variant="secondary" size="sm" onClick={() => addSkill(catIndex)}>
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={addCategory} className="self-start">
        <Plus className="h-3.5 w-3.5" />
        카테고리 추가
      </Button>
    </div>
  );
}
