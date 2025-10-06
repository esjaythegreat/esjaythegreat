import { notFound } from 'next/navigation';
import { getArticle } from '@/lib/api';
import { formatKoreanDateTime, getStrapiMediaUrl } from '@/lib/utils';
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  
  if (!article) {
    notFound();
  }

  const featuredImage = article.featuredImage;

  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-sm border-b border-gray-800 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="text-xl font-light tracking-widest hover:text-gray-400">
            esjaythegreat
          </a>
          <a href="/blog" className="text-sm text-gray-400 hover:text-white transition">
            ← 블로그 목록
          </a>
        </div>
      </nav>

      <article className="pt-24 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-gray-400 mb-4">
            {article.publishedDate ? formatKoreanDateTime(article.publishedDate) : ''}
          </p>
          
          <h1 className="text-5xl font-light tracking-wider mb-12">
            {article.title}
          </h1>

          {featuredImage?.url && (
            <div className="mb-12 border border-gray-700 overflow-hidden">
              <img 
                src={getStrapiMediaUrl(featuredImage.url)}
                alt={article.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {article.youtubeEmbedUrl && (
            <div className="mb-12 aspect-video">
              <iframe
                src={article.youtubeEmbedUrl.replace('watch?v=', 'embed/')}
                className="w-full h-full border border-gray-700"
                allowFullScreen
              />
            </div>
          )}

          {article.content && (
            <div className="prose prose-invert prose-lg max-w-none">
              <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                {article.content}
              </div>
            </div>
          )}
        </div>
      </article>
    </main>
  );
}
