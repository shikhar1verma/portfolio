import fs from 'fs/promises';
import path from 'path';
import ExperienceClient from './ExperienceClient';

export async function generateMetadata() {
  return { 
    title: 'Experience - Shikhar Verma', 
    description: 'Professional work experience as Backend Lead Engineer building scalable systems, microservices, and AI-powered platforms with measurable impact.' 
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

async function getExperiences() {
  try {
    return await readJsonFallback('content/experience.json', 'content-sample/experience.json');
  } catch {
    return [];
  }
}

export default async function ExperiencePage() {
  const experiences = await getExperiences();
  if (!experiences.length) {
    return (
      <section className="py-8 space-y-6">
        <h1 className="text-2xl font-bold">Experience</h1>
        <p>No experience to display.</p>
      </section>
    );
  }
  return <ExperienceClient experiences={experiences} />;
}
