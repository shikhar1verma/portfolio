import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';

export async function generateMetadata() {
  return { title: 'Projects', description: 'Selected projects and case studies.' };
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

async function getProjects() {
  try {
    return await readJsonFallback('content/projects.json', 'content-sample/projects.json');
  } catch {
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  if (!projects.length) {
    return (
      <section className="py-8 space-y-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <p>No projects to display.</p>
      </section>
    );
  }
  return (
    <section className="py-8 space-y-6">
      <h1 className="text-2xl font-bold">Projects</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div key={project.slug} className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
            <h2 className="text-xl font-semibold">{project.name}</h2>
            <p>{project.summary}</p>
            <Link href={`/projects/${project.slug}`} className="link-muted">
              Read more →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
