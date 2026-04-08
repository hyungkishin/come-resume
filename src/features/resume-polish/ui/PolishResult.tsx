'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/shared/ui/button/Button';
import { Badge } from '@/shared/ui/badge/Badge';
import { cn } from '@/shared/lib/cn';
import { computeDiff } from '../lib/diff-utils';
import { ScoreCard } from './ScoreCard';
import { useResumePolishStore } from '../model/store';
import type { BadgeVariant } from './types';

const PRIORITY_VARIANT: Record<string, BadgeVariant> = {
  high: 'red',
  medium: 'amber',
  low: 'blue',
};

const PRIORITY_LABEL: Record<string, string> = {
  high: '높음',
  medium: '보통',
  low: '낮음',
};

export function PolishResult() {
  const { originalText, polishedText, score, suggestions } = useResumePolishStore();
  const [copied, setCopied] = useState(false);

  const segments = computeDiff(originalText, polishedText);

  const handleCopy = () => {
    void navigator.clipboard.writeText(polishedText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {score && <ScoreCard score={score} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">원본</p>
          <div className="space-y-1 text-sm text-zinc-500">
            {segments
              .filter((s) => s.type !== 'added')
              .map((seg, i) => (
                <p
                  key={i}
                  className={cn(
                    'whitespace-pre-wrap leading-relaxed',
                    seg.type === 'removed' && 'line-through opacity-50'
                  )}
                >
                  {seg.text || '\u00A0'}
                </p>
              ))}
          </div>
        </div>

        <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-300">AI 개선</p>
            <Button variant="ghost" size="sm" onClick={handleCopy}>
              {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-400" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              {copied ? '복사됨' : '복사'}
            </Button>
          </div>
          <div className="space-y-1 text-sm text-zinc-100">
            {segments
              .filter((s) => s.type !== 'removed')
              .map((seg, i) => (
                <p
                  key={i}
                  className={cn(
                    'whitespace-pre-wrap leading-relaxed',
                    seg.type === 'added' && 'rounded bg-blue-500/10 px-1 text-blue-300'
                  )}
                >
                  {seg.text || '\u00A0'}
                </p>
              ))}
          </div>
        </div>
      </div>

      {suggestions.length > 0 && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <p className="mb-3 text-sm font-semibold text-zinc-300">개선 제안</p>
          <div className="flex flex-col gap-3">
            {suggestions.map((s, i) => (
              <div key={i} className="rounded-lg border border-zinc-800 bg-zinc-800/40 p-3">
                <div className="mb-2 flex items-center gap-2">
                  <Badge variant={PRIORITY_VARIANT[s.priority] ?? 'default'}>
                    {PRIORITY_LABEL[s.priority] ?? s.priority}
                  </Badge>
                  <span className="text-xs text-zinc-400">{s.section}</span>
                </div>
                <p className="mb-1 text-xs text-zinc-500 line-through">{s.original}</p>
                <p className="mb-1.5 text-xs text-zinc-200">{s.improved}</p>
                <p className="text-xs text-zinc-500">{s.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
