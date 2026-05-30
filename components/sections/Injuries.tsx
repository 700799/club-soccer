import SectionShell from '../SectionShell';
import {
  aclByAge,
  keyInjuryStats,
  commonInjuries,
  preventionProgram,
  preventionChecklist,
  whyInjuriesHappen,
  injurySources,
} from '@/data/injuries';

function AclChart() {
  const max = Math.max(...aclByAge.map((a) => a.aclIncidencePct));
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-base font-bold text-slate-900">
        ACL injury incidence climbs with age
      </h3>
      <p className="mt-1 text-sm text-slate-600">
        Approx. share of male/youth players with an ACL injury, by age band.
      </p>
      <div className="mt-6 space-y-4">
        {aclByAge.map((a) => (
          <div key={a.ageGroup}>
            <div className="flex items-baseline justify-between text-sm">
              <span className="font-semibold text-slate-700">{a.ageGroup}</span>
              <span className="font-bold text-red-600">{a.aclIncidencePct}%</span>
            </div>
            <div className="mt-1 h-3 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-red-500"
                style={{ width: `${(a.aclIncidencePct / max) * 100}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-slate-500">{a.context}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-slate-400">
        Source: pooled youth/male soccer ACL data (17,108-player season analysis;
        systematic reviews).
      </p>
    </div>
  );
}

export default function Injuries() {
  return (
    <SectionShell
      id="injuries"
      tinted
      eyebrow="Stay On The Pitch"
      title="Injuries, injury stats by age & prevention"
      intro={
        <>
          Soccer is hard on growing bodies. The good news: most of the worst
          injuries are <strong>partly preventable</strong>. Here&apos;s what the
          research says by age — and exactly what reduces risk.
        </>
      }
    >
      {/* key stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {keyInjuryStats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-3xl font-extrabold text-pitch-600">{s.value}</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">{s.label}</p>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">{s.detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <AclChart />

        {/* prevention */}
        <div className="rounded-2xl border border-pitch-200 bg-pitch-50 p-6 shadow-sm">
          <h3 className="text-base font-bold text-pitch-900">
            The fix: {preventionProgram.name}
          </h3>
          <p className="mt-1 text-sm text-pitch-800">{preventionProgram.summary}</p>
          <p className="mt-2 rounded-lg bg-white/70 p-3 text-sm font-medium text-pitch-900">
            {preventionProgram.evidence}
          </p>
          <ul className="mt-4 space-y-2.5">
            {preventionChecklist.map((p) => (
              <li key={p.title} className="flex gap-2.5">
                <span className="mt-0.5 text-pitch-600" aria-hidden>
                  ✓
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{p.title}</p>
                  <p className="text-xs text-slate-600">{p.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* why injuries happen */}
      <div className="mt-10">
        <h3 className="text-xl font-bold text-slate-900">
          Why injuries happen
        </h3>
        <p className="mt-1 max-w-3xl text-sm text-slate-600">
          Understanding the <em>mechanism</em> is the first step to preventing it.
          Here&apos;s what the research points to.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {whyInjuriesHappen.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <p className="font-bold text-red-700">{c.title}</p>
              <p className="mt-1 text-sm text-slate-600">{c.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* common injuries */}
      <div className="mt-10">
        <h3 className="text-xl font-bold text-slate-900">
          Common youth soccer injuries
        </h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {commonInjuries.map((inj) => (
            <div
              key={inj.name}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <h4 className="font-bold text-slate-900">{inj.name}</h4>
              <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-500">
                <span className="rounded bg-slate-100 px-2 py-0.5">{inj.area}</span>
                <span className="rounded bg-slate-100 px-2 py-0.5">
                  {inj.typicalAge}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{inj.what}</p>
            </div>
          ))}
        </div>
      </div>

      {/* sources */}
      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900">
          Sources for these stats
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          The figures on this page come from peer-reviewed and clinical research:
        </p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {injurySources.map((s) => (
            <li key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="flex gap-2 text-sm text-pitch-700 hover:underline"
              >
                <span aria-hidden>↗</span>
                <span>{s.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-8 rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-500">
        Educational information only — not medical advice. For any specific injury
        or persistent pain, see a sports-medicine physician or physical therapist.
      </p>
    </SectionShell>
  );
}
