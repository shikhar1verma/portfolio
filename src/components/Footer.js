import fs from 'fs/promises';
import path from 'path';

async function readJsonFallback(primaryRelative, fallbackRelative) {
  try {
    const data = await fs.readFile(path.join(process.cwd(), primaryRelative), 'utf8');
    return JSON.parse(data);
  } catch {
    try {
      const data = await fs.readFile(path.join(process.cwd(), fallbackRelative), 'utf8');
      return JSON.parse(data);
    } catch {
      return null;
    }
  }
}

async function getProfile() {
  return await readJsonFallback('content/profile.json', 'content-sample/profile.json');
}

export default async function Footer() {
  const profile = await getProfile();
  return (
    <footer className="py-4 text-center text-sm text-brand-700 dark:text-brand-200">
      © {new Date().getFullYear()} {profile.name} · {profile.tagline}
    </footer>
  );
}
