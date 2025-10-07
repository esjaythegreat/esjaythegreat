// Strapi response types
export interface StrapiImage {
  id: number;
  url: string;
  name: string;
  alternativeText?: string;
  width?: number;
  height?: number;
}

export interface StrapiAlbum {
  id: number;
  title: string;
  slug: string;
  description?: string;
  releaseDate: string;
  lyrics?: string;
  coverImage?: StrapiImage;
  melonUrl?: string;
  genieUrl?: string;
  bugsUrl?: string;
  spotifyUrl?: string;
  youtubeUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiArticle {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  publishedDate: string;
  featuredImage?: StrapiImage;
  youtubeEmbedUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiEvent {
  id: number;
  title: string;
  date: string;
  venue?: string;
  city?: string;
  ticketUrl?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiNewsletterSubscriber {
  id: number;
  email: string;
  subscribedAt: string;
  isActive: boolean;
  unsubscribeToken?: string;
}
