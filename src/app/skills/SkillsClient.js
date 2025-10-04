'use client';

import { useState } from 'react';

// Skill Badge Component
function SkillBadge({ skill, compact = false }) {
  const getProficiencyColor = (level) => {
    switch (level) {
      case 'expert':
        return 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300';
      case 'advanced':
        return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300';
      case 'intermediate':
        return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300';
      case 'beginner':
        return 'border-gray-400 bg-gray-50 dark:bg-gray-700/20 text-gray-600 dark:text-gray-400';
      default:
        return 'border-gray-300 bg-gray-50 dark:bg-gray-700/20 text-gray-700 dark:text-gray-300';
    }
  };

  if (compact) {
    return (
      <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border-2 transition-all duration-200 hover:scale-105 ${getProficiencyColor(skill.proficiency)}`}>
        {skill.name}
      </span>
    );
  }

  return (
    <div className={`group relative flex flex-col p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${getProficiencyColor(skill.proficiency)}`}>
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-sm flex-1">{skill.name}</h4>
        {skill.proficiency === 'expert' && (
          <span className="text-xs px-2 py-0.5 bg-green-600 text-white rounded-full font-bold">★</span>
        )}
      </div>
      
      {skill.projects && skill.projects.length > 0 && (
        <div className="mt-2">
          <p className="text-xs opacity-70 mb-1">Used in:</p>
          <div className="flex flex-wrap gap-1">
            {skill.projects.slice(0, 2).map((project, idx) => (
              <span key={idx} className="text-xs px-2 py-0.5 bg-white/50 dark:bg-black/20 rounded">
                {project}
              </span>
            ))}
            {skill.projects.length > 2 && (
              <span className="text-xs px-2 py-0.5 bg-white/50 dark:bg-black/20 rounded">
                +{skill.projects.length - 2}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Category Section Component
function CategorySection({ category, data, isCore = false }) {
  return (
    <div className={`${isCore ? 'mb-12' : 'mb-8'}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`text-4xl ${isCore ? 'animate-pulse' : ''}`}>{data.icon}</div>
        <div>
          <h2 className={`${isCore ? 'text-3xl' : 'text-2xl'} font-bold text-gray-900 dark:text-white`}>
            {data.name}
          </h2>
          {isCore && (
            <p className="text-sm text-brand-600 dark:text-brand-400 font-medium">Core Expertise</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {data.skills.map((skill, idx) => (
          <SkillBadge key={idx} skill={skill} />
        ))}
      </div>
    </div>
  );
}

export default function SkillsClient({ skills }) {
  const [activeTab, setActiveTab] = useState('all');

  // Extract core expertise categories
  const coreExpertise = skills.core_expertise || {};
  const otherCategories = Object.entries(skills)
    .filter(([key]) => key !== 'core_expertise')
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  // Get all unique proficiency levels for legend
  const allSkills = [];
  Object.values(coreExpertise).forEach(cat => {
    if (cat.skills) allSkills.push(...cat.skills);
  });
  Object.values(otherCategories).forEach(cat => {
    if (cat.skills) allSkills.push(...cat.skills);
  });

  const expertCount = allSkills.filter(s => s.proficiency === 'expert').length;
  const advancedCount = allSkills.filter(s => s.proficiency === 'advanced').length;

  return (
    <section className="py-8 space-y-10">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black p-8 text-gray-900 dark:text-white shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-500/10 dark:from-brand-500/20 to-transparent"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-green-500/5 dark:bg-green-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500/10 dark:bg-brand-500/20 rounded-full border border-brand-400/20 dark:border-brand-400/30 mb-4">
            <svg className="w-4 h-4 text-brand-600 dark:text-brand-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span className="text-brand-700 dark:text-brand-200 text-sm font-medium">Technical Expertise</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 dark:from-white dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
            Skills & Technologies
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed mb-6">
            Comprehensive technical skills built through <span className="text-brand-600 dark:text-brand-400 font-semibold">production experience</span>, 
            <span className="text-brand-600 dark:text-brand-400 font-semibold"> real-world projects</span>, and 
            <span className="text-brand-600 dark:text-brand-400 font-semibold"> continuous learning</span>
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 flex-wrap">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{expertCount}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Expert Level</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{advancedCount}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Advanced</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{allSkills.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Skills</div>
            </div>
          </div>
        </div>
      </div>

      {/* Proficiency Legend */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <svg className="w-4 h-4 text-brand-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Proficiency Guide
        </h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border-2 border-green-500 bg-green-50 dark:bg-green-900/20"></div>
            <span className="text-sm text-gray-700 dark:text-gray-300"><span className="font-semibold">Expert:</span> Production-proven, years of experience</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20"></div>
            <span className="text-sm text-gray-700 dark:text-gray-300"><span className="font-semibold">Advanced:</span> Strong proficiency, multiple projects</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border-2 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"></div>
            <span className="text-sm text-gray-700 dark:text-gray-300"><span className="font-semibold">Intermediate:</span> Working knowledge, practical experience</span>
          </div>
        </div>
      </div>

      {/* Core Expertise Section */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 h-1 bg-gradient-to-r from-brand-500 to-transparent rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Core Expertise</h2>
          <div className="flex-1 h-1 bg-gradient-to-l from-brand-500 to-transparent rounded-full"></div>
        </div>

        <div className="space-y-10">
          {Object.entries(coreExpertise).map(([key, data]) => (
            <CategorySection key={key} category={key} data={data} isCore={true} />
          ))}
        </div>
      </div>

      {/* Other Skills Section */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Additional Skills</h2>
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
        </div>

        <div className="space-y-10">
          {Object.entries(otherCategories).map(([key, data]) => (
            <CategorySection key={key} category={key} data={data} isCore={false} />
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-500 rounded-2xl p-8 text-white text-center shadow-xl">
        <h3 className="text-2xl font-bold mb-3">See These Skills in Action</h3>
        <p className="text-brand-100 mb-6 max-w-2xl mx-auto">
          Each skill listed here is backed by real-world projects, production experience, or professional certifications.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a 
            href="/projects" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-600 font-semibold rounded-lg hover:bg-gray-100 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            View Projects
          </a>
          <a 
            href="/experience" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all border border-white/20"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            View Experience
          </a>
        </div>
      </div>
    </section>
  );
}

