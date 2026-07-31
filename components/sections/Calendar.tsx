import SectionShell from '../SectionShell';
import { calendarEvents, type EventKind } from '@/data/calendar';

const kindStyle: Record<EventKind, { label: string; cls: string }> = {
  showcase: { label: 'Showcase', cls: 'bg-purple-100 text-purple-800' },
  'talent-id': { label: 'Talent ID', cls: 'bg-amber-100 text-amber-800' },
  futsal: { label: 'Futsal', cls: 'bg-orange-100 text-orange-800' },
};

const genderStyle: Record<string, string> = {
  boys: 'bg-pitch-100 text-pitch-800',
  girls: 'bg-pink-100 text-pink-800',
  both: 'bg-slate-100 text-slate-700',
};

export default function Calendar() {
  // At build time, filter out events whose sortKey month has already passed.
  // The daily news refresh triggers a rebuild, so this stays current automatically.
  const thisMonth = new Date().toISOString().slice(0, 7); // "YYYY-MM"
  const events = [...calendarEvents]
    .filter((e) => e.sortKey.slice(0, 7) >= thisMonth)
    .sort((a, b) => a.sortKey.localeCompare(b.sortKey));

  return (
    <SectionShell
      id="calendar"
      eyebrow="What's Ahead"
      title="Upcoming showcases & talent-ID"
      intro={
        <>
          What to aim for next — the upcoming events where college and pro scouts
          watch, plus NorCal&apos;s talent-ID windows. <strong>Showcases</strong>{' '}
          are where you get seen; <strong>talent-ID</strong> (ODP/PDP) is where you
          get identified. Dates firm up as each cycle is announced — always confirm
          on the official links.
        </>
      }
    >
      {events.length === 0 && (
        <p className="text-slate-500">No upcoming events at the moment — check back soon.</p>
      )}
      <ol className="relative space-y-3 border-l-2 border-slate-200 pl-5">
        {events.map((e) => (
          <li key={e.name} className="relative">
            <span className="absolute -left-[1.65rem] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-pitch-500" />
            <a
              href={e.url}
              target="_blank"
              rel="noreferrer"
              className="group block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-pitch-300 hover:shadow-md"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-bold text-slate-900">{e.dates}</span>
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${kindStyle[e.kind].cls}`}>
                  {kindStyle[e.kind].label}
                </span>
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize ${genderStyle[e.gender]}`}>
                  {e.gender}
                </span>
                {!e.confirmed && (
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
                    dates TBA
                  </span>
                )}
                <span className="ml-auto text-pitch-600 transition group-hover:translate-x-0.5">
                  ↗
                </span>
              </div>
              <h3 className="mt-1 font-bold text-slate-900 group-hover:text-pitch-700">
                {e.name}{' '}
                <span className="font-normal text-slate-400">· {e.location}</span>
              </h3>
              <p className="mt-1 text-sm text-slate-600">{e.blurb}</p>
            </a>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
