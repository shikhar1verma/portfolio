'use client';

// Responsive navbar with hamburger menu and dark-mode toggle

import { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

export default function NavbarClient({ site, titles }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header className="w-full bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold text-brand-700 dark:text-brand-200">
          {site.title}
        </Link>
        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          {site.navOrder.map((item) => (
            <Link
              key={item}
              href={item === 'home' ? '/' : `/${item}`}
              className="text-brand-700 dark:text-brand-200 hover:underline"
            >
              {titles[item] || item}
            </Link>
          ))}
          {/* Dark mode toggle placed with margin-left */}
          <div className="ml-4">
            <ThemeToggle />
          </div>
        </nav>
        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center p-2 text-brand-700 dark:text-brand-200"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>
      {/* Mobile menu panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 w-full"
          >
            <nav className="flex flex-col space-y-4 p-4">
              {site.navOrder.map((item) => (
                <Link
                  key={item}
                  href={item === 'home' ? '/' : `/${item}`}
                  className="text-brand-700 dark:text-brand-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {titles[item] || item}
                </Link>
              ))}
              <div className="ml-4">
                <ThemeToggle />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
