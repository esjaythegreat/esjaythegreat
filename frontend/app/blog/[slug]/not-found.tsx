import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-light mb-4">404</h1>
        <p className="text-gray-400 mb-8">글을 찾을 수 없습니다</p>
        <Link 
          href="/blog" 
          className="px-6 py-3 border border-gray-700 hover:border-gray-500 transition inline-block"
        >
          블로그 목록으로
        </Link>
      </div>
    </div>
  );
}
