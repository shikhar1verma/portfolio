import fs from 'fs/promises';
import path from 'path';

async function getProfile() {
  const data = await fs.readFile(path.join(process.cwd(), 'content/profile.json'), 'utf8');
  return JSON.parse(data);
}

export default async function ContactPage() {
  const profile = await getProfile();
  return (
    <section className="prose dark:prose-invert max-w-none py-8">
      <h1>Contact</h1>
      <p>
        <a href={`mailto:${profile.email}`} className="text-brand-600">
          {profile.email}
        </a>
      </p>
      <div className="flex space-x-4 mt-4">
        <a href={profile.social.github} className="text-brand-600 hover:underline">
          GitHub
        </a>
        <a href={profile.social.linkedin} className="text-brand-600 hover:underline">
          LinkedIn
        </a>
        <a href={profile.social.twitter} className="text-brand-600 hover:underline">
          Twitter
        </a>
      </div>
    </section>
  );
}
