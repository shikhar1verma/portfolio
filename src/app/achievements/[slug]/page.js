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
  
  const getIconColor = (color) => {
    const colors = {
      gold: 'from-yellow-500 to-orange-500',
      blue: 'from-blue-500 to-cyan-500',
      orange: 'from-orange-500 to-red-500',
      purple: 'from-purple-500 to-pink-500',
      green: 'from-green-500 to-emerald-500'
    };
    return colors[color] || 'from-gray-500 to-gray-700';
  };

  return (
    <article className="py-8 space-y-8 max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black p-8 shadow-xl border border-gray-200 dark:border-gray-700">
        <div className="absolute inset-0 opacity-10">
          <div className={`absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br ${getIconColor(achievement.color)} rounded-full blur-3xl`}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-start gap-4 mb-4">
            <div className="text-6xl">{achievement.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full ${
                  achievement.category === 'Award' 
                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-700'
                    : achievement.category === 'Challenge'
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-700'
                    : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-700'
                }`}>
                  {achievement.category}
                </span>
                <span className="text-sm font-bold text-brand-600 dark:text-brand-400">
                  {achievement.year}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                {achievement.name}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {achievement.summary}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      {achievement.metrics && achievement.metrics.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-brand-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
            </svg>
            Key Highlights
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {achievement.metrics.map((metric, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-brand-50 dark:bg-brand-900/20 rounded-lg border border-brand-200 dark:border-brand-800">
                <div className="flex-shrink-0 w-2 h-2 bg-brand-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{metric}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full Description */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About This Achievement</h2>
        <div className="prose dark:prose-invert prose-brand max-w-none">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {achievement.description}
          </p>
        </div>
      </div>

      {/* Challenge Details */}
      {achievement.challenge_details && (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 shadow-md border border-purple-200 dark:border-purple-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            Challenge Details
          </h2>
          <dl className="grid sm:grid-cols-2 gap-4">
            {Object.entries(achievement.challenge_details).map(([key, value]) => (
              <div key={key}>
                <dt className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                  {key.replace(/_/g, ' ')}
                </dt>
                <dd className="mt-1 text-base font-semibold text-gray-900 dark:text-white">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {/* Patent Details */}
      {achievement.patent_details && (
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 shadow-md border border-blue-200 dark:border-blue-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
            Patent Information
          </h2>
          <div className="space-y-3">
            <div>
              <dt className="text-sm font-medium text-gray-600 dark:text-gray-400">Application Number</dt>
              <dd className="mt-1 text-base font-mono font-semibold text-gray-900 dark:text-white">
                {achievement.patent_details.application_number}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-600 dark:text-gray-400">Title</dt>
              <dd className="mt-1 text-base font-semibold text-gray-900 dark:text-white">
                {achievement.patent_details.title}
              </dd>
            </div>
            {achievement.patent_details.abstract && (
              <div>
                <dt className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Abstract</dt>
                <dd className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                  {achievement.patent_details.abstract}
                </dd>
              </div>
            )}
            <div>
              <dt className="text-sm font-medium text-gray-600 dark:text-gray-400">Jurisdiction</dt>
              <dd className="mt-1 text-base font-semibold text-gray-900 dark:text-white">
                {achievement.patent_details.jurisdiction}
              </dd>
            </div>
          </div>
        </div>
      )}

      {/* Tags */}
      {achievement.tags && achievement.tags.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Related Topics</h2>
          <div className="flex flex-wrap gap-2">
            {achievement.tags.map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1.5 text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-brand-100 dark:hover:bg-brand-900/50 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* External Links */}
      {achievement.links && Object.keys(achievement.links).length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            Explore Resources
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {achievement.links.official && (
              <a 
                href={achievement.links.official}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 transition-all group"
              >
                <svg className="w-5 h-5 text-brand-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">Official Website</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate">edisonawards.com</div>
                </div>
              </a>
            )}
            {achievement.links.official_wayback && (
              <a 
                href={achievement.links.official_wayback}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 transition-all group"
              >
                <svg className="w-5 h-5 text-brand-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">2019 Winners Archive</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate">web.archive.org</div>
                </div>
              </a>
            )}
            {achievement.links.certificate && (
              <a 
                href={achievement.links.certificate}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 transition-all group"
              >
                <svg className="w-5 h-5 text-brand-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">View Certificate</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate">Official certification</div>
                </div>
              </a>
            )}
            {achievement.links.course && (
              <a 
                href={achievement.links.course}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 transition-all group"
              >
                <svg className="w-5 h-5 text-brand-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">View Course</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate">Course details & curriculum</div>
                </div>
              </a>
            )}
            {achievement.links.google_patents && (
              <a 
                href={achievement.links.google_patents}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 transition-all group"
              >
                <svg className="w-5 h-5 text-brand-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">View on Google Patents</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate">patents.google.com</div>
                </div>
              </a>
            )}
            {achievement.links.profile && (
              <a 
                href={achievement.links.profile}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 transition-all group"
              >
                <svg className="w-5 h-5 text-brand-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">View Profile</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate">LeetCode Profile</div>
                </div>
              </a>
            )}
            {achievement.links.video && (
              <a 
                href={achievement.links.video}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 transition-all group"
              >
                <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">Watch Demo Video</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate">YouTube</div>
                </div>
              </a>
            )}
            {achievement.links.tool && (
              <a 
                href={achievement.links.tool}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 transition-all group"
              >
                <svg className="w-5 h-5 text-brand-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">Try the Tool</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate">greyb.com/catalyst</div>
                </div>
              </a>
            )}
            {achievement.links.completion_post && (
              <a 
                href={achievement.links.completion_post}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 transition-all group"
              >
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">LinkedIn Post</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate">Completion announcement</div>
                </div>
              </a>
            )}
          </div>
        </div>
      )}
    </article>
  );
} 