import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

/**
 * Whether we're in GitHub Actions building for GitHub Pages deployment
 * Only apply GitHub Pages config when explicitly deploying to GitHub Pages
 */
const isGithubPages = process.env.GITHUB_ACTIONS === 'true' && process.env.NODE_ENV === 'production' && process.env.DEPLOY_TARGET === 'github-pages';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  // Configure base path for GitHub Pages deployment
  basePath: isGithubPages ? '/web-novit' : '',
  assetPrefix: isGithubPages ? '/web-novit' : '',
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    unoptimized: true,
    domains: ['static.wixstatic.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
        port: '',
        pathname: '/media/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
