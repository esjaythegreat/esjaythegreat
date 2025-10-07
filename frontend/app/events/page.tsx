import { Metadata } from 'next';
import { getEvents } from '@/lib/api';
import { formatKoreanDateTime } from '@/lib/utils';
import type { StrapiEvent } from '@/lib/types';
import Navigation from '../components/Navigation';

export const metadata: Metadata = {
  title: 'events - esjaythegreat', // lowercase intentional
  description: 'esjaythegreat의 공연 및 이벤트 일정을 확인하세요', // lowercase intentional
  openGraph: {
    title: 'events - esjaythegreat', // lowercase intentional
    description: 'esjaythegreat의 공연 및 이벤트 일정', // lowercase intentional
    type: 'website',
  },
};

export default async function EventsPage() {
  const events: StrapiEvent[] = await getEvents();
  const now = new Date();
  
  const upcomingEvents = events.filter((event) => new Date(event.date) >= now);
  const pastEvents = events.filter((event) => new Date(event.date) < now);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation currentPage="events" />

      <div className="pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* lowercase intentional */}
          <h1 className="text-5xl font-light tracking-wider mb-4 text-center">events</h1>
          <p className="text-center text-gray-500 mb-16">공연 및 이벤트</p>

          {upcomingEvents.length > 0 && (
            <section className="mb-16">
              {/* lowercase intentional */}
              <h2 className="text-3xl font-light tracking-wider mb-8 border-b border-gray-800 pb-4">
                upcoming events
              </h2>
              <div className="space-y-8">
                {upcomingEvents.map((event) => (
                  <article key={event.id} className="border border-gray-700 hover:border-gray-500 transition-all p-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-light tracking-wide mb-2">
                          {event.title}
                        </h3>
                        
                        <div className="text-gray-500 space-y-1 mb-4">
                          <p className="flex items-center gap-2">
                            <span>📅</span>
                            <span>{formatKoreanDateTime(event.date)}</span>
                          </p>
                          {event.venue && (
                            <p className="flex items-center gap-2">
                              <span>📍</span>
                              <span>{event.venue}{event.city ? `, ${event.city}` : ''}</span>
                            </p>
                          )}
                        </div>

                        {event.description && (
                          <div className="text-gray-500 leading-relaxed mb-4 prose prose-invert max-w-none"
                               dangerouslySetInnerHTML={{ __html: event.description }} />
                        )}

                        {event.ticketUrl && (
                          <a
                            href={event.ticketUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-6 py-2 border border-gray-600 hover:bg-white hover:text-black transition-all duration-300"
                          >
                            티켓 예매
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {pastEvents.length > 0 && (
            <section>
              {/* lowercase intentional */}
              <h2 className="text-3xl font-light tracking-wider mb-8 border-b border-gray-800 pb-4">
                past events
              </h2>
              <div className="space-y-6 opacity-60">
                {pastEvents.map((event) => (
                  <article key={event.id} className="border border-gray-800 p-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-light tracking-wide mb-2">
                          {event.title}
                        </h3>
                        
                        <div className="text-gray-500 space-y-1 text-sm">
                          <p>{formatKoreanDateTime(event.date)}</p>
                          {event.venue && (
                            <p>📍 {event.venue}{event.city ? `, ${event.city}` : ''}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {events.length === 0 && (
            <p className="text-center text-gray-500">예정된 이벤트가 없습니다</p>
          )}
        </div>
      </div>
    </main>
  );
}
