'use client';

import Link from 'next/link';
import { X } from '@/shared/ui/icons';
import { Button } from '@/shared/ui/button/Button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ reset }: ErrorProps) {
  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-4">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10">
          <X className="w-10 h-10 text-red-400" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-zinc-100">문제가 발생했습니다</h1>
          <p className="text-zinc-400 text-sm">잠시 후 다시 시도해주세요</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="primary" size="md" onClick={reset}>
            다시 시도
          </Button>
          <Link href="/">
            <Button variant="outline" size="md">
              홈으로
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
