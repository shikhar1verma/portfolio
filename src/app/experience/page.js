import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';

async function getExperiences() {
  const data = await fs.readFile(path.join(process.cwd(), 'content/experience.json'), 'utf8');
  return JSON.parse(data);
}

export default async function ExperienceList() {
  const experiences = await getExperiences();
  return (
    <section className="py-8 space-y-6">
      <h1 className="text-2xl font-bold">Experience</h1>
      <ul className="space-y-4">
        {experiences.map((exp) => (
          <li key={exp.slug} className="p-4 border rounded-md">
            <h2 className="text-xl font-semibold">{exp.company}</h2>
            <p className="text-sm">
              {exp.role} · {exp.period.from} — {exp.period.to}
            </p>
            <p className="mt-2">{exp.overview}</p>
            <Link href={`/experience/${exp.slug}`} className="text-brand-600 hover:underline">
              Read more →
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
