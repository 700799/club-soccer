import SectionShell from '../SectionShell';
import ClubDirectory from '../ClubDirectory';
import StandingsBoard from '../StandingsBoard';
import { standingsSources, directoryLastReviewed, clubs } from '@/data/clubs';
import { girlsStandingsSources } from '@/data/girls';

export default function Standings() {
  return (
    <SectionShell
      id="standings"
      eyebrow="Records & Tables"
      title="Standings & records — boys & girls"
      intro={
        <>
          Youth tables change every weekend and league rosters re-shuffle every
          year. Toggle between <strong>boys</strong> and <strong>girls</strong>{' '}
          below — each links straight to the league&apos;s{' '}
          <strong>official live standings</strong> (the source of truth for
          win/loss) and shows live tables. Plus a verified, filterable directory of{' '}
          {clubs.length}+ NorCal clubs.
        </>
      }
    >
      {/* Boys/Girls toggle → official sources + live tables */}
      <StandingsBoard
        boysSources={standingsSources}
        girlsSources={girlsStandingsSources}
      />

      <div className="mt-6 rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-900">
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
          site and current standings. (Most clubs field girls teams too — see the
          Girls Pathway section.)
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
