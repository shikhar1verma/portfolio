const dateFormat = require('../lib/dateFormat');

test('formats ISO date string', () => {
  expect(dateFormat('2020-01-01')).toBe('Jan 2020');
});
