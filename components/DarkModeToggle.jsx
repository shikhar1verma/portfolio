'use client';
import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [mounted, setMounted] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setMounted(true);
    setEnabled(localStorage.getItem('theme') === 'dark');
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (enabled) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [enabled, mounted]);

  if (!mounted) return null;

  return (
    <button onClick={() => setEnabled(!enabled)} className="p-2">
      {enabled ? 'Light' : 'Dark'}
    </button>
  );
}
