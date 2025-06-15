// Server component that reads site data and renders the interactive navbar
import NavbarClient from './NavbarClient';
import fs from 'fs/promises';
import path from 'path';

async function getSite() {
  const data = await fs.readFile(path.join(process.cwd(), 'content/site.json'), 'utf8');
  return JSON.parse(data);
}

export default async function Navbar() {
  const site = await getSite();
  const titles = {
    home: 'Home',
    about: 'About',
    experience: 'Experience',
    projects: 'Projects',
    skills: 'Skills',
    contact: 'Contact',
  };
  return <NavbarClient site={site} titles={titles} />;
}
