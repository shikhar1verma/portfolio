import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';

export async function generateMetadata() {
  return { title: 'Achievements', description: 'Awards, recognitions, and notable milestones.' };
}

async function getAchievements() {
  try {
    const data = await fs.readFile(path.join(process.cwd(), 'content/achievements.json'), 'utf8');
    const achievements = JSON.parse(data);
    return Array.isArray(achievements) ? achievements : [];
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
  return (
    <section className="py-8 space-y-6">
      <h1 className="text-2xl font-bold">Achievements</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {achievements.map((ach) => (
          <div key={ach.slug} className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
            <h2 className="text-xl font-semibold">{ach.name}</h2>
            <p>{ach.summary}</p>
            <div className="flex items-center gap-4">
              <Link href={`/achievements/${ach.slug}`} className="link-muted">
                View details →
              </Link>
              {ach.links?.external && (
                <a href={ach.links.external} className="link-muted" target="_blank" rel="noopener noreferrer">
                  External link ↗
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 