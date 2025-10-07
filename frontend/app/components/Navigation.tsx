'use client';

import Link from 'next/link';
import { useState } from 'react';

interface NavigationProps {
  currentPage?: 'home' | 'blog' | 'music' | 'events' | 'contact';
}

export default function Navigation({ currentPage = 'home' }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-sm border-b border-gray-800 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* lowercase intentional */}
        <Link 
          href="/" 
          className="text-xl font-light tracking-widest hover:text-gray-500 transition"
          onClick={closeMenu}
        >
          esjaythegreat
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 text-sm tracking-wide">
          {currentPage === 'home' ? (
            <>
              {/* lowercase intentional */}
              <a href="#home" className="hover:text-gray-500 transition">home</a>
              <a href="#music" className="hover:text-gray-500 transition">music</a>
              <Link href="/blog" className="hover:text-gray-500 transition">blog</Link>
              <Link href="/events" className="hover:text-gray-500 transition">events</Link>
              <Link href="/contact" className="hover:text-gray-500 transition">contact</Link>
            </>
          ) : (
            <>
              {/* lowercase intentional */}
              <Link href="/" className="hover:text-gray-500 transition">home</Link>
              <Link href="/#music" className="hover:text-gray-500 transition">music</Link>
              <Link 
                href="/blog" 
                className={currentPage === 'blog' ? 'text-gray-500' : 'hover:text-gray-500 transition'}
              >
                blog
              </Link>
              <Link 
                href="/events" 
                className={currentPage === 'events' ? 'text-gray-500' : 'hover:text-gray-500 transition'}
              >
                events
              </Link>
              <Link 
                href="/contact" 
                className={currentPage === 'contact' ? 'text-gray-500' : 'hover:text-gray-500 transition'}
              >
                contact
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col gap-1.5 w-6 h-5 justify-center items-center"
          aria-label="Toggle menu"
        >
          <span 
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span 
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span 
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-80 border-t border-gray-800' : 'max-h-0'
        }`}
      >
        <div className="px-6 py-4 space-y-4 text-sm tracking-wide">
          {currentPage === 'home' ? (
            <>
              {/* lowercase intentional */}
              <a 
                href="#home" 
                className="block hover:text-gray-500 transition"
                onClick={closeMenu}
              >
                home
              </a>
              <a 
                href="#music" 
                className="block hover:text-gray-500 transition"
                onClick={closeMenu}
              >
                music
              </a>
              <Link 
                href="/blog" 
                className="block hover:text-gray-500 transition"
                onClick={closeMenu}
              >
                blog
              </Link>
              <Link 
                href="/events" 
                className="block hover:text-gray-500 transition"
                onClick={closeMenu}
              >
                events
              </Link>
              <Link 
                href="/contact" 
                className="block hover:text-gray-500 transition"
                onClick={closeMenu}
              >
                contact
              </Link>
            </>
          ) : (
            <>
              {/* lowercase intentional */}
              <Link 
                href="/" 
                className="block hover:text-gray-500 transition"
                onClick={closeMenu}
              >
                home
              </Link>
              <Link 
                href="/#music" 
                className="block hover:text-gray-500 transition"
                onClick={closeMenu}
              >
                music
              </Link>
              <Link 
                href="/blog" 
                className={`block ${currentPage === 'blog' ? 'text-gray-500' : 'hover:text-gray-500 transition'}`}
                onClick={closeMenu}
              >
                blog
              </Link>
              <Link 
                href="/events" 
                className={`block ${currentPage === 'events' ? 'text-gray-500' : 'hover:text-gray-500 transition'}`}
                onClick={closeMenu}
              >
                events
              </Link>
              <Link 
                href="/contact" 
                className={`block ${currentPage === 'contact' ? 'text-gray-500' : 'hover:text-gray-500 transition'}`}
                onClick={closeMenu}
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
