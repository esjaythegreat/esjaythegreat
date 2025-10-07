'use client';

import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setMessage('');

    try {
      const res = await fetch('http://localhost:1337/api/newsletter-subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            email,
            subscribedAt: new Date().toISOString(),
            isActive: true
          }
        })
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
        setMessage('구독해 주셔서 감사합니다!');
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 5000);
      } else if (res.status === 400) {
        setStatus('error');
        setMessage('이미 구독 중인 이메일입니다.');
      } else {
        setStatus('error');
        setMessage('구독에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (_error) {
      // Prefix with underscore to indicate intentionally unused
      setStatus('error');
      setMessage('네트워크 오류가 발생했습니다.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h3 className="text-2xl font-light tracking-wider mb-4">
        새로운 소식 받기
      </h3>
      <p className="text-gray-400 font-light mb-6">
        새 곡 발매 소식을 가장 먼저 받아보세요
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 주소"
          disabled={status === 'sending'}
          className="flex-1 px-4 py-3 bg-transparent border border-gray-700 focus:border-gray-500 focus:outline-none transition"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="px-6 py-3 border border-gray-600 hover:bg-white hover:text-black transition-all duration-300 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? '구독 중...' : '구독하기'}
        </button>
      </form>
      {message && (
        <p className={`mt-4 ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
