import { Suspense } from 'react';
import UnsubscribeClient from './unsubscribe-client';

export const dynamic = 'force-dynamic'; // avoids static prerender for this route

export default function UnsubscribePage() {
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">구독 취소</h1>
      <Suspense fallback={<p>로딩중...</p>}>
        <UnsubscribeClient />
      </Suspense>
    </main>
  );
}
