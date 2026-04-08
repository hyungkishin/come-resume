'use client';

import { Card } from '@/shared/ui/card/Card';
import { Badge } from '@/shared/ui/badge/Badge';
import { Check } from '@/shared/ui/icons';
import { cn } from '@/shared/lib/cn';
import type { Template } from '../model/types';

interface TemplateCardProps {
  template: Template;
  selected?: boolean;
  onSelect?: (id: string) => void;
}

export function TemplateCard({ template, selected = false, onSelect }: TemplateCardProps) {
  const { id, name, description, isPremium, colors } = template;

  const gradientStyle =
    colors.length >= 2
      ? { background: `linear-gradient(135deg, ${colors.join(', ')})` }
      : { backgroundColor: colors[0] ?? '#27272a' };

  return (
    <Card
      hover
      onClick={() => onSelect?.(id)}
      className={cn(
        'cursor-pointer p-0 overflow-hidden transition-all duration-200',
        selected && 'border-blue-500 ring-1 ring-blue-500'
      )}
    >
      <div className="relative h-40 flex items-center justify-center" style={gradientStyle}>
        {selected && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
              <Check className="h-4 w-4 text-white" />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5 p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-zinc-100">{name}</h3>
          {isPremium && <Badge variant="amber">Pro</Badge>}
        </div>
        {description && (
          <p className="text-xs text-zinc-400 leading-relaxed">{description}</p>
        )}
      </div>
    </Card>
  );
}
