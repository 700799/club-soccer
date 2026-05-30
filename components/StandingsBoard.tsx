'use client';

import { useMemo, useState } from 'react';
import StandingsTables, { type Conference } from './StandingsTables';
import standingsData from '@/data/standings.json';

export interface StandingsSourceItem {
  league: string;
  description: string;
  url: string;
  provider: string;
}

type Gender = 'boys' | 'girls';

export default function StandingsBoard({
  boysSources,
  girlsSources,
}: {
  boysSources: StandingsSourceItem[];
  girlsSources: StandingsSourceItem[];
}) {
  const [gender, setGender] = useState<Gender>('boys');

  const sources = gender === 'boys' ? boysSources : girlsSources;

  const conferences = useMemo(() => {
    const all = (standingsData.conferences as Conference[]) ?? [];
    return all.filter((c) =>
      gender === 'girls' ? /girls/i.test(c.league) : !/girls/i.test(c.league),
    );
  }, [gender]);

  const lastUpdated = standingsData.lastUpdated as string | null;

  return (
    <div>
      {/* Boys / Girls toggle */}
      <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-sm">
        {(['boys', 'girls'] as const).map((g) => (
          <button
            key={g}
            onClick={() => setGender(g)}
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

      {/* Official source links for the selected gender */}
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {sources.map((s) => (
          <a
            key={s.league}
            href={s.url}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-pitch-300 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">{s.league}</h3>
              <span className="text-pitch-600 transition group-hover:translate-x-0.5">
                ↗
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-600">{s.description}</p>
            <p className="mt-3 text-xs font-medium uppercase tracking-wide text-slate-400">
              Live data · {s.provider}
            </p>
          </a>
        ))}
      </div>

      {/* Live tables for the selected gender */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-slate-900">
          Live {gender === 'boys' ? 'boys' : 'girls'} ECNL / ECRL tables
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          Real win/loss tables auto-pulled each morning from the official
          TotalGlobalSports feed. More conferences are added as their feeds are
          wired in; everything else links out above.
        </p>
        <div className="mt-4">
          <StandingsTables conferences={conferences} lastUpdated={lastUpdated} />
        </div>
      </div>
    </div>
  );
}
