'use client';

import Link from 'next/link';
import { Card } from '@/shared/ui/card/Card';
import { ArrowRight, Sparkles, FileText, Globe } from '@/shared/ui/icons';

interface ActionItem {
  href: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}

const ACTION_ITEMS: ActionItem[] = [
  {
    href: '/resume',
    icon: <Sparkles className="h-5 w-5" />,
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-400',
    title: 'AI 이력서 폴리싱',
    description: '이력서를 AI로 다듬어보세요',
  },
  {
    href: '/resume',
    icon: <FileText className="h-5 w-5" />,
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
    title: 'PDF 이력서 생성',
    description: 'ATS 호환 PDF로 내보내기',
  },
  {
    href: '/editor',
    icon: <Globe className="h-5 w-5" />,
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
    title: '포트폴리오 배포',
    description: '원클릭으로 배포하기',
  },
];

interface QuickActionsProps {
  isEmpty: boolean;
}

export function QuickActions({ isEmpty }: QuickActionsProps) {
  return (
    <div className={isEmpty ? 'rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6' : ''}>
      <h2 className="mb-4 text-lg font-semibold text-zinc-100">
        {isEmpty ? '시작해볼까요?' : '빠른 작업'}
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ACTION_ITEMS.map((item) => (
          <Link key={item.title} href={item.href}>
            <Card hover className="group cursor-pointer">
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${item.iconBg} ${item.iconColor}`}>
                {item.icon}
              </div>
              <h3 className="font-medium text-zinc-100">{item.title}</h3>
              <p className="mt-1 text-sm text-zinc-400">{item.description}</p>
              <ArrowRight className="mt-3 h-4 w-4 text-zinc-500 transition-transform group-hover:translate-x-1" />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
