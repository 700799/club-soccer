import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const base =
  process.env.SITE_URL?.replace(/\/$/, '') ??
  'https://700799.github.io/club-soccer';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${base}/sitemap.xml`,
  };
}
