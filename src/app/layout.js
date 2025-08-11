import '@/styles/global.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import fs from 'fs/promises';
import path from 'path';
import VersionCheck from '@/components/VersionCheck';

export async function generateMetadata() {
  const data = await fs.readFile(path.join(process.cwd(), 'content/site.json'), 'utf8');
  const site = JSON.parse(data);
  return {
    title: site.title,
    description: site.description,
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors">
        <Navbar />
        <main className="flex-grow container mx-auto px-4">{children}</main>
        <Footer />
        <VersionCheck />
      </body>
    </html>
  );
}
