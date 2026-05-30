'use client';

import { useState } from 'react';

export interface StandingRow {
  rank: number;
  team: string;
  gp: number;
  w: number;
  l: number;
  d: number;
  pts: number;
  gf: number;
  ga: number;
  gd: number;
}

export interface AgeGroup {
  group: string;
  rows: StandingRow[];
}

export interface Conference {
  id: string;
  league: string;
  name: string;
  source: string;
  groups: AgeGroup[];
}

function fmtUpdated(iso: string | null) {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function StandingsTables({
  conferences,
  lastUpdated,
}: {
  conferences: Conference[];
  lastUpdated: string | null;
}) {
  const withRows = (conferences ?? []).filter((c) =>
    c.groups?.some((g) => g.rows?.length),
  );

  const [confIdx, setConfIdx] = useState(0);
  const [grpIdx, setGrpIdx] = useState(0);

  if (withRows.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-600">
        <p className="font-semibold text-slate-800">⏳ Live tables sync daily — populating soon.</p>
        <p className="mt-1">
          The standings job pulls ECNL/ECRL tables from the official
          TotalGlobalSports feed each morning and they&apos;ll render right here. In
          the meantime, the <strong>official source links above</strong> always
          have the current win/loss records.
        </p>
      </div>
    );
  }

  const conf = withRows[Math.min(confIdx, withRows.length - 1)];
  const groups = conf.groups.filter((g) => g.rows?.length);
  const group = groups[Math.min(grpIdx, groups.length - 1)];
  const updated = fmtUpdated(lastUpdated);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      {/* Conference tabs */}
      {withRows.length > 1 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {withRows.map((c, i) => (
            <button
              key={c.id}
              onClick={() => {
                setConfIdx(i);
                setGrpIdx(0);
              }}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                i === Math.min(confIdx, withRows.length - 1)
                  ? 'bg-pitch-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h4 className="text-base font-bold text-slate-900">{conf.name}</h4>
        {updated && <span className="text-xs text-slate-400">Updated {updated}</span>}
      </div>

      {/* Age-group tabs */}
      {groups.length > 1 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {groups.map((g, i) => (
            <button
              key={g.group || i}
              onClick={() => setGrpIdx(i)}
              className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                i === Math.min(grpIdx, groups.length - 1)
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {g.group || `Group ${i + 1}`}
            </button>
          ))}
        </div>
      )}

      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="text-xs uppercase text-slate-400">
            <tr className="border-b border-slate-100">
              <th className="py-2 pr-2">#</th>
              <th className="py-2 pr-2">Team</th>
              <th className="py-2 px-2 text-center">GP</th>
              <th className="py-2 px-2 text-center">W</th>
              <th className="py-2 px-2 text-center">L</th>
              <th className="py-2 px-2 text-center">D</th>
              <th className="py-2 px-2 text-center">GF</th>
              <th className="py-2 px-2 text-center">GA</th>
              <th className="py-2 px-2 text-center">GD</th>
              <th className="py-2 pl-2 text-center font-bold text-slate-500">Pts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {group.rows.map((r) => (
              <tr key={`${r.rank}-${r.team}`} className="hover:bg-slate-50">
                <td className="py-2 pr-2 text-slate-400">{r.rank}</td>
                <td className="py-2 pr-2 font-semibold text-slate-800">{r.team}</td>
                <td className="py-2 px-2 text-center text-slate-600">{r.gp}</td>
                <td className="py-2 px-2 text-center text-slate-600">{r.w}</td>
                <td className="py-2 px-2 text-center text-slate-600">{r.l}</td>
                <td className="py-2 px-2 text-center text-slate-600">{r.d}</td>
                <td className="py-2 px-2 text-center text-slate-600">{r.gf}</td>
                <td className="py-2 px-2 text-center text-slate-600">{r.ga}</td>
                <td className="py-2 px-2 text-center text-slate-600">{r.gd}</td>
                <td className="py-2 pl-2 text-center font-bold text-slate-900">{r.pts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <a
        href={conf.source}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-block text-sm font-semibold text-pitch-700 hover:underline"
      >
        Verify at official source ↗
      </a>
    </div>
  );
}
