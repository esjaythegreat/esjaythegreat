import { Metadata } from 'next';
import { getArticles } from '@/lib/api';
import { formatKoreanDateTime, getStrapiMediaUrl } from '@/lib/utils';
import type { StrapiArticle } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '../components/Navigation';
import { generateMetadata as genMeta } from '@/lib/seo';

export const metadata: Metadata = genMeta({
  title: 'blog', // lowercase intentional
  description: 'esjaythegreat의 생각과 이야기를 담은 블로그입니다',
});

export default async function BlogPage() {
  let articles: StrapiArticle[] = [];
  
  try {
    articles = await getArticles();
  } catch (error) {
    console.error('Failed to fetch articles:', error);
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation currentPage="blog" />

      <div className="pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* lowercase intentional */}
          <h1 className="text-5xl font-light tracking-wider mb-16 text-center">blog</h1>

          {articles && articles.length > 0 ? (
            <div className="space-y-12">
              {articles.map((article) => {
                const featuredImage = article.featuredImage;
                const slug = article.slug || article.id;
                
                return (
                  <Link key={article.id} href={`/blog/${slug}`} className="block group">
                    <article 
                      className="grid md:grid-cols-3 gap-8 pb-12 border-b border-gray-800 hover:border-gray-700 transition"
                      itemScope 
                      itemType="https://schema.org/BlogPosting"
                    >
                      {featuredImage?.url && (
                        <div className="aspect-video md:aspect-square bg-gradient-to-br from-gray-900 to-black border border-gray-700 overflow-hidden group-hover:border-gray-500 transition">
                          <Image
                            src={getStrapiMediaUrl(featuredImage.url)}
                            alt={article.title}
                            width={400}
                            height={400}
                            className="w-full h-full object-cover"
                            itemProp="image"
                          />
                        </div>
                      )}
                      
                      <div className={featuredImage?.url ? 'md:col-span-2' : 'md:col-span-3'}>
                        <p className="text-sm text-gray-400 mb-2">
                          <time itemProp="datePublished" dateTime={article.publishedDate}>
                            {article.publishedDate ? formatKoreanDateTime(article.publishedDate) : ''}
                          </time>
                        </p>
                        <h2 className="text-3xl font-light tracking-wide mb-4 group-hover:text-gray-400 transition" itemProp="headline">
                          {article.title}
                        </h2>
                        {article.excerpt && (
                          <p className="text-gray-400 leading-relaxed" itemProp="description">
                            {article.excerpt}
                          </p>
                        )}
                        {/* lowercase intentional */}
                        <meta itemProp="author" content="esjaythegreat" />
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500">아직 작성된 글이 없습니다</p>
          )}
        </div>
      </div>
    </main>
  );
}
