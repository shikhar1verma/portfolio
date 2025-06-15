import Link from 'next/link';
import DarkModeToggle from './DarkModeToggle';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between py-4 px-6 bg-brand-100 dark:bg-brand-900">
      <Link
        href="/"
        className="text-xl font-semibold text-brand-700 dark:text-brand-200"
      >
        Portfolio
      </Link>
      <DarkModeToggle />
    </nav>
  );
}
