'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/button/Button';
import { Tabs } from '@/shared/ui/tabs/Tabs';
import { Badge } from '@/shared/ui/badge/Badge';
import { Card } from '@/shared/ui/card/Card';
import { Check, Palette } from '@/shared/ui/icons';
import { cn } from '@/shared/lib/cn';

interface Template {
  id: string;
  name: string;
  description: string;
  category: 'all' | 'minimal' | 'creative' | 'professional' | 'developer';
  isPremium: boolean;
  colors: string[];
}

const TEMPLATES: Template[] = [
  { id: 'minimal-dark', name: 'Minimal Dark', description: '깔끔한 다크 테마', category: 'minimal', isPremium: false, colors: ['#09090b', '#3b82f6'] },
  { id: 'developer-pro', name: 'Developer Pro', description: '개발자를 위한 프로 템플릿', category: 'developer', isPremium: false, colors: ['#0f172a', '#22d3ee'] },
  { id: 'creative-gradient', name: 'Creative Gradient', description: '크리에이티브 그래디언트', category: 'creative', isPremium: true, colors: ['#1e1b4b', '#7c3aed', '#ec4899'] },
  { id: 'clean-white', name: 'Clean White', description: '심플한 화이트 테마', category: 'minimal', isPremium: true, colors: ['#ffffff', '#3b82f6'] },
  { id: 'neon-nights', name: 'Neon Nights', description: '네온 감성 다크 테마', category: 'creative', isPremium: true, colors: ['#0a0a0a', '#22d3ee', '#a855f7'] },
  { id: 'corporate', name: 'Corporate', description: '프로페셔널 비즈니스', category: 'professional', isPremium: true, colors: ['#1e293b', '#0ea5e9'] },
  { id: 'portfolio-plus', name: 'Portfolio Plus', description: '포트폴리오 특화', category: 'developer', isPremium: true, colors: ['#18181b', '#f97316'] },
  { id: 'modern-stack', name: 'Modern Stack', description: '모던 스택 쇼케이스', category: 'developer', isPremium: false, colors: ['#020617', '#10b981'] },
  { id: 'elegant', name: 'Elegant', description: '우아한 디자인', category: 'professional', isPremium: true, colors: ['#1c1917', '#d97706'] },
  { id: 'starter', name: 'Starter', description: '빠르게 시작하기', category: 'minimal', isPremium: false, colors: ['#09090b', '#6366f1'] },
];

const CATEGORIES = [
  { id: 'all', label: '전체' },
  { id: 'minimal', label: '미니멀' },
  { id: 'creative', label: '크리에이티브' },
  { id: 'professional', label: '프로페셔널' },
  { id: 'developer', label: '개발자' },
];

export function TemplatesPage() {
  const [category, setCategory] = useState('all');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = category === 'all'
    ? TEMPLATES
    : TEMPLATES.filter(t => t.category === category);

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
            <Palette className="h-4 w-4 text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-zinc-50">템플릿 갤러리</h1>
        </div>
        <p className="mb-8 text-sm text-zinc-400">
          프리미엄 디자인 템플릿으로 포트폴리오를 돋보이게 하세요.
        </p>
      </motion.div>

      <Tabs
        tabs={CATEGORIES}
        activeTab={category}
        onTabChange={setCategory}
        className="mb-8"
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <Card
              hover
              className={cn(
                'cursor-pointer p-0 overflow-hidden transition-all',
                selected === t.id && 'ring-2 ring-blue-500'
              )}
              onClick={() => setSelected(t.id)}
            >
              {/* 프리뷰 */}
              <div
                className="relative h-40"
                style={{
                  background: t.colors.length > 2
                    ? `linear-gradient(135deg, ${t.colors.join(', ')})`
                    : `linear-gradient(135deg, ${t.colors[0]}, ${t.colors[1] || t.colors[0]})`,
                }}
              >
                {/* 미리보기 요소 */}
                <div className="absolute inset-4 flex flex-col justify-end">
                  <div className="h-3 w-24 rounded bg-white/20" />
                  <div className="mt-2 h-2 w-32 rounded bg-white/10" />
                  <div className="mt-3 flex gap-2">
                    <div className="h-2 w-12 rounded bg-white/10" />
                    <div className="h-2 w-12 rounded bg-white/10" />
                  </div>
                </div>
                {selected === t.id && (
                  <div className="absolute inset-0 flex items-center justify-center bg-blue-500/20 backdrop-blur-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                  </div>
                )}
                {t.isPremium && (
                  <div className="absolute right-3 top-3">
                    <Badge variant="amber">Pro</Badge>
                  </div>
                )}
              </div>

              {/* 정보 */}
              <div className="p-4">
                <h3 className="font-medium text-zinc-100">{t.name}</h3>
                <p className="mt-1 text-xs text-zinc-400">{t.description}</p>
                <div className="mt-3 flex gap-1.5">
                  {t.colors.map((c, ci) => (
                    <div
                      key={ci}
                      className="h-4 w-4 rounded-full border border-zinc-700"
                      style={{ background: c }}
                    />
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
        >
          <div className="flex items-center gap-3 rounded-2xl border border-zinc-700 bg-zinc-900/95 px-6 py-3 shadow-xl backdrop-blur-lg">
            <span className="text-sm text-zinc-300">
              <span className="font-medium text-zinc-100">
                {TEMPLATES.find(t => t.id === selected)?.name}
              </span>{' '}
              선택됨
            </span>
            <Link href={`/editor?template=${selected}`}>
              <Button size="sm">이 템플릿 사용하기</Button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
