import { Suspense } from 'react';
import { Header } from '@/widgets/header';
import { EditorPage } from '@/views/editor';

export default function Editor() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Suspense>
          <EditorPage />
        </Suspense>
      </main>
    </>
  );
}
