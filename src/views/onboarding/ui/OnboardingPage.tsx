'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/shared/ui/button/Button';
import { Check, Sparkles, ArrowRight } from '@/shared/ui/icons';
import { Step1ProfileForm } from './Step1ProfileForm';
import { Step2GitHubConnect } from './Step2GitHubConnect';
import { Step3TemplateSelect, type TemplateId } from './Step3TemplateSelect';
import { Step4Complete } from './Step4Complete';

const TOTAL_STEPS = 4;

interface ProfileData {
  name: string;
  title: string;
  bio: string;
}

interface ProfileErrors {
  name?: string;
}

// ── StepIndicator ──────────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: number }) {
  return (
    <nav aria-label="온보딩 단계">
      <ol className="flex items-center justify-center gap-0 list-none p-0 m-0">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => {
          const step = i + 1;
          const isDone = step < current;
          const isActive = step === current;
          return (
            <li key={step} className="flex items-center">
              <div
                aria-current={isActive ? 'step' : undefined}
                aria-label={`${step}단계${isDone ? ' (완료)' : isActive ? ' (현재)' : ''}`}
                className={[
                  'flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300',
                  isActive
                    ? 'bg-blue-500 text-white shadow-md shadow-blue-500/30'
                    : isDone
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-zinc-800 text-zinc-500',
                ].join(' ')}
              >
                {isDone ? <Check className="h-4 w-4" aria-hidden="true" /> : step}
              </div>
              {step < TOTAL_STEPS && (
                <div
                  aria-hidden="true"
                  className={[
                    'h-px w-10 transition-all duration-300',
                    step < current ? 'bg-blue-500/40' : 'bg-zinc-800',
                  ].join(' ')}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// ── Animation variants ─────────────────────────────────────────────────────────

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

// ── OnboardingPage ─────────────────────────────────────────────────────────────

export function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [profile, setProfile] = useState<ProfileData>({ name: '', title: '', bio: '' });
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [githubConnected, setGithubConnected] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('minimal');
  const [isConnecting, setIsConnecting] = useState(false);
  const [focusStep, setFocusStep] = useState<number | null>(null);

  const goNext = () => {
    if (step === 1 && !profile.name.trim()) {
      setErrors({ name: '이름을 입력해 주세요' });
      return;
    }
    setErrors({});
    if (step < TOTAL_STEPS) {
      setDirection(1);
      const next = step + 1;
      setStep(next);
      setFocusStep(next);
    }
  };

  const goPrev = () => {
    if (step > 1) {
      setDirection(-1);
      const prev = step - 1;
      setStep(prev);
      setFocusStep(prev);
    }
  };

  const handleGithubConnect = async () => {
    setIsConnecting(true);
    await new Promise<void>(r => setTimeout(r, 1200));
    setIsConnecting(false);
    setGithubConnected(true);
  };

  const handleFinish = () => {
    router.push(`/editor?template=${selectedTemplate}`);
  };

  const handleProfileChange = (field: keyof ProfileData, value: string) => {
    setProfile(p => ({ ...p, [field]: value }));
    if (field === 'name' && value.trim()) {
      setErrors(prev => ({ ...prev, name: undefined }));
    }
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
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-blue-500/6 blur-[120px]" />
      </div>

      <main className="relative z-10 w-full max-w-lg">
        {/* 로고 */}
        <div className="mb-8 flex items-center justify-center gap-2.5">
          <div
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500"
          >
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
          <header className="mb-6 text-center">
            <h1 className="text-xl font-bold text-zinc-50">{stepTitles[step - 1]}</h1>
            <p className="mt-1.5 text-sm text-zinc-400">{stepSubtitles[step - 1]}</p>
          </header>

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
                  <Step1ProfileForm
                    profile={profile}
                    errors={errors}
                    onChange={handleProfileChange}
                    isFocusTarget={focusStep === 1}
                  />
                )}
                {step === 2 && (
                  <Step2GitHubConnect
                    githubConnected={githubConnected}
                    isConnecting={isConnecting}
                    onConnect={handleGithubConnect}
                    isFocusTarget={focusStep === 2}
                  />
                )}
                {step === 3 && (
                  <Step3TemplateSelect
                    selected={selectedTemplate}
                    onSelect={setSelectedTemplate}
                    isFocusTarget={focusStep === 3}
                  />
                )}
                {step === 4 && (
                  <Step4Complete
                    profileName={profile.name}
                    selectedTemplate={selectedTemplate}
                    isFocusTarget={focusStep === 4}
                  />
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
              <div aria-hidden="true" />
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
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              ) : (
                <Button size="md" onClick={handleFinish} className="gap-2">
                  포트폴리오 편집 시작
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* 진행률 텍스트 */}
        <p className="mt-4 text-center text-xs text-zinc-600" aria-live="polite" aria-atomic="true">
          <span className="sr-only">현재 진행 단계: </span>
          {step} / {TOTAL_STEPS} 단계
        </p>
      </main>
    </div>
  );
}
