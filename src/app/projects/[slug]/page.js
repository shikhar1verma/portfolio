import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProjectImage from '../../../components/ProjectImage';

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
    const projects = await readJsonFallback('content/projects.json', 'content-sample/projects.json');
    return (Array.isArray(projects) ? projects : []).map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

async function getProject(slug) {
  try {
    const projects = await readJsonFallback('content/projects.json', 'content-sample/projects.json');
    return (Array.isArray(projects) ? projects : []).find((p) => p.slug === slug);
  } catch {
    return undefined;
  }
}

export async function generateMetadata({ params }) {
  const project = await getProject(params.slug);
  if (!project) return {};
  const title = project.name || 'Project';
  const description = project.summary || `Details about ${title}`;
  return { title, description, openGraph: { title, description }, twitter: { card: 'summary', title, description } };
}

export default async function ProjectPage({ params }) {
  const project = await getProject(params.slug);
  if (!project) return notFound();
  
  return (
    <article className="py-8 space-y-12">
      {/* Header Section */}
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
            {project.name}
          </h1>
          {project.oneLiner && (
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">
              {project.oneLiner}
            </p>
          )}
        </div>

        {/* Project Media Showcase - Only show if we have valid media */}
        {(
          (project.media?.demo_gif && project.media.demo_gif.trim() !== '' && project.media.demo_gif !== null) ||
          (project.media?.demo_image && project.media.demo_image.trim() !== '' && project.media.demo_image !== null) ||
          (project.media?.thumbnail && project.media.thumbnail.trim() !== '' && project.media.thumbnail !== null) ||
          (project.media?.video_url && project.media.video_url.trim() !== '' && project.media.video_url !== null)
        ) && (
          <div className="max-w-4xl mx-auto">
            {/* Show image/gif if available */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ProjectImage 
                media={project.media}
                projectName={project.name}
                className="w-full h-auto"
                priority={['demo_gif', 'demo_image', 'thumbnail']}
              />
            </div>
            
            {/* Video Section - Only show if video_url exists and is valid */}
            {(project.media?.video_url && project.media.video_url.trim() !== '' && project.media.video_url !== null) && (
              <div className="mt-6 text-center">
                <a 
                  href={project.media.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-600/25"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  <span>Watch Demo Video</span>
                </a>
              </div>
            )}
          </div>
        )}

        {/* Project Meta Information */}
        <div className="flex flex-wrap justify-center gap-6 p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl">
          <div className="text-center">
            <div className="font-semibold text-brand-600 dark:text-brand-400">Role</div>
            <div className="text-gray-800 dark:text-gray-200">{project.role}</div>
          </div>
          {project.duration && (
            <div className="text-center">
              <div className="font-semibold text-brand-600 dark:text-brand-400">Duration</div>
              <div className="text-gray-800 dark:text-gray-200">{project.duration}</div>
            </div>
          )}
          {project.type && project.type.length > 0 && (
            <div className="text-center">
              <div className="font-semibold text-brand-600 dark:text-brand-400">Category</div>
              <div className="flex flex-wrap gap-1 justify-center">
                {project.type.map((type, index) => (
                  <span key={type} className="text-gray-800 dark:text-gray-200">
                    {type}{index < project.type.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-4">
          {project.links?.live && (
            <a 
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>Live Demo</span>
            </a>
          )}
          {(project.links?.github && project.links.github.trim() !== '' && project.links.github !== null && project.links.github !== '#') && (
            <a 
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              <span>GitHub</span>
            </a>
          )}
          {project.links?.caseStudy && (
            <Link 
              href={project.links.caseStudy}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/25"
            >
              <span>Related Case Study</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          )}
        </div>
      </div>

      {/* Impact & Results */}
      {project.metrics && project.metrics.length > 0 && (
        <section className="bg-gradient-to-br from-brand-50 to-brand-100/50 dark:from-brand-900/20 dark:to-brand-800/20 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
              </svg>
            </div>
            Impact & Results
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {project.metrics.map((metric, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-brand-200 dark:border-brand-800">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-brand-500 rounded-full flex-shrink-0"></div>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{metric}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Case Study Sections */}
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Problem */}
        {project.problem && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
                <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              The Problem
            </h2>
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl border-l-4 border-red-500">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{project.problem}</p>
            </div>
          </section>
        )}

        {/* Solution */}
        {project.solution && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              The Solution
            </h2>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border-l-4 border-blue-500">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{project.solution}</p>
            </div>
          </section>
        )}
      </div>

      {/* Results */}
      {project.results && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            The Results
          </h2>
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border-l-4 border-green-500">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{project.results}</p>
          </div>
        </section>
      )}

      {/* Challenges */}
      {project.challenges && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-yellow-100 dark:bg-yellow-900/50 flex items-center justify-center">
              <svg className="w-4 h-4 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            Technical Challenges
          </h2>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl border-l-4 border-yellow-500">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{project.challenges}</p>
          </div>
        </section>
      )}

      {/* Screenshots Gallery - Only show if we have valid screenshots */}
      {project.media?.screenshots && 
       Array.isArray(project.media.screenshots) && 
       project.media.screenshots.length > 0 && 
       project.media.screenshots.some(screenshot => screenshot && screenshot.trim() !== '' && screenshot !== null) && (
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
              <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            Screenshots & Gallery
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {project.media.screenshots
              .filter(screenshot => screenshot && screenshot.trim() !== '' && screenshot !== null)
              .map((screenshot, index) => (
                <div key={index} className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <ProjectImage 
                    media={{ demo_image: screenshot }}
                    projectName={`${project.name} screenshot ${index + 1}`}
                    className="w-full h-auto hover:scale-105 transition-transform duration-300"
                    priority={['demo_image']}
                    hideParentOnError={true}
                  />
                </div>
              ))}
          </div>
        </section>
      )}

      {/* Technologies */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          Technologies & Stack
        </h2>
        <div className="flex flex-wrap gap-3">
          {project.technologies?.map((tech) => (
            <span 
              key={tech} 
              className="px-4 py-2 bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300 rounded-lg font-medium border border-brand-200 dark:border-brand-800 hover:scale-105 transition-transform duration-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Back to Projects */}
      <div className="text-center pt-8 border-t border-gray-200 dark:border-gray-700">
        <Link 
          href="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Projects</span>
        </Link>
      </div>
    </article>
  );
}
