'use client';

import Link from 'next/link';
import { Card } from '@/shared/ui/card/Card';
import { Badge } from '@/shared/ui/badge/Badge';
import { Button } from '@/shared/ui/button/Button';
import { Plus, Eye, Settings } from '@/shared/ui/icons';
import type { Portfolio } from '@/shared/types';

interface PortfolioCardProps {
  portfolio: Portfolio;
}

export function PortfolioCard({ portfolio: p }: PortfolioCardProps) {
  return (
    <Card hover className="cursor-pointer transition-transform duration-200 hover:scale-[1.01]">
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
        <Link href={`/editor?id=${p.id}`}>
          <Button variant="secondary" size="sm" className="gap-1.5">
            <Settings className="h-3.5 w-3.5" />
            편집
          </Button>
        </Link>
        <Link href={`/editor?id=${p.id}`}>
          <Button variant="ghost" size="sm" className="gap-1.5">
            <Eye className="h-3.5 w-3.5" />
            미리보기
          </Button>
        </Link>
      </div>
    </Card>
  );
}

interface AddPortfolioCardProps {
  className?: string;
}

export function AddPortfolioCard({ className }: AddPortfolioCardProps) {
  return (
    <Link href="/editor">
      <Card
        hover
        className={`flex cursor-pointer flex-col items-center justify-center border-dashed py-12 text-zinc-500 transition-colors hover:text-zinc-300 ${className ?? ''}`}
      >
        <Plus className="mb-2 h-8 w-8" />
        <span className="text-sm font-medium">새 포트폴리오 만들기</span>
      </Card>
    </Link>
  );
}
