import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Production
      {
        protocol: 'https',
        hostname: 'esjaythegreat.com',
        pathname: '/uploads/**',
      },
      // Development
      {
        protocol: 'https',
        hostname: 'development.esjaythegreat.com',
        pathname: '/uploads/**',
      },
      // Local - Strapi direct access
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      // Local - through Docker network
      {
        protocol: 'http',
        hostname: 'strapi',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
  // Add cache control headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=60, stale-while-revalidate=120',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
