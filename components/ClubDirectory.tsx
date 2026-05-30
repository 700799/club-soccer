'use client';

import { useMemo, useState } from 'react';
import {
  clubs,
  regions,
  levelOrder,
  NORCAL_DIRECTORY_URL,
  type Club,
  type Level,
} from '@/data/clubs';

const levelStyles: Record<Level, string> = {
  'MLS NEXT': 'bg-red-100 text-red-800 border-red-200',
  ECNL: 'bg-purple-100 text-purple-800 border-purple-200',
  ECRL: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  NPL: 'bg-sky-100 text-sky-800 border-sky-200',
  'NorCal Premier': 'bg-pitch-100 text-pitch-800 border-pitch-200',
};

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
        active
          ? 'bg-pitch-600 text-white'
          : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100'
      }`}
    >
      {children}
    </button>
  );
}

export default function ClubDirectory() {
  const [region, setRegion] = useState<'all' | (typeof regions)[number]>('all');
  const [level, setLevel] = useState<'all' | Level>('all');
  const [query, setQuery] = useState('');

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return clubs
      .filter((c) => (region === 'all' ? true : c.region === region))
      .filter((c) =>
        level === 'all'
          ? true
          : c.topLevel === level || c.leagues.some((l) => l.startsWith(level)),
      )
      .filter((c) =>
        q
          ? c.name.toLowerCase().includes(q) || c.city.toLowerCase().includes(q)
          : true,
      )
      .sort(
        (a, b) =>
          levelOrder.indexOf(a.topLevel) - levelOrder.indexOf(b.topLevel) ||
          a.name.localeCompare(b.name),
      );
  }, [region, level, query]);

  const reset = () => {
    setRegion('all');
    setLevel('all');
    setQuery('');
  };

  return (
    <div>
      {/* Search */}
      <div className="flex flex-col gap-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search clubs by name or city…"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm outline-none focus:border-pitch-400 focus:ring-2 focus:ring-pitch-200"
        />

        {/* Region filter */}
        <div>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Region
          </p>
          <div className="flex flex-wrap gap-1.5">
            <Chip active={region === 'all'} onClick={() => setRegion('all')}>
              All NorCal
            </Chip>
            {regions.map((r) => (
              <Chip key={r} active={region === r} onClick={() => setRegion(r)}>
                {r}
              </Chip>
            ))}
          </div>
        </div>

        {/* Level filter */}
        <div>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Level
          </p>
          <div className="flex flex-wrap gap-1.5">
            <Chip active={level === 'all'} onClick={() => setLevel('all')}>
              All levels
            </Chip>
            {levelOrder.map((l) => (
              <Chip key={l} active={level === l} onClick={() => setLevel(l)}>
                {l}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing <span className="font-bold text-slate-700">{visible.length}</span>{' '}
          of {clubs.length} clubs
        </p>
        {(region !== 'all' || level !== 'all' || query) && (
          <button
            onClick={reset}
            className="text-sm font-semibold text-pitch-700 hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {visible.length === 0 ? (
        <p className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
          No clubs match those filters. Try clearing them, or browse the full{' '}
          <a
            href={NORCAL_DIRECTORY_URL}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-pitch-700 hover:underline"
          >
            NorCal Premier directory
          </a>
          .
        </p>
      ) : (
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((c) => (
            <ClubCard key={c.name} club={c} />
          ))}
        </div>
      )}
    </div>
  );
}

function ClubCard({ club: c }: { club: Club }) {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-bold leading-tight text-slate-900">{c.name}</h4>
        <span
          className={`shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${levelStyles[c.topLevel]}`}
        >
          {c.topLevel}
        </span>
      </div>
      <p className="mt-0.5 text-sm text-slate-500">
        {c.city} · <span className="text-slate-400">{c.region}</span>
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {c.leagues.map((lg) => (
          <span
            key={lg}
            className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
          >
            {lg}
          </span>
        ))}
      </div>
      {c.note && (
        <p className="mt-3 text-xs leading-relaxed text-slate-500">{c.note}</p>
      )}
      <a
        href={c.website ?? NORCAL_DIRECTORY_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-3 text-sm font-semibold text-pitch-700 underline-offset-2 hover:underline"
      >
        {c.website ? 'Club site & standings ↗' : 'Find on NorCal Premier ↗'}
      </a>
    </div>
  );
}
