'use client';

import { useState } from 'react';
import { Star } from '@/shared/ui/icons';
import { Input } from '@/shared/ui/input/Input';
import { Badge } from '@/shared/ui/badge/Badge';
import { Button } from '@/shared/ui/button/Button';
import { cn } from '@/shared/lib/cn';
import { useGitHubImportStore } from '../model/store';

export function RepoSelector() {
  const { repos, selectedRepoIds, toggleRepo, selectAll, deselectAll } = useGitHubImportStore();
  const [query, setQuery] = useState('');

  const filtered = repos.filter(
    (r) =>
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      (r.description ?? '').toLowerCase().includes(query.toLowerCase())
  );

  const allSelected = repos.length > 0 && selectedRepoIds.length === repos.length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <Input
          placeholder="레포지토리 검색..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={allSelected ? deselectAll : selectAll}
        >
          {allSelected ? '전체 해제' : '전체 선택'}
        </Button>
      </div>

      <div className="flex flex-col gap-2 max-h-96 overflow-y-auto pr-1">
        {filtered.map((repo) => {
          const isSelected = selectedRepoIds.includes(repo.id);
          return (
            <button
              key={repo.id}
              onClick={() => toggleRepo(repo.id)}
              className={cn(
                'flex items-start gap-3 rounded-xl border p-4 text-left transition-all duration-150',
                isSelected
                  ? 'border-blue-500/50 bg-blue-500/5'
                  : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700 hover:bg-zinc-800/80'
              )}
            >
              <div
                className={cn(
                  'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors',
                  isSelected
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-zinc-600'
                )}
              >
                {isSelected && (
                  <svg className="h-2.5 w-2.5 text-white" fill="currentColor" viewBox="0 0 12 12">
                    <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-1.5 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-zinc-100">{repo.name}</span>
                  {repo.language && (
                    <Badge variant="blue">{repo.language}</Badge>
                  )}
                </div>
                {repo.description && (
                  <p className="text-xs text-zinc-400 line-clamp-2">{repo.description}</p>
                )}
                <div className="flex items-center gap-1 text-xs text-zinc-500">
                  <Star className="h-3 w-3" />
                  <span>{repo.stars}</span>
                </div>
              </div>
            </button>
          );
        })}
        {filtered.length === 0 && (
          <div className="flex items-center justify-center py-8 text-sm text-zinc-500">
            검색 결과가 없습니다
          </div>
        )}
      </div>

      <p className="text-xs text-zinc-500">
        {selectedRepoIds.length}개 선택됨 / 총 {repos.length}개
      </p>
    </div>
  );
}
