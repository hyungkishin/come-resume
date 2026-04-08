'use client';

import { Suspense } from 'react';
import { Header } from '@/widgets/header';
import { EditorPage } from '@/views/editor';
import { Skeleton } from '@/shared/ui/skeleton/Skeleton';

export default function Editor() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Suspense fallback={<div className="flex h-[calc(100vh-64px)] items-center justify-center"><Skeleton className="h-8 w-32" /></div>}>
          <EditorPage />
        </Suspense>
      </main>
    </>
  );
}
