import fs from 'fs/promises';
import path from 'path';

export async function generateStaticParams() {
  const data = await fs.readFile(
    path.join(process.cwd(), 'content/projects.json'),
    'utf8',
  );
  const projects = JSON.parse(data);
  return projects.map((p) => ({ slug: p.slug }));
}

async function getProject(slug) {
  const data = await fs.readFile(
    path.join(process.cwd(), 'content/projects.json'),
    'utf8',
  );
  const projects = JSON.parse(data);
  return projects.find((p) => p.slug === slug);
}

export default async function ProjectPage({ params }) {
  const project = await getProject(params.slug);
  if (!project) return <div>Not found</div>;
  return (
    <article className="prose dark:prose-invert">
      <h1>{project.name}</h1>
      <p>{project.summary}</p>
    </article>
  );
}
