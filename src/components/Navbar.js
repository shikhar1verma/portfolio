// Server component that reads site data and renders the interactive navbar
import NavbarClient from './NavbarClient';
import fs from 'fs/promises';
import path from 'path';

async function readJsonFallback(primaryRelative, fallbackRelative) {
  try {
    const data = await fs.readFile(path.join(process.cwd(), primaryRelative), 'utf8');
    return JSON.parse(data);
  } catch {
    try {
      const data = await fs.readFile(path.join(process.cwd(), fallbackRelative), 'utf8');
      return JSON.parse(data);
    } catch {
      return null;
    }
  }
}

async function getSite() {
  const site = await readJsonFallback('content/site.json', 'content-sample/site.json');
  return site || { title: 'Portfolio', description: '', navOrder: ['home', 'about'] };
}

async function fileExists(relativePath) {
  try {
    await fs.access(path.join(process.cwd(), relativePath));
    return true;
  } catch {
    return false;
  }
}

export default async function Navbar() {
  const site = await getSite();
  const titles = {
    home: 'Home',
    about: 'About',
    experience: 'Experience',
    projects: 'Projects',
    achievements: 'Achievements',
    education: 'Education',
    skills: 'Skills',
  };

  const optionalToContentMap = {
    achievements: 'content/achievements.json',
    experience: 'content/experience.json',
    projects: 'content/projects.json',
    education: 'content/education.json',
    skills: 'content/skills.json',
  };

  const optionalToSampleMap = {
    achievements: 'content-sample/achievements.json',
    experience: 'content-sample/experience.json',
    projects: 'content-sample/projects.json',
    education: 'content-sample/education.json',
    skills: 'content-sample/skills.json',
  };

  const requiredTabs = new Set(['home', 'about']);

  const filteredNav = (
    await Promise.all(
      site.navOrder.map(async (item) => {
        if (requiredTabs.has(item)) return item;
        const contentPath = optionalToContentMap[item];
        const samplePath = optionalToSampleMap[item];
        if (!contentPath) return item; // If we don't have a mapping, keep it
        const hasReal = await fileExists(contentPath);
        const hasSample = await fileExists(samplePath);
        return hasReal || hasSample ? item : null;
      })
    )
  ).filter(Boolean);

  const filteredSite = { ...site, navOrder: filteredNav };
  return <NavbarClient site={filteredSite} titles={titles} />;
}
