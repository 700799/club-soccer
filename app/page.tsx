import Hero from '@/components/Hero';
import Sidebar from '@/components/Sidebar';
import Levels from '@/components/sections/Levels';
import Girls from '@/components/sections/Girls';
import Costs from '@/components/sections/Costs';
import Standings from '@/components/sections/Standings';
import Recruiting from '@/components/sections/Recruiting';
import Nearby from '@/components/sections/Nearby';
import Futsal from '@/components/sections/Futsal';
import Calendar from '@/components/sections/Calendar';
import Injuries from '@/components/sections/Injuries';
import Insoles from '@/components/sections/Insoles';
import News from '@/components/sections/News';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen lg:pl-64">
      <Sidebar />
      <Hero />
      <Levels />
      <Girls />
      <Costs />
      <Standings />
      <Recruiting />
      <Nearby />
      <Futsal />
      <Calendar />
      <Injuries />
      <Insoles />
      <News />
      <Footer />
    </main>
  );
}
