import Link from 'next/link';

interface NavigationProps {
  currentPage?: 'home' | 'blog' | 'music' | 'events' | 'contact';
}

export default function Navigation({ currentPage = 'home' }: NavigationProps) {
  return (
    <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-sm border-b border-gray-800 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* lowercase intentional */}
        <Link 
          href="/" 
          className="text-xl font-light tracking-widest hover:text-gray-400 transition"
        >
          esjaythegreat
        </Link>
        
        <div className="hidden md:flex gap-8 text-sm tracking-wide">
          {currentPage === 'home' ? (
            <>
              {/* lowercase intentional */}
              <a href="#home" className="hover:text-gray-400 transition">home</a>
              <a href="#music" className="hover:text-gray-400 transition">music</a>
              <Link href="/blog" className="hover:text-gray-400 transition">blog</Link>
              <Link href="/events" className="hover:text-gray-400 transition">events</Link>
              <Link href="/contact" className="hover:text-gray-400 transition">contact</Link>
            </>
          ) : (
            <>
              {/* lowercase intentional */}
              <Link href="/" className="hover:text-gray-400 transition">home</Link>
              <Link href="/#music" className="hover:text-gray-400 transition">music</Link>
              <Link 
                href="/blog" 
                className={currentPage === 'blog' ? 'text-gray-400' : 'hover:text-gray-400 transition'}
              >
                blog
              </Link>
              <Link 
                href="/events" 
                className={currentPage === 'events' ? 'text-gray-400' : 'hover:text-gray-400 transition'}
              >
                events
              </Link>
              <Link 
                href="/contact" 
                className={currentPage === 'contact' ? 'text-gray-400' : 'hover:text-gray-400 transition'}
              >
                contact
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}