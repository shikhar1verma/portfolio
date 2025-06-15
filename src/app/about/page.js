import fs from 'fs/promises';
import path from 'path';
import Image from 'next/image';

async function getProfile() {
  const data = await fs.readFile(path.join(process.cwd(), 'content/profile.json'), 'utf8');
  return JSON.parse(data);
}

export default async function AboutPage() {
  const profile = await getProfile();
  return (
    <section className="prose dark:prose-invert max-w-none py-8">
      <h1>About</h1>
      <div className="flex flex-col md:flex-row items-start gap-6">
        <Image src={profile.avatar} alt={profile.name} width={160} height={160} className="rounded-full" />
        <div>
          <p>{profile.about}</p>
          <p className="mt-2"><strong>Location:</strong> {profile.location}</p>
        </div>
      </div>
    </section>
  );
}
