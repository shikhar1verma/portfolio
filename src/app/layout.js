import '@/styles/global.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import fs from 'fs/promises';
import path from 'path';
import VersionCheck from '@/components/VersionCheck';

export async function generateMetadata() {
  const data = await fs.readFile(path.join(process.cwd(), 'content/site.json'), 'utf8');
  const site = JSON.parse(data);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const title = site.title;
  const description = site.description;
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: title,
      images: ['/avatar.jpg'],
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    icons: {
      icon: '/favicon.ico',
    },
  };
}

export default function RootLayout({ children }) {
  const themeInit = `(() => { try { const ls = localStorage.getItem('theme'); let isDark; if (ls === 'dark') { isDark = true; } else if (ls === 'light') { isDark = false; } else { isDark = true; localStorage.setItem('theme','dark'); } if (isDark) document.documentElement.classList.add('dark'); else document.documentElement.classList.remove('dark'); } catch (_) {} })();`;
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors">
        <Navbar />
        <main className="flex-grow container mx-auto px-4">{children}</main>
        <Footer />
        <VersionCheck />
      </body>
    </html>
  );
}
