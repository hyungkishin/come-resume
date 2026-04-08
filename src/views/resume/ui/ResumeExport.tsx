'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, X } from '@/shared/ui/icons';
import { Button } from '@/shared/ui/button/Button';
import { cn } from '@/shared/lib/cn';

interface ResumeExportProps {
  open: boolean;
  onClose: () => void;
  content: string;
  name?: string;
  title?: string;
  email?: string;
}

type PageFormat = 'A4' | 'Letter';

function ResumePreview({
  content,
  name,
  title,
  email,
}: Pick<ResumeExportProps, 'content' | 'name' | 'title' | 'email'>) {
  const lines = content.split('\n');

  const sections: Array<{ type: string; content: string }> = [];
  let currentList: string[] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      sections.push({ type: 'list', content: currentList.join('\n') });
      currentList = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      continue;
    }
    if (trimmed.startsWith('## ')) {
      flushList();
      sections.push({ type: 'h2', content: trimmed.slice(3) });
    } else if (trimmed.startsWith('### ')) {
      flushList();
      sections.push({ type: 'h3', content: trimmed.slice(4) });
    } else if (trimmed.startsWith('# ')) {
      flushList();
    } else if (trimmed.startsWith('- ')) {
      currentList.push(trimmed.slice(2));
    } else {
      flushList();
      sections.push({ type: 'p', content: trimmed });
    }
  }
  flushList();

  return (
    <div
      id="resume-print-area"
      className="bg-white text-zinc-900"
      style={{ fontFamily: 'Georgia, serif', lineHeight: '1.6' }}
    >
      {(name || title || email) && (
        <div className="mb-5 text-center">
          {name && (
            <h1 style={{ fontSize: '24px', marginBottom: '4px', fontWeight: 'bold' }}>
              {name}
            </h1>
          )}
          {title && (
            <p style={{ color: '#555', fontSize: '14px', margin: '2px 0' }}>{title}</p>
          )}
          {email && (
            <p style={{ color: '#666', fontSize: '11px', margin: '2px 0' }}>{email}</p>
          )}
        </div>
      )}

      {sections.map((section, i) => {
        if (section.type === 'h2') {
          return (
            <div
              key={i}
              style={{
                fontSize: '13px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                borderBottom: '1px solid #e5e5e5',
                paddingBottom: '4px',
                marginTop: '16px',
                marginBottom: '8px',
                color: '#333',
              }}
            >
              {section.content}
            </div>
          );
        }
        if (section.type === 'h3') {
          return (
            <h3
              key={i}
              style={{ fontSize: '13px', margin: '8px 0 4px', fontWeight: 'bold' }}
            >
              {section.content}
            </h3>
          );
        }
        if (section.type === 'list') {
          return (
            <ul key={i} style={{ paddingLeft: '20px', margin: '4px 0' }}>
              {section.content.split('\n').map((item, j) => (
                <li key={j} style={{ fontSize: '12px', margin: '3px 0' }}>
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} style={{ margin: '4px 0', fontSize: '12px' }}>
            {section.content}
          </p>
        );
      })}
    </div>
  );
}

export function ResumeExport({
  open,
  onClose,
  content,
  name,
  title,
  email,
}: ResumeExportProps) {
  const [format, setFormat] = useState<PageFormat>('A4');

  const handlePrint = () => {
    const printContent = document.getElementById('resume-print-area');
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>이력서</title>
        <style>
          @page { size: ${format}; margin: 20mm; }
          body { font-family: 'Georgia', serif; color: #1a1a1a; line-height: 1.6; }
          h1 { font-size: 24px; margin-bottom: 4px; }
          h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid #ddd; padding-bottom: 4px; margin-top: 20px; margin-bottom: 8px; color: #333; }
          p { margin: 4px 0; font-size: 12px; }
          ul { padding-left: 20px; }
          li { font-size: 12px; margin: 3px 0; }
          .header { text-align: center; margin-bottom: 20px; }
          .title { color: #555; font-size: 14px; }
          .contact { color: #666; font-size: 11px; }
          .section-title { font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1.5px; border-bottom: 1px solid #e5e5e5; padding-bottom: 4px; margin-top: 16px; margin-bottom: 8px; }
        </style>
      </head>
      <body>
        ${printContent.innerHTML}
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

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
          {/* 도구바 */}
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

          {/* 프리뷰 영역 */}
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
              <ResumePreview
                content={content}
                name={name}
                title={title}
                email={email}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
