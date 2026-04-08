'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/button/Button';
import { Github, Sparkles } from '@/shared/ui/icons';

export function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/50 bg-[#09090b]/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-zinc-50">
            Foliofy
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/dashboard"
            className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
          >
            대시보드
          </Link>
          <Link
            href="/editor"
            className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
          >
            에디터
          </Link>
          <Link
            href="/resume"
            className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
          >
            이력서
          </Link>
          <Link
            href="/templates"
            className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
          >
            템플릿
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm">
            로그인
          </Button>
          <Button size="sm" className="gap-2">
            <Github className="h-4 w-4" />
            GitHub로 시작하기
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
