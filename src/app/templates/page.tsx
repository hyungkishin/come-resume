import { Header } from '@/widgets/header';
import { TemplatesPage } from '@/views/templates';

export default function Templates() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <TemplatesPage />
      </main>
    </>
  );
}
