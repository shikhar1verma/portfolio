import fs from 'fs/promises';
import path from 'path';

export async function generateStaticParams() {
  const data = await fs.readFile(path.join(process.cwd(), 'content/experience.json'), 'utf8');
  const experiences = JSON.parse(data);
  return experiences.map((exp) => ({ slug: exp.slug }));
}

async function getExperience(slug) {
  const data = await fs.readFile(path.join(process.cwd(), 'content/experience.json'), 'utf8');
  const experiences = JSON.parse(data);
  return experiences.find((exp) => exp.slug === slug);
}

export default async function ExperiencePage({ params }) {
  const exp = await getExperience(params.slug);
  if (!exp) return <div>Not found</div>;
  return (
    <article className="prose dark:prose-invert max-w-none py-8">
      <h1>{exp.company}</h1>
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
