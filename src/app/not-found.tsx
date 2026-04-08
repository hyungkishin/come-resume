import Link from 'next/link';
import { Button } from '@/shared/ui/button/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-4">
      <div className="flex flex-col items-center gap-6 text-center">
        <span className="text-8xl font-bold text-zinc-800">404</span>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-zinc-100">페이지를 찾을 수 없습니다</h1>
          <p className="text-zinc-400 text-sm">찾으시는 페이지가 존재하지 않거나 이동되었습니다</p>
        </div>
        <Link href="/">
          <Button variant="primary" size="md">
            홈으로 돌아가기
          </Button>
        </Link>
      </div>
    </div>
  );
}
