/**
 * Next.js config tuned for a fully static GitHub Pages deploy.
 *
 * GitHub project sites are served from https://<user>.github.io/<repo>/, so we
 * need a basePath/assetPrefix that matches the repo name in production. The
 * deploy workflow can override this with PAGES_BASE_PATH (e.g. "" for a custom
 * domain or a user/organization root site).
 */
const repo = 'club-soccer';
const isProd = process.env.NODE_ENV === 'production';
const basePath =
  process.env.PAGES_BASE_PATH !== undefined
    ? process.env.PAGES_BASE_PATH
    : isProd
      ? `/${repo}`
      : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  // Expose basePath to the client so we can build correct asset URLs.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
