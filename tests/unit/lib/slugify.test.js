const slugify = require('../../../lib/slugify');

describe('slugify', () => {
  test('converts spaces to hyphens and lowercases', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  test('removes non-alphanumeric characters except hyphens', () => {
    expect(slugify('React & Next.js! 101')).toBe('react-nextjs-101');
  });

  test('handles multiple spaces', () => {
    expect(slugify('  Many   Spaces  ')).toBe('many-spaces');
  });
}); 