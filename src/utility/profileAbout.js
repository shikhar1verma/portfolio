export function computeExperienceYears(profile) {
  const { experience_started_at: experienceStartedAt, years_of_experience: yearsOfExperience } = profile || {};

  if (experienceStartedAt) {
    const start = new Date(experienceStartedAt);
    if (!isNaN(start.getTime())) {
      const now = new Date();
      const diffMs = now.getTime() - start.getTime();
      const years = diffMs / (1000 * 60 * 60 * 24 * 365.25);
      return Math.floor(years);
    }
  }

  if (typeof yearsOfExperience === 'number' && isFinite(yearsOfExperience)) {
    return yearsOfExperience;
  }

  return undefined;
}

export function renderAbout(profile) {
  const about = (profile && profile.about) || '';
  const years = computeExperienceYears(profile);

  // Only perform replacement if placeholder exists
  if (about.includes('{{experience_years}}')) {
    if (typeof years === 'number') {
      return about.replace(/\{\{\s*experience_years\s*\}\}/g, String(years));
    }
    // If placeholder present but we cannot compute, leave the original string as-is
    return about;
  }

  // No placeholder; return the original static about
  return about;
} 