'use client';

import { BarChart3 } from 'lucide-react';
import { Button } from '@/shared/ui/button/Button';
import { Textarea } from '@/shared/ui/textarea/Textarea';
import { Badge } from '@/shared/ui/badge/Badge';
import { cn } from '@/shared/lib/cn';
import { useResumePolishStore } from '../model/store';

function getMatchColor(score: number): string {
  if (score >= 80) return 'text-emerald-400';
  if (score >= 60) return 'text-amber-400';
  return 'text-red-400';
}

function getBarColor(score: number): string {
  if (score >= 80) return 'bg-emerald-500';
  if (score >= 60) return 'bg-amber-500';
  return 'bg-red-500';
}

export function JdMatcher() {
  const { jobDescription, jdMatch, isPolishing, setJobDescription, matchJd } =
    useResumePolishStore();

  return (
    <div className="flex flex-col gap-4">
      <Textarea
        label="채용공고 (JD)"
        id="jd-input"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="채용공고 내용을 붙여넣기 하세요..."
        className="min-h-[200px]"
      />

      <Button
        onClick={() => void matchJd()}
        isLoading={isPolishing}
        disabled={!jobDescription.trim()}
        variant="secondary"
        size="lg"
        className="w-full"
      >
        <BarChart3 className="h-4 w-4" />
        매칭 분석
      </Button>

      {jdMatch && (
        <div className="flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-300">매칭 점수</span>
              <span className={cn('text-2xl font-bold', getMatchColor(jdMatch.matchScore))}>
                {jdMatch.matchScore}
                <span className="text-sm font-normal text-zinc-500"> / 100</span>
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
              <div
                className={cn(
                  'h-full rounded-full transition-all duration-700 ease-out',
                  getBarColor(jdMatch.matchScore)
                )}
                style={{ width: `${jdMatch.matchScore}%` }}
              />
            </div>
          </div>

          {jdMatch.missingKeywords.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-semibold text-zinc-400">누락된 키워드</p>
              <div className="flex flex-wrap gap-1.5">
                {jdMatch.missingKeywords.map((kw) => (
                  <Badge key={kw} variant="red">
                    {kw}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {jdMatch.suggestions.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-semibold text-zinc-400">개선 제안</p>
              <ul className="flex flex-col gap-2">
                {jdMatch.suggestions.map((suggestion, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                    <span className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-400">•</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
