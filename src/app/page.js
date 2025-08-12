import fs from 'fs/promises';
import path from 'path';
import Image from 'next/image';
import { renderAbout } from '@/utility/profileAbout';

async function readJsonFallback(primaryRelative, fallbackRelative) {
  try {
    const data = await fs.readFile(path.join(process.cwd(), primaryRelative), 'utf8');
    return JSON.parse(data);
  } catch {
    const data = await fs.readFile(path.join(process.cwd(), fallbackRelative), 'utf8');
    return JSON.parse(data);
  }
}

export async function generateMetadata() {
  const profile = await readJsonFallback('content/profile.json', 'content-sample/profile.json');
  const title = profile?.name ? `${profile.name} · ${profile.tagline}` : 'Home';
  const description = profile?.about || 'Personal site';
  return { title, description, openGraph: { title, description }, twitter: { card: 'summary', title, description } };
}

async function getProfile() {
  return readJsonFallback('content/profile.json', 'content-sample/profile.json');
}

export default async function Home() {
  const profile = await getProfile();
  const about = renderAbout(profile);
  return (
    <section className="py-10 flex flex-col items-center text-center space-y-4">
      <Image src={profile.avatar} alt={profile.name} width={160} height={160} className="rounded-full" style={{ height: 'auto', width: 'auto' }} priority />
      <h1 className="text-3xl font-bold text-brand-700 dark:text-brand-200">{profile.name}</h1>
      <p className="text-xl text-brand-600 dark:text-brand-300">{profile.tagline}</p>
      <p className="prose dark:prose-invert max-w-xl">{about}</p>
      <div className="flex space-x-4">
        <a href={profile.social.github} className="link-muted" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href={profile.social.linkedin} className="link-muted" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href={profile.social.twitter} className="link-muted" target="_blank" rel="noopener noreferrer">Twitter</a>
      </div>
      <a href="/resume.pdf" className="mt-4 inline-block bg-brand-500 text-white px-4 py-2 rounded" target="_blank" rel="noopener noreferrer">
        Download résumé
      </a>
    </section>
  );
}
