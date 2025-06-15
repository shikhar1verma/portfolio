import fs from 'fs/promises';
import path from 'path';

export async function generateStaticParams() {
  const data = await fs.readFile(
    path.join(process.cwd(), 'content/experience.json'),
    'utf8',
  );
  const experiences = JSON.parse(data);
  return experiences.map((exp) => ({ slug: exp.slug }));
}

async function getExperience(slug) {
  const data = await fs.readFile(
    path.join(process.cwd(), 'content/experience.json'),
    'utf8',
  );
  const experiences = JSON.parse(data);
  return experiences.find((exp) => exp.slug === slug);
}

export default async function ExperiencePage({ params }) {
  const exp = await getExperience(params.slug);
  if (!exp) return <div>Not found</div>;
  return (
    <article className="prose dark:prose-invert">
      <h1>{exp.company}</h1>
      <p>{exp.summary}</p>
    </article>
  );
}
