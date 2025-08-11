import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '@/components/ThemeToggle';

function hasDark() {
  return document.documentElement.classList.contains('dark');
}

describe('ThemeToggle', () => {
  test('toggles dark mode and persists', () => {
    localStorage.clear();
    render(<ThemeToggle />);

    const btn = screen.getByRole('button', { name: /toggle dark mode/i });
    const initial = hasDark();
    fireEvent.click(btn);
    expect(hasDark()).toBe(!initial);

    const saved = localStorage.getItem('theme');
    expect(saved === 'dark' || saved === 'light').toBe(true);
  });
}); 