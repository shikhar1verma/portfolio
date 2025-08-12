import fs from 'fs/promises';
import path from 'path';

export async function generateMetadata() {
  return { title: 'Education', description: 'Academic background and certifications.' };
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

async function getEducation() {
  try {
    const education = await readJsonFallback('content/education.json', 'content-sample/education.json');
    return Array.isArray(education) ? education : [];
  } catch {
    return [];
  }
}

export default async function EducationPage() {
  const education = await getEducation();
  if (!education.length) {
    return (
      <section className="py-8 space-y-6">
        <h1 className="text-2xl font-bold">Education</h1>
        <p>No education to display.</p>
      </section>
    );
  }
  return (
    <section className="py-8 space-y-6">
      <h1 className="text-2xl font-bold">Education</h1>
      <ul className="space-y-4">
        {education.map((ed) => (
          <li key={`${ed.institution}-${ed.degree}`} className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
            <h2 className="text-xl font-semibold">{ed.institution}</h2>
            <p className="text-sm">{ed.degree}{ed.period ? <> · {ed.period.from} – {ed.period.to}</> : null}</p>
            {Array.isArray(ed.highlights) && ed.highlights.length > 0 ? (
              <ul className="list-disc pl-5 mt-2">
                {ed.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
} 