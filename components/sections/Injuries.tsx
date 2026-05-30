import SectionShell from '../SectionShell';
import {
  aclByAge,
  keyInjuryStats,
  commonInjuries,
  preventionProgram,
  preventionChecklist,
  whyInjuriesHappen,
  injurySources,
  warriorGirlsIntro,
  warriorGirlsThemes,
  warriorGirlsTakeaways,
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

      {/* Longevity framing */}
      <div className="mt-10 rounded-3xl border border-pitch-200 bg-gradient-to-br from-pitch-50 to-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-bold uppercase tracking-wider text-pitch-700">
          Play for life
        </p>
        <h3 className="mt-2 text-2xl font-extrabold text-slate-900">
          The goal isn&apos;t this season — it&apos;s a long, healthy career
        </h3>
        <p className="mt-3 max-w-3xl text-slate-700">
          The single most important idea in this whole section: optimize for{' '}
          <strong>longevity</strong>, not the next tournament. A player who stays
          healthy, rests, and keeps loving the game at 13 is the one still playing —
          and improving — at 18 and into college. Most careers don&apos;t end
          because a player wasn&apos;t good enough; they end from{' '}
          <strong>burnout and avoidable, repetitive injury</strong>. Durability is
          a skill, and it compounds: the kid who misses fewer weeks trains more
          weeks, and out-develops the &ldquo;phenom&rdquo; who is always hurt.
          Win the decade, not the weekend.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            {
              t: 'Availability is the best ability',
              d: 'Consistent, healthy training months beat a few brilliant — then injured — ones. The most-developed players are usually the most available ones.',
            },
            {
              t: 'Rest and variety are training',
              d: 'Off-seasons, sleep and a second sport aren\'t lost time — they\'re what let a body absorb load and keep developing for years.',
            },
            {
              t: 'Protect the love of the game',
              d: 'Longevity is mental too. Avoiding burnout keeps players choosing to play — which is what actually produces long careers.',
            },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-pitch-200 bg-white p-4">
              <p className="font-bold text-pitch-800">{c.t}</p>
              <p className="mt-1 text-sm text-slate-600">{c.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Warrior Girls deep-dive */}
      <div className="mt-10">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-xl font-bold text-slate-900">
            Deeper dive: the female injury epidemic
          </h3>
          <span className="text-sm font-medium text-slate-500">
            informed by <em>Warrior Girls</em> (Michael Sokolove)
          </span>
        </div>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">{warriorGirlsIntro}</p>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {warriorGirlsThemes.map((t) => (
            <div
              key={t.title}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <p className="font-bold text-red-700">{t.title}</p>
              <p className="mt-1 text-sm text-slate-600">{t.detail}</p>
            </div>
          ))}
        </div>

        {/* takeaways, framed around longevity */}
        <div className="mt-5 rounded-2xl border border-pitch-200 bg-pitch-50 p-5">
          <p className="font-bold text-pitch-900">
            What it means for a long career
          </p>
          <ul className="mt-3 space-y-2">
            {warriorGirlsTakeaways.map((t) => (
              <li key={t} className="flex gap-2.5 text-sm text-slate-700">
                <span className="mt-0.5 shrink-0 text-pitch-600" aria-hidden>
                  ✓
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-3 text-xs text-slate-500">
          Themes above are our paraphrased summary of the reporting and arguments
          in Michael Sokolove&apos;s <em>Warrior Girls: Protecting Our Daughters
          Against the Injury Epidemic in Women&apos;s Sports</em> (Simon &amp;
          Schuster, 2008), corroborated by the peer-reviewed sources below — not
          direct quotations.
        </p>
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
