'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const res = await fetch('http://localhost:1337/api/contact-messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            ...formData,
            receivedAt: new Date().toISOString(),
            isRead: false
          }
        })
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMessage('메시지 전송에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('네트워크 오류가 발생했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm text-gray-400 mb-2">
          이름 *
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 bg-transparent border border-gray-700 focus:border-gray-500 focus:outline-none transition"
          disabled={status === 'sending'}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm text-gray-400 mb-2">
          이메일 *
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 bg-transparent border border-gray-700 focus:border-gray-500 focus:outline-none transition"
          disabled={status === 'sending'}
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm text-gray-400 mb-2">
          제목
        </label>
        <input
          type="text"
          id="subject"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full px-4 py-3 bg-transparent border border-gray-700 focus:border-gray-500 focus:outline-none transition"
          disabled={status === 'sending'}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-gray-400 mb-2">
          메시지 *
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 bg-transparent border border-gray-700 focus:border-gray-500 focus:outline-none transition resize-none"
          disabled={status === 'sending'}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full px-8 py-3 border border-gray-600 hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? '전송 중...' : '메시지 보내기'}
      </button>

      {status === 'success' && (
        <p className="text-center text-green-400">메시지가 성공적으로 전송되었습니다!</p>
      )}

      {status === 'error' && (
        <p className="text-center text-red-400">{errorMessage}</p>
      )}
    </form>
  );
}