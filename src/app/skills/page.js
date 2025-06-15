import fs from 'fs/promises';
import path from 'path';

async function getSkills() {
  const data = await fs.readFile(
    path.join(process.cwd(), 'content/skills.json'),
    'utf8',
  );
  return JSON.parse(data);
}

export default async function SkillsPage() {
  const skills = await getSkills();
  return (
    <ul className="list-disc pl-5 space-y-1">
      {skills.map((skill) => (
        <li key={skill}>{skill}</li>
      ))}
    </ul>
  );
}
