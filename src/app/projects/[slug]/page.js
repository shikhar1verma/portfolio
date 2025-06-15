import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';

export async function generateStaticParams() {
  const data = await fs.readFile(path.join(process.cwd(), 'content/projects.json'), 'utf8');
  const projects = JSON.parse(data);
  return projects.map((p) => ({ slug: p.slug }));
}

async function getProject(slug) {
  const data = await fs.readFile(path.join(process.cwd(), 'content/projects.json'), 'utf8');
  const projects = JSON.parse(data);
  return projects.find((p) => p.slug === slug);
}

export default async function ProjectPage({ params }) {
  const project = await getProject(params.slug);
  if (!project) return <div>Not found</div>;
  return (
    <article className="prose dark:prose-invert max-w-none py-8">
      <h1>{project.name}</h1>
      <p>{project.summary}</p>
      {project.links?.live && (
        <p>
          <a href={project.links.live} className="text-brand-600 hover:underline">
            Live Site
          </a>
        </p>
      )}
      {project.links?.caseStudy && (
        <p>
          <Link href={project.links.caseStudy} className="text-brand-600 hover:underline">
            Case Study
          </Link>
        </p>
      )}
      <h2>Technologies</h2>
      <ul className="flex flex-wrap gap-2 list-none p-0">
        {project.technologies.map((tech) => (
          <li key={tech} className="px-2 py-1 bg-brand-100 dark:bg-brand-800 rounded">
            {tech}
          </li>
        ))}
      </ul>
    </article>
  );
}
