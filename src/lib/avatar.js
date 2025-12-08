import fs from 'fs';
import path from 'path';

/**
 * Detects which avatar file exists in the public directory
 * Checks for avatar.jpg first, then avatar.png
 * @returns {string} The path to the avatar file (e.g., '/avatar.jpg' or '/avatar.png')
 */
export function getAvatarPath() {
  const publicDir = path.join(process.cwd(), 'public');
  const extensions = ['jpg', 'png'];
  
  for (const ext of extensions) {
    const avatarPath = path.join(publicDir, `avatar.${ext}`);
    if (fs.existsSync(avatarPath)) {
      return `/avatar.${ext}`;
    }
  }
  
  // Fallback to jpg if neither exists
  return '/avatar.jpg';
}

/**
 * Processes profile data and ensures the avatar path points to an existing file
 * @param {Object} profile - The profile object from profile.json
 * @returns {Object} The profile object with updated avatar path
 */
export function processProfileAvatar(profile) {
  if (!profile) return profile;
  
  return {
    ...profile,
    avatar: getAvatarPath()
  };
}
