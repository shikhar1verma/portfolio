import fs from 'fs/promises';
import path from 'path';
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
    const achievements = await readJsonFallback('content/achievements.json', 'content-sample/achievements.json');
    return (Array.isArray(achievements) ? achievements : []).map((a) => ({ slug: a.slug }));
  } catch {
    return [];
  }
}

async function getAchievement(slug) {
  try {
    const achievements = await readJsonFallback('content/achievements.json', 'content-sample/achievements.json');
    return (Array.isArray(achievements) ? achievements : []).find((a) => a.slug === slug);
  } catch {
    return undefined;
  }
}

export async function generateMetadata({ params }) {
  const achievement = await getAchievement(params.slug);
  if (!achievement) return {};
  const title = achievement.name || 'Achievement';
  const summary = achievement.summary || `Details about ${title}`;
  return { title, description: summary, openGraph: { title, description: summary }, twitter: { card: 'summary', title, description: summary } };
}

export default async function AchievementPage({ params }) {
  const achievement = await getAchievement(params.slug);
  if (!achievement) return notFound();
  return (
    <article className="prose dark:prose-invert max-w-none py-8">
      <h1>{achievement.name}</h1>
      {achievement.year ? <p><strong>Year:</strong> {achievement.year}</p> : null}
      {achievement.summary ? <p>{achievement.summary}</p> : null}
      {achievement.description ? <p>{achievement.description}</p> : null}
      {achievement.links?.external && (
        <p>
          <a href={achievement.links.external} className="link-muted" target="_blank" rel="noopener noreferrer">
            External link
          </a>
        </p>
      )}
    </article>
  );
} 