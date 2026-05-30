import { sections } from './nav';
import AffiliateDisclosure from './AffiliateDisclosure';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:pr-16">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-lg font-bold text-white">⚽ NorCal Soccer Guide</p>
            <p className="mt-2 max-w-xs text-sm">
              An independent guide to Northern California youth soccer — levels,
              costs, standings, injury prevention and insoles.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-300">
              Sections
            </p>
            <ul className="mt-3 space-y-1.5 text-sm">
              {sections
                .filter((s) => s.id !== 'top')
                .map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="transition hover:text-pitch-300">
                      {s.label}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-300">
              Official sources
            </p>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li>
                <a href="https://norcalpremier.com/" className="transition hover:text-pitch-300" target="_blank" rel="noreferrer">
                  NorCal Premier
                </a>
              </li>
              <li>
                <a href="https://theecnl.com/" className="transition hover:text-pitch-300" target="_blank" rel="noreferrer">
                  ECNL / ECRL
                </a>
              </li>
              <li>
                <a href="https://www.mlssoccer.com/mlsnext/" className="transition hover:text-pitch-300" target="_blank" rel="noreferrer">
                  MLS NEXT
                </a>
              </li>
              <li>
                <a href="https://usclubsoccer.org/" className="transition hover:text-pitch-300" target="_blank" rel="noreferrer">
                  US Club Soccer (NPL)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6">
          <AffiliateDisclosure compact />
          <p className="mt-3 text-xs text-slate-500">
            © {new Date().getFullYear()} NorCal Soccer Guide. Independent and not
            affiliated with NorCal Premier, ECNL, US Club Soccer or MLS. Standings
            and records are maintained by those official bodies — always confirm at
            the source. Educational content only; not medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
