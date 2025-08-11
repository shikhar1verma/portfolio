import fs from 'fs/promises';
import path from 'path';

import * as experiencePage from '@/app/experience/[slug]/page';

jest.mock('fs/promises');

describe('experience generateStaticParams', () => {
  test('returns slugs from content/experience.json', async () => {
    const mockExperiences = [
      { slug: 'acme', company: 'Acme' },
      { slug: 'globex', company: 'Globex' },
    ];
    fs.readFile.mockResolvedValueOnce(JSON.stringify(mockExperiences));

    const params = await experiencePage.generateStaticParams();
    expect(params).toEqual([{ slug: 'acme' }, { slug: 'globex' }]);
    expect(fs.readFile).toHaveBeenCalledWith(
      path.join(process.cwd(), 'content/experience.json'),
      'utf8'
    );
  });
}); 