import fs from 'fs/promises';
import path from 'path';

async function getProfile() {
  const data = await fs.readFile(
    path.join(process.cwd(), 'content/profile.json'),
    'utf8',
  );
  return JSON.parse(data);
}

export default async function Home() {
  const profile = await getProfile();
  return (
    <section className="py-10 space-y-4">
      <h1 className="text-3xl font-bold text-brand-700 dark:text-brand-200">
        {profile.name}
      </h1>
      <p className="text-xl text-brand-600 dark:text-brand-300">
        {profile.tagline}
      </p>
      <p className="prose dark:prose-invert">{profile.about}</p>
      <a
        href="/resume.pdf"
        className="mt-4 inline-block bg-brand-500 text-white px-4 py-2 rounded"
      >
        Download résumé
      </a>
    </section>
  );
}
