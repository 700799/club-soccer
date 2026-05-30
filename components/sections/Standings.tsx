import SectionShell from '../SectionShell';
import {
  clubs,
  standingsSources,
  directoryLastReviewed,
  type Club,
} from '@/data/clubs';

const levelStyles: Record<Club['topLevel'], string> = {
  'MLS NEXT': 'bg-red-100 text-red-800 border-red-200',
  ECNL: 'bg-purple-100 text-purple-800 border-purple-200',
  ECRL: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  NPL: 'bg-sky-100 text-sky-800 border-sky-200',
  'NorCal Premier': 'bg-pitch-100 text-pitch-800 border-pitch-200',
};

const order: Club['topLevel'][] = [
  'MLS NEXT',
  'ECNL',
  'ECRL',
  'NPL',
  'NorCal Premier',
];

export default function Standings() {
  const sorted = [...clubs].sort(
    (a, b) => order.indexOf(a.topLevel) - order.indexOf(b.topLevel),
  );

  return (
    <SectionShell
      id="standings"
      eyebrow="Records & Tables"
      title="Standings & records for every NorCal club"
      intro={
        <>
          Youth tables change every weekend and league rosters re-shuffle every
          year. To keep this <strong>accurate</strong>, we link straight to each
          league&apos;s <strong>official live standings</strong> — the single
          source of truth for win/loss records — and keep a verified directory of
          NorCal clubs and the tiers they compete in.
        </>
      }
    >
      {/* Live standings sources */}
      <div className="grid gap-4 md:grid-cols-2">
        {standingsSources.map((s) => (
          <a
            key={s.league}
            href={s.url}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-pitch-300 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">{s.league}</h3>
              <span className="text-pitch-600 transition group-hover:translate-x-0.5">
                ↗
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-600">{s.description}</p>
            <p className="mt-3 text-xs font-medium uppercase tracking-wide text-slate-400">
              Live data · {s.provider}
            </p>
          </a>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-900">
        <strong className="font-semibold">How to read a youth table:</strong>{' '}
        most NorCal leagues run on GotSport and rank teams by points (3 for a win,
        1 for a draw), then goal difference. Open a league above, choose your age
        group, region and division, and switch to the <em>Standings</em> or{' '}
        <em>Results</em> tab for current win/loss records.
      </div>

      {/* Club directory */}
      <div className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h3 className="text-xl font-bold text-slate-900">
            NorCal boys club directory
          </h3>
          <p className="text-xs text-slate-500">
            Directory last reviewed {directoryLastReviewed}
          </p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((c) => (
            <div
              key={c.name}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-bold leading-tight text-slate-900">{c.name}</h4>
                <span
                  className={`shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${levelStyles[c.topLevel]}`}
                >
                  {c.topLevel}
                </span>
              </div>
              <p className="mt-0.5 text-sm text-slate-500">{c.city}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {c.leagues.map((lg) => (
                  <span
                    key={lg}
                    className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
                  >
                    {lg}
                  </span>
                ))}
              </div>
              {c.note && (
                <p className="mt-3 text-xs leading-relaxed text-slate-500">{c.note}</p>
              )}
              <a
                href={c.website}
                target="_blank"
                rel="noreferrer"
                className="mt-3 text-sm font-semibold text-pitch-700 underline-offset-2 hover:underline"
              >
                Club site & standings ↗
              </a>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-slate-500">
          Directory is representative, not exhaustive — NorCal Premier alone spans
          hundreds of clubs. League placement changes yearly; always confirm a
          team&apos;s current division and record on the official links above.
        </p>
      </div>
    </SectionShell>
  );
}
