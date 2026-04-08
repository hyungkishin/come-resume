'use client';

import { Card } from '@/shared/ui/card/Card';
import { Badge } from '@/shared/ui/badge/Badge';
import { Globe, Eye } from '@/shared/ui/icons';
import { cn } from '@/shared/lib/cn';
import type { Portfolio } from '@/shared/types';

interface PortfolioCardProps {
  portfolio: Portfolio;
  onClick?: () => void;
}

function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffDay > 30) {
    const diffMonth = Math.floor(diffDay / 30);
    return `${diffMonth}개월 전`;
  }
  if (diffDay > 0) return `${diffDay}일 전`;
  if (diffHour > 0) return `${diffHour}시간 전`;
  if (diffMin > 0) return `${diffMin}분 전`;
  return '방금 전';
}

export function PortfolioCard({ portfolio, onClick }: PortfolioCardProps) {
  const { title, slug, sections, isPublished, updatedAt } = portfolio;
  const visibleSections = sections.filter((s) => s.isVisible).length;

  return (
    <Card
      hover
      onClick={onClick}
      className={cn(onClick && 'cursor-pointer')}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          {isPublished ? (
            <Globe className="h-4 w-4 shrink-0 text-emerald-400" />
          ) : (
            <Eye className="h-4 w-4 shrink-0 text-zinc-500" />
          )}
          <h3 className="truncate text-sm font-semibold text-zinc-100">{title}</h3>
        </div>
        <Badge variant={isPublished ? 'green' : 'default'}>
          {isPublished ? '배포됨' : '초안'}
        </Badge>
      </div>

      <p className="mt-1.5 text-xs text-zinc-500">/{slug}</p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-zinc-500">
          섹션 {visibleSections}개
        </span>
        <span className="text-xs text-zinc-600">
          {getRelativeTime(updatedAt)} 수정
        </span>
      </div>
    </Card>
  );
}
