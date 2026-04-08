'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/button/Button';
import { Input } from '@/shared/ui/input/Input';
import { Sparkles, ArrowRight } from '@/shared/ui/icons';
import { Github } from '@/shared/ui/icons';

type Mode = 'login' | 'signup';

export function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setIsLoading(false);
    router.push('/dashboard');
  };

  const handleGithub = async () => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setIsLoading(false);
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      {/* 배경 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-blue-500/6 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* 로고 */}
        <Link href="/" className="mb-8 flex items-center justify-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500">
            <Sparkles className="h-4.5 w-4.5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-zinc-50">Foliofy</span>
        </Link>

        {/* 카드 */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8 backdrop-blur-sm">
          <h1 className="text-center text-xl font-bold text-zinc-50">
            {mode === 'signup' ? '무료로 시작하기' : '다시 오신 걸 환영해요'}
          </h1>
          <p className="mt-2 text-center text-sm text-zinc-400">
            {mode === 'signup'
              ? '30초면 포트폴리오를 만들 수 있어요'
              : '이메일로 로그인하세요'}
          </p>

          {/* GitHub 버튼 */}
          <button
            onClick={handleGithub}
            disabled={isLoading}
            className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-100 transition-colors hover:bg-zinc-700 disabled:opacity-50"
          >
            <Github className="h-4.5 w-4.5" />
            GitHub로 계속하기
          </button>

          {/* 구분선 */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-zinc-800" />
            <span className="text-xs text-zinc-500">또는</span>
            <div className="h-px flex-1 bg-zinc-800" />
          </div>

          {/* 폼 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <Input
                id="name"
                label="이름"
                placeholder="홍길동"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            )}
            <Input
              id="email"
              label="이메일"
              type="email"
              placeholder="hello@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              id="password"
              label="비밀번호"
              type="password"
              placeholder={mode === 'signup' ? '8자 이상' : '비밀번호 입력'}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              size="lg"
              className="w-full gap-2"
              isLoading={isLoading}
              disabled={!email.trim() || !password.trim()}
            >
              {mode === 'signup' ? (
                <>
                  회원가입
                  <ArrowRight className="h-4 w-4" />
                </>
              ) : (
                '로그인'
              )}
            </Button>
          </form>

          {/* 모드 전환 */}
          <p className="mt-6 text-center text-sm text-zinc-400">
            {mode === 'signup' ? (
              <>
                이미 계정이 있으신가요?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="font-medium text-blue-400 transition-colors hover:text-blue-300"
                >
                  로그인
                </button>
              </>
            ) : (
              <>
                계정이 없으신가요?{' '}
                <button
                  onClick={() => setMode('signup')}
                  className="font-medium text-blue-400 transition-colors hover:text-blue-300"
                >
                  무료 회원가입
                </button>
              </>
            )}
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-zinc-600">
          가입 시{' '}
          <Link href="/terms" className="text-zinc-500 hover:text-zinc-400">이용약관</Link>
          {' '}및{' '}
          <Link href="/privacy" className="text-zinc-500 hover:text-zinc-400">개인정보처리방침</Link>
          에 동의합니다.
        </p>
      </motion.div>
    </div>
  );
}
