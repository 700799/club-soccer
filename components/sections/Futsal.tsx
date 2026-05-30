import SectionShell from '../SectionShell';
import { futsalIntro, futsalPrograms, indoorNotes } from '@/data/futsal';

export default function Futsal() {
  return (
    <SectionShell
      id="futsal"
      tinted
      eyebrow="Indoor & Winter"
      title="Futsal & indoor soccer in NorCal"
      intro={futsalIntro}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Programs */}
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Where to play futsal in NorCal
          </h3>
          <div className="mt-4 space-y-3">
            {futsalPrograms.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-orange-300 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 group-hover:text-orange-700">
                    {p.name}
                  </h4>
                  <span className="text-orange-600 transition group-hover:translate-x-0.5">
                    ↗
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-600">{p.what}</p>
                <span className="mt-2 w-fit rounded bg-orange-50 px-2 py-0.5 text-xs font-semibold text-orange-800">
                  {p.who}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Why it matters */}
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Why futsal is a big deal here
          </h3>
          <div className="mt-4 space-y-3">
            {indoorNotes.map((n) => (
              <div
                key={n.title}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <p className="font-bold text-slate-800">{n.title}</p>
                <p className="mt-1 text-sm text-slate-600">{n.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
