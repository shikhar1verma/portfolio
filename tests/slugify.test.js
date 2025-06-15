const slugify = require('../lib/slugify');

test('slugify converts text to URL-friendly format', () => {
  expect(slugify('Hello World')).toBe('hello-world');
});
