import fs from 'fs/promises';
import path from 'path';

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
  return (
    <section className="py-8 space-y-6">
      <h1 className="text-2xl font-bold">Skills</h1>
      {Object.entries(skills).map(([category, items]) => (
        <div key={category} className="mb-4">
          <h2 className="text-xl font-semibold capitalize">{category}</h2>
          <ul className="flex flex-wrap gap-2 mt-2">
            {items.map((item) => (
              <li key={item} className="px-2 py-1 bg-brand-100 dark:bg-brand-800 rounded">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
