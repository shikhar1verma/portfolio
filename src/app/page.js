import fs from 'fs/promises';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
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
  const title = profile?.name ? `${profile.name} · ${profile.tagline}` : 'Home';
  const description = profile?.about || 'Personal site';
  return { title, description, openGraph: { title, description }, twitter: { card: 'summary', title, description } };
}

async function getProfile() {
  return readJsonFallback('content/profile.json', 'content-sample/profile.json');
}

export default async function Home() {
  const profile = await getProfile();
  const about = renderAbout(profile);
  
  return (
    <section className="py-12 md:py-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black p-8 md:p-12 mb-12 shadow-2xl border border-gray-200 dark:border-gray-700">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
          {/* Avatar with enhanced styling */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-400 to-brand-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            <div className="relative ring-4 ring-white dark:ring-gray-800 rounded-full">
              <Image 
                src={profile.avatar} 
                alt={profile.name} 
                width={160} 
                height={160} 
                className="rounded-full" 
                style={{ height: 'auto', width: 'auto' }} 
                priority 
              />
            </div>
          </div>

          {/* Name and Tagline */}
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 dark:from-white dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
              {profile.name}
            </h1>
            <p className="text-xl md:text-2xl text-brand-600 dark:text-brand-400 font-medium">
              {profile.tagline}
            </p>
          </div>

          {/* About Text */}
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl text-lg leading-relaxed">
            {about}
          </p>

          {/* Resume Download Button */}
          <a 
            href="/resume.pdf" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/25 hover:scale-105"
            target="_blank" 
            rel="noopener noreferrer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Resume
          </a>
        </div>
      </div>

      {/* Social Links Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <div className="w-1 h-8 bg-gradient-to-b from-brand-500 to-brand-600 rounded-full"></div>
          Connect With Me
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* GitHub */}
          <a 
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-gray-900 dark:hover:border-gray-600"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent dark:from-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center group-hover:bg-gray-900 dark:group-hover:bg-gray-600 transition-colors duration-300">
                <svg className="w-6 h-6 text-gray-900 dark:text-white group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white transition-colors">GitHub</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">View my repositories</div>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>

          {/* LinkedIn */}
          <a 
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                <svg className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">LinkedIn</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">Connect professionally</div>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>

          {/* Twitter/X */}
          <a 
            href={profile.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-gray-900 dark:hover:border-gray-600"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent dark:from-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center group-hover:bg-gray-900 dark:group-hover:bg-gray-600 transition-colors duration-300">
                <svg className="w-6 h-6 text-gray-900 dark:text-white group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Twitter / X</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">Follow for updates</div>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link 
          href="/experience"
          className="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-brand-400 dark:hover:border-brand-500 text-center"
        >
          <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">💼</div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white">Experience</div>
        </Link>
        
        <Link 
          href="/projects"
          className="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-brand-400 dark:hover:border-brand-500 text-center"
        >
          <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">🚀</div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white">Projects</div>
        </Link>
        
        <Link 
          href="/achievements"
          className="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-brand-400 dark:hover:border-brand-500 text-center"
        >
          <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">🏆</div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white">Achievements</div>
        </Link>
        
        <Link 
          href="/skills"
          className="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-brand-400 dark:hover:border-brand-500 text-center"
        >
          <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">⚡</div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white">Skills</div>
        </Link>
      </div>
    </section>
  );
}
