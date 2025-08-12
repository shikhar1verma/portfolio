import { computeExperienceYears, renderAbout } from '@/utility/profileAbout';

describe('profileAbout utilities', () => {
  beforeEach(() => {
    jest.useRealTimers();
  });

  test('computeExperienceYears prefers experience_started_at and floors the value', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-08-12T00:00:00.000Z'));

    const years = computeExperienceYears({ experience_started_at: '2019-06-01' });
    expect(years).toBeGreaterThanOrEqual(6);
    expect(years).toBeLessThan(7);
  });

  test('computeExperienceYears falls back to years_of_experience when start date missing/invalid', () => {
    const years = computeExperienceYears({ years_of_experience: 5 });
    expect(years).toBe(5);

    const yearsInvalid = computeExperienceYears({ experience_started_at: 'invalid-date', years_of_experience: 3 });
    expect(yearsInvalid).toBe(3);
  });

  test('renderAbout replaces placeholder when computable', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-01T00:00:00.000Z'));

    const about = renderAbout({ about: 'I have {{experience_years}} years of experience.', experience_started_at: '2020-01-01' });
    // 2020 -> 2024 floors to 4
    expect(about).toBe('I have 4 years of experience.');
  });

  test('renderAbout leaves string unchanged if placeholder exists but not computable', () => {
    const about = renderAbout({ about: 'I have {{experience_years}} years of experience.' });
    expect(about).toBe('I have {{experience_years}} years of experience.');
  });

  test('renderAbout returns original about when no placeholder', () => {
    const about = renderAbout({ about: 'Plain static text.' });
    expect(about).toBe('Plain static text.');
  });
}); 