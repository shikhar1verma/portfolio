import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import fs from 'fs/promises';
import path from 'path';

async function getSite() {
  const data = await fs.readFile(path.join(process.cwd(), 'content/site.json'), 'utf8');
  return JSON.parse(data);
}

export default async function Navbar() {
  const site = await getSite();
  const titles = {
    home: 'Home',
    about: 'About',
    experience: 'Experience',
    projects: 'Projects',
    skills: 'Skills',
    contact: 'Contact',
  };
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between py-4 px-6 bg-brand-100 dark:bg-brand-900">
      <Link href="/" className="text-xl font-semibold text-brand-700 dark:text-brand-200">
        {site.title}
      </Link>
      <ul className="flex space-x-4">
        {site.navOrder.map((item) => (
          <li key={item}>
            <Link href={item === 'home' ? '/' : `/${item}`} className="text-brand-700 dark:text-brand-200 hover:underline">
              {titles[item] || item}
            </Link>
          </li>
        ))}
      </ul>
      <ThemeToggle />
    </nav>
  );
}
