import { Metadata } from 'next';

export const siteConfig = {
  name: 'esjaythegreat', // lowercase intentional
  title: 'esjaythegreat - singer-songwriter based in seoul', // lowercase intentional
  description: '대한민국 서울을 기반으로 활동하는 싱어송라이터 esjaythegreat의 공식 웹사이트입니다. 최신 음악, 공연 일정, 블로그를 확인하세요.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://esjaythegreat.com',
  ogImage: '/og-image.jpg',
  links: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM || 'https://instagram.com/esjaythegreat',
    youtube: process.env.NEXT_PUBLIC_YOUTUBE || 'https://youtube.com/@esjaythegreat',
  },
  keywords: [
    'esjaythegreat', // lowercase intentional
    '싱어송라이터',
    'singer-songwriter',
    'seoul', // lowercase intentional
    '서울',
    '인디음악',
    'indie music',
    'K-indie',
    '한국음악',
  ],
};

export function generateMetadata(options: {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article' | 'music.song' | 'music.album';
  publishedTime?: string;
  authors?: string[];
}): Metadata {
  const title = options.title 
    ? `${options.title} - ${siteConfig.name}` // lowercase intentional
    : siteConfig.title;
  
  const description = options.description || siteConfig.description;
  const image = options.image || siteConfig.ogImage;
  const url = siteConfig.url;

  return {
    title,
    description,
    keywords: siteConfig.keywords,
    authors: options.authors ? options.authors.map(name => ({ name })) : [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    metadataBase: new URL(url),
    
    openGraph: {
      type: options.type || 'website',
      locale: 'ko_KR',
      alternateLocale: ['en_US'],
      url,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(options.publishedTime && {
        publishedTime: options.publishedTime,
      }),
    },
    
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@esjaythegreat',
    },
    
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
    
    manifest: '/site.webmanifest',
    
    alternates: {
      canonical: url,
      languages: {
        'ko-KR': url,
        'en-US': `${url}/en`,
      },
    },
  };
}

// Schema.org standard types for structured data
// Reference: https://schema.org/
export function generateStructuredData(type: 'organization' | 'person', _data?: Record<string, unknown>) {
  const baseData = {
    '@context': 'https://schema.org',
    // MusicGroup is a standard Schema.org type for bands/solo artists
    '@type': type === 'organization' ? 'Organization' : 'MusicGroup',
    name: siteConfig.name,
    alternateName: 'esjaythegreat', // lowercase intentional
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    sameAs: [
      siteConfig.links.instagram,
      siteConfig.links.youtube,
    ],
  };

  if (type === 'person') {
    return {
      ...baseData,
      genre: ['Indie', 'Singer-Songwriter', 'K-indie'],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'seoul', // lowercase intentional
        addressCountry: 'KR',
      },
    };
  }

  return baseData;
}

// MusicAlbum is a standard Schema.org type
// Reference: https://schema.org/MusicAlbum
export function generateMusicAlbumStructuredData(album: {
  title: string;
  description?: string;
  releaseDate: string;
  image?: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicAlbum',
    name: album.title,
    description: album.description,
    datePublished: album.releaseDate,
    image: album.image,
    url: album.url,
    byArtist: {
      '@type': 'MusicGroup',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

// BlogPosting is a standard Schema.org type
// Reference: https://schema.org/BlogPosting
export function generateBlogPostStructuredData(post: {
  title: string;
  description: string;
  publishedDate: string;
  image?: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedDate,
    image: post.image,
    url: post.url,
    author: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
  };
}

// MusicEvent is a standard Schema.org type
// Reference: https://schema.org/MusicEvent
export function generateEventStructuredData(event: {
  title: string;
  description?: string;
  eventDate: string;
  venue?: string;
  city?: string;
  ticketUrl?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    name: event.title,
    description: event.description,
    startDate: event.eventDate,
    location: event.venue ? {
      '@type': 'Place',
      name: event.venue,
      address: {
        '@type': 'PostalAddress',
        addressLocality: event.city || 'seoul', // lowercase intentional
        addressCountry: 'KR',
      },
    } : undefined,
    image: event.image,
    performer: {
      '@type': 'MusicGroup',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    offers: event.ticketUrl ? {
      '@type': 'Offer',
      url: event.ticketUrl,
      availability: 'https://schema.org/InStock',
    } : undefined,
  };
}
