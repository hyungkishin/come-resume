'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/shared/ui/button/Button';
import { Sparkles, Menu, X } from '@/shared/ui/icons';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <Link href="/dashboard" className="hidden md:block">
            <Button variant="ghost" size="sm">
              로그인
            </Button>
          </Link>
          <Link href="/dashboard" className="hidden md:block">
            <Button size="sm">
              무료로 시작하기
            </Button>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="flex items-center justify-center rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100 md:hidden"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute left-0 right-0 top-full border-b border-zinc-800 bg-zinc-900 px-6 py-4 md:hidden"
          >
            <nav className="flex flex-col gap-1">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
              >
                대시보드
              </Link>
              <Link
                href="/editor"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
              >
                에디터
              </Link>
              <Link
                href="/resume"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
              >
                이력서
              </Link>
              <Link
                href="/templates"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
              >
                템플릿
              </Link>
            </nav>
            <div className="mt-4 border-t border-zinc-800 pt-4">
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button size="sm" className="w-full">
                  무료로 시작하기
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
