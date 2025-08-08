import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

// Detectar si estamos construyendo para GitHub Pages
const isGitHubPagesBuild = process.env.DEPLOY_TARGET === 'github-pages';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
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
  
  // Solo aplicar basePath cuando construimos para GitHub Pages
  ...(isGitHubPagesBuild && {
    basePath: '/web-novit',
    assetPrefix: '/web-novit/',
  }),
  
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  
  // Configuración para manejar archivos markdown con imágenes
  webpack: (config: any) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
};

export default withNextIntl(nextConfig);
