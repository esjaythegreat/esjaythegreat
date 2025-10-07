import type { NextConfig } from 'next';

type EnvName = 'local' | 'development' | 'production';

// Safe resolver for APP_ENV with a default
const resolveEnv = (v: string | undefined): EnvName => {
  const allowed = ['local', 'development', 'production'] as const;
  return (allowed as readonly string[]).includes(v ?? '') ? (v as EnvName) : 'local';
};

const APP_ENV: EnvName = resolveEnv(process.env.APP_ENV);

const ENV_CONFIG: Record<EnvName, {
  siteUrl: string;
  strapiUrl: string;
  imageHosts: { protocol: 'http' | 'https'; hostname: string }[];
}> = {
  local: {
    siteUrl: 'http://localhost:3000',
    strapiUrl: 'http://localhost:1337',
    imageHosts: [
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'http', hostname: '127.0.0.1' },
    ],
  },
  development: {
    siteUrl: 'https://development.esjaythegreat.com',
    strapiUrl: 'https://development.esjaythegreat.com',
    imageHosts: [
      { protocol: 'https', hostname: 'development.esjaythegreat.com' },
    ],
  },
  production: {
    siteUrl: 'https://esjaythegreat.com',
    strapiUrl: 'https://esjaythegreat.com',
    imageHosts: [
      { protocol: 'https', hostname: 'esjaythegreat.com' },
      { protocol: 'https', hostname: 'www.esjaythegreat.com' },
    ],
  },
};

const cfg = ENV_CONFIG[APP_ENV]; // always defined now

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: cfg.imageHosts,
    ...(APP_ENV === 'local' ? { unoptimized: true } : {}),
  },

  // Make these available to the browser
  env: {
    APP_ENV,
    NEXT_PUBLIC_SITE_URL: cfg.siteUrl,
    NEXT_PUBLIC_STRAPI_BROWSER_URL: cfg.strapiUrl,
  },
};

export default nextConfig;

