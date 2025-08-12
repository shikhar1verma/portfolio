import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import dateFormat from '../../../lib/dateFormat';

export async function generateMetadata() {
  return { title: 'Experience', description: 'Professional experience and key highlights.' };
}

async function readJsonFallback(primaryRelative, fallbackRelative) {
  try {
    const data = await fs.readFile(path.join(process.cwd(), primaryRelative), 'utf8');
    return JSON.parse(data);
  } catch {
    const data = await fs.readFile(path.join(process.cwd(), fallbackRelative), 'utf8');
    return JSON.parse(data);
  }
}

async function getExperiences() {
  try {
    return await readJsonFallback('content/experience.json', 'content-sample/experience.json');
  } catch {
    return [];
  }
}

function renderPeriod(period) {
  if (!period) return null;
  const from = period.from ? dateFormat(period.from) : null;
  const to = period.to && period.to.toLowerCase?.() === 'present' ? 'Present' : (period.to ? dateFormat(period.to) : null);
  if (from && to) return `${from} — ${to}`;
  if (from) return `${from}`;
  return null;
}

export default async function ExperienceList() {
  const experiences = await getExperiences();
  if (!experiences.length) {
    return (
      <section className="py-8 space-y-6">
        <h1 className="text-2xl font-bold">Experience</h1>
        <p>No experience to display.</p>
      </section>
    );
  }
  return (
    <section className="py-8 space-y-6">
      <h1 className="text-2xl font-bold">Experience</h1>
      <ul className="space-y-4">
        {experiences.map((exp) => (
          <li key={exp.slug} className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
            <h2 className="text-xl font-semibold">{exp.company}</h2>
            <p className="text-sm">
              {exp.role}
              {exp.period ? (
                <>
                  {' '}· {renderPeriod(exp.period)}
                </>
              ) : null}
            </p>
            <p className="mt-2">{exp.overview}</p>
            <Link href={`/experience/${exp.slug}`} className="link-muted">
              Read more →
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
