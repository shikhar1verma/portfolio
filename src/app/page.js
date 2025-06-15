import fs from 'fs/promises';
import path from 'path';
import Image from 'next/image';

async function getProfile() {
  const data = await fs.readFile(path.join(process.cwd(), 'content/profile.json'), 'utf8');
  return JSON.parse(data);
}

export default async function Home() {
  const profile = await getProfile();
  return (
    <section className="py-10 flex flex-col items-center text-center space-y-4">
      <Image src={profile.avatar} alt={profile.name} width={160} height={160} className="rounded-full" />
      <h1 className="text-3xl font-bold text-brand-700 dark:text-brand-200">{profile.name}</h1>
      <p className="text-xl text-brand-600 dark:text-brand-300">{profile.tagline}</p>
      <p className="prose dark:prose-invert max-w-xl">{profile.about}</p>
      <div className="flex space-x-4">
        <a href={profile.social.github} className="text-brand-600 hover:underline">GitHub</a>
        <a href={profile.social.linkedin} className="text-brand-600 hover:underline">LinkedIn</a>
        <a href={profile.social.twitter} className="text-brand-600 hover:underline">Twitter</a>
      </div>
      <a href="/resume.pdf" className="mt-4 inline-block bg-brand-500 text-white px-4 py-2 rounded">
        Download résumé
      </a>
    </section>
  );
}
