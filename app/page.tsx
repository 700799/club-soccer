import Hero from '@/components/Hero';
import FloatingMenu from '@/components/FloatingMenu';
import Levels from '@/components/sections/Levels';
import Girls from '@/components/sections/Girls';
import Costs from '@/components/sections/Costs';
import Standings from '@/components/sections/Standings';
import Nearby from '@/components/sections/Nearby';
import Injuries from '@/components/sections/Injuries';
import Insoles from '@/components/sections/Insoles';
import News from '@/components/sections/News';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <FloatingMenu />
      <Hero />
      <Levels />
      <Girls />
      <Costs />
      <Standings />
      <Nearby />
      <Injuries />
      <Insoles />
      <News />
      <Footer />
    </main>
  );
}
