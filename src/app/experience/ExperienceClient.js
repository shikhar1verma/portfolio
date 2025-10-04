'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { formatDateRange } from '../../../lib/dateFormat';

// Experience Card Component
function ExperienceCard({ exp }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-brand-400 dark:hover:border-brand-500">
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
  );
}

export default function ExperienceClient({ experiences }) {
  // Separate professional and training experiences
  const { professionalExp, trainingExp } = useMemo(() => {
    const professional = experiences.filter(exp => exp.type === 'professional');
    const training = experiences.filter(exp => exp.type === 'training');
    return { professionalExp: professional, trainingExp: training };
  }, [experiences]);

  // Calculate experience stats (only from professional experience)
  const experienceStats = useMemo(() => {
    const totalCompanies = professionalExp.length;
    
    // Count unique technologies (only from professional)
    const allTech = new Set();
    professionalExp.forEach(exp => {
      if (exp.stack) {
        exp.stack.forEach(tech => allTech.add(tech));
      }
    });
    
    // Count total highlights (only from professional)
    const totalAchievements = professionalExp.reduce((sum, exp) => {
      return sum + (exp.highlights ? exp.highlights.length : 0);
    }, 0);
    
    // Calculate years of professional experience only
    let totalYears = 0;
    professionalExp.forEach(exp => {
      if (exp.period && exp.period.from) {
        const fromDate = new Date(exp.period.from);
        const toDate = exp.period.to && exp.period.to.toLowerCase() === 'present' 
          ? new Date() 
          : new Date(exp.period.to);
        const diffYears = (toDate - fromDate) / (1000 * 60 * 60 * 24 * 365);
        totalYears += diffYears;
      }
    });
    
    return {
      companies: totalCompanies,
      technologies: allTech.size,
      achievements: totalAchievements,
      years: Math.round(totalYears * 10) / 10
    };
  }, [professionalExp]);

  return (
    <section className="py-8 space-y-10">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black p-8 text-gray-900 dark:text-white shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-500/10 dark:from-brand-500/20 to-transparent"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-500/5 dark:bg-brand-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500/10 dark:bg-brand-500/20 rounded-full border border-brand-400/20 dark:border-brand-400/30 mb-4">
              <svg className="w-4 h-4 text-brand-600 dark:text-brand-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>
              <span className="text-brand-700 dark:text-brand-200 text-sm font-medium">Professional Journey</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 dark:from-white dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
              Work Experience
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
              Building <span className="text-brand-600 dark:text-brand-400 font-semibold">scalable systems</span> and 
              <span className="text-brand-600 dark:text-brand-400 font-semibold"> leading backend architecture</span> with 
              measurable impact across enterprise platforms and innovative products
            </p>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/70 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-200/50 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">{experienceStats.years}+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Years Experience</div>
            </div>
            <div className="bg-white/70 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-200/50 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">{experienceStats.companies}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Companies</div>
            </div>
            <div className="bg-white/70 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-200/50 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">{experienceStats.achievements}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Key Achievements</div>
            </div>
            <div className="bg-white/70 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-200/50 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">{experienceStats.technologies}+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Technologies</div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Experience Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-gradient-to-b from-brand-500 to-brand-600 rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Professional Experience</h2>
        </div>
        
        <div className="space-y-6">
          {professionalExp.map((exp) => (
            <ExperienceCard key={exp.slug} exp={exp} />
          ))}
        </div>
      </div>

      {/* Training & Internships Section */}
      {trainingExp.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full"></div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Training & Internships</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Summer training programs & early learning experiences</p>
            </div>
          </div>
          
          <div className="space-y-6">
            {trainingExp.map((exp) => (
              <ExperienceCard key={exp.slug} exp={exp} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

