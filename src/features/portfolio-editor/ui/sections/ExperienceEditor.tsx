'use client';

import { Button } from '@/shared/ui/button/Button';
import { Input } from '@/shared/ui/input/Input';
import { Textarea } from '@/shared/ui/textarea/Textarea';
import { Plus, Trash2 } from '@/shared/ui/icons';
import type { ExperienceData } from '../../model/types';

interface ExperienceEditorProps {
  data: ExperienceData;
  onChange: (data: ExperienceData) => void;
}

type ExperienceItem = ExperienceData['items'][number];

export function ExperienceEditor({ data, onChange }: ExperienceEditorProps) {
  const addItem = () => {
    onChange({
      items: [
        ...data.items,
        { company: '', role: '', period: '', description: '' },
      ],
    });
  };

  const removeItem = (index: number) => {
    onChange({ items: data.items.filter((_, i) => i !== index) });
  };

  const updateItem = (index: number, field: keyof ExperienceItem, value: string) => {
    const updated = [...data.items];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ items: updated });
  };

  return (
    <div className="flex flex-col gap-4">
      {data.items.map((item, index) => (
        <div key={index} className="rounded-lg border border-zinc-800 p-4 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-zinc-400">경력 {index + 1}</span>
            <Button variant="danger" size="sm" onClick={() => removeItem(index)}>
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
          <Input
            id={`exp-company-${index}`}
            label="회사명"
            placeholder="(주)회사명"
            value={item.company}
            onChange={(e) => updateItem(index, 'company', e.target.value)}
          />
          <Input
            id={`exp-role-${index}`}
            label="직책"
            placeholder="시니어 개발자"
            value={item.role}
            onChange={(e) => updateItem(index, 'role', e.target.value)}
          />
          <Input
            id={`exp-period-${index}`}
            label="기간"
            placeholder="2022.03 - 2024.01"
            value={item.period}
            onChange={(e) => updateItem(index, 'period', e.target.value)}
          />
          <Textarea
            id={`exp-desc-${index}`}
            label="설명"
            placeholder="주요 업무 및 성과를 입력하세요"
            value={item.description}
            onChange={(e) => updateItem(index, 'description', e.target.value)}
            rows={3}
          />
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={addItem} className="self-start">
        <Plus className="h-3.5 w-3.5" />
        경력 추가
      </Button>
    </div>
  );
}
