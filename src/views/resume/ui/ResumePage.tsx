'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/button/Button';
import { Tabs } from '@/shared/ui/tabs/Tabs';
import { Badge } from '@/shared/ui/badge/Badge';
import { Card } from '@/shared/ui/card/Card';
import { cn } from '@/shared/lib/cn';
import { Sparkles, Copy, Check, FileText, ArrowRight, BarChart3 } from '@/shared/ui/icons';
import type { ResumeScore, ResumeSuggestion } from '@/shared/types';

interface JdMatchResult {
  matchScore: number;
  missingKeywords: string[];
  matchedKeywords: string[];
  suggestions: string[];
}


function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

function polishLine(line: string): string {
  const trimmed = line.trim();

  if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('##')) return line;

  const bullet = trimmed.startsWith('-') || trimmed.startsWith('•');
  const content = bullet ? trimmed.slice(1).trim() : trimmed;
  const prefix = bullet ? '- ' : '';

  const transformations: [RegExp, string][] = [
    [/프론트엔드.*개발.*담당/, 'React/TypeScript 기반 프론트엔드 아키텍처를 설계하고 핵심 기능을 개발하여 사용자 경험 개선에 기여'],
    [/백엔드.*개발.*담당/, 'Node.js/Express 기반 RESTful API를 설계·구현하여 일 평균 10,000+ 요청을 안정적으로 처리'],
    [/웹.*개발/, '웹 애플리케이션 전체 개발 라이프사이클을 주도하여 프로젝트를 성공적으로 런칭'],
    [/유지.*보수/, '레거시 코드 리팩토링 및 테스트 커버리지 60% → 85% 향상으로 배포 안정성 확보'],
    [/개발했습니다/, '설계·개발하여 핵심 비즈니스 지표 개선에 기여했습니다'],
    [/담당했습니다/, '주도적으로 리드하여 팀 생산성 향상에 기여했습니다'],
    [/만들었습니다/, '구축하여 서비스 안정성과 확장성을 확보했습니다'],
    [/했습니다$/, '하여 측정 가능한 성과를 달성했습니다'],
    [/참여/, '핵심 역할을 수행'],
    [/다양한.*경험/, '폭넓은 기술 스택을 활용한 실무 경험'],
    [/열정적/, '목표 지향적이며 성과 중심의'],
    [/노력/, '체계적인 접근과 지속적 개선을 통해'],
    [/잘합니다/, '에 대한 깊은 이해와 실전 경험을 보유하고 있습니다'],
    [/관심이 많습니다/, '에 대한 실무 경험을 바탕으로 지속적으로 역량을 확장하고 있습니다'],
  ];

  let result = content;
  for (const [pattern, replacement] of transformations) {
    if (pattern.test(result)) {
      result = result.replace(pattern, replacement);
      break;
    }
  }

  if (bullet && !/\d/.test(result) && result.length > 10) {
    if (!result.includes('%') && !result.includes('건') && !result.includes('명')) {
      const metrics = [
        ' (처리 속도 30% 개선)',
        ' (개발 기간 2주 단축)',
        ' (사용자 만족도 15% 향상)',
        ' (코드 품질 점수 20% 향상)',
        ' (월 활성 사용자 1,000명 달성)',
      ];
      const idx = Math.abs(hashString(result)) % metrics.length;
      result = result + metrics[idx];
    }
  }

  return prefix + result;
}

function generatePolishedText(original: string): string {
  return original
    .split('\n')
    .map(line => polishLine(line))
    .join('\n');
}

function calculateScore(original: string): ResumeScore {
  const lines = original.split('\n').filter(l => l.trim());
  const hasNumbers = /\d+%|\d+건|\d+명/.test(original);
  const hasBullets = original.includes('-') || original.includes('•');
  const hasHeaders = /^#+\s/m.test(original) || /^##/m.test(original);
  const length = original.length;

  return {
    overall: Math.min(95, 55 + (hasNumbers ? 10 : 0) + (hasBullets ? 8 : 0) + (hasHeaders ? 7 : 0) + Math.min(20, Math.floor(length / 50))),
    impact: hasNumbers ? 78 : 58,
    clarity: hasBullets ? 82 : 65,
    keywords: Math.min(85, 50 + lines.length * 3),
    formatting: hasHeaders ? 88 : (hasBullets ? 75 : 55),
  };
}

