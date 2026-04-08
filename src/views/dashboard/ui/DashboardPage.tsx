'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/button/Button';
import { Globe, Eye, Sparkles, Plus } from '@/shared/ui/icons';
import type { Portfolio } from '@/shared/types';
import { StatCard } from './StatCard';
import { PortfolioCard, AddPortfolioCard } from './PortfolioCard';
import { QuickActions } from './QuickActions';
import { EmptyPortfolios } from './EmptyPortfolios';

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

const MOCK_PORTFOLIOS: Portfolio[] = [
  {
    id: '1',
    userId: 'u1',
    slug: 'hyungki',
    title: '신형기의 포트폴리오',
    sections: [
      { id: 's1', type: 'hero', order: 0, data: {}, isVisible: true },
      { id: 's2', type: 'projects', order: 1, data: {}, isVisible: true },
      { id: 's3', type: 'skills', order: 2, data: {}, isVisible: true },
    ],
    theme: { templateId: 'minimal-dark', primaryColor: '#3b82f6', fontFamily: 'Geist Sans', darkMode: true, customCSS: null },
    customDomain: null,
    isPublished: true,
    publishedAt: '2026-04-01T00:00:00Z',
    createdAt: '2026-03-15T00:00:00Z',
    updatedAt: '2026-04-05T00:00:00Z',
  },
];

export function DashboardPage() {
  const [portfolios] = useState<Portfolio[]>([]);
  const [showDemo, setShowDemo] = useState(false);

  const displayPortfolios = showDemo ? MOCK_PORTFOLIOS : portfolios;
  const visitorValue = displayPortfolios.length === 0 ? '--' : '0';
  const isEmpty = displayPortfolios.length === 0;

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      {/* Header */}
      <motion.div {...fadeUp} transition={{ duration: 0.4 }}>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-50">대시보드</h1>
            <p className="mt-1 text-sm text-zinc-400">포트폴리오와 이력서를 관리하세요</p>
          </div>
          <Link href="/editor">
            <Button size="md" className="gap-2">
              <Plus className="h-4 w-4" />
              새 포트폴리오
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        <StatCard label="포트폴리오" value={`${displayPortfolios.length}`} icon={<Globe className="h-5 w-5" />} />
        <StatCard label="총 방문자" value={visitorValue} icon={<Eye className="h-5 w-5" />} />
        <StatCard label="이력서 폴리싱" value="--" icon={<Sparkles className="h-5 w-5" />} />
      </motion.div>

      {/* Portfolio List */}
      <motion.div {...fadeUp} transition={{ duration: 0.4, delay: 0.2 }}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-100">내 포트폴리오</h2>
          <button
            onClick={() => setShowDemo((v) => !v)}
            className="text-xs text-zinc-500 underline-offset-2 transition-colors hover:text-zinc-300 hover:underline"
          >
            {showDemo ? '데모 데이터 숨기기' : '데모 데이터 보기'}
          </button>
        </div>

        {isEmpty ? (
          <EmptyPortfolios />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {displayPortfolios.map((p) => (
              <PortfolioCard key={p.id} portfolio={p} />
            ))}
            <AddPortfolioCard />
          </div>
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-10"
      >
        <QuickActions isEmpty={isEmpty} />
      </motion.div>
    </div>
  );
}
