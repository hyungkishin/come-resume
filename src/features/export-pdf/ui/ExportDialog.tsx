'use client';

import { useState } from 'react';
import { Download } from '@/shared/ui/icons';
import { Dialog } from '@/shared/ui/dialog/Dialog';
import { Button } from '@/shared/ui/button/Button';
import { Tabs } from '@/shared/ui/tabs/Tabs';
import { cn } from '@/shared/lib/cn';

type PaperFormat = 'A4' | 'Letter';

const FORMAT_TABS = [
  { id: 'A4', label: 'A4' },
  { id: 'Letter', label: 'Letter' },
];

const TEMPLATE_OPTIONS = [
  { id: 'default', label: '기본 템플릿' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'modern', label: 'Modern' },
];

interface ExportDialogProps {
  open: boolean;
  onClose: () => void;
}

export function ExportDialog({ open, onClose }: ExportDialogProps) {
  const [format, setFormat] = useState<PaperFormat>('A4');
  const [templateId, setTemplateId] = useState('default');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      onClose();
    }, 1500);
  };

  return (
    <Dialog open={open} onClose={onClose} title="PDF 다운로드">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-zinc-300">용지 형식</span>
          <Tabs
            tabs={FORMAT_TABS}
            activeTab={format}
            onTabChange={(id) => setFormat(id as PaperFormat)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-zinc-300">템플릿</span>
          <div className="flex flex-col gap-2">
            {TEMPLATE_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => setTemplateId(option.id)}
                className={cn(
                  'flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-all duration-150',
                  templateId === option.id
                    ? 'border-blue-500/50 bg-blue-500/5 text-zinc-100'
                    : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                )}
              >
                <div
                  className={cn(
                    'h-3 w-3 rounded-full border-2 transition-colors',
                    templateId === option.id
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-zinc-600'
                  )}
                />
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-1">
          <Button variant="outline" size="md" className="flex-1" onClick={onClose}>
            취소
          </Button>
          <Button
            variant="primary"
            size="md"
            className="flex-1"
            isLoading={isExporting}
            onClick={handleExport}
          >
            {!isExporting && <Download className="h-4 w-4" />}
            {isExporting ? '내보내는 중...' : 'PDF 다운로드'}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
