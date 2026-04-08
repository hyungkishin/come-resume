import { Header } from '@/widgets/header';
import { LandingPage } from '@/views/landing';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <LandingPage />
      </main>
    </>
  );
}
