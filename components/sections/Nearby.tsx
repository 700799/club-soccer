import SectionShell from '../SectionShell';
import NearbyFinder from '../NearbyFinder';

export default function Nearby() {
  return (
    <SectionShell
      id="near"
      eyebrow="Find Clubs"
      title="Clubs near you"
      intro={
        <>
          Drop in a ZIP code (or use your location) to see the{' '}
          <strong>7 closest NorCal clubs</strong> on an open-source map, ranked by
          distance and color-coded by level.
        </>
      }
    >
      <NearbyFinder />
    </SectionShell>
  );
}
