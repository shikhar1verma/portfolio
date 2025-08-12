import fs from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';
import dateFormat from '../../../../lib/dateFormat';

async function readJsonFallback(primaryRelative, fallbackRelative) {
  try {
    const data = await fs.readFile(path.join(process.cwd(), primaryRelative), 'utf8');
    return JSON.parse(data);
  } catch {
    const data = await fs.readFile(path.join(process.cwd(), fallbackRelative), 'utf8');
    return JSON.parse(data);
  }
}

export async function generateStaticParams() {
  try {
    const experiences = await readJsonFallback('content/experience.json', 'content-sample/experience.json');
    return (Array.isArray(experiences) ? experiences : []).map((exp) => ({ slug: exp.slug }));
  } catch {
    return [];
  }
}

async function getExperience(slug) {
  try {
    const experiences = await readJsonFallback('content/experience.json', 'content-sample/experience.json');
    return (Array.isArray(experiences) ? experiences : []).find((exp) => exp.slug === slug);
  } catch {
    return undefined;
  }
}

export async function generateMetadata({ params }) {
  const exp = await getExperience(params.slug);
  if (!exp) return {};
  const title = exp.company || 'Experience';
  const description = exp.overview || `Work experience at ${title}`;
  return { title, description, openGraph: { title, description }, twitter: { card: 'summary', title, description } };
}

function renderPeriod(period) {
  if (!period) return null;
  const from = period.from ? dateFormat(period.from) : null;
  const to = period.to && period.to.toLowerCase?.() === 'present' ? 'Present' : (period.to ? dateFormat(period.to) : null);
  if (from && to) return `${from} — ${to}`;
  if (from) return `${from}`;
  return null;
}

export default async function ExperiencePage({ params }) {
  const exp = await getExperience(params.slug);
  if (!exp) return notFound();
  const periodText = renderPeriod(exp.period);
  return (
    <article className="prose dark:prose-invert max-w-none py-8">
      <h1>{exp.company}</h1>
      {periodText ? <p><em>{periodText}</em></p> : null}
      <p>{exp.overview}</p>
      <h2>Highlights</h2>
      <ul>
        {exp.highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
      <h2>Stack</h2>
      <ul className="flex flex-wrap gap-2 list-none p-0">
        {exp.stack.map((s) => (
          <li key={s} className="px-2 py-1 bg-brand-100 dark:bg-brand-800 rounded">
            {s}
          </li>
        ))}
      </ul>
    </article>
  );
}
