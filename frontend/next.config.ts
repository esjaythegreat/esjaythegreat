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
};

export default nextConfig;
