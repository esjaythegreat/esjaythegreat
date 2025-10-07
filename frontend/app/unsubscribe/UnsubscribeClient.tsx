'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const BROWSER_URL = process.env.NEXT_PUBLIC_STRAPI_BROWSER_URL || 'http://localhost:1337';

export default function UnsubscribePage() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<'confirm' | 'processing' | 'success' | 'error' | 'notfound'>('confirm');
  const [subscriber, setSubscriber] = useState<{ id: number; email: string; isActive: boolean } | null>(null);
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setStep('notfound');
      return;
    }

    // Fetch subscriber by token
    const fetchSubscriber = async () => {
      try {
        const res = await fetch(
          `${BROWSER_URL}/api/newsletter-subscribers?filters[unsubscribeToken][$eq]=${token}`
        );
        const data = await res.json();
        
        if (!data.data || data.data.length === 0) {
          setStep('notfound');
          return;
        }

        setSubscriber(data.data[0]);
      } catch (error) {
        console.error('Error fetching subscriber:', error);
        setStep('error');
      }
    };

    fetchSubscriber();
  }, [token]);

  const handleUnsubscribe = async () => {
    if (!subscriber) return;
    setStep('processing');

    try {
      const res = await fetch(
        `${BROWSER_URL}/api/newsletter-subscribers/${subscriber.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data: { isActive: false }
          })
        }
      );

      if (res.ok) {
        setStep('success');
      } else {
        setStep('error');
      }
    } catch (error) {
      console.error('Error unsubscribing:', error);
      setStep('error');
    }
  };

  const handleResubscribe = async () => {
    if (!subscriber) return;
    setStep('processing');

    try {
      const res = await fetch(
        `${BROWSER_URL}/api/newsletter-subscribers/${subscriber.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data: { isActive: true }
          })
        }
      );

      if (res.ok) {
        setSubscriber({ ...subscriber, isActive: true });
        setStep('confirm');
      } else {
        setStep('error');
      }
    } catch (error) {
      console.error('Error resubscribing:', error);
      setStep('error');
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-light tracking-wider mb-8">뉴스레터 구독 관리</h1>
        
        {step === 'confirm' && subscriber && (
          <>
            {subscriber.isActive ? (
              <>
                <p className="text-gray-300 mb-4">
                  {subscriber.email}
                </p>
                <p className="text-gray-400 mb-8">
                  정말 구독을 취소하시겠습니까?
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={handleUnsubscribe}
                    className="px-6 py-3 border border-red-600 text-red-400 hover:bg-red-600 hover:text-white transition-all duration-300"
                  >
                    구독 취소
                  </button>
                  <Link
                    href="/"
                    className="px-6 py-3 border border-gray-600 hover:bg-white hover:text-black transition-all duration-300 inline-block"
                  >
                    취소
                  </Link>
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-300 mb-4">
                  {subscriber.email}
                </p>
                <p className="text-gray-400 mb-8">
                  현재 구독이 취소된 상태입니다. 다시 구독하시겠습니까?
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={handleResubscribe}
                    className="px-6 py-3 border border-green-600 text-green-400 hover:bg-green-600 hover:text-white transition-all duration-300"
                  >
                    다시 구독하기
                  </button>
                  <Link
                    href="/"
                    className="px-6 py-3 border border-gray-600 hover:bg-white hover:text-black transition-all duration-300 inline-block"
                  >
                    홈으로
                  </Link>
                </div>
              </>
            )}
          </>
        )}

        {step === 'processing' && (
          <p className="text-gray-400">처리 중...</p>
        )}
        
        {step === 'success' && (
          <>
            <p className="text-green-400 mb-4">
              구독이 취소되었습니다.
            </p>
            <p className="text-gray-400 mb-8">
              언제든 다시 구독하실 수 있습니다.
            </p>
            <Link href="/" className="px-6 py-3 border border-gray-600 hover:bg-white hover:text-black transition-all duration-300 inline-block">
              홈으로 돌아가기
            </Link>
          </>
        )}
        
        {step === 'notfound' && (
          <>
            <p className="text-gray-400 mb-8">
              유효하지 않은 링크입니다.
            </p>
            <Link href="/" className="px-6 py-3 border border-gray-600 hover:bg-white hover:text-black transition-all duration-300 inline-block">
              홈으로 돌아가기
            </Link>
          </>
        )}
        
        {step === 'error' && (
          <>
            <p className="text-red-400 mb-8">
              오류가 발생했습니다. 다시 시도해주세요.
            </p>
            <Link href="/" className="px-6 py-3 border border-gray-600 hover:bg-white hover:text-black transition-all duration-300 inline-block">
              홈으로 돌아가기
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
