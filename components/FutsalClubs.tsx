'use client';

import { useMemo, useState } from 'react';
import { futsalClubs, futsalCounties, type FutsalCounty } from '@/data/futsal';

export default function FutsalClubs() {
  const [county, setCounty] = useState<'all' | FutsalCounty>('all');

  // Only show county chips that actually have clubs.
  const activeCounties = useMemo(
    () => futsalCounties.filter((c) => futsalClubs.some((f) => f.county === c)),
    [],
  );

  const visible = useMemo(
    () =>
      futsalClubs
        .filter((f) => (county === 'all' ? true : f.county === county))
        .sort((a, b) => a.county.localeCompare(b.county) || a.name.localeCompare(b.name)),
    [county],
  );

  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold text-slate-900">
        NorCal futsal clubs &amp; leagues
      </h3>
      <p className="mt-1 text-sm text-slate-600">
        Filter by county to find futsal near you. {futsalClubs.length} clubs &amp;
        leagues across NorCal.
      </p>

      {/* County pill filter */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        <button
          onClick={() => setCounty('all')}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
            county === 'all'
              ? 'bg-orange-600 text-white'
              : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100'
          }`}
        >
          All counties
        </button>
        {activeCounties.map((c) => (
          <button
            key={c}
            onClick={() => setCounty(c)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              county === c
                ? 'bg-orange-600 text-white'
                : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="mt-3 text-sm text-slate-500">
        Showing <span className="font-bold text-slate-700">{visible.length}</span>{' '}
        of {futsalClubs.length}
      </p>

      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((f) => (
          <div
            key={`${f.county}-${f.name}`}
            className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-bold leading-tight text-slate-900">{f.name}</h4>
              <span className="shrink-0 rounded-full border border-orange-200 bg-orange-50 px-2 py-0.5 text-[11px] font-semibold text-orange-800">
                {f.county}
              </span>
            </div>
            <p className="mt-0.5 text-sm text-slate-500">{f.city}</p>
            {f.note && <p className="mt-2 text-xs leading-relaxed text-slate-600">{f.note}</p>}
            {f.url && (
              <a
                href={f.url}
                target="_blank"
                rel="noreferrer"
                className="mt-3 text-sm font-semibold text-orange-700 underline-offset-2 hover:underline"
              >
                Visit ↗
              </a>
            )}
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-slate-400">
        Futsal programs change seasonally (many run winter-only). Directory is
        representative — confirm current offerings on each club&apos;s site or via{' '}
        <a
          href="https://www.californiafutsalnorth.com/"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-orange-700 hover:underline"
        >
          California North Futsal ↗
        </a>
        .
      </p>
    </div>
  );
}
