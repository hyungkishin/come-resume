import { Header } from '@/widgets/header';
import { ResumePage } from '@/views/resume';

export default function Resume() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <ResumePage />
      </main>
    </>
  );
}
