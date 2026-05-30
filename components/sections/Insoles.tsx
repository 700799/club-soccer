import SectionShell from '../SectionShell';
import InsoleFinder from '../InsoleFinder';
import AffiliateDisclosure from '../AffiliateDisclosure';
import { archTypes, brandCompare, withRef } from '@/data/insoles';

export default function Insoles() {
  return (
    <SectionShell
      id="insoles"
      eyebrow="Gear · Affiliate"
      title="Find the right insole for your feet"
      intro={
        <>
          The single most overlooked piece of soccer kit is what&apos;s inside the
          cleat. The right insole improves stability, cushions impact and can ease
          heel, arch and ankle pain. It comes down to three things:{' '}
          <strong>foot type</strong>, <strong>arch support</strong> and{' '}
          <strong>firmness</strong>.
        </>
      }
    >
      <div className="mb-8">
        <AffiliateDisclosure />
      </div>

      {/* The three decisions */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-bold text-slate-900">1. Foot type (the wet test)</h3>
          <p className="mt-1 text-sm text-slate-600">
            Wet a foot, step on paper, look at the print to find your arch.
          </p>
          <ul className="mt-3 space-y-2">
            {archTypes.map((a) => (
              <li key={a.type} className="rounded-lg bg-slate-50 p-2.5 text-sm">
                <p className="font-semibold text-slate-800">{a.label}</p>
                <p className="text-xs text-slate-500">{a.wetTest}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-bold text-slate-900">2. Arch support</h3>
          <p className="mt-2 text-sm text-slate-600">
            Support should match how your arch <em>moves</em>, not just its shape:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li className="flex gap-2">
              <span className="text-pitch-600">•</span> A{' '}
              <strong>low/flat arch</strong> is flexible and tends to overpronate —
              it wants a <strong>firmer, more structured</strong> insole.
            </li>
            <li className="flex gap-2">
              <span className="text-pitch-600">•</span> A{' '}
              <strong>high arch</strong> is rigid and absorbs less shock — it wants{' '}
              <strong>cushioning and a more flexible</strong> arch.
            </li>
            <li className="flex gap-2">
              <span className="text-pitch-600">•</span> Currex builds this in with
              LOW/MEDIUM/HIGH dynamic profiles (and counter-intuitively, the{' '}
              <strong>LOW profile is its stiffest</strong>).
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-bold text-slate-900">3. Firmness</h3>
          <p className="mt-2 text-sm text-slate-600">
            Softer isn&apos;t automatically more comfortable — your foot is a
            foundation and usually performs better on firm, supportive structure.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li className="flex gap-2">
              <span className="text-pitch-600">•</span>{' '}
              <strong>Firmer (Superfeet):</strong> control, stability, correction —
              great for overpronation and ankle/arch issues.
            </li>
            <li className="flex gap-2">
              <span className="text-pitch-600">•</span>{' '}
              <strong>More dynamic (Currex):</strong> flexes and returns energy —
              great for performance and a natural feel.
            </li>
          </ul>
        </div>
      </div>

      {/* Interactive finder */}
      <div className="mt-10">
        <InsoleFinder />
      </div>

      {/* Brand head-to-head */}
      <div className="mt-12">
        <h3 className="text-xl font-bold text-slate-900">
          Superfeet vs. Currex — at a glance
        </h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {brandCompare.map((b) => (
            <div
              key={b.brand}
              className={`rounded-2xl border p-6 shadow-sm ${
                b.brand === 'Superfeet'
                  ? 'border-orange-200 bg-orange-50'
                  : 'border-cyan-200 bg-cyan-50'
              }`}
            >
              <h4 className="text-lg font-extrabold text-slate-900">{b.brand}</h4>
              <p className="text-sm font-semibold text-slate-600">{b.philosophy}</p>
              <dl className="mt-3 space-y-2 text-sm">
                <div>
                  <dt className="font-semibold text-slate-700">Arch support</dt>
                  <dd className="text-slate-600">{b.archSupport}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-700">Firmness</dt>
                  <dd className="text-slate-600">{b.firmness}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-700">Best when</dt>
                  <dd className="text-slate-600">{b.bestWhen}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-700">For cleats, pick</dt>
                  <dd className="text-slate-600">{b.cleatPick}</dd>
                </div>
              </dl>
              <a
                href={withRef(b.affiliate, b.brandKey)}
                target="_blank"
                rel="sponsored noreferrer"
                className={`mt-4 block rounded-xl px-4 py-2.5 text-center text-sm font-bold text-white transition ${
                  b.brand === 'Superfeet'
                    ? 'bg-orange-600 hover:bg-orange-500'
                    : 'bg-cyan-600 hover:bg-cyan-500'
                }`}
              >
                Shop {b.brand} ↗
              </a>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
