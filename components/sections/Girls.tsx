import SectionShell from '../SectionShell';
import {
  girlsDifferences,
  girlsTopLeagues,
  girlsStandingsSources,
} from '@/data/girls';

export default function Girls() {
  return (
    <SectionShell
      id="girls"
      eyebrow="The Girls Game"
      title="The girls pathway in NorCal"
      intro={
        <>
          The bottom of the ladder is the same for everyone — Rec → Select →
          NorCal Premier (Copper → Premier) → NPL → ECNL RL. What changes for
          girls is the <strong>top tier</strong>, the{' '}
          <strong>GA / ASPIRE / DPL</strong> ecosystem, and the{' '}
          <strong>pro route</strong>. So the Costs, Injuries and Insoles sections
          all apply to girls too — here is what&apos;s different.
        </>
      }
    >
      {/* Top of the girls pyramid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {girlsTopLeagues.map((l) => (
          <a
            key={l.name}
            href={l.url}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <span
              className="inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-bold text-white"
              style={{ backgroundColor: l.color }}
            >
              {l.tier}
            </span>
            <h3 className="mt-3 text-lg font-bold text-slate-900 group-hover:text-pitch-700">
              {l.name}
            </h3>
            <p className="mt-1 flex-1 text-sm text-slate-600">{l.blurb}</p>
            <span className="mt-3 text-sm font-semibold text-pitch-700">
              Standings & info ↗
            </span>
          </a>
        ))}
      </div>

      {/* How girls differs from boys */}
      <div className="mt-10">
        <h3 className="text-xl font-bold text-slate-900">
          How the girls game differs from the boys
        </h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {girlsDifferences.map((d) => (
            <div
              key={d.title}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <p className="font-bold text-pink-700">{d.title}</p>
              <p className="mt-1 text-sm text-slate-600">{d.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Girls standings sources */}
      <div className="mt-10">
        <h3 className="text-xl font-bold text-slate-900">
          Official girls standings & records
        </h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {girlsStandingsSources.map((s) => (
            <a
              key={s.league}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-pink-300 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-slate-900">{s.league}</h4>
                <span className="text-pink-600 transition group-hover:translate-x-0.5">
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
      </div>

      <p className="mt-8 rounded-xl border border-pink-200 bg-pink-50 p-4 text-sm text-pink-900">
        Looking for the full club list? The{' '}
        <a href="#standings" className="font-semibold underline">
          Standings &amp; Records
        </a>{' '}
        section has a searchable girls club directory (filter by region and
        level). Girls clubs and league placement change every year — always confirm
        a team&apos;s current league, age group and record on the official links
        above.
      </p>
    </SectionShell>
  );
}
