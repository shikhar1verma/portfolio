import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';

async function getProjects() {
  const data = await fs.readFile(path.join(process.cwd(), 'content/projects.json'), 'utf8');
  return JSON.parse(data);
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <section className="py-8 space-y-6">
      <h1 className="text-2xl font-bold">Projects</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div key={project.slug} className="p-4 border rounded-md">
            <h2 className="text-xl font-semibold">{project.name}</h2>
            <p>{project.summary}</p>
            <Link href={`/projects/${project.slug}`} className="text-brand-600 hover:underline">
              Read more →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
