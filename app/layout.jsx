import '../styles/global.css';
import DarkModeToggle from '../components/DarkModeToggle';

export const metadata = {
  title: 'portfolio',
  description: 'My portfolio website'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <header className="p-4 flex justify-end">
          <DarkModeToggle />
        </header>
        {children}
      </body>
    </html>
  );
}
