import type { NextConfig } from "next";

/**
 * Whether we're in GitHub Actions building for GitHub Pages deployment
 */
const isGithubPages = process.env.GITHUB_ACTIONS === 'true';

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

export default nextConfig;
