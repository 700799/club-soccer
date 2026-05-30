'use client';

import { useState } from 'react';
import {
  clubCommitments,
  total,
  COMMITMENTS_SOURCE,
  type ClubCommitments,
  type Count,
} from '@/data/commitments';

type Gender = 'boys' | 'girls';

function Cell({ n }: { n: Count }) {
  if (n === null) return <span className="text-slate-300">·</span>;
  return <span className={n > 0 ? 'font-semibold text-slate-800' : 'text-slate-400'}>{n}</span>;
}

export default function CommitmentsTable() {
  const [gender, setGender] = useState<Gender>('boys');

  const rows = clubCommitments
    .filter((c) => c.gender === gender)
    .sort((a, b) => {
      const ta = total(a);
      const tb = total(b);
      // verified rows with totals first (desc), then unverified alphabetically
      if (ta !== null && tb !== null) return tb - ta || a.club.localeCompare(b.club);
      if (ta !== null) return -1;
      if (tb !== null) return 1;
      return a.club.localeCompare(b.club);
    });

  const sourceUrl = gender === 'boys' ? COMMITMENTS_SOURCE.men : COMMITMENTS_SOURCE.women;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-slate-900">
          Commitments by club, by division
        </h3>
        <div className="inline-flex rounded-full border border-slate-200 bg-white p-1">
          {(['boys', 'girls'] as const).map((g) => (
            <button
              key={g}
              onClick={() => setGender(g)}
              aria-pressed={gender === g}
              className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${
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
      </div>

      <p className="mt-2 text-sm text-slate-600">
        College commitment counts by division — the same breakdown TopDrawerSoccer
        publishes. We only print a number once we&apos;ve verified it against the
        live source (✓ with the month). For every other club, tap{' '}
        <strong>Live counts ↗</strong> to see that club&apos;s current breakdown on
        TopDrawerSoccer — always up to date.
      </p>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="text-xs uppercase text-slate-400">
            <tr className="border-b border-slate-100">
              <th className="py-2 pr-2">Club</th>
              <th className="px-2 py-2 text-center">D1</th>
              <th className="px-2 py-2 text-center">D2</th>
              <th className="px-2 py-2 text-center">D3</th>
              <th className="px-2 py-2 text-center">NAIA</th>
              <th className="px-2 py-2 text-center">NJCAA</th>
              <th className="px-2 py-2 text-center font-bold text-slate-500">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {rows.map((c) => {
              const t = total(c);
              const verified = t !== null;
              return (
                <tr key={`${c.gender}-${c.club}`} className="hover:bg-slate-50">
                  <td className="py-2 pr-2 font-semibold text-slate-800">
                    {c.club}
                    {c.verified && (
                      <span className="ml-2 align-middle text-[10px] font-medium uppercase tracking-wide text-pitch-600">
                        ✓ {c.verified}
                      </span>
                    )}
                  </td>
                  {verified ? (
                    <>
                      <td className="px-2 py-2 text-center"><Cell n={c.d1} /></td>
                      <td className="px-2 py-2 text-center"><Cell n={c.d2} /></td>
                      <td className="px-2 py-2 text-center"><Cell n={c.d3} /></td>
                      <td className="px-2 py-2 text-center"><Cell n={c.naia} /></td>
                      <td className="px-2 py-2 text-center"><Cell n={c.njcaa} /></td>
                      <td className="px-2 py-2 text-center">
                        <span className="font-bold text-slate-900">{t}</span>
                      </td>
                    </>
                  ) : (
                    // Unverified: one clean CTA spanning the stat columns — no
                    // empty dot grid that looks "incomplete".
                    <td colSpan={6} className="px-2 py-2 text-right sm:text-center">
                      <a
                        href={c.tdsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-full bg-pitch-50 px-3 py-1 text-xs font-semibold text-pitch-700 transition hover:bg-pitch-100"
                      >
                        Live counts on TopDrawerSoccer ↗
                      </a>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-slate-400">
        Data format & counts from{' '}
        <a href={sourceUrl} target="_blank" rel="noreferrer" className="font-semibold text-pitch-700 hover:underline">
          TopDrawerSoccer — Commitments by Club ↗
        </a>
        . We print verified counts (✓ + month) and link the rest live — we
        don&apos;t publish unverified numbers.
      </p>
    </div>
  );
}
