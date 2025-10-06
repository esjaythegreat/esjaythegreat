import { Metadata } from 'next';
import { getAlbums } from '@/lib/api';
import { getStrapiMediaUrl } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import NewsletterSignup from './components/NewsletterSignup';
import Navigation from './components/Navigation';
import { generateMetadata as genMeta, siteConfig } from '@/lib/seo';

export const metadata: Metadata = genMeta({
  title: siteConfig.title,
  description: siteConfig.description,
});

export default async function Home() {
  let albums = [];
  const currentYear = new Date().getFullYear();
  
  try {
    albums = await getAlbums();
  } catch (error) {
    console.error('Failed to fetch albums:', error);
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation currentPage="home" />

      <section id="home" className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center px-6">
          <div className="w-48 h-48 mx-auto mb-8 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 overflow-hidden">
            <Image 
              src="/profile.png" 
              alt="esjaythegreat profile"
              width={192}
              height={192}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          {/* lowercase intentional */}
          <h1 className="text-6xl md:text-7xl font-light tracking-wider mb-4">
            esjaythegreat
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            대한민국 서울의 싱어송라이터
          </p>
          {/* lowercase intentional */}
          <p className="text-lg text-gray-400 mb-12">
            a singer-songwriter based in seoul
          </p>
          <div className="w-24 h-px bg-gray-700 mx-auto mb-12"></div>
          <div className="flex justify-center gap-6">
            <a href={siteConfig.links.instagram}
               target="_blank"
               rel="noopener noreferrer"
               aria-label="Instagram"
               className="p-3 border border-gray-700 rounded-full hover:border-gray-500 transition">
              📷
            </a>
            <a href={siteConfig.links.youtube}
               target="_blank"
               rel="noopener noreferrer"
               aria-label="YouTube"
               className="p-3 border border-gray-700 rounded-full hover:border-gray-500 transition">
              ▶️
            </a>
          </div>
        </div>
      </section>

      <section id="music" className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          {/* lowercase intentional */}
          <h2 className="text-4xl font-light tracking-wider text-center mb-16">music</h2>
          
          {albums && albums.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {albums.map((album: any) => {
                const coverImage = album.coverImage;
                const slug = album.slug || album.id;
                
                return (
                  <Link key={album.id} href={`/music/${slug}`} className="group cursor-pointer">
                    <article itemScope itemType="https://schema.org/MusicAlbum">
                      <div className="aspect-square bg-gradient-to-br from-gray-900 to-black border border-gray-700 mb-4 flex items-center justify-center group-hover:border-gray-500 transition-all overflow-hidden">
                        {coverImage?.url ? (
                          <img 
                            src={getStrapiMediaUrl(coverImage.url)}
                            alt={`${album.title || 'Album'} cover`}
                            className="w-full h-full object-cover"
                            itemProp="image"
                          />
                        ) : (
                          <span className="text-6xl opacity-50 group-hover:opacity-100 transition">🎵</span>
                        )}
                      </div>
                      <h3 className="text-lg font-light tracking-wide mb-1" itemProp="name">
                        {album.title || 'Untitled'}
                      </h3>
                      <p className="text-sm text-gray-400">
                        <time itemProp="datePublished">
                          {album.releaseDate ? new Date(album.releaseDate).getFullYear() : currentYear}
                        </time>
                      </p>
                    </article>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500">앨범이 없습니다</p>
          )}
        </div>
      </section>

      <section className="py-16 px-6 border-t border-gray-800">
        <NewsletterSignup />
      </section>

      <footer className="py-8 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-500">
          {/* lowercase intentional - 'esjaythegreat', 'all rights reserved' - do not change */}
          © {currentYear} esjaythegreat. all rights reserved.
        </div>
      </footer>
    </main>
  );
}
