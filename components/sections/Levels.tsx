import SectionShell from '../SectionShell';
import { leagues, norcalPremierDivisions, type LeagueLevel } from '@/data/leagues';

function fmtMoney(n: number) {
  if (n === 0) return '$0';
  if (n >= 1000) return `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
  return `$${n}`;
}

function Pyramid() {
  const desc = [...leagues].sort((a, b) => b.rung - a.rung);
  const n = desc.length;
  return (
    <div className="flex flex-col items-center gap-1.5">
      {desc.map((lvl, i) => {
        const width = 48 + (i * 52) / (n - 1); // apex narrow → base wide
        return (
          <a
            key={lvl.id}
            href={`#level-${lvl.id}`}
            style={{ width: `${width}%`, backgroundColor: lvl.color }}
            className="group flex items-center justify-between rounded-md px-3 py-2.5 text-white shadow-sm transition hover:brightness-110"
          >
            <span className="text-sm font-bold sm:text-base">{lvl.name}</span>
            <span className="hidden text-xs font-medium opacity-90 sm:inline">
              {lvl.shortName}
            </span>
          </a>
        );
      })}
      <p className="mt-2 text-xs text-slate-500">
        ▲ Tap any rung to jump to its details. Higher = more elite, more selective,
        more travel & cost.
      </p>
    </div>
  );
}

function LevelCard({ lvl }: { lvl: LeagueLevel }) {
  return (
    <article
      id={`level-${lvl.id}`}
      className="scroll-mt-24 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div className="h-1.5 w-full" style={{ backgroundColor: lvl.color }} />
      <div className="p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-xl font-bold text-slate-900">
            <span
              className="mr-2 inline-block h-2.5 w-2.5 rounded-full align-middle"
              style={{ backgroundColor: lvl.color }}
            />
            {lvl.name}
          </h3>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
            Rung {lvl.rung}
          </span>
        </div>
        <p className="mt-1 text-sm font-medium text-pitch-700">{lvl.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          {lvl.description}
        </p>

        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="font-semibold text-slate-700">Run by</dt>
            <dd className="text-slate-600">{lvl.governingBody}</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-700">Ages</dt>
            <dd className="text-slate-600">{lvl.ageRange}</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-700">Travel</dt>
            <dd className="text-slate-600">{lvl.travel}</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-700">Getting in</dt>
            <dd className="text-slate-600">{lvl.selectivity}</dd>
          </div>
        </dl>

        <div className="mt-4">
          <p className="text-sm font-semibold text-slate-700">Expectations</p>
          <ul className="mt-2 space-y-1.5">
            {lvl.expectations.map((e) => (
              <li key={e} className="flex gap-2 text-sm text-slate-600">
                <span className="mt-1 text-pitch-500" aria-hidden>
                  ✓
                </span>
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
          <span className="font-semibold text-slate-700">Who it&apos;s for: </span>
          {lvl.whoItsFor}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="rounded-lg bg-pitch-50 px-3 py-1.5 text-sm font-semibold text-pitch-800">
            {fmtMoney(lvl.cost.allInLow)}–{fmtMoney(lvl.cost.allInHigh)}/yr all-in
          </span>
          {lvl.officialUrl && (
            <a
              href={lvl.officialUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-pitch-700 underline-offset-2 hover:underline"
            >
              Official site ↗
            </a>
          )}
          {lvl.standingsUrl && (
            <a
              href="#standings"
              className="text-sm font-semibold text-slate-600 underline-offset-2 hover:underline"
            >
              See standings ↓
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Levels() {
  return (
    <SectionShell
      id="levels"
      eyebrow="The Pathway"
      title="Levels of soccer in Northern California"
      intro={
        <>
          U.S. youth soccer has no single, tidy pyramid — it&apos;s a stack of
          overlapping leagues. Here&apos;s how it actually lines up for{' '}
          <strong>boys in NorCal</strong>, from the first rec game to the
          professional pathway.
        </>
      }
    >
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="lg:sticky lg:top-20">
          <Pyramid />

          {/* NorCal Premier divisions ladder */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-base font-bold text-slate-900">
              Inside NorCal Premier: Copper → Premier
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              The regional league is itself a tiered ladder. Teams are promoted and
              relegated by results.
            </p>
            <ol className="mt-4 space-y-2">
              {[...norcalPremierDivisions].reverse().map((d, i, arr) => (
                <li
                  key={d.name}
                  className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3"
                >
                  <span
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: d.color }}
                  >
                    {arr.length - i}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {d.name}{' '}
                      <span className="font-normal text-slate-500">— {d.level}</span>
                    </p>
                    <p className="text-sm text-slate-600">{d.blurb}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="space-y-5">
          {[...leagues]
            .sort((a, b) => a.rung - b.rung)
            .map((lvl) => (
              <LevelCard key={lvl.id} lvl={lvl} />
            ))}
        </div>
      </div>
    </SectionShell>
  );
}
