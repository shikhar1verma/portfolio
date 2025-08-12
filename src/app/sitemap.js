import fs from 'fs/promises';
import path from 'path';

async function readJsonSafe(relative) {
  try {
    const data = await fs.readFile(path.join(process.cwd(), relative), 'utf8');
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

  const projects = (await readJsonSafe('content/projects.json')) || [];
  const experiences = (await readJsonSafe('content/experience.json')) || [];
  const achievements = (await readJsonSafe('content/achievements.json')) || [];
  const education = (await readJsonSafe('content/education.json')) || [];

  const staticRoutes = ['/', '/about', '/experience', '/projects', '/achievements', '/education', '/skills'].map((route) => ({
    url: `${baseUrl}${route}`,
  }));

  const projectRoutes = projects.map((p) => ({ url: `${baseUrl}/projects/${p.slug}` }));
  const experienceRoutes = experiences.map((e) => ({ url: `${baseUrl}/experience/${e.slug}` }));
  const achievementRoutes = achievements.map((a) => ({ url: `${baseUrl}/achievements/${a.slug}` }));

  return [...staticRoutes, ...projectRoutes, ...experienceRoutes, ...achievementRoutes];
} 