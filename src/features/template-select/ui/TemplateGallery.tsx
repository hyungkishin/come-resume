'use client';

import { useState } from 'react';
import { Tabs } from '@/shared/ui/tabs/Tabs';
import { TemplateCard } from '@/entities/template';
import { MOCK_TEMPLATES } from '../model/types';
import type { Template } from '@/entities/template';

type Category = 'all' | Template['category'];

const CATEGORY_TABS = [
  { id: 'all', label: '전체' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'creative', label: 'Creative' },
  { id: 'professional', label: 'Professional' },
  { id: 'developer', label: 'Developer' },
];

interface TemplateGalleryProps {
  selectedId?: string;
  onSelect?: (id: string) => void;
}

export function TemplateGallery({ selectedId, onSelect }: TemplateGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filtered =
    activeCategory === 'all'
      ? MOCK_TEMPLATES
      : MOCK_TEMPLATES.filter((t) => t.category === activeCategory);

  return (
    <div className="flex flex-col gap-5">
      <Tabs
        tabs={CATEGORY_TABS}
        activeTab={activeCategory}
        onTabChange={(id) => setActiveCategory(id as Category)}
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filtered.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            selected={selectedId === template.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
