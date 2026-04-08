'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/shared/lib/cn';
import { X, Zap, FileText, Code2, BarChart3, Briefcase, GraduationCap, Mail, Plus } from '@/shared/ui/icons';
import type { ComponentType } from 'react';

interface SectionPaletteProps {
  open: boolean;
  onClose: () => void;
  onAdd: (type: string) => void;
}

interface SectionItem {
  type: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  desc: string;
}

const SECTION_TYPES: SectionItem[] = [
  { type: 'hero', label: '히어로', icon: Zap, desc: '메인 소개 영역' },
  { type: 'about', label: '소개', icon: FileText, desc: '자기소개' },
  { type: 'projects', label: '프로젝트', icon: Code2, desc: '프로젝트 쇼케이스' },
  { type: 'skills', label: '기술 스택', icon: BarChart3, desc: '보유 기술' },
  { type: 'experience', label: '경력', icon: Briefcase, desc: '경력 사항' },
  { type: 'education', label: '학력', icon: GraduationCap, desc: '학력 사항' },
  { type: 'contact', label: '연락처', icon: Mail, desc: '연락처 정보' },
  { type: 'custom', label: '커스텀', icon: Plus, desc: '자유 섹션 추가' },
];

export function SectionPalette({ open, onClose, onAdd }: SectionPaletteProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 bg-black/60"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
              <h2 className="text-sm font-semibold text-zinc-100">섹션 추가</h2>
              <button
                onClick={onClose}
                className="rounded-md p-1 text-zinc-400 transition-colors hover:text-zinc-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 p-4">
              {SECTION_TYPES.map(({ type, label, icon: Icon, desc }) => (
                <button
                  key={type}
                  onClick={() => {
                    onAdd(type);
                    onClose();
                  }}
                  className={cn(
                    'flex items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-800/30 p-3',
                    'text-left transition-all duration-150',
                    'hover:border-zinc-600 hover:bg-zinc-800/60'
                  )}
                >
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                    <Icon className="h-4 w-4 text-blue-400" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-zinc-200">{label}</span>
                    <span className="text-xs text-zinc-500">{desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
