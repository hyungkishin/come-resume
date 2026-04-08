'use client';

import { useState, useRef } from 'react';
import { useToastStore } from '@/shared/ui/toast/Toast';
import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/button/Button';
import { Tabs } from '@/shared/ui/tabs/Tabs';
import { Badge } from '@/shared/ui/badge/Badge';
import { Card } from '@/shared/ui/card/Card';
import { cn } from '@/shared/lib/cn';
import { Sparkles, Copy, Check, FileText, ArrowRight, BarChart3 } from '@/shared/ui/icons';
import type { ResumeScore, ResumeSuggestion } from '@/shared/types';
import { generatePolishedText, calculateScore, generateSuggestions, matchJd } from '@/features/resume-polish/lib/polish-engine';
import { ResumeExport } from './ResumeExport';

interface JdMatchResult {
  matchScore: number;
  missingKeywords: string[];
  matchedKeywords: string[];
  suggestions: string[];
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

export function ResumePage() {
  const [activeTab, setActiveTab] = useState('input');
  const [text, setText] = useState('');
  const [jdText, setJdText] = useState('');
  const [isPolishing, setIsPolishing] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [result, setResult] = useState<{ polished: string; score: ResumeScore; suggestions: ResumeSuggestion[] } | null>(null);
  const [matchResult, setMatchResult] = useState<JdMatchResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [language, setLanguage] = useState<'ko' | 'en'>('ko');
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addToast = useToastStore((state) => state.addToast);

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== 'application/pdf') return;
    setIsPdfLoading(true);
    try {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.mjs',
        import.meta.url
      ).toString();
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
      const pages: string[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const lines: string[] = [];
        let lastY: number | null = null;
        for (const item of content.items) {
          if (!('str' in item)) continue;
          const y = 'transform' in item ? (item.transform as number[])[5] : 0;
          if (lastY !== null && Math.abs(y - lastY) > 2) {
            lines.push('\n');
          }
          lines.push(item.str);
          lastY = y;
        }
        pages.push(lines.join(''));
      }
      setText(pages.join('\n\n'));
      addToast('success', `PDF에서 ${pdf.numPages}페이지 텍스트를 추출했습니다`);
    } catch {
      // Fallback: FileReader로 텍스트 추출 시도
      try {
        const text = await file.text();
        if (text.trim().length > 50) {
          setText(text);
          addToast('info', 'PDF에서 텍스트를 추출했습니다 (기본 모드)');
        } else {
          addToast('error', '이 PDF에서 텍스트를 추출할 수 없습니다. 텍스트를 직접 붙여넣어 주세요.');
        }
      } catch {
        addToast('error', 'PDF 파일을 읽을 수 없습니다. 텍스트를 직접 붙여넣어 주세요.');
      }
    } finally {
      setIsPdfLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handlePolish = async () => {
    if (!text.trim()) return;
    setIsPolishing(true);
    await new Promise(r => setTimeout(r, 1500));
    setResult({
      polished: generatePolishedText(text),
      score: calculateScore(text),
      suggestions: generateSuggestions(text),
    });
    setIsPolishing(false);
    setActiveTab('result');
  };

  const handleMatch = async () => {
    if (!jdText.trim() || !text.trim()) return;
    setIsMatching(true);
    setMatchResult(null);
    await new Promise(r => setTimeout(r, 1500));
    setMatchResult(matchJd(text, jdText));
    setIsMatching(false);
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result.polished);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <motion.div {...fadeUp} transition={{ duration: 0.4 }}>
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10">
            <Sparkles className="h-4 w-4 text-purple-400" />
          </div>
          <h1 className="text-2xl font-bold text-zinc-50">AI 이력서 폴리셔</h1>
        </div>
        <p className="mb-8 text-sm text-zinc-400">
          이력서를 붙여넣으면 AI가 임팩트 있는 성과 중심 문장으로 다듬어 드립니다.
        </p>
      </motion.div>

      <Tabs
        tabs={[
          { id: 'input', label: '이력서 입력' },
          { id: 'result', label: '폴리싱 결과' },
          { id: 'jd', label: 'JD 매칭' },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="mb-6"
      />

      {activeTab === 'input' && (
        <motion.div {...fadeUp} transition={{ duration: 0.3 }}>
          <Card className="p-0">
            <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
              <div className="flex gap-2">
                <button
                  onClick={() => setLanguage('ko')}
                  className={cn('rounded-md px-3 py-1 text-xs font-medium transition-colors', language === 'ko' ? 'bg-zinc-700 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300')}
                >
                  한국어
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={cn('rounded-md px-3 py-1 text-xs font-medium transition-colors', language === 'en' ? 'bg-zinc-700 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300')}
                >
                  English
                </button>
              </div>
              <span className="text-xs text-zinc-500">{text.length}자</span>
            </div>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="이력서 내용을 붙여넣으세요..."
              className="min-h-[400px] w-full bg-transparent px-4 py-4 text-sm leading-relaxed text-zinc-100 placeholder:text-zinc-600 focus:outline-none resize-none"
            />
          </Card>
          <div className="mt-4 flex items-center justify-between">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handlePdfUpload}
              className="hidden"
            />
            <Button
              variant="outline"
              size="sm"
              isLoading={isPdfLoading}
              onClick={() => fileInputRef.current?.click()}
            >
              <FileText className="mr-1.5 h-3.5 w-3.5" />
              {isPdfLoading ? 'PDF 읽는 중...' : 'PDF 업로드'}
            </Button>
            <Button size="md" onClick={handlePolish} isLoading={isPolishing} disabled={!text.trim()} className="gap-2">
              <Sparkles className="h-4 w-4" />
              AI 폴리싱 시작
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}

      {activeTab === 'result' && result && (
        <motion.div {...fadeUp} transition={{ duration: 0.3 }} className="space-y-6">
          {/* 점수 */}
          <Card>
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center">
                <svg className="h-24 w-24" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#27272a" strokeWidth="8" />
                  <circle
                    cx="50" cy="50" r="40" fill="none"
                    stroke={result.score.overall >= 80 ? '#10b981' : result.score.overall >= 60 ? '#f59e0b' : '#ef4444'}
                    strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={`${result.score.overall * 2.51} 251`}
                    transform="rotate(-90 50 50)"
                  />
                  <text x="50" y="50" textAnchor="middle" dominantBaseline="central" className="fill-zinc-50 text-2xl font-bold" fontSize="24" fontWeight="bold">
                    {result.score.overall}
                  </text>
                </svg>
                <p className="mt-1 text-xs text-zinc-400">종합 점수</p>
              </div>
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
                  <Button variant="ghost" size="sm" onClick={handleCopy} className="gap-1.5">
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? '복사됨' : '복사'}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setExportOpen(true)} className="gap-1.5">
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
      )}

      {activeTab === 'result' && !result && (
        <Card className="flex flex-col items-center justify-center py-20 text-center">
          <BarChart3 className="mb-3 h-10 w-10 text-zinc-600" />
          <p className="text-zinc-400">먼저 이력서를 입력하고 폴리싱을 실행하세요</p>
        </Card>
      )}

      {activeTab === 'jd' && (
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
          <Button size="md" onClick={handleMatch} isLoading={isMatching} disabled={!jdText.trim() || !text.trim()} className="gap-2">
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
                  <div className="flex flex-col items-center">
                    <svg className="h-24 w-24" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#27272a" strokeWidth="8" />
                      <circle
                        cx="50" cy="50" r="40" fill="none"
                        stroke={matchResult.matchScore >= 80 ? '#10b981' : matchResult.matchScore >= 60 ? '#f59e0b' : '#ef4444'}
                        strokeWidth="8" strokeLinecap="round"
                        strokeDasharray={`${matchResult.matchScore * 2.51} 251`}
                        transform="rotate(-90 50 50)"
                      />
                      <text x="50" y="50" textAnchor="middle" dominantBaseline="central" className="fill-zinc-50 text-2xl font-bold" fontSize="24" fontWeight="bold">
                        {matchResult.matchScore}
                      </text>
                    </svg>
                    <p className="mt-1 text-xs text-zinc-400">매칭 점수</p>
                  </div>
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
      )}

      {result && (
        <ResumeExport
          open={exportOpen}
          onClose={() => setExportOpen(false)}
          content={result.polished}
        />
      )}
    </div>
  );
}
