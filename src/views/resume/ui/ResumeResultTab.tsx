'use client';

import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/button/Button';
import { Badge } from '@/shared/ui/badge/Badge';
import { Card } from '@/shared/ui/card/Card';
import { cn } from '@/shared/lib/cn';
import { Copy, Check, FileText, BarChart3 } from '@/shared/ui/icons';
import type { ResumeScore, ResumeSuggestion } from '@/shared/types';
import { CircleScore } from './CircleScore';

interface PolishResult {
  polished: string;
  score: ResumeScore;
  suggestions: ResumeSuggestion[];
}

interface ResumeResultTabProps {
  result: PolishResult | null;
  text: string;
  copied: boolean;
  onCopy: () => void;
  onExportClick: () => void;
}

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

function ScoreBar({ label, score }: { label: string; score: number }) {
  const color = score >= 80 ? 'bg-emerald-500' : score >= 60 ? 'bg-amber-500' : 'bg-red-500';
  return (
    <div className="flex items-center gap-3">
      <span className="w-16 text-xs text-zinc-400">{label}</span>
      <div className="flex-1 h-2 rounded-full bg-zinc-800">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={cn('h-full rounded-full', color)}
        />
      </div>
      <span className="w-8 text-right text-xs font-medium text-zinc-300">{score}</span>
    </div>
  );
}

export function ResumeResultTab({
  result,
  text,
  copied,
  onCopy,
  onExportClick,
}: ResumeResultTabProps) {
  if (!result) {
    return (
      <Card className="flex flex-col items-center justify-center py-20 text-center">
        <BarChart3 className="mb-3 h-10 w-10 text-zinc-600" />
        <p className="text-zinc-400">먼저 이력서를 입력하고 폴리싱을 실행하세요</p>
      </Card>
    );
  }

  return (
    <motion.div {...fadeUp} transition={{ duration: 0.3 }} className="space-y-6">
      {/* 점수 */}
      <Card>
        <div className="flex items-center gap-6">
          <CircleScore score={result.score.overall} label="종합 점수" />
          <div className="flex-1 space-y-3">
            <ScoreBar label="임팩트" score={result.score.impact} />
            <ScoreBar label="명확성" score={result.score.clarity} />
            <ScoreBar label="키워드" score={result.score.keywords} />
            <ScoreBar label="포맷" score={result.score.formatting} />
          </div>
        </div>
      </Card>

      {/* Before/After */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <h3 className="mb-3 text-sm font-medium text-zinc-400">원본</h3>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-500">{text}</p>
        </Card>
        <Card>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-medium text-blue-400">AI 개선</h3>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={onCopy} className="gap-1.5">
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? '복사됨' : '복사'}
              </Button>
              <Button variant="outline" size="sm" onClick={onExportClick} className="gap-1.5">
                <FileText className="h-3.5 w-3.5" />
                PDF 저장
              </Button>
            </div>
          </div>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-200">{result.polished}</p>
        </Card>
      </div>

      {/* 개선 제안 */}
      <Card>
        <h3 className="mb-4 text-sm font-semibold text-zinc-100">개선 제안</h3>
        <div className="space-y-4">
          {result.suggestions.map((s, i) => (
            <div key={i} className="rounded-lg border border-zinc-800 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Badge variant={s.priority === 'high' ? 'red' : s.priority === 'medium' ? 'amber' : 'default'}>
                  {s.priority === 'high' ? '높음' : s.priority === 'medium' ? '보통' : '낮음'}
                </Badge>
                <span className="text-xs text-zinc-400">{s.section}</span>
              </div>
              <p className="text-sm text-zinc-500 line-through">{s.original}</p>
              <p className="mt-1 text-sm text-zinc-200">{s.improved}</p>
              <p className="mt-2 text-xs text-zinc-400">{s.reason}</p>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
