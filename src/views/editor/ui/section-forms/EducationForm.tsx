'use client';

import { Button } from '@/shared/ui/button/Button';
import { Input } from '@/shared/ui/input/Input';
import { Plus, Trash2 } from '@/shared/ui/icons';

interface EducationItem {
  school: string;
  degree: string;
  period: string;
  description: string;
}

interface EducationFormProps {
  sectionId: string;
  items: EducationItem[];
  onUpdate: (id: string, data: Record<string, unknown>) => void;
}

export function EducationForm({ sectionId, items, onUpdate }: EducationFormProps) {
  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div key={idx} className="rounded-lg border border-zinc-800 p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">학력 {idx + 1}</span>
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
          <Input label="학교명" value={item.school} onChange={e => {
            const next = items.map((it, i) => i === idx ? { ...it, school: e.target.value } : it);
            onUpdate(sectionId, { items: next });
          }} />
          <Input label="학과/전공" value={item.degree} onChange={e => {
            const next = items.map((it, i) => i === idx ? { ...it, degree: e.target.value } : it);
            onUpdate(sectionId, { items: next });
          }} />
          <Input label="기간" value={item.period} placeholder="예: 2018.03 - 2022.02" onChange={e => {
            const next = items.map((it, i) => i === idx ? { ...it, period: e.target.value } : it);
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
        </div>
      ))}
      <Button
        size="sm"
        variant="ghost"
        className="w-full gap-2"
        onClick={() => onUpdate(sectionId, { items: [...items, { school: '', degree: '', period: '', description: '' }] })}
      >
        <Plus className="h-4 w-4" />
        학력 추가
      </Button>
    </div>
  );
}
