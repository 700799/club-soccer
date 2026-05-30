import {
  funnelStages,
  funnelTakeaway,
  proSalaries,
  salaryReality,
  nilFacts,
} from '@/data/pro';

// Rendered inside the Recruiting section (not its own SectionShell) so it reads
// as the "what's at the very top" payoff to the recruiting content.
export default function ProPathway() {
  return (
    <div className="mt-12">
      <h3 className="text-2xl font-extrabold text-slate-900">
        From elementary school to the pros
      </h3>
      <p className="mt-2 max-w-3xl text-slate-600">
        How many players actually make it — and what the top of the pyramid
        really pays. Perspective matters: the higher you go, the narrower it gets.
      </p>

      {/* Funnel pyramid */}
      <div className="mt-6 flex flex-col items-center gap-1.5">
        {funnelStages.map((s) => (
          <div
            key={s.label}
            style={{ width: `${s.widthPct}%`, backgroundColor: s.color }}
            className="group relative flex min-h-[3.25rem] items-center justify-between gap-3 rounded-lg px-4 py-2 text-white shadow-sm"
          >
            <span className="text-sm font-bold sm:text-base">{s.label}</span>
            <span className="hidden text-right text-xs font-medium opacity-90 sm:block">
              {s.approx}
            </span>
          </div>
        ))}
        <p className="mt-1 text-xs text-slate-500">
          ▲ Each row is roughly to scale. Widths are illustrative of how the pool
          narrows toward the pro level.
        </p>
      </div>

      {/* Per-stage detail */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {funnelStages.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              <p className="font-bold text-slate-900">{s.label}</p>
            </div>
            <p className="mt-0.5 text-xs font-semibold text-slate-500">{s.approx}</p>
            <p className="mt-1 text-sm text-slate-600">{s.detail}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-900">
        <strong className="font-semibold">Keep perspective:</strong> {funnelTakeaway}
      </p>

      {/* Pro salaries */}
      <h4 className="mt-10 text-xl font-bold text-slate-900">
        What the pros actually earn
      </h4>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {proSalaries.map((l) => (
          <div
            key={l.league}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="h-1.5 w-full" style={{ backgroundColor: l.accent }} />
            <div className="p-5">
              <h5 className="text-lg font-extrabold text-slate-900">{l.league}</h5>
              <p className="text-xs font-semibold text-slate-500">{l.gender}</p>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="font-semibold text-slate-600">Minimum</dt>
                  <dd className="text-right text-slate-800">{l.min}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="font-semibold text-slate-600">Average</dt>
                  <dd className="text-right font-bold text-slate-900">{l.average}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="font-semibold text-slate-600">Top end</dt>
                  <dd className="text-right text-slate-800">{l.max}</dd>
                </div>
              </dl>
              <p className="mt-3 rounded-lg bg-slate-50 p-3 text-xs text-slate-600">
                {l.note}
              </p>
              <a
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-sm font-semibold text-pitch-700 hover:underline"
              >
                Salary source ↗
              </a>
            </div>
          </div>
        ))}
      </div>
      <ul className="mt-4 space-y-2">
        {salaryReality.map((r) => (
          <li key={r} className="flex gap-2.5 text-sm text-slate-600">
            <span className="mt-0.5 shrink-0 text-amber-500" aria-hidden>
              ⚠
            </span>
            <span>{r}</span>
          </li>
        ))}
      </ul>

      {/* NIL */}
      <h4 className="mt-10 text-xl font-bold text-slate-900">
        College money: NIL &amp; revenue sharing
      </h4>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {nilFacts.map((n) => (
          <div
            key={n.title}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <p className="font-bold text-slate-900">{n.title}</p>
            <p className="mt-1 text-sm text-slate-600">{n.detail}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-slate-500">
        Salary, NIL and revenue-sharing figures are approximate, change yearly, and
        are for perspective only — not financial advice. See the linked sources for
        current details.
      </p>
    </div>
  );
}
