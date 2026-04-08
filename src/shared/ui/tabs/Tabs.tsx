'use client';

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
  return (
    <div
      className={cn(
        'flex gap-1 rounded-lg bg-zinc-800/50 p-1',
        className
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-150',
            activeTab === tab.id
              ? 'bg-zinc-700 text-zinc-50 shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
