'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/button/Button';
import { Card } from '@/shared/ui/card/Card';
import { Badge } from '@/shared/ui/badge/Badge';
import { Plus, FileText, Eye, Globe, Sparkles, ArrowRight, Settings } from '@/shared/ui/icons';
import { cn } from '@/shared/lib/cn';
import type { Portfolio } from '@/shared/types';

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

function StatCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <Card className="flex items-center gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
        {icon}
      </div>
      <div>
        <p className="text-sm text-zinc-400">{label}</p>
        <p className="text-xl font-bold text-zinc-50">{value}</p>
      </div>
    </Card>
  );
}

export function DashboardPage() {
  const [portfolios] = useState<Portfolio[]>(MOCK_PORTFOLIOS);

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <motion.div {...fadeUp} transition={{ duration: 0.4 }}>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-50">대시보드</h1>
            <p className="mt-1 text-sm text-zinc-400">포트폴리오와 이력서를 관리하세요</p>
          </div>
          <Button size="md" className="gap-2">
            <Plus className="h-4 w-4" />
            새 포트폴리오
          </Button>
        </div>
      </motion.div>

      <motion.div
        {...fadeUp}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        <StatCard label="포트폴리오" value={`${portfolios.length}`} icon={<Globe className="h-5 w-5" />} />
        <StatCard label="총 방문자" value="1,247" icon={<Eye className="h-5 w-5" />} />
        <StatCard label="이력서 폴리싱" value="12회" icon={<Sparkles className="h-5 w-5" />} />
      </motion.div>

      <motion.div {...fadeUp} transition={{ duration: 0.4, delay: 0.2 }}>
        <h2 className="mb-4 text-lg font-semibold text-zinc-100">내 포트폴리오</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {portfolios.map((p) => (
            <Card key={p.id} hover className="cursor-pointer">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-zinc-100">{p.title}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{p.slug}.foliofy.dev</p>
                </div>
                <Badge variant={p.isPublished ? 'green' : 'default'}>
                  {p.isPublished ? '배포됨' : '초안'}
                </Badge>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
                <span>섹션 {p.sections.length}개</span>
                <span>·</span>
                <span>마지막 수정 {new Date(p.updatedAt).toLocaleDateString('ko-KR')}</span>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="secondary" size="sm" className="gap-1.5">
                  <Settings className="h-3.5 w-3.5" />
                  편집
                </Button>
                <Button variant="ghost" size="sm" className="gap-1.5">
                  <Eye className="h-3.5 w-3.5" />
                  미리보기
                </Button>
              </div>
            </Card>
          ))}

          <Card
            hover
            className="flex cursor-pointer flex-col items-center justify-center border-dashed py-12 text-zinc-500 transition-colors hover:text-zinc-300"
          >
            <Plus className="mb-2 h-8 w-8" />
            <span className="text-sm font-medium">새 포트폴리오 만들기</span>
          </Card>
        </div>
      </motion.div>

      <motion.div {...fadeUp} transition={{ duration: 0.4, delay: 0.3 }} className="mt-10">
        <h2 className="mb-4 text-lg font-semibold text-zinc-100">빠른 작업</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card hover className="group cursor-pointer">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="font-medium text-zinc-100">AI 이력서 폴리싱</h3>
            <p className="mt-1 text-sm text-zinc-400">이력서를 AI로 다듬어보세요</p>
            <ArrowRight className="mt-3 h-4 w-4 text-zinc-500 transition-transform group-hover:translate-x-1" />
          </Card>
          <Card hover className="group cursor-pointer">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
              <FileText className="h-5 w-5" />
            </div>
            <h3 className="font-medium text-zinc-100">PDF 이력서 생성</h3>
            <p className="mt-1 text-sm text-zinc-400">ATS 호환 PDF로 내보내기</p>
            <ArrowRight className="mt-3 h-4 w-4 text-zinc-500 transition-transform group-hover:translate-x-1" />
          </Card>
          <Card hover className="group cursor-pointer">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
              <Globe className="h-5 w-5" />
            </div>
            <h3 className="font-medium text-zinc-100">포트폴리오 배포</h3>
            <p className="mt-1 text-sm text-zinc-400">원클릭으로 배포하기</p>
            <ArrowRight className="mt-3 h-4 w-4 text-zinc-500 transition-transform group-hover:translate-x-1" />
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
