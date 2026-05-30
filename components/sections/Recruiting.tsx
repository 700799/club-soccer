import SectionShell from '../SectionShell';
import CommitmentsTable from '../CommitmentsTable';
import {
  recruitingTiers,
  pipelineClubs,
  recruitingResources,
} from '@/data/recruiting';

export default function Recruiting() {
  return (
    <SectionShell
      id="recruiting"
      eyebrow="College & Pro"
      title="College recruiting — who sends players where"
      intro={
        <>
          Which level gets you recruited to <strong>D1, D2, D3</strong> or the{' '}
          <strong>pros</strong>? Here&apos;s how the leagues feed the college and
          professional ranks — and exactly where to look up each NorCal club&apos;s
          real, current commitments.
        </>
      }
    >
      {/* Level → college tier */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {recruitingTiers.map((t) => (
          <div
            key={t.level}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="h-1.5 w-full" style={{ backgroundColor: t.color }} />
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900">{t.level}</h3>
                <span
                  className="rounded-full px-2 py-0.5 text-[11px] font-bold text-white"
                  style={{ backgroundColor: t.color }}
                >
                  → {t.feedsInto}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{t.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Top NorCal pipeline clubs */}
      <div className="mt-10">
        <h3 className="text-xl font-bold text-slate-900">
          NorCal&apos;s top college/pro pipeline clubs
        </h3>
        <p className="mt-1 max-w-3xl text-sm text-slate-600">
          The NorCal clubs competing at MLS NEXT / ECNL place the most players into
          college and pro programs. Commitment lists change constantly, so tap a
          club to look up its <strong>actual, current</strong> commits on
          TopDrawerSoccer rather than trusting a static list.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pipelineClubs.map((c) => (
            <a
              key={c.name}
              href={c.commitmentsUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-pitch-300 hover:shadow-md"
            >
              <div>
                <p className="font-bold text-slate-900 group-hover:text-pitch-700">
                  {c.name}
                </p>
                <p className="text-xs font-semibold text-slate-500">{c.topLevel}</p>
              </div>
              <span className="text-pitch-600 transition group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Commitments-by-division table */}
      <div className="mt-10">
        <CommitmentsTable />
      </div>

      {/* Resources */}
      <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h3 className="text-base font-bold text-slate-900">
          Look up any club&apos;s commitments
        </h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {recruitingResources.map((r) => (
            <a
              key={r.url}
              href={r.url}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-pitch-300 hover:shadow-md"
            >
              <p className="font-bold text-slate-900 group-hover:text-pitch-700">
                {r.name}
              </p>
              <p className="mt-1 flex-1 text-sm text-slate-600">{r.what}</p>
              <span className="mt-2 text-sm font-semibold text-pitch-700">
                Open ↗
              </span>
            </a>
          ))}
        </div>
      </div>

      <p className="mt-6 text-xs text-slate-500">
        Recruiting outcomes depend far more on the individual player, academics and
        effort than on a club name — strong players get recruited from every level.
        Commitment data is maintained by TopDrawerSoccer and SoccerWire; always
        verify at the source.
      </p>
    </SectionShell>
  );
}
