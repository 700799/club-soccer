'use client';

import { useMemo, useState } from 'react';
import {
  archTypes,
  products,
  withRef,
  type ArchType,
  type Firmness,
  type Goal,
  type Product,
} from '@/data/insoles';

const firmnessOptions: { value: Firmness; label: string; hint: string }[] = [
  { value: 'soft', label: 'Cushioned & flexible', hint: 'Moves with my foot' },
  { value: 'balanced', label: 'Balanced', hint: 'A bit of both' },
  { value: 'firm', label: 'Firm & structured', hint: 'Maximum control' },
];

const goalOptions: { value: Goal; label: string; icon: string }[] = [
  { value: 'performance', label: 'Performance & energy', icon: '⚡' },
  { value: 'stability', label: 'Stability & support', icon: '🛡️' },
  { value: 'pain-relief', label: 'Pain relief', icon: '🩹' },
];

const adjacent: Record<Firmness, Firmness[]> = {
  soft: ['balanced'],
  balanced: ['soft', 'firm'],
  firm: ['balanced'],
};

function score(p: Product, arch: ArchType, firm: Firmness, goal: Goal) {
  let s = 0;
  if (p.archMatch.includes(arch)) s += 3;
  if (p.firmness === firm) s += 2;
  else if (adjacent[firm].includes(p.firmness)) s += 1;
  if (p.bestFor.includes(goal)) s += 2;
  if (p.cleatFriendly) s += 1;
  return s;
}

function brandKey(p: Product) {
  return p.brand.toLowerCase() as 'superfeet' | 'currex';
}

function Pick({ p, tag }: { p: Product; tag: string }) {
  const accent =
    p.brand === 'Superfeet'
      ? 'border-orange-200 bg-orange-50'
      : 'border-cyan-200 bg-cyan-50';
  const btn =
    p.brand === 'Superfeet'
      ? 'bg-orange-600 hover:bg-orange-500'
      : 'bg-cyan-600 hover:bg-cyan-500';
  return (
    <div className={`rounded-2xl border p-5 shadow-sm ${accent}`}>
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-white/80 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-slate-700">
          {tag}
        </span>
        <span className="text-sm font-bold text-slate-700">{p.brand}</span>
      </div>
      <h4 className="mt-3 text-lg font-bold text-slate-900">{p.name}</h4>
      <p className="text-sm font-medium text-slate-600">{p.profile}</p>
      <p className="mt-2 text-sm text-slate-600">{p.blurb}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm font-bold text-slate-800">{p.priceUsd}</span>
        {p.cleatFriendly && (
          <span className="rounded bg-white/70 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
            ✓ fits cleats
          </span>
        )}
      </div>
      <a
        href={withRef(p.url, brandKey(p))}
        target="_blank"
        rel="sponsored noreferrer"
        className={`mt-4 block rounded-xl px-4 py-2.5 text-center text-sm font-bold text-white transition ${btn}`}
      >
        Shop {p.brand} {p.name.split('—')[0].trim()} ↗
      </a>
    </div>
  );
}

export default function InsoleFinder() {
  const [arch, setArch] = useState<ArchType>('medium');
  const [firm, setFirm] = useState<Firmness>('balanced');
  const [goal, setGoal] = useState<Goal>('performance');

  const { primary, alternate } = useMemo(() => {
    const ranked = [...products]
      .map((p) => ({ p, s: score(p, arch, firm, goal) }))
      .sort((a, b) => b.s - a.s);
    const primary = ranked[0].p;
    // Surface the best option from the *other* brand as the alternate.
    const alternate =
      ranked.find((r) => r.p.brand !== primary.brand)?.p ?? ranked[1]?.p;
    return { primary, alternate };
  }, [arch, firm, goal]);

  const archInfo = archTypes.find((a) => a.type === arch)!;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h3 className="text-xl font-bold text-slate-900">
        🔎 Insole finder — match your feet
      </h3>
      <p className="mt-1 text-sm text-slate-600">
        Answer three questions and we&apos;ll match you to a Superfeet or Currex
        insole built for your foot type, firmness preference and goal.
      </p>

      {/* Arch */}
      <div className="mt-6">
        <p className="text-sm font-semibold text-slate-800">
          1. Your arch type{' '}
          <span className="font-normal text-slate-500">
            (try the wet-foot test)
          </span>
        </p>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {archTypes.map((a) => (
            <button
              key={a.type}
              onClick={() => setArch(a.type)}
              className={`rounded-xl border p-3 text-left transition ${
                arch === a.type
                  ? 'border-pitch-500 bg-pitch-50 ring-1 ring-pitch-500'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <p className="text-sm font-bold text-slate-800">{a.label}</p>
              <p className="mt-0.5 text-xs text-slate-500">{a.wetTest}</p>
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-slate-500">
          <span className="font-semibold">Your foot:</span> {archInfo.feels}{' '}
          {archInfo.tendsToward}
        </p>
      </div>

      {/* Firmness */}
      <div className="mt-5">
        <p className="text-sm font-semibold text-slate-800">2. Firmness you like</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {firmnessOptions.map((f) => (
            <button
              key={f.value}
              onClick={() => setFirm(f.value)}
              className={`rounded-xl border p-3 text-left transition ${
                firm === f.value
                  ? 'border-pitch-500 bg-pitch-50 ring-1 ring-pitch-500'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <p className="text-sm font-bold text-slate-800">{f.label}</p>
              <p className="mt-0.5 text-xs text-slate-500">{f.hint}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Goal */}
      <div className="mt-5">
        <p className="text-sm font-semibold text-slate-800">3. Your main goal</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {goalOptions.map((g) => (
            <button
              key={g.value}
              onClick={() => setGoal(g.value)}
              className={`rounded-xl border p-3 text-left transition ${
                goal === g.value
                  ? 'border-pitch-500 bg-pitch-50 ring-1 ring-pitch-500'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <p className="text-sm font-bold text-slate-800">
                <span aria-hidden>{g.icon}</span> {g.label}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="mt-7 border-t border-slate-100 pt-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Your matches
        </p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <Pick p={primary} tag="Top pick" />
          {alternate && <Pick p={alternate} tag="Also great" />}
        </div>
        <p className="mt-3 text-xs text-slate-400">
          Tip: a {archInfo.label.toLowerCase()} generally pairs best with{' '}
          {arch === 'high'
            ? 'a more flexible, cushioned arch'
            : arch === 'low'
              ? 'a firmer, more structured arch'
              : 'either profile — pick by comfort and goal'}
          . Links are affiliate links.
        </p>
      </div>
    </div>
  );
}
