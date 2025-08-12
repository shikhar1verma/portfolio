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
  const title = 'About';
  const description = profile?.tagline || 'About me';
  return { title, description, openGraph: { title, description }, twitter: { card: 'summary', title, description } };
}

async function getProfile() {
  return readJsonFallback('content/profile.json', 'content-sample/profile.json');
}

export default async function AboutPage() {
  const profile = await getProfile();
  const about = renderAbout(profile);
  return (
    <section className="prose dark:prose-invert max-w-none py-8">
      <h1>About</h1>
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="not-prose">
          <Image src={profile.avatar} alt={profile.name} width={160} height={160} className="rounded-full" style={{ height: 'auto', width: 'auto' }} />
        </div>
        <div>
          <p>{about}</p>
          <p className="mt-2"><strong>Location:</strong> {profile.location}</p>
          <div className="mt-4">
            <h2>Contact</h2>
            <p>
              <a href={`mailto:${profile.email}`} className="link-muted">
                {profile.email}
              </a>
            </p>
            <div className="flex gap-4 mt-2 not-prose">
              <a href={profile.social.github} className="link-muted" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href={profile.social.linkedin} className="link-muted" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href={profile.social.twitter} className="link-muted" target="_blank" rel="noopener noreferrer">Twitter</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
