import fs from 'fs/promises';
import path from 'path';

async function getSite() {
  const data = await fs.readFile(path.join(process.cwd(), 'content/site.json'), 'utf8');
  return JSON.parse(data);
}

export default async function Footer() {
  const site = await getSite();
  return (
    <footer className="py-4 text-center text-sm text-brand-700 dark:text-brand-200">
      © {new Date().getFullYear()} {site.title}
    </footer>
  );
}
