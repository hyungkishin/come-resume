'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/button/Button';
import { Plus, Eye, Globe } from '@/shared/ui/icons';

export function EmptyPortfolios() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/50 px-6 py-16 text-center"
    >
      <div className="relative mb-6">
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 scale-150 rounded-full bg-blue-500/10 blur-2xl"
        />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-zinc-800 ring-1 ring-zinc-700">
          <Globe className="h-10 w-10 text-blue-400" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-zinc-100">아직 포트폴리오가 없어요</h3>
      <p className="mt-2 text-sm text-zinc-400">GitHub를 연결하거나 직접 만들어보세요</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link href="/editor">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button size="md" className="gap-2">
              <Plus className="h-4 w-4" />
              첫 포트폴리오 만들기
            </Button>
          </motion.div>
        </Link>
        <Link href="/templates">
          <Button variant="secondary" size="md" className="gap-2">
            <Eye className="h-4 w-4" />
            템플릿 둘러보기
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
