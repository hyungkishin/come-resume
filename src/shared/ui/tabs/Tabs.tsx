'use client';

import { useRef, type KeyboardEvent } from 'react';
import { cn } from '@/shared/lib/cn';

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onTabChange, className }: TabsProps) {
  const listRef = useRef<HTMLDivElement>(null);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      const next = (index + 1) % tabs.length;
      onTabChange(tabs[next].id);
      const buttons = listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      buttons?.[next]?.focus();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      const prev = (index - 1 + tabs.length) % tabs.length;
      onTabChange(tabs[prev].id);
      const buttons = listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      buttons?.[prev]?.focus();
    }
  }

  return (
    <div
      ref={listRef}
      role="tablist"
      className={cn(
        'flex gap-1 rounded-lg bg-zinc-800/50 p-1',
        className
      )}
    >
      {tabs.map((tab, index) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-150',
              isActive
                ? 'bg-zinc-700 text-zinc-50 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
