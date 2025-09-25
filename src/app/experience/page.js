import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import dateFormat from '../../../lib/dateFormat';
import { formatDateRange } from '../../../lib/dateFormat';

export async function generateMetadata() {
  return { title: 'Experience', description: 'Professional experience and key highlights.' };
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

async function getExperiences() {
  try {
    return await readJsonFallback('content/experience.json', 'content-sample/experience.json');
  } catch {
    return [];
  }
}

function renderPeriod(period) {
  if (!period) return null;
  const from = period.from ? dateFormat(period.from) : null;
  const to = period.to && period.to.toLowerCase?.() === 'present' ? 'Present' : (period.to ? dateFormat(period.to) : null);
  if (from && to) return `${from} — ${to}`;
  if (from) return `${from}`;
  return null;
}

export default async function ExperienceList() {
  const experiences = await getExperiences();
  if (!experiences.length) {
    return (
      <section className="py-8 space-y-6">
        <h1 className="text-2xl font-bold">Experience</h1>
        <p>No experience to display.</p>
      </section>
    );
  }
  return (
    <section className="py-8 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent mb-2">
          Experience
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          My professional journey and key contributions across different organizations
        </p>
      </div>
      
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <article key={exp.slug} className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-brand-400 dark:hover:border-brand-500">
            {/* Decorative gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-transparent to-brand-100/50 dark:from-brand-900/20 dark:via-transparent dark:to-brand-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Content */}
            <div className="relative z-10 p-8">
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-brand-500 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-300">
                      {exp.company}
                    </h2>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-lg font-semibold text-brand-600 dark:text-brand-400">
                      {exp.role}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {exp.location}
                    </p>
                  </div>
                </div>
                
                {/* Timeline */}
                <div className="flex-shrink-0">
                  <div className="bg-gradient-to-r from-brand-100 to-brand-50 dark:from-brand-900/30 dark:to-brand-800/30 rounded-xl px-4 py-3 border border-brand-200 dark:border-brand-800">
                    <p className="text-sm font-medium text-brand-700 dark:text-brand-300 flex items-center gap-2">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDateRange(exp.period.from, exp.period.to)}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Overview */}
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-lg">
                {exp.overview}
              </p>
              
              {/* Tech Stack Preview */}
              {exp.stack && exp.stack.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {exp.stack.slice(0, 4).map((tech) => (
                    <span key={tech} className="px-3 py-1 text-xs font-medium bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300 rounded-full border border-brand-200 dark:border-brand-800">
                      {tech}
                    </span>
                  ))}
                  {exp.stack.length > 4 && (
                    <span className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                      +{exp.stack.length - 4} more
                    </span>
                  )}
                </div>
              )}
              
              {/* Highlights Preview */}
              {exp.highlights && exp.highlights.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4 text-brand-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                    Key Highlights
                  </h3>
                  <div className="space-y-2">
                    {exp.highlights.slice(0, 2).map((highlight, idx) => (
                      <p key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                        <span className="text-brand-500 flex-shrink-0 mt-0.5">•</span>
                        {highlight}
                      </p>
                    ))}
                    {exp.highlights.length > 2 && (
                      <p className="text-sm text-gray-500 dark:text-gray-500 italic">
                        +{exp.highlights.length - 2} more achievements
                      </p>
                    )}
                  </div>
                </div>
              )}
              
              {/* Action */}
              <Link 
                href={`/experience/${exp.slug}`} 
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/25 group-hover:scale-105"
              >
                <span>View Details</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
