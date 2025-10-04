import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import ProjectsClient from './ProjectsClient';

export async function generateMetadata() {
  return { 
    title: 'Projects - Shikhar Verma', 
    description: 'Featured projects showcasing AI/LLM engineering, backend development, and technical leadership with measurable impact and results.' 
  };
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
  return <ProjectsClient projects={projects} />;
}
