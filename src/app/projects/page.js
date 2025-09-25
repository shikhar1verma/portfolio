import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';

export async function generateMetadata() {
  return { title: 'Projects', description: 'Selected projects and case studies.' };
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

async function getProjects() {
  try {
    return await readJsonFallback('content/projects.json', 'content-sample/projects.json');
  } catch {
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  if (!projects.length) {
    return (
      <section className="py-8 space-y-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <p>No projects to display.</p>
      </section>
    );
  }
  return (
    <section className="py-8 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent mb-2">
          Projects
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Showcasing innovative solutions and technical expertise across various domains
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <article key={project.slug} className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-brand-400 dark:hover:border-brand-500 hover:-translate-y-1">
            {/* Decorative gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-transparent to-brand-100/50 dark:from-brand-900/20 dark:via-transparent dark:to-brand-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Content */}
            <div className="relative z-10 p-6">
              {/* Header */}
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-300">
                      {project.name}
                    </h2>
                    {project.role && (
                      <p className="text-sm font-medium text-brand-600 dark:text-brand-400">
                        {project.role}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Summary */}
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 line-clamp-3">
                {project.summary}
              </p>
              
              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <svg className="w-3 h-3 text-brand-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span key={tech} className="px-2.5 py-1 text-xs font-medium bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300 rounded-full border border-brand-200 dark:border-brand-800 hover:scale-105 transition-transform duration-200">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                        +{project.technologies.length - 5}
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              {/* Links */}
              <div className="flex flex-col gap-3">
                {project.links?.live && (
                  <a 
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span>Live Demo</span>
                  </a>
                )}
                
                <Link 
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/25 group-hover:scale-105 text-sm"
                >
                  <span>View Details</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
