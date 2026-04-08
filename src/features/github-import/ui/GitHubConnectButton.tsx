'use client';

import { Github, Check } from '@/shared/ui/icons';
import { Button } from '@/shared/ui/button/Button';
import { useAuthStore } from '@/features/auth/model/store';

export function GitHubConnectButton() {
  const { user } = useAuthStore();
  const isConnected = Boolean(user?.githubUsername);

  if (isConnected) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10">
          <Check className="h-5 w-5 text-emerald-400" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-zinc-100">GitHub 연결됨</span>
          <span className="text-xs text-zinc-400">@{user?.githubUsername}</span>
        </div>
      </div>
    );
  }

  return (
    <Button
      variant="secondary"
      size="lg"
      onClick={() => {
        window.location.href = '/api/auth/github';
      }}
      className="w-full"
    >
      <Github className="h-5 w-5" />
      GitHub 연결하기
    </Button>
  );
}
