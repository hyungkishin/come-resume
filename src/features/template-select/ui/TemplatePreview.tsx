'use client';

import { Button } from '@/shared/ui/button/Button';
import { Badge } from '@/shared/ui/badge/Badge';
import { Check } from '@/shared/ui/icons';
import { MOCK_TEMPLATES } from '../model/types';

interface TemplatePreviewProps {
  templateId: string;
  onApply?: (id: string) => void;
}

export function TemplatePreview({ templateId, onApply }: TemplatePreviewProps) {
  const template = MOCK_TEMPLATES.find((t) => t.id === templateId);

  if (!template) return null;

  const gradientStyle =
    template.colors.length >= 2
      ? { background: `linear-gradient(135deg, ${template.colors.join(', ')})` }
      : { backgroundColor: template.colors[0] ?? '#27272a' };

  return (
    <div className="flex flex-col gap-6">
      <div
        className="relative h-64 w-full overflow-hidden rounded-2xl border border-zinc-800"
        style={gradientStyle}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white/40">{template.name}</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-zinc-50">{template.name}</h3>
            <p className="text-sm text-zinc-400">{template.description}</p>
          </div>
          {template.isPremium && <Badge variant="amber">Pro</Badge>}
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">컬러 스킴</span>
          <div className="flex gap-2">
            {template.colors.map((color, i) => (
              <div
                key={i}
                className="h-8 w-8 rounded-full border border-zinc-700 shadow-sm"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={() => onApply?.(template.id)}
        >
          <Check className="h-5 w-5" />
          이 템플릿 적용하기
        </Button>
      </div>
    </div>
  );
}
