'use client';

import { cn } from '@/shared/lib/cn';
import type { ResumeScore } from '@/shared/types';

interface ScoreCardProps {
  score: ResumeScore;
}

const SCORE_LABELS: Record<keyof Omit<ResumeScore, 'overall'>, string> = {
  impact: '임팩트',
  clarity: '명확성',
  keywords: '키워드',
  formatting: '형식',
};

function getScoreColor(value: number): string {
  if (value >= 80) return 'text-emerald-400';
  if (value >= 60) return 'text-amber-400';
  return 'text-red-400';
}

function getBarColor(value: number): string {
  if (value >= 80) return 'bg-emerald-500';
  if (value >= 60) return 'bg-amber-500';
  return 'bg-red-500';
}

const CIRCUMFERENCE = 2 * Math.PI * 40;

export function ScoreCard({ score }: ScoreCardProps) {
  const offset = CIRCUMFERENCE - (score.overall / 100) * CIRCUMFERENCE;

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h3 className="mb-4 text-sm font-semibold text-zinc-300">이력서 점수</h3>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="flex flex-shrink-0 items-center justify-center">
          <svg width="100" height="100" viewBox="0 0 100 100" className="-rotate-90">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#27272a"
              strokeWidth="10"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={score.overall >= 80 ? '#10b981' : score.overall >= 60 ? '#f59e0b' : '#ef4444'}
              strokeWidth="10"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className={cn('text-2xl font-bold', getScoreColor(score.overall))}>
              {score.overall}
            </span>
            <span className="text-xs text-zinc-500">/ 100</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3">
          {(Object.keys(SCORE_LABELS) as Array<keyof typeof SCORE_LABELS>).map((key) => (
            <div key={key} className="flex items-center gap-3">
              <span className="w-14 text-xs text-zinc-400">{SCORE_LABELS[key]}</span>
              <div className="flex-1 rounded-full bg-zinc-800">
                <div
                  className={cn('h-1.5 rounded-full transition-all duration-700 ease-out', getBarColor(score[key]))}
                  style={{ width: `${score[key]}%` }}
                />
              </div>
              <span className={cn('w-8 text-right text-xs font-medium', getScoreColor(score[key]))}>
                {score[key]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
