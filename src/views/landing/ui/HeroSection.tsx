'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/button/Button';
import { Badge } from '@/shared/ui/badge/Badge';
import { Github, ArrowRight, Sparkles } from '@/shared/ui/icons';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-16">
      {/* 배경 그래디언트 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/8 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[600px] translate-x-1/4 translate-y-1/4 rounded-full bg-purple-500/5 blur-[100px]" />
      </div>

      {/* 그리드 패턴 */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Badge variant="blue" className="mb-6 inline-flex items-center gap-1.5">
            <Sparkles className="h-3 w-3" />
            AI 기반 포트폴리오 자동 생성
          </Badge>
        </motion.div>

        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl font-bold leading-[1.1] tracking-tight text-zinc-50 sm:text-6xl lg:text-7xl"
        >
          GitHub 연결하면
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            포트폴리오 완성
          </span>
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl"
        >
          5분 만에 프로페셔널한 포트폴리오 사이트를 만들고,
          <br className="hidden sm:block" />
          AI가 이력서를 임팩트 있게 다듬어 드립니다.
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link href="/dashboard">
            <Button size="lg" className="group gap-2 text-base">
              무료로 시작하기
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="lg" className="gap-2 text-base">
              <Github className="h-5 w-5" />
              GitHub로 시작하기
            </Button>
          </Link>
        </motion.div>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 text-sm text-zinc-500"
        >
          카드 등록 없이 무료로 시작 — 3,000+ 개발자가 사용 중
        </motion.p>

        {/* 히어로 미리보기 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative mt-16"
        >
          <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 shadow-2xl shadow-zinc-950/50">
            {/* 브라우저 탑바 */}
            <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-zinc-700" />
                <div className="h-3 w-3 rounded-full bg-zinc-700" />
                <div className="h-3 w-3 rounded-full bg-zinc-700" />
              </div>
              <div className="mx-auto flex h-7 w-64 items-center justify-center rounded-md bg-zinc-800 text-xs text-zinc-500">
                username.foliofy.dev
              </div>
            </div>
            {/* 미리보기 콘텐츠 */}
            <div className="p-8 sm:p-12">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
                  <div className="space-y-2">
                    <div className="h-5 w-40 rounded bg-zinc-800" />
                    <div className="h-3 w-56 rounded bg-zinc-800/60" />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="space-y-3 rounded-lg border border-zinc-800 bg-zinc-800/30 p-4"
                    >
                      <div className="h-24 rounded-md bg-zinc-800/80" />
                      <div className="h-3 w-3/4 rounded bg-zinc-800" />
                      <div className="flex gap-2">
                        <div className="h-5 w-14 rounded-full bg-blue-500/10" />
                        <div className="h-5 w-14 rounded-full bg-purple-500/10" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* 글로우 이펙트 */}
          <div className="pointer-events-none absolute -inset-px rounded-xl bg-gradient-to-b from-blue-500/10 via-transparent to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
