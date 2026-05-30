import SectionShell from '../SectionShell';
import FutsalClubs from '../FutsalClubs';
import { futsalIntro, futsalPrograms, indoorNotes } from '@/data/futsal';
import futsalNews from '@/data/futsal-news.json';

interface FutsalNewsItem {
  id: string;
  title: string;
  url: string;
  source: string;
  date: string;
}

function fmtDate(d: string) {
  const date = new Date(d);
  return Number.isNaN(date.getTime())
    ? d
    : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

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

      {/* Filterable club list by county */}
      <FutsalClubs />

      {/* Latest futsal news (auto-refreshed daily; only shows when populated) */}
      {(futsalNews.items as FutsalNewsItem[]).length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-bold text-slate-900">Latest futsal news</h3>
          <p className="mt-1 text-sm text-slate-600">
            Auto-refreshed daily from futsal news sources.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(futsalNews.items as FutsalNewsItem[]).map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-orange-300 hover:shadow-md"
              >
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="rounded bg-slate-100 px-2 py-0.5 font-semibold text-slate-600">
                    {item.source}
                  </span>
                  <span>{fmtDate(item.date)}</span>
                </div>
                <p className="mt-2 flex-1 text-sm font-semibold text-slate-800 group-hover:text-orange-700">
                  {item.title}
                </p>
                <span className="mt-2 text-xs font-semibold text-orange-600">Read ↗</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </SectionShell>
  );
}
