/** FTC-style affiliate disclosure. Required for affiliate sites — keep it visible. */
export default function AffiliateDisclosure({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-xs text-slate-500">
        Disclosure: some links are affiliate links. We may earn a commission at no
        extra cost to you.
      </p>
    );
  }
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
      <strong className="font-semibold">Affiliate disclosure.</strong> This site
      contains affiliate links to insole partners including{' '}
      <span className="font-medium">Superfeet</span> and{' '}
      <span className="font-medium">Currex</span>. If you buy through them we may
      earn a small commission at no additional cost to you. We only recommend
      products we believe genuinely help players. This content is educational and
      is not medical advice.
    </div>
  );
}
