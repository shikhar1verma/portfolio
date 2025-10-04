import fs from 'fs/promises';
import path from 'path';
import SkillsClient from './SkillsClient';

export async function generateMetadata() {
  return { 
    title: 'Skills - Shikhar Verma', 
    description: 'Comprehensive technical skills in Backend Development, AI/LLM Engineering, Frontend Development, and more. Expert in Python, Django, LangGraph, Next.js, and modern web technologies.' 
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

export default async function SkillsPage() {
  const skills = await readJsonFallback('content/skills.json', 'content-sample/skills.json').catch(() => null);
  if (!skills) {
    return (
      <section className="py-8 space-y-6">
        <h1 className="text-2xl font-bold">Skills</h1>
        <p>No skills to display.</p>
      </section>
    );
  }
  return <SkillsClient skills={skills} />;
}
