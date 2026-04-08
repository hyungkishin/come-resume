'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, X } from '@/shared/ui/icons';
import { Button } from '@/shared/ui/button/Button';
import { cn } from '@/shared/lib/cn';
import { ResumePreview } from './ResumePreview';
import { useResumePrint } from '../lib/useResumePrint';

interface ResumeExportProps {
  open: boolean;
  onClose: () => void;
  content: string;
  name?: string;
  title?: string;
  email?: string;
}

type PageFormat = 'A4' | 'Letter';

export function ResumeExport({ open, onClose, content, name, title, email }: ResumeExportProps) {
  const [format, setFormat] = useState<PageFormat>('A4');
  const { handlePrint } = useResumePrint(format);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex flex-col bg-zinc-950"
        >
          <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-6 py-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-zinc-300">페이지 크기</span>
              <div className="flex overflow-hidden rounded-md border border-zinc-700">
                {(['A4', 'Letter'] as PageFormat[]).map(f => (
                  <button
                    key={f}
                    onClick={() => setFormat(f)}
                    className={cn(
                      'px-3 py-1 text-xs font-medium transition-colors',
                      format === f
                        ? 'bg-zinc-700 text-zinc-100'
                        : 'bg-transparent text-zinc-500 hover:text-zinc-300',
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" onClick={handlePrint} className="gap-1.5">
                <Download className="h-3.5 w-3.5" />
                PDF로 저장
              </Button>
              <button
                onClick={onClose}
                className="rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto bg-zinc-900 py-10">
            <div
              className="mx-auto shadow-2xl"
              style={{
                width: format === 'A4' ? '210mm' : '216mm',
                minHeight: format === 'A4' ? '297mm' : '279mm',
                maxWidth: '100%',
                padding: '20mm',
                backgroundColor: '#fff',
              }}
            >
              <ResumePreview content={content} name={name} title={title} email={email} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
