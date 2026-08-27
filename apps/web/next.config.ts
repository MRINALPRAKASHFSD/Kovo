import type { NextConfig } from 'next';

/**
 * KOVO Web — Next.js Configuration
 * @see https://nextjs.org/docs/app/api-reference/next-config-js
 */
const nextConfig: NextConfig = {
  // Turbopack enabled via CLI flag in dev
  // React strict mode for catching potential issues early
  reactStrictMode: true,

  // Output standalone for Docker deployments
  output: 'standalone',

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.kovo.app',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Experimental features
  experimental: {
    // Server Actions are stable in Next.js 15
    // PPR (Partial Pre-Rendering) for performance
    ppr: false, // enable when ready for production
    typedRoutes: true,
  },

  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Logging
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },
};

export default nextConfig;
