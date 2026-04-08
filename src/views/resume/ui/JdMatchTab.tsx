'use client';

import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/button/Button';
import { Badge } from '@/shared/ui/badge/Badge';
import { Card } from '@/shared/ui/card/Card';
import { BarChart3 } from '@/shared/ui/icons';
import { CircleScore } from './CircleScore';

interface JdMatchResult {
  matchScore: number;
  missingKeywords: string[];
  matchedKeywords: string[];
  suggestions: string[];
}

interface JdMatchTabProps {
  jdText: string;
  setJdText: (value: string) => void;
  text: string;
  matchResult: JdMatchResult | null;
  onMatch: () => void;
  isMatching: boolean;
}

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export function JdMatchTab({
  jdText,
  setJdText,
  text,
  matchResult,
  onMatch,
  isMatching,
}: JdMatchTabProps) {
  return (
    <motion.div {...fadeUp} transition={{ duration: 0.3 }} className="space-y-4">
      <Card className="p-0">
        <div className="border-b border-zinc-800 px-4 py-3">
          <p className="text-sm font-medium text-zinc-200">채용공고(JD) 붙여넣기</p>
        </div>
        <textarea
          value={jdText}
          onChange={e => setJdText(e.target.value)}
          placeholder="채용공고 내용을 붙여넣으세요..."
          className="min-h-[200px] w-full bg-transparent px-4 py-4 text-sm leading-relaxed text-zinc-100 placeholder:text-zinc-600 focus:outline-none resize-none"
        />
      </Card>
      <Button
        size="md"
        onClick={onMatch}
        isLoading={isMatching}
        disabled={!jdText.trim() || !text.trim()}
        className="gap-2"
      >
        <BarChart3 className="h-4 w-4" />
        매칭 분석
      </Button>
      {!text.trim() && (
        <p className="text-xs text-zinc-500">* 먼저 &quot;이력서 입력&quot; 탭에서 이력서를 입력해주세요</p>
      )}

      {matchResult && (
        <motion.div {...fadeUp} transition={{ duration: 0.3 }} className="space-y-4">
          <Card>
            <div className="flex items-center gap-6">
              <CircleScore score={matchResult.matchScore} label="매칭 점수" />
              <div className="flex-1 space-y-4">
                <div>
                  <p className="mb-2 text-xs font-medium text-zinc-400">매칭된 키워드</p>
                  <div className="flex flex-wrap gap-2">
                    {matchResult.matchedKeywords.map(kw => (
                      <Badge key={kw} variant="green">{kw}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-xs font-medium text-zinc-400">누락된 키워드</p>
                  <div className="flex flex-wrap gap-2">
                    {matchResult.missingKeywords.map(kw => (
                      <Badge key={kw} variant="red">{kw}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="mb-3 text-sm font-semibold text-zinc-100">개선 제안</h3>
            <ol className="space-y-2">
              {matchResult.suggestions.map((suggestion, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-xs font-medium text-purple-400">
                    {i + 1}
                  </span>
                  {suggestion}
                </li>
              ))}
            </ol>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
