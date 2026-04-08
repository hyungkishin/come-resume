'use client';

import {
  DndContext,
  closestCenter,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/shared/lib/cn';
import { Grip, Eye } from '@/shared/ui/icons';
import { useEditorStore } from '../model/store';
import { SECTION_REGISTRY } from '../model/section-registry';
import type { PortfolioSection } from '@/shared/types';

interface SortableItemProps {
  section: PortfolioSection;
  isActive: boolean;
  onSelect: () => void;
  onToggleVisibility: () => void;
}

function SortableItem({ section, isActive, onSelect, onToggleVisibility }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const meta = SECTION_REGISTRY.find((r) => r.type === section.type);
  const label = meta?.label ?? section.type;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex items-center gap-2 rounded-lg border px-3 py-2.5 cursor-pointer',
        'transition-colors duration-150 select-none',
        isDragging ? 'opacity-50 border-blue-500/50 bg-blue-500/5' : 'border-zinc-800 bg-zinc-900',
        isActive && !isDragging && 'border-blue-500 bg-blue-500/10',
        !isActive && !isDragging && 'hover:border-zinc-700 hover:bg-zinc-800/50'
      )}
      onClick={onSelect}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-zinc-600 hover:text-zinc-400 transition-colors p-0.5 -ml-0.5"
        onClick={(e) => e.stopPropagation()}
      >
        <Grip className="h-4 w-4" />
      </button>

      <span className="flex-1 text-sm font-medium text-zinc-200">{label}</span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleVisibility();
        }}
        className={cn(
          'p-1 rounded transition-colors',
          section.isVisible
            ? 'text-zinc-400 hover:text-zinc-200'
            : 'text-zinc-700 hover:text-zinc-500'
        )}
        title={section.isVisible ? '숨기기' : '표시'}
      >
        <Eye className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export function DragDropCanvas() {
  const { sections, activeSection, reorderSections, setActiveSection, toggleSectionVisibility } =
    useEditorStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderSections(String(active.id), String(over.id));
    }
  };

  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={sortedSections.map((s) => s.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-1.5 p-3">
          {sortedSections.map((section) => (
            <SortableItem
              key={section.id}
              section={section}
              isActive={activeSection === section.id}
              onSelect={() => setActiveSection(section.id)}
              onToggleVisibility={() => toggleSectionVisibility(section.id)}
            />
          ))}
          {sortedSections.length === 0 && (
            <p className="text-center text-sm text-zinc-600 py-6">
              섹션을 추가하세요
            </p>
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
}
