const dateFormat = require('../../../lib/dateFormat');

describe('dateFormat', () => {
  test('formats yyyy-mm-dd to short month and year', () => {
    // Use a fixed date string to avoid TZ flakiness
    const out = dateFormat('2022-01-15T00:00:00.000Z');
    expect(out).toMatch(/Jan\s+2022|2022\s+Jan/);
  });

  test('handles Date objects', () => {
    const d = new Date('2023-07-10T00:00:00.000Z');
    const out = dateFormat(d);
    expect(out).toMatch(/Jul\s+2023|2023\s+Jul/);
  });
}); 