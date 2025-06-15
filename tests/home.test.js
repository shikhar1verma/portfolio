const slugify = require('../lib/slugify');

test('slugify converts string', () => {
  expect(slugify('Hello World')).toBe('hello-world');
});
