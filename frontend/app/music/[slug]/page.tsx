import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAlbum } from '@/lib/api';
import { getStrapiMediaUrl } from '@/lib/utils';
import Image from 'next/image';
import Navigation from '@/app/components/Navigation';
import { generateMetadata as genMeta, generateMusicAlbumStructuredData, siteConfig } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const album = await getAlbum(slug);
  
  if (!album) {
    return genMeta({ title: 'Album Not Found' });
  }

  const imageUrl = album.coverImage?.url 
    ? `${siteConfig.url}${album.coverImage.url}`
    : undefined;

  return genMeta({
    title: album.title,
    description: album.description || `Listen to ${album.title} by esjaythegreat`, // lowercase intentional
    image: imageUrl,
    type: 'music.album',
  });
}

export default async function AlbumPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const album = await getAlbum(slug);
  
  if (!album) {
    notFound();
  }

  const coverImage = album.coverImage;
  
  const structuredData = generateMusicAlbumStructuredData({
    title: album.title,
    description: album.description,
    releaseDate: album.releaseDate,
    image: coverImage?.url ? `${siteConfig.url}${coverImage.url}` : undefined,
    url: `${siteConfig.url}/music/${slug}`,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen bg-black text-white">
        <Navigation currentPage="music" />

        <div className="pt-24 pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            <article itemScope itemType="https://schema.org/MusicAlbum">
              <div className="grid md:grid-cols-2 gap-12 mb-12">
                <div className="aspect-square bg-gradient-to-br from-gray-900 to-black border border-gray-700 overflow-hidden">
                  {coverImage?.url ? (
                    <Image
                      src={getStrapiMediaUrl(coverImage.url)}
                      alt={`${album.title} album cover`}
                      width={600}
                      height={600}
                      className="w-full h-full object-cover"
                      itemProp="image"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-8xl">🎵</div>
                  )}
                </div>

                <div className="flex flex-col justify-center">
                  <h1 className="text-5xl font-light tracking-wider mb-4" itemProp="name">
                    {album.title}
                  </h1>
                  <p className="text-xl text-gray-500 mb-8">
                    <time itemProp="datePublished" dateTime={album.releaseDate}>
                      {album.releaseDate ? new Date(album.releaseDate).getFullYear() : '2024'}
                    </time>
                  </p>
                  
                  {album.description && (
                    <p className="text-gray-300 mb-8 leading-relaxed" itemProp="description">
                      {album.description}
                    </p>
                  )}

                  <div className="space-y-3">
                    {album.melonUrl && (
                      <a 
                        href={album.melonUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="Listen on Melon"
                        className="block px-6 py-3 border border-gray-700 hover:border-gray-500 transition text-center"
                      >
                        Melon에서 듣기
                      </a>
                    )}
                    {album.genieUrl && (
                      <a 
                        href={album.genieUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="Listen on Genie"
                        className="block px-6 py-3 border border-gray-700 hover:border-gray-500 transition text-center"
                      >
                        Genie에서 듣기
                      </a>
                    )}
                    {album.bugsUrl && (
                      <a 
                        href={album.bugsUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="Listen on Bugs"
                        className="block px-6 py-3 border border-gray-700 hover:border-gray-500 transition text-center"
                      >
                        Bugs에서 듣기
                      </a>
                    )}
                    {album.spotifyUrl && (
                      <a 
                        href={album.spotifyUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="Listen on Spotify"
                        className="block px-6 py-3 border border-gray-700 hover:border-gray-500 transition text-center"
                      >
                        Listen on Spotify
                      </a>
                    )}
                    {album.youtubeUrl && (
                      <a 
                        href={album.youtubeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="Watch on YouTube"
                        className="block px-6 py-3 border border-gray-700 hover:border-gray-500 transition text-center"
                      >
                        Watch on YouTube
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {album.lyrics && (
                <div className="mt-12 border-t border-gray-800 pt-12">
                  {/* lowercase intentional */}
                  <h2 className="text-2xl font-light tracking-wider mb-6">lyrics</h2>
                  <div className="text-gray-300 whitespace-pre-line leading-relaxed" itemProp="lyrics">
                    {album.lyrics}
                  </div>
                </div>
              )}
              
              {/* lowercase intentional */}
              <meta itemProp="byArtist" content="esjaythegreat" />
            </article>
          </div>
        </div>
      </main>
    </>
  );
}
