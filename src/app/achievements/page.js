import fs from 'fs/promises';
import path from 'path';
import AchievementsClient from './AchievementsClient';

export async function generateMetadata() {
  return { 
    title: 'Achievements - Shikhar Verma', 
    description: 'Awards, coding challenges, patents, and professional milestones showcasing dedication to innovation and continuous learning.' 
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

async function getAchievements() {
  try {
    return await readJsonFallback('content/achievements.json', 'content-sample/achievements.json');
  } catch {
    return [];
  }
}

export default async function AchievementsPage() {
  const achievements = await getAchievements();
  if (!achievements.length) {
    return (
      <section className="py-8 space-y-6">
        <h1 className="text-2xl font-bold">Achievements</h1>
        <p>No achievements to display.</p>
      </section>
    );
  }
  return <AchievementsClient achievements={achievements} />;
} 