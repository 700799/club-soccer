'use client';

import { useMemo, useState } from 'react';
import { clubs, regions, NORCAL_DIRECTORY_URL } from '@/data/clubs';
import { girlsDirectoryClubs, girlsDirLevelOrder } from '@/data/girls';

type Gender = 'boys' | 'girls';

// A single, gender-agnostic row the directory renders.
interface DirRow {
  name: string;
  city: string;
  region: string;
  level: string;
  leagues: string[];
  website?: string;
  note?: string;
}

const levelStyles: Record<string, string> = {
  'MLS NEXT': 'bg-red-100 text-red-800 border-red-200',
  ECNL: 'bg-purple-100 text-purple-800 border-purple-200',
  ECRL: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  NPL: 'bg-sky-100 text-sky-800 border-sky-200',
  'NorCal Premier': 'bg-pitch-100 text-pitch-800 border-pitch-200',
  // girls levels
  'ECNL Girls': 'bg-purple-100 text-purple-800 border-purple-200',
  'Girls Academy': 'bg-pink-100 text-pink-800 border-pink-200',
  DPL: 'bg-amber-100 text-amber-800 border-amber-200',
  'ECRL Girls': 'bg-indigo-100 text-indigo-800 border-indigo-200',
};

const boysLevels = ['MLS NEXT', 'ECNL', 'ECRL', 'NPL', 'NorCal Premier'];

const boysRows: DirRow[] = clubs.map((c) => ({
  name: c.name,
  city: c.city,
  region: c.region,
  level: c.topLevel,
  leagues: c.leagues,
  website: c.website,
  note: c.note,
}));

const girlsRows: DirRow[] = girlsDirectoryClubs.map((c) => ({
  name: c.name,
  city: c.city,
  region: c.region,
  level: c.level,
  // Practically all these clubs also field NorCal Premier girls teams.
  leagues: Array.from(new Set([c.level, 'NorCal Premier'])),
  website: c.website,
}));

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
  const [gender, setGender] = useState<Gender>('boys');
  const [region, setRegion] = useState<'all' | (typeof regions)[number]>('all');
  const [level, setLevel] = useState<'all' | string>('all');
  const [query, setQuery] = useState('');

  const rows = gender === 'boys' ? boysRows : girlsRows;
  const levelChips = gender === 'boys' ? boysLevels : girlsDirLevelOrder;
  const levelIndex = (lvl: string) => {
    const i = levelChips.indexOf(lvl);
    return i === -1 ? levelChips.length : i;
  };

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows
      .filter((c) => (region === 'all' ? true : c.region === region))
      .filter((c) =>
        level === 'all'
          ? true
          : c.level === level || c.leagues.some((l) => l.startsWith(level)),
      )
      .filter((c) =>
        q ? c.name.toLowerCase().includes(q) || c.city.toLowerCase().includes(q) : true,
      )
      .sort(
        (a, b) =>
          levelIndex(a.level) - levelIndex(b.level) || a.name.localeCompare(b.name),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, region, level, query]);

  const switchGender = (g: Gender) => {
    setGender(g);
    setLevel('all'); // level sets differ between genders
  };

  const reset = () => {
    setRegion('all');
    setLevel('all');
    setQuery('');
  };

  return (
    <div>
      {/* Boys / Girls toggle */}
      <div className="mb-4 inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-sm">
        {(['boys', 'girls'] as const).map((g) => (
          <button
            key={g}
            onClick={() => switchGender(g)}
            aria-pressed={gender === g}
            className={`rounded-full px-5 py-2 text-sm font-bold transition ${
              gender === g
                ? g === 'boys'
                  ? 'bg-pitch-600 text-white'
                  : 'bg-pink-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {g === 'boys' ? '⚽ Boys' : '👧 Girls'}
          </button>
        ))}
      </div>

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
            {levelChips.map((l) => (
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
          of {rows.length} {gender} clubs
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
            <ClubCard key={`${gender}-${c.name}`} club={c} />
          ))}
        </div>
      )}
    </div>
  );
}

function ClubCard({ club: c }: { club: DirRow }) {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-bold leading-tight text-slate-900">{c.name}</h4>
        <span
          className={`shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${
            levelStyles[c.level] ?? 'bg-slate-100 text-slate-700 border-slate-200'
          }`}
        >
          {c.level}
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
      {c.note && <p className="mt-3 text-xs leading-relaxed text-slate-500">{c.note}</p>}
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
