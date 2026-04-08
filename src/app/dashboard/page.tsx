import { Header } from '@/widgets/header';
import { DashboardPage } from '@/views/dashboard';

export default function Dashboard() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <DashboardPage />
      </main>
    </>
  );
}
