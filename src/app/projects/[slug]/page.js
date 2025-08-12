import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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
    const projects = await readJsonFallback('content/projects.json', 'content-sample/projects.json');
    return (Array.isArray(projects) ? projects : []).map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

async function getProject(slug) {
  try {
    const projects = await readJsonFallback('content/projects.json', 'content-sample/projects.json');
    return (Array.isArray(projects) ? projects : []).find((p) => p.slug === slug);
  } catch {
    return undefined;
  }
}

export async function generateMetadata({ params }) {
  const project = await getProject(params.slug);
  if (!project) return {};
  const title = project.name || 'Project';
  const description = project.summary || `Details about ${title}`;
  return { title, description, openGraph: { title, description }, twitter: { card: 'summary', title, description } };
}

export default async function ProjectPage({ params }) {
  const project = await getProject(params.slug);
  if (!project) return notFound();
  return (
    <article className="prose dark:prose-invert max-w-none py-8">
      <h1>{project.name}</h1>
      <p>{project.summary}</p>
      {project.links?.live && (
        <p>
          <a href={project.links.live} className="link-muted" target="_blank" rel="noopener noreferrer">
            Live Site
          </a>
        </p>
      )}
      {project.links?.caseStudy && (
        <p>
          <Link href={project.links.caseStudy} className="link-muted">
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
