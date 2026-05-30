'use client';

import { useMemo, useState } from 'react';

export interface NewsItem {
  id: string;
  title: string;
  url: string;
  source: string;
  sourceUrl?: string;
  category: 'local' | 'national';
  date: string;
  summary: string;
}

const filters: { value: 'all' | 'local' | 'national'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'local', label: '📍 NorCal' },
  { value: 'national', label: '🌎 National' },
];

function fmtDate(d: string) {
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return d;
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function NewsList({ items }: { items: NewsItem[] }) {
  const [filter, setFilter] = useState<'all' | 'local' | 'national'>('all');

  const visible = useMemo(() => {
    const sorted = [...items].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    return filter === 'all' ? sorted : sorted.filter((i) => i.category === filter);
  }, [items, filter]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              filter === f.value
                ? 'bg-pitch-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {f.label}
          </button>
        ))}
        <span className="ml-auto text-xs text-slate-500">
          {visible.length} article{visible.length === 1 ? '' : 's'}
        </span>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-pitch-300 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                {item.source}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                  item.category === 'local'
                    ? 'bg-pitch-100 text-pitch-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {item.category === 'local' ? 'NorCal' : 'National'}
              </span>
            </div>
            <h3 className="mt-3 font-bold leading-snug text-slate-900 group-hover:text-pitch-700">
              {item.title}
            </h3>
            <p className="mt-2 flex-1 text-sm text-slate-600">{item.summary}</p>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
              <span>{fmtDate(item.date)}</span>
              <span className="font-semibold text-pitch-600 group-hover:translate-x-0.5">
                Read ↗
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
