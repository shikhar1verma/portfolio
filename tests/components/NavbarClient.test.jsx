import { render, screen, fireEvent } from '@testing-library/react';
import NavbarClient from '@/components/NavbarClient';

const site = {
  title: 'My Site',
  navOrder: ['home', 'projects', 'contact'],
};
const titles = { home: 'Home', projects: 'Projects', contact: 'Contact' };

describe('NavbarClient', () => {
  test('renders site title and nav items (desktop)', () => {
    render(<NavbarClient site={site} titles={titles} />);
    expect(screen.getByText('My Site')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  test('toggles mobile menu', () => {
    render(<NavbarClient site={site} titles={titles} />);
    const toggleBtn = screen.getByRole('button', { name: /toggle menu/i });
    fireEvent.click(toggleBtn); // open
    expect(screen.getAllByText(/Home|Projects|Contact/).length).toBeGreaterThan(0);
    fireEvent.click(toggleBtn); // close
  });
}); 