import SectionShell from '../SectionShell';
import ClubDirectory from '../ClubDirectory';
import StandingsTables, { type Conference } from '../StandingsTables';
import standingsData from '@/data/standings.json';
import {
  standingsSources,
  directoryLastReviewed,
  clubs,
} from '@/data/clubs';

export default function Standings() {
  return (
    <SectionShell
      id="standings"
      eyebrow="Records & Tables"
      title="Standings & records for every NorCal club"
      intro={
        <>
          Youth tables change every weekend and league rosters re-shuffle every
          year. To keep this <strong>accurate</strong>, we link straight to each
          league&apos;s <strong>official live standings</strong> — the single
          source of truth for win/loss records — and keep a verified, filterable
          directory of {clubs.length}+ NorCal clubs and the tiers they compete in.
        </>
      }
    >
      {/* Live standings sources */}
      <div className="grid gap-4 md:grid-cols-2">
        {standingsSources.map((s) => (
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

      {/* Live ECNL / ECRL tables (auto-updated daily from TotalGlobalSports) */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-slate-900">Live ECNL / ECRL tables</h3>
        <p className="mt-1 text-sm text-slate-600">
          Real win/loss tables auto-pulled each morning from the official
          TotalGlobalSports feed. More conferences are added as their feeds are
          wired in; everything else links out above.
        </p>
        <div className="mt-4">
          <StandingsTables
            conferences={standingsData.conferences as Conference[]}
            lastUpdated={standingsData.lastUpdated as string | null}
          />
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-900">
        <strong className="font-semibold">How to read a youth table:</strong>{' '}
        most NorCal leagues run on GotSport and rank teams by points (3 for a win,
        1 for a draw), then goal difference. Open a league above, choose your age
        group, region and division, and switch to the <em>Standings</em> or{' '}
        <em>Results</em> tab for current win/loss records.
      </div>

      {/* Filterable club directory */}
      <div className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h3 className="text-xl font-bold text-slate-900">
            NorCal boys club directory
          </h3>
          <p className="text-xs text-slate-500">
            Directory last reviewed {directoryLastReviewed}
          </p>
        </div>
        <p className="mt-1 text-sm text-slate-600">
          Filter by region and level, or search by name. Tap a club to open its
          site and current standings.
        </p>

        <div className="mt-5">
          <ClubDirectory />
        </div>

        <p className="mt-6 text-xs text-slate-500">
          Directory is representative, not exhaustive — NorCal Premier alone spans
          nearly 300 clubs. League placement changes yearly and many clubs field
          teams across several tiers; always confirm a team&apos;s current division
          and record on the official links above.
        </p>
      </div>
    </SectionShell>
  );
}
