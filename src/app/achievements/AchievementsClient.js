'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

// Category Badge Component
function CategoryBadge({ category }) {
  const getBadgeStyle = (cat) => {
    switch (cat) {
      case 'Award':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700';
      case 'Challenge':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-700';
      case 'Certification':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full border ${getBadgeStyle(category)}`}>
      {category}
    </span>
  );
}

// Achievement Card Component
function AchievementCard({ achievement }) {
  const getCardAccent = (color) => {
    const colors = {
      gold: 'border-l-yellow-500 hover:border-l-yellow-600',
      blue: 'border-l-blue-500 hover:border-l-blue-600',
      orange: 'border-l-orange-500 hover:border-l-orange-600',
      purple: 'border-l-purple-500 hover:border-l-purple-600',
      green: 'border-l-green-500 hover:border-l-green-600'
    };
    return colors[color] || 'border-l-gray-500';
  };

  return (
    <article className={`group relative bg-white dark:bg-gray-800 rounded-xl border-l-4 ${getCardAccent(achievement.color)} border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden`}>
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 via-transparent to-transparent dark:from-brand-900/10 dark:via-transparent dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="text-4xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
              {achievement.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <CategoryBadge category={achievement.category} />
                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  {achievement.year}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2 mb-2">
                {achievement.name}
              </h2>
            </div>
          </div>
        </div>

        {/* Summary */}
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4 line-clamp-3">
          {achievement.summary}
        </p>

        {/* Metrics */}
        {achievement.metrics && achievement.metrics.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {achievement.metrics.slice(0, 3).map((metric, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-50 dark:bg-gray-900/50 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium border border-gray-200 dark:border-gray-700"
                >
                  <svg className="w-3 h-3 text-brand-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {metric}
                </span>
              ))}
              {achievement.metrics.length > 3 && (
                <span className="inline-flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
                  +{achievement.metrics.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Tags */}
        {achievement.tags && achievement.tags.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1.5">
              {achievement.tags.slice(0, 4).map((tag) => (
                <span 
                  key={tag}
                  className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                >
                  {tag}
                </span>
              ))}
              {achievement.tags.length > 4 && (
                <span className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                  +{achievement.tags.length - 4}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
          <Link
            href={`/achievements/${achievement.slug}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-all text-sm group/btn"
          >
            <span>View Details</span>
            <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          {/* External links */}
          {(achievement.links?.official || achievement.links?.profile || achievement.links?.google_patents) && (
            <a
              href={achievement.links.official || achievement.links.profile || achievement.links.google_patents}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              title="External Link"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>View</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function AchievementsClient({ achievements }) {
  const [activeFilter, setActiveFilter] = useState('All');

  // Group achievements by category
  const groupedAchievements = useMemo(() => {
    const groups = {
      'All': achievements,
      'Awards & Recognition': achievements.filter(a => a.category === 'Award'),
      'Coding Challenges': achievements.filter(a => a.category === 'Challenge'),
      'Certifications': achievements.filter(a => a.category === 'Certification')
    };
    return groups;
  }, [achievements]);

  const filteredAchievements = groupedAchievements[activeFilter] || [];
  const filters = Object.keys(groupedAchievements).filter(key => groupedAchievements[key].length > 0);

  return (
    <section className="py-8 space-y-10">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black p-8 text-gray-900 dark:text-white shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-500/10 dark:from-brand-500/20 to-transparent"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-500/5 dark:bg-yellow-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500/10 dark:bg-brand-500/20 rounded-full border border-brand-400/20 dark:border-brand-400/30 mb-4">
            <svg className="w-4 h-4 text-brand-600 dark:text-brand-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-brand-700 dark:text-brand-200 text-sm font-medium">Milestones & Recognition</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 dark:from-white dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
            Achievements & Challenges
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            A collection of <span className="text-brand-600 dark:text-brand-400 font-semibold">awards</span>, 
            <span className="text-brand-600 dark:text-brand-400 font-semibold"> personal challenges</span>, and 
            <span className="text-brand-600 dark:text-brand-400 font-semibold"> professional milestones</span> that showcase 
            dedication, innovation, and continuous growth.
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-brand-500 to-brand-600 rounded-full"></div>
            Browse Achievements
          </h2>
          <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full">
            {filteredAchievements.length} achievement{filteredAchievements.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/25'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-brand-100 dark:hover:bg-brand-900/50 hover:text-brand-700 dark:hover:text-brand-300'
              }`}
            >
              {filter} {filter !== 'All' && `(${groupedAchievements[filter].length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Achievements Grid */}
      {filteredAchievements.length > 0 ? (
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredAchievements.map((achievement) => (
            <AchievementCard key={achievement.slug} achievement={achievement} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
            No achievements found in this category
          </p>
        </div>
      )}
    </section>
  );
}

