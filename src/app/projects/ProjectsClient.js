'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import ProjectFilter from '../../components/ProjectFilter';
import ProjectImage from '../../components/ProjectImage';

// Project Type Badge Component
function ProjectBadge({ type }) {
  const getBadgeColor = (type) => {
    switch (type) {
      case 'AI/LLM':
        return 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      case 'Backend':
        return 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'Personal':
        return 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800';
      case 'Deployed':
        return 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
      case 'Enterprise':
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600';
      case 'Case Study':
        return 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';
      case 'Featured':
        return 'bg-gradient-to-r from-brand-500 to-brand-600 text-white border-brand-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-600';
    }
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getBadgeColor(type)}`}>
      {type}
    </span>
  );
}

// Compact Project Card Component - Optimized for better UX
function ProjectCard({ project }) {
  const isFeatured = project.featured || (project.type && project.type.includes('Featured'));
  
  return (
    <article className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-brand-400 dark:hover:border-brand-500 hover:-translate-y-1 flex flex-col h-full">
      {/* Project Media - Reduced height */}
      {(
        (project.media?.thumbnail && project.media.thumbnail.trim() !== '' && project.media.thumbnail !== null) ||
        (project.media?.demo_image && project.media.demo_image.trim() !== '' && project.media.demo_image !== null)
      ) && (
        <div className="relative h-40 overflow-hidden">
          <ProjectImage 
            media={project.media}
            projectName={project.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            priority={['thumbnail', 'demo_image']}
          />
          
          {/* Featured badge overlay */}
          {isFeatured && (
            <div className="absolute top-2 right-2 z-20">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Featured
              </span>
            </div>
          )}
          
          {/* Video play button */}
          {(project.media?.video_url && project.media.video_url.trim() !== '' && project.media.video_url !== null) && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <a 
                href={project.media.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/95 hover:bg-white text-gray-900 rounded-full p-2.5 transition-all duration-300 hover:scale-110"
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        </div>
      )}
      
      {/* Content - More compact */}
      <div className="relative flex flex-col flex-1 p-4">
        {/* Project Type Badges - Smaller */}
        {project.type && project.type.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.type.slice(0, 3).map((type) => (
              <ProjectBadge key={type} type={type} />
            ))}
            {project.type.length > 3 && (
              <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full border border-gray-200 dark:border-gray-600">
                +{project.type.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Title - Compact */}
        <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-300 mb-2 line-clamp-2">
          {project.name}
        </h2>

        {/* Summary - Limited lines */}
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3 line-clamp-2 flex-grow">
          {project.summary}
        </p>

        {/* Metrics - Inline Pills (More compact) */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1.5">
              {project.metrics.slice(0, 2).map((metric, index) => (
                <span key={index} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 rounded-full text-xs font-medium border border-brand-200 dark:border-brand-800">
                  <svg className="w-3 h-3 text-brand-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {metric}
                </span>
              ))}
              {project.metrics.length > 2 && (
                <span className="inline-flex items-center px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
                  +{project.metrics.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Technologies - Minimal */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 4).map((tech) => (
                <span key={tech} className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Actions - Compact row */}
        <div className="flex flex-wrap gap-2 mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
          {project.links?.live && (
            <a 
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-all text-xs"
              title="Live Demo"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live
            </a>
          )}
          
          {(project.links?.github && project.links.github.trim() !== '' && project.links.github !== null && project.links.github !== '#') && (
            <a 
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white font-medium rounded-lg transition-all text-xs"
              title="View on GitHub"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              Code
            </a>
          )}
          
          <Link 
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-all ml-auto text-xs"
          >
            Details
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function ProjectsClient({ projects }) {
  const [filteredProjects, setFilteredProjects] = useState(projects);

  // Extract impressive and truthful metrics from projects
  const portfolioHighlights = useMemo(() => {
    const highlights = [
      {
        icon: '🏗️',
        title: 'System Architecture',
        subtitle: 'Backend lead building scalable systems',
        color: 'from-blue-500 to-blue-600'
      },
      {
        icon: '🤖',
        title: 'AI/LLM Engineering',
        subtitle: 'Multi-agent systems & RAG platforms',
        color: 'from-purple-500 to-purple-600'
      },
      {
        icon: '🚀',
        title: 'Production Ready',
        subtitle: 'Live projects with real-world impact',
        color: 'from-green-500 to-green-600'
      },
      {
        icon: '⚡',
        title: 'Full-Stack Expertise',
        subtitle: 'Django, React, AI integration',
        color: 'from-orange-500 to-orange-600'
      }
    ];

    return highlights;
  }, []);

  const handleFilterChange = (filter) => {
    if (filter === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => 
        project.type && project.type.includes(filter)
      ));
    }
  };

  return (
    <section className="py-8 space-y-10">
      {/* Hero Section with Impact Highlights */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black p-8 text-gray-900 dark:text-white shadow-2xl border border-gray-200 dark:border-gray-700">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-500/10 dark:from-brand-500/20 to-transparent"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/5 dark:bg-brand-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500/10 dark:bg-brand-500/20 rounded-full border border-brand-400/20 dark:border-brand-400/30 mb-4">
              <svg className="w-4 h-4 text-brand-600 dark:text-brand-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <span className="text-brand-700 dark:text-brand-200 text-sm font-medium">Software Engineer Portfolio</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 dark:from-white dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
              Building Software Systems
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Backend lead specializing in <span className="text-brand-600 dark:text-brand-400 font-semibold">scalable architectures</span> and 
              <span className="text-brand-600 dark:text-brand-400 font-semibold"> AI/LLM integration</span>. 
              From Django-powered B2B platforms to innovative AI solutions.
            </p>
          </div>
          
          {/* Impact Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {portfolioHighlights.map((highlight, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden bg-white/70 dark:bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-500 hover:bg-white/90 dark:hover:bg-white/10 shadow-sm hover:shadow-md"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${highlight.color} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {highlight.icon}
                  </div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-brand-700 dark:group-hover:text-brand-200 transition-colors">
                    {highlight.title}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                    {highlight.subtitle}
                  </div>
                </div>
                
                {/* Subtle glow effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${highlight.color} rounded-xl blur opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-500 -z-10`}></div>
              </div>
            ))}
          </div>

          {/* Call to action */}
          <div className="text-center mt-8">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Explore detailed case studies and technical implementations below
            </p>
            <div className="flex justify-center mt-3">
              <svg className="w-5 h-5 text-gray-400 dark:text-gray-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-brand-500 to-brand-600 rounded-full"></div>
            Explore Projects
          </h2>
          <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} available
          </div>
        </div>
        
        <ProjectFilter projects={projects} onFilterChange={handleFilterChange} />
      </div>

      {/* Unified Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
            No projects found matching the selected filter
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
            Try selecting a different category
          </p>
        </div>
      )}
    </section>
  );
}
