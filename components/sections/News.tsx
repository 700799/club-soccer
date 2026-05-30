import SectionShell from '../SectionShell';
import NewsList, { type NewsItem } from '../NewsList';
import newsData from '@/data/news.json';

function fmtUpdated(iso: string | null) {
  if (!iso) return 'pending first morning refresh';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function News() {
  const items = newsData.items as NewsItem[];
  return (
    <SectionShell
      id="news"
      tinted
      eyebrow="Updated Daily"
      title="NorCal youth soccer news"
      intro={
        <>
          Local NorCal youth news by default — club championships, high school
          results, and team updates. Tap <strong>Nationwide</strong> for youth
          tournaments and college commitments across the country. Refreshed every
          morning.
        </>
      }
    >
      <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm">
        <span className="inline-flex h-2.5 w-2.5 animate-pulse rounded-full bg-pitch-500" />
        <span className="font-semibold text-slate-700">
          Feed last updated: {fmtUpdated(newsData.lastUpdated)}
        </span>
        <span className="text-slate-500">
          Auto-refreshed daily from NorCal Premier, Cal North, Bay Area prep, and
          nationwide youth tournament sources.
        </span>
      </div>

      <NewsList items={items} />
    </SectionShell>
  );
}
