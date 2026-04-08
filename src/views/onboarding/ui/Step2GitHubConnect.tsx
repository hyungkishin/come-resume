'use client';

import { useRef, useEffect } from 'react';
import { Check, Github } from '@/shared/ui/icons';

interface Step2GitHubConnectProps {
  githubConnected: boolean;
  isConnecting: boolean;
  onConnect: () => void;
  isFocusTarget: boolean;
}

export function Step2GitHubConnect({
  githubConnected,
  isConnecting,
  onConnect,
  isFocusTarget,
}: Step2GitHubConnectProps) {
  const connectBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isFocusTarget && !githubConnected) {
      connectBtnRef.current?.focus();
    }
  }, [isFocusTarget, githubConnected]);

  return (
    <div className="space-y-4">
      {githubConnected ? (
        <div
          role="status"
          aria-live="polite"
          className="flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/5 px-4 py-3.5"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20">
            <Check className="h-4 w-4 text-green-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-100">GitHub 연결됨</p>
            <p className="text-xs text-zinc-400">레포지토리를 자동으로 불러올 수 있어요</p>
          </div>
        </div>
      ) : (
        <button
          ref={connectBtnRef}
          onClick={onConnect}
          disabled={isConnecting}
          aria-label={isConnecting ? 'GitHub 연결 중입니다. 잠시 기다려 주세요.' : 'GitHub 계정 연결하기'}
          aria-busy={isConnecting}
          className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm font-medium text-zinc-100 transition-colors hover:bg-zinc-700 disabled:opacity-50"
        >
          {isConnecting ? (
            <svg
              className="h-4 w-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <Github className="h-4.5 w-4.5" aria-hidden="true" />
          )}
          {isConnecting ? '연결 중...' : 'GitHub 연결하기'}
        </button>
      )}
      <p className="text-center text-xs text-zinc-500">나중에 설정에서 연결할 수 있어요</p>
    </div>
  );
}
