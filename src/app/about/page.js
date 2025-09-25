import fs from 'fs/promises';
import path from 'path';
import Image from 'next/image';
import { renderAbout } from '@/utility/profileAbout';

async function readJsonFallback(primaryRelative, fallbackRelative) {
  try {
    const data = await fs.readFile(path.join(process.cwd(), primaryRelative), 'utf8');
    return JSON.parse(data);
  } catch {
    const data = await fs.readFile(path.join(process.cwd(), fallbackRelative), 'utf8');
    return JSON.parse(data);
  }
}

export async function generateMetadata() {
  const profile = await readJsonFallback('content/profile.json', 'content-sample/profile.json');
  const title = 'About';
  const description = profile?.tagline || 'About me';
  return { title, description, openGraph: { title, description }, twitter: { card: 'summary', title, description } };
}

async function getProfile() {
  return readJsonFallback('content/profile.json', 'content-sample/profile.json');
}

async function getEducation() {
  const data = await fs.readFile(path.join(process.cwd(), 'content/education.json'), 'utf8');
  return JSON.parse(data);
}

export default async function AboutPage() {
  const profile = await getProfile();
  const education = await getEducation();
  
  return (
    <section className="prose dark:prose-invert max-w-none py-8">
      <h1>About</h1>
      <div className="flex flex-col md:flex-row items-start gap-6 mb-12">
        <Image src={profile.avatar} alt={profile.name} width={160} height={160} className="rounded-full" />
        <div>
          <p>{about}</p>
          <p className="mt-2"><strong>Location:</strong> {profile.location}</p>
          <div className="mt-4">
            <h2>Contact</h2>
            <p>
              <a href={`mailto:${profile.email}`} className="link-muted">
                {profile.email}
              </a>
            </p>
            <div className="flex gap-4 mt-2 not-prose">
              <a href={profile.social.github} className="link-muted" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href={profile.social.linkedin} className="link-muted" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href={profile.social.twitter} className="link-muted" target="_blank" rel="noopener noreferrer">Twitter</a>
            </div>
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div className="not-prose">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Education</h2>
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {education.map((edu, index) => (
            <div key={index} className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-brand-400 dark:hover:border-brand-500">
              {/* Decorative gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-transparent dark:from-brand-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                {/* Institution Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-300">
                      {edu.institution}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                      {edu.degree}
                    </p>
                  </div>
                  
                  {/* Academic Icon */}
                  <div className="flex-shrink-0 ml-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-100 dark:bg-brand-900/50 flex items-center justify-center group-hover:bg-brand-200 dark:group-hover:bg-brand-800/50 transition-colors duration-300">
                      <svg className="w-5 h-5 text-brand-600 dark:text-brand-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Period */}
                <div className="mb-4">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 group-hover:bg-brand-100 dark:group-hover:bg-brand-900/30 group-hover:text-brand-700 dark:group-hover:text-brand-300 transition-colors duration-300">
                    <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                    </svg>
                    {edu.period.from} - {edu.period.to}
                  </div>
                </div>

                {/* Highlights */}
                {edu.highlights && edu.highlights.length > 0 && (
                  <div className="space-y-2">
                    {edu.highlights.map((highlight, highlightIndex) => (
                      <div key={highlightIndex} className="flex items-center text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mr-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Hover effect border */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-brand-200 dark:group-hover:border-brand-700 transition-colors duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
