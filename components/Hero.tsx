import { sections } from './nav';

const quickStats = [
  { value: '3,000+', label: 'NorCal Premier teams' },
  { value: '7', label: 'levels from Rec to Pro' },
  { value: '$0–$15k', label: 'annual cost range' },
  { value: '53%', label: 'fewer ACL tears with prevention' },
];

export default function Hero() {
  return (
    <header
      id="top"
      className="scroll-mt-20 relative overflow-hidden bg-slate-950 text-white"
    >
      {/* pitch-stripe backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, #22c55e 0 80px, transparent 80px 160px)',
        }}
      />
      <div
        aria-hidden
        className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-pitch-500/30 blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 md:pr-16">
        <span className="inline-flex items-center gap-2 rounded-full border border-pitch-400/40 bg-pitch-500/10 px-3 py-1 text-sm font-medium text-pitch-200">
          ⚽ Northern California Youth Soccer · Boys &amp; Girls
        </span>
        <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
          The complete guide to the{' '}
          <span className="text-pitch-400">NorCal soccer ladder</span> — and the
          feet that climb it.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
          From Rec and Select up through NorCal Premier (Copper → Premier), NPL,
          ECNL Regional League, ECNL and MLS NEXT — what each level expects, what
          it costs, where to find live standings, how to keep players healthy, and
          how to pick the right insole for their feet.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#levels"
            className="rounded-full bg-pitch-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-pitch-400"
          >
            Explore the levels →
          </a>
          <a
            href="#insoles"
            className="rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Find your insole 👟
          </a>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {quickStats.map((s) => (
            <div key={s.label}>
              <dt className="text-3xl font-extrabold text-pitch-400 sm:text-4xl">
                {s.value}
              </dt>
              <dd className="mt-1 text-sm text-slate-400">{s.label}</dd>
            </div>
          ))}
        </dl>

        {/* lightweight in-page nav for users who don't see the floating dock yet */}
        <nav className="mt-12 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400">
          {sections
            .filter((s) => s.id !== 'top')
            .map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="transition hover:text-pitch-300"
              >
                {s.icon} {s.label}
              </a>
            ))}
        </nav>
      </div>
    </header>
  );
}
