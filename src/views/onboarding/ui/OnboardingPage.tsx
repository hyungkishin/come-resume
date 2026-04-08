'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/shared/ui/button/Button';
import { Input } from '@/shared/ui/input/Input';
import { Github, ArrowRight, Check, Sparkles, Palette } from '@/shared/ui/icons';

const TOTAL_STEPS = 4;

const TEMPLATES = [
  { id: 'minimal', label: '미니멀', desc: '깔끔하고 단순한 레이아웃', color: 'from-zinc-700 to-zinc-800' },
  { id: 'creative', label: '크리에이티브', desc: '개성 있는 포트폴리오', color: 'from-violet-700 to-purple-800' },
  { id: 'corporate', label: '전문가형', desc: '비즈니스에 적합한 스타일', color: 'from-blue-700 to-blue-900' },
  { id: 'bold', label: '볼드', desc: '강렬한 첫인상을 주는 디자인', color: 'from-orange-600 to-red-700' },
] as const;

type TemplateId = (typeof TEMPLATES)[number]['id'];

interface ProfileData {
  name: string;
  title: string;
  bio: string;
}

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0">
      {Array.from({ length: TOTAL_STEPS }, (_, i) => {
        const step = i + 1;
        const isDone = step < current;
        const isActive = step === current;
        return (
          <div key={step} className="flex items-center">
            <div
              className={[
                'flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300',
                isActive
                  ? 'bg-blue-500 text-white shadow-md shadow-blue-500/30'
                  : isDone
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'bg-zinc-800 text-zinc-500',
              ].join(' ')}
            >
              {isDone ? <Check className="h-4 w-4" /> : step}
            </div>
            {step < TOTAL_STEPS && (
              <div
                className={[
                  'h-px w-10 transition-all duration-300',
                  step < current ? 'bg-blue-500/40' : 'bg-zinc-800',
                ].join(' ')}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -40 : 40,
    opacity: 0,
  }),
};

export function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [profile, setProfile] = useState<ProfileData>({ name: '', title: '', bio: '' });
  const [githubConnected, setGithubConnected] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('minimal');
  const [isConnecting, setIsConnecting] = useState(false);

  const goNext = () => {
    if (step < TOTAL_STEPS) {
      setDirection(1);
      setStep(s => s + 1);
    }
  };

  const goPrev = () => {
    if (step > 1) {
      setDirection(-1);
      setStep(s => s - 1);
    }
  };

  const handleGithubConnect = async () => {
    setIsConnecting(true);
    await new Promise(r => setTimeout(r, 1200));
    setIsConnecting(false);
    setGithubConnected(true);
  };

  const handleFinish = () => {
    router.push(`/editor?template=${selectedTemplate}`);
  };

  const stepTitles = [
    '프로필을 입력해주세요',
    'GitHub를 연결하세요',
    '템플릿을 선택하세요',
    '준비 완료!',
  ];

  const stepSubtitles = [
    '방문자에게 나를 소개할 기본 정보예요',
    '레포지토리 정보를 자동으로 불러올 수 있어요',
    '언제든지 변경할 수 있어요',
    '지금 바로 포트폴리오를 만들어보세요',
  ];

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-blue-500/6 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* 로고 */}
        <div className="mb-8 flex items-center justify-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-zinc-50">Foliofy</span>
        </div>

        {/* 스텝 인디케이터 */}
        <div className="mb-8">
          <StepIndicator current={step} />
        </div>

        {/* 카드 */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8 backdrop-blur-sm">
          {/* 제목 */}
          <div className="mb-6 text-center">
            <h1 className="text-xl font-bold text-zinc-50">{stepTitles[step - 1]}</h1>
            <p className="mt-1.5 text-sm text-zinc-400">{stepSubtitles[step - 1]}</p>
          </div>

          {/* 스텝 콘텐츠 */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                {step === 1 && (
                  <div className="space-y-4">
                    <Input
                      id="onboard-name"
                      label="이름"
                      placeholder="홍길동"
                      value={profile.name}
                      onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                    />
                    <Input
                      id="onboard-title"
                      label="직함"
                      placeholder="프론트엔드 개발자"
                      value={profile.title}
                      onChange={e => setProfile(p => ({ ...p, title: e.target.value }))}
                    />
                    <Input
                      id="onboard-bio"
                      label="한줄 소개"
                      placeholder="저는 사용자 경험을 중시하는 개발자입니다"
                      value={profile.bio}
                      onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
                    />
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    {githubConnected ? (
                      <div className="flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/5 px-4 py-3.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20">
                          <Check className="h-4 w-4 text-green-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-zinc-100">GitHub 연결됨</p>
                          <p className="text-xs text-zinc-400">레포지토리를 자동으로 불러올 수 있어요</p>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={handleGithubConnect}
                        disabled={isConnecting}
                        className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm font-medium text-zinc-100 transition-colors hover:bg-zinc-700 disabled:opacity-50"
                      >
                        {isConnecting ? (
                          <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                        ) : (
                          <Github className="h-4.5 w-4.5" />
                        )}
                        {isConnecting ? '연결 중...' : 'GitHub 연결하기'}
                      </button>
                    )}
                    <p className="text-center text-xs text-zinc-500">
                      나중에 설정에서 연결할 수 있어요
                    </p>
                  </div>
                )}

                {step === 3 && (
                  <div className="grid grid-cols-2 gap-3">
                    {TEMPLATES.map(tpl => (
                      <button
                        key={tpl.id}
                        onClick={() => setSelectedTemplate(tpl.id)}
                        className={[
                          'relative rounded-xl border p-0 text-left transition-all duration-200 overflow-hidden',
                          selectedTemplate === tpl.id
                            ? 'border-blue-500 ring-2 ring-blue-500/30'
                            : 'border-zinc-700 hover:border-zinc-600',
                        ].join(' ')}
                      >
                        {/* 미리보기 영역 */}
                        <div className={`h-20 w-full bg-gradient-to-br ${tpl.color} flex items-center justify-center`}>
                          <Palette className="h-6 w-6 text-white/60" />
                        </div>
                        <div className="p-3">
                          <p className="text-sm font-medium text-zinc-100">{tpl.label}</p>
                          <p className="mt-0.5 text-xs text-zinc-500">{tpl.desc}</p>
                        </div>
                        {selectedTemplate === tpl.id && (
                          <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {step === 4 && (
                  <div className="py-4 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10">
                      <Sparkles className="h-8 w-8 text-blue-400" />
                    </div>
                    <p className="text-sm text-zinc-300">
                      <span className="font-semibold text-zinc-100">{profile.name || '포트폴리오'}</span>가 준비되었어요.
                    </p>
                    <p className="mt-1.5 text-sm text-zinc-400">
                      선택한 템플릿으로 편집 화면으로 이동합니다.
                    </p>
                    <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-800/50 px-4 py-3 text-left">
                      <p className="text-xs text-zinc-500">선택한 템플릿</p>
                      <p className="mt-0.5 text-sm font-medium text-zinc-200">
                        {TEMPLATES.find(t => t.id === selectedTemplate)?.label}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 버튼 영역 */}
          <div className="mt-6 flex items-center justify-between gap-3">
            {step > 1 ? (
              <Button variant="ghost" size="md" onClick={goPrev}>
                이전
              </Button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              {step === 2 && !githubConnected && (
                <Button variant="ghost" size="md" onClick={goNext}>
                  건너뛰기
                </Button>
              )}
              {step < TOTAL_STEPS ? (
                <Button size="md" onClick={goNext} className="gap-2">
                  다음
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button size="md" onClick={handleFinish} className="gap-2">
                  포트폴리오 편집 시작
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* 진행률 텍스트 */}
        <p className="mt-4 text-center text-xs text-zinc-600">
          {step} / {TOTAL_STEPS} 단계
        </p>
      </div>
    </div>
  );
}
