import Image from 'next/image';
import profile from '../content/profile.json';

export const revalidate = 86400;

export default function Home() {
  return (
    <main className="prose dark:prose-invert mx-auto p-4">
      <section className="text-center mb-8">
        <Image
          src="/profile.JPG"
          alt="Profile"
          width={144}
          height={144}
          className="mx-auto rounded-full"
        />
        <h1 className="mt-4 text-3xl font-bold">{profile.name}</h1>
        <p>{profile.tagline}</p>
        <a
          className="inline-block mt-4 bg-brand-500 text-white px-4 py-2 rounded"
          href="/resume.pdf"
        >
          Download résumé
        </a>
      </section>
    </main>
  );
}
