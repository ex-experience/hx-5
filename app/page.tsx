import { NeuralNavbar } from '@/components/navigation/neural-navbar';
import { HeroRuntime } from '@/components/hero/hero-runtime';
import { OracleSection } from '@/components/oracle/oracle-section';

export default function HomePage() {
  return (
    <main>
      <NeuralNavbar />
      <HeroRuntime />
      <OracleSection />
    </main>
  );
}
