'use client';

import { Github, LogOut } from '@/shared/ui/icons';
import { Button } from '@/shared/ui/button/Button';
import { useAuthStore } from '../model/store';

export function AuthButton() {
  const { user } = useAuthStore();

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {user.githubAvatarUrl ? (
            <img
              src={user.githubAvatarUrl}
              alt={user.username}
              className="h-8 w-8 rounded-full border border-zinc-700"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-700 text-xs font-medium text-zinc-100">
              {user.username[0]?.toUpperCase()}
            </div>
          )}
          <span className="text-sm font-medium text-zinc-200">{user.username}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => useAuthStore.getState().setUser(null)}
        >
          <LogOut className="h-4 w-4" />
          로그아웃
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="primary"
      size="md"
      onClick={() => {
        window.location.href = '/api/auth/github';
      }}
    >
      <Github className="h-4 w-4" />
      GitHub로 시작하기
    </Button>
  );
}
