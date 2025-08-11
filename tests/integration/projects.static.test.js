import fs from 'fs/promises';
import path from 'path';

// Import the module under test
import * as projectPage from '@/app/projects/[slug]/page';

jest.mock('fs/promises');

describe('projects generateStaticParams', () => {
  test('returns slugs from content/projects.json', async () => {
    const mockProjects = [
      { slug: 'alpha', name: 'Alpha' },
      { slug: 'beta', name: 'Beta' },
    ];
    fs.readFile.mockResolvedValueOnce(JSON.stringify(mockProjects));

    const params = await projectPage.generateStaticParams();
    expect(params).toEqual([{ slug: 'alpha' }, { slug: 'beta' }]);
    expect(fs.readFile).toHaveBeenCalledWith(
      path.join(process.cwd(), 'content/projects.json'),
      'utf8'
    );
  });
}); 