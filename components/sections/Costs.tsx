import SectionShell from '../SectionShell';
import { leagues } from '@/data/leagues';

function money(n: number) {
  return n === 0 ? '$0' : `$${n.toLocaleString('en-US')}`;
}

export default function Costs() {
  const rows = [...leagues].sort((a, b) => a.rung - b.rung);
  return (
    <SectionShell
      id="costs"
      tinted
      eyebrow="What It Takes"
      title="Expectations & expected cost, level by level"
      intro={
        <>
          Two numbers matter: <strong>club dues</strong> (what you pay the club)
          and <strong>all-in</strong> (dues plus tournaments, travel, hotels and
          gear). The gap between them explodes at the national levels, where
          showcase travel — not dues — is the real expense.
        </>
      }
    >
      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="px-4 py-3 font-semibold">Level</th>
              <th className="px-4 py-3 font-semibold">Club dues / yr</th>
              <th className="px-4 py-3 font-semibold">All-in / yr</th>
              <th className="px-4 py-3 font-semibold">Time commitment & notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((l) => (
              <tr key={l.id} className="align-top hover:bg-slate-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 font-bold text-slate-800">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: l.color }}
                    />
                    {l.name}
                  </div>
                  <div className="text-xs text-slate-500">{l.ageRange}</div>
                </td>
                <td className="px-4 py-3 font-medium text-slate-700">
                  {money(l.cost.duesLow)} – {money(l.cost.duesHigh)}
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-md bg-pitch-50 px-2 py-1 font-bold text-pitch-800">
                    {money(l.cost.allInLow)} – {money(l.cost.allInHigh)}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-600">{l.cost.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 lg:hidden">
        {rows.map((l) => (
          <div
            key={l.id}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: l.color }}
              />
              {l.name}
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-xs uppercase text-slate-400">Dues / yr</p>
                <p className="font-medium text-slate-700">
                  {money(l.cost.duesLow)}–{money(l.cost.duesHigh)}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400">All-in / yr</p>
                <p className="font-bold text-pitch-800">
                  {money(l.cost.allInLow)}–{money(l.cost.allInHigh)}
                </p>
              </div>
            </div>
            <p className="mt-2 text-sm text-slate-600">{l.cost.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          {
            t: 'The MLS academy exception',
            d: 'MLS club academies (in NorCal, the San Jose Earthquakes) are fully funded — elite academy players pay $0. Independent MLS NEXT clubs still charge full freight.',
          },
          {
            t: 'Travel is the real bill',
            d: 'At ECNL/MLS NEXT, a single national-showcase trip (flights + hotel + meals for player and parent) runs $1,500–$2,500. Families often attend six or more a season.',
          },
          {
            t: 'Ask about scholarships',
            d: 'Most clubs offer financial aid or payment plans. Coaches\' travel is often passed to families — ask for the all-in number before you commit.',
          },
        ].map((c) => (
          <div
            key={c.t}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <p className="font-bold text-slate-800">{c.t}</p>
            <p className="mt-1 text-sm text-slate-600">{c.d}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
