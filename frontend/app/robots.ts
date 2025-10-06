import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const appEnv = process.env.APP_ENV || 'local';
  
  // Only allow production site to be indexed
  // Hardcoded exception: block development server, allow production
  if (appEnv === 'production') {
    return {
      rules: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/api/', '/admin/'],
        },
      ],
      sitemap: 'https://esjaythegreat.com/sitemap.xml',
    };
  }
  
  // Block all search engines for local and development environments
  return {
    rules: [
      {
        userAgent: '*',
        disallow: '/',
      },
    ],
  };
}