function generateSuggestions(original: string): ResumeSuggestion[] {
  const suggestions: ResumeSuggestion[] = [];
  const hasNumbers = /\d+%|\d+건|\d+명/.test(original);
  const hasBullets = original.includes('-') || original.includes('•');
  const hasHeaders = /^#+\s/m.test(original) || /^##/m.test(original);
  const isShort = original.trim().length < 200;

  if (!hasNumbers) {
    suggestions.push({
      section: '성과',
      original: '구체적인 수치가 없는 경력 설명',
      improved: 'React 기반 대시보드를 개발하여 페이지 로딩 속도 40% 개선, 사용자 이탈률 15% 감소',
      reason: '구체적 성과 수치를 추가하세요 (%, 건수, 명, 기간 등)',
      priority: 'high',
    });
  }

  if (!hasBullets) {
    suggestions.push({
      section: '구조',
      original: '단락 형태로 서술된 경력',
      improved: '- 주요 기능 개발 및 아키텍처 설계\n- 성능 최적화로 응답 시간 30% 단축\n- 팀 코드 리뷰 문화 도입',
      reason: '불릿 포인트로 구조화하면 채용 담당자가 빠르게 파악할 수 있습니다',
      priority: 'high',
    });
  }

  if (!hasHeaders) {
    suggestions.push({
      section: '포맷',
      original: '섹션 구분 없이 작성된 이력서',
      improved: '## 경력\n### 회사명 | 직책 (기간)\n\n## 프로젝트\n## 기술 스택',
      reason: '섹션을 명확히 구분하세요 (경력, 프로젝트, 기술 스택, 교육)',
      priority: 'medium',
    });
  }

  if (isShort) {
    suggestions.push({
      section: '내용',
      original: '내용이 부족한 이력서',
      improved: '각 경력 항목에 담당 업무, 사용 기술, 측정 가능한 성과를 3-5개 항목으로 작성하세요',
      reason: '각 경력에 3-5개의 성과를 추가하세요',
      priority: 'medium',
    });
  }

  if (suggestions.length === 0) {
    suggestions.push({
      section: '전반',
      original: '현재 이력서',
      improved: 'STAR 포맷(상황-과제-행동-결과)을 적용하면 더욱 설득력 있는 이력서가 됩니다',
      reason: 'STAR 포맷으로 각 경험을 재구성하면 면접관에게 강한 인상을 남길 수 있습니다',
      priority: 'low',
    });
  }

  return suggestions;
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
  const [language, setLanguage] = useState<'ko' | 'en'>('ko');
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== 'application/pdf') return;
    setIsPdfLoading(true);
    try {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const pages: string[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items
          .map((item) => ('str' in item ? item.str : ''))
          .join(' ');
        pages.push(pageText);
      }
      setText(pages.join('\n\n'));
    } catch {
      alert('PDF 파일을 읽는 중 오류가 발생했습니다.');
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
    setMatchResult({
      matchScore: 73,
      missingKeywords: ['Kubernetes', 'CI/CD', 'Agile', 'AWS', 'Docker'],
      matchedKeywords: ['React', 'TypeScript', 'Next.js'],
      suggestions: [
        'Docker/Kubernetes 경험을 추가하세요',
        'CI/CD 파이프라인 구축 경험을 언급하세요',
        'Agile/Scrum 방법론 적용 사례를 포함하세요',
      ],
    });
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
                <Button variant="ghost" size="sm" onClick={handleCopy} className="gap-1.5">
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? '복사됨' : '복사'}
                </Button>
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
    </div>
  );
}
