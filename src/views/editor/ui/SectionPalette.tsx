'use client';

import { motion } from 'framer-motion';
import type { SectionType } from '@/shared/types';

interface SectionMeta {
  label: string;
  icon: React.ReactNode;
}

interface SectionPaletteProps {
  sectionMeta: Record<SectionType, SectionMeta>;
  onAdd: (type: SectionType) => void;
  onClose: () => void;
}

export function SectionPalette({ sectionMeta, onAdd, onClose }: SectionPaletteProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="mb-4 text-lg font-semibold text-zinc-50">섹션 추가</h3>
        <div className="grid grid-cols-2 gap-2">
          {(Object.entries(sectionMeta) as [SectionType, SectionMeta][]).map(([type, meta]) => (
            <button
              key={type}
              onClick={() => onAdd(type)}
              className="flex items-center gap-3 rounded-xl border border-zinc-800 p-3 text-left transition-colors hover:border-zinc-600 hover:bg-zinc-800"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400">
                {meta.icon}
              </div>
              <span className="text-sm font-medium text-zinc-200">{meta.label}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
