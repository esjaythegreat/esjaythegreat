import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticle } from '@/lib/api';
import { formatKoreanDateTime, getStrapiMediaUrl } from '@/lib/utils';
import Navigation from '@/app/components/Navigation';
import { generateMetadata as genMeta, generateBlogPostStructuredData, siteConfig } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  
  if (!article) {
    return genMeta({ title: 'Not Found' });
  }

  const imageUrl = article.featuredImage?.url 
    ? `${siteConfig.url}${article.featuredImage.url}`
    : undefined;

  return genMeta({
    title: article.title,
    description: article.excerpt || article.title,
    image: imageUrl,
    type: 'article',
    publishedTime: article.publishedDate,
    authors: ['esjaythegreat'], // lowercase intentional
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  
  if (!article) {
    notFound();
  }

  const featuredImage = article.featuredImage;
  
  const structuredData = generateBlogPostStructuredData({
    title: article.title,
    description: article.excerpt || article.title,
    publishedDate: article.publishedDate,
    image: featuredImage?.url ? `${siteConfig.url}${featuredImage.url}` : undefined,
    url: `${siteConfig.url}/blog/${slug}`,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen bg-black text-white">
        <Navigation currentPage="blog" />

        <article className="pt-24 pb-20 px-6" itemScope itemType="https://schema.org/BlogPosting">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm text-gray-400 mb-4">
              <time itemProp="datePublished" dateTime={article.publishedDate}>
                {article.publishedDate ? formatKoreanDateTime(article.publishedDate) : ''}
              </time>
            </p>
            
            <h1 className="text-5xl font-light tracking-wider mb-12" itemProp="headline">
              {article.title}
            </h1>

            {featuredImage?.url && (
              <div className="mb-12 border border-gray-700 overflow-hidden">
                <img 
                  src={getStrapiMediaUrl(featuredImage.url)}
                  alt={article.title}
                  className="w-full h-auto"
                  itemProp="image"
                />
              </div>
            )}

            {article.youtubeEmbedUrl && (
              <div className="mb-12 aspect-video">
                <iframe
                  src={article.youtubeEmbedUrl.replace('watch?v=', 'embed/')}
                  className="w-full h-full border border-gray-700"
                  allowFullScreen
                  title={article.title}
                />
              </div>
            )}

            {article.content && (
              <div className="prose prose-invert prose-lg max-w-none" itemProp="articleBody">
                <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {article.content}
                </div>
              </div>
            )}
            
            {/* lowercase intentional */}
            <meta itemProp="author" content="esjaythegreat" />
            <meta itemProp="publisher" content="esjaythegreat" />
          </div>
        </article>
      </main>
    </>
  );
}
