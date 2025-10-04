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
  const title = 'About - Shikhar Verma';
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
  const about = renderAbout(profile);
  
  return (
    <section className="py-8 space-y-10">
      {/* Profile Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-400 to-brand-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative ring-4 ring-white dark:ring-gray-800 rounded-full">
                  <Image 
                    src={profile.avatar} 
                    alt={profile.name} 
                    width={160} 
                    height={160} 
                    className="rounded-full" 
                  />
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 dark:from-white dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent mb-2">
                  {profile.name}
                </h1>
                <p className="text-lg text-brand-600 dark:text-brand-400 font-medium mb-4">
                  {profile.tagline}
                </p>
              </div>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {about}
              </p>

              {/* Location */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 dark:bg-white/5 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-white/10">
                <svg className="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{profile.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <div className="w-1 h-8 bg-gradient-to-b from-brand-500 to-brand-600 rounded-full"></div>
          Contact Information
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Email Card */}
          <a 
            href={`mailto:${profile.email}`}
            className="group relative overflow-hidden bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-brand-400 dark:hover:border-brand-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-transparent dark:from-brand-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-100 dark:bg-brand-900/50 rounded-lg flex items-center justify-center group-hover:bg-brand-600 transition-colors duration-300">
                <svg className="w-6 h-6 text-brand-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">Email</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 truncate">{profile.email}</div>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>

          {/* Social Links Grid */}
          <div className="grid grid-cols-3 gap-3">
            {/* GitHub */}
            <a 
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-gray-900 dark:hover:border-gray-600"
              title="GitHub"
            >
              <svg className="w-8 h-8 text-gray-900 dark:text-white mb-2 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
              </svg>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">GitHub</span>
            </a>

            {/* LinkedIn */}
            <a 
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-500"
              title="LinkedIn"
            >
              <svg className="w-8 h-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">LinkedIn</span>
            </a>

            {/* Twitter */}
            <a 
              href={profile.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-gray-900 dark:hover:border-gray-600"
              title="Twitter / X"
            >
              <svg className="w-8 h-8 text-gray-900 dark:text-white mb-2 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Twitter</span>
            </a>
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-gradient-to-b from-brand-500 to-brand-600 rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Education</h2>
        </div>
        
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
                      <div key={highlightIndex} className="flex items-start text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mr-2 flex-shrink-0 mt-1.5"></div>
                        <span className="text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
