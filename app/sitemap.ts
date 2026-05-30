import type { MetadataRoute } from 'next';

// Static sitemap for the export. SITE_URL is set in the deploy workflow so the
// absolute URLs are correct for the GitHub Pages project site.
export const dynamic = 'force-static';

const base =
  process.env.SITE_URL?.replace(/\/$/, '') ??
  'https://700799.github.io/club-soccer';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  // Single-page app: list the page plus its key in-page sections as anchors.
  const sections = [
    '',
    '#levels',
    '#girls',
    '#costs',
    '#standings',
    '#recruiting',
    '#near',
    '#futsal',
    '#calendar',
    '#injuries',
    '#insoles',
    '#news',
  ];
  return sections.map((s) => ({
    url: `${base}/${s}`,
    lastModified: now,
    changeFrequency: s === '#news' || s === '' ? 'daily' : 'monthly',
    priority: s === '' ? 1 : 0.7,
  }));
}
