'use client';

import type { ReactNode } from 'react';
import { Skeleton } from '@/shared/ui/skeleton/Skeleton';
import { Github } from '@/shared/ui/icons';
import { Button } from '@/shared/ui/button/Button';
import { useAuthStore } from '../model/store';

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-8">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900">
            <Github className="h-8 w-8 text-zinc-300" />
          </div>
          <h2 className="text-xl font-semibold text-zinc-50">로그인이 필요합니다</h2>
          <p className="max-w-sm text-sm text-zinc-400">
            GitHub 계정으로 로그인하여 포트폴리오를 만들고 이력서를 다듬어보세요.
          </p>
        </div>
        <Button
          variant="primary"
          size="lg"
          onClick={() => {
            window.location.href = '/api/auth/github';
          }}
        >
          <Github className="h-5 w-5" />
          GitHub로 시작하기
        </Button>
      </div>
    );
  }

  return <>{children}</>;
}
