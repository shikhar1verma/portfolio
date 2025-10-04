/**
 * Media validation and fallback utilities for project media
 */

/**
 * Checks if a media URL is valid and not empty
 * @param {string|null|undefined} url - The URL to validate
 * @returns {boolean} - True if URL is valid
 */
export function isValidMediaUrl(url) {
  return url && 
         typeof url === 'string' && 
         url.trim() !== '' && 
         url !== null && 
         url !== undefined &&
         url !== '#';
}

/**
 * Gets the best available image from media object with fallback priority
 * @param {object} media - The media object from project data
 * @returns {string|null} - The best available image URL or null
 */
export function getBestImage(media) {
  if (!media) return null;
  
  // Priority: demo_gif > demo_image > thumbnail
  if (isValidMediaUrl(media.demo_gif)) return media.demo_gif;
  if (isValidMediaUrl(media.demo_image)) return media.demo_image;
  if (isValidMediaUrl(media.thumbnail)) return media.thumbnail;
  
  return null;
}

/**
 * Checks if project has any valid media to display
 * @param {object} media - The media object from project data
 * @returns {boolean} - True if any media is available
 */
export function hasValidMedia(media) {
  if (!media) return false;
  
  return isValidMediaUrl(media.demo_gif) ||
         isValidMediaUrl(media.demo_image) ||
         isValidMediaUrl(media.thumbnail) ||
         isValidMediaUrl(media.video_url) ||
         hasValidScreenshots(media.screenshots);
}

/**
 * Checks if screenshots array has valid images
 * @param {array} screenshots - Array of screenshot URLs
 * @returns {boolean} - True if valid screenshots exist
 */
export function hasValidScreenshots(screenshots) {
  return Array.isArray(screenshots) && 
         screenshots.length > 0 && 
         screenshots.some(screenshot => isValidMediaUrl(screenshot));
}

/**
 * Filters out invalid screenshots from array
 * @param {array} screenshots - Array of screenshot URLs
 * @returns {array} - Filtered array of valid screenshots
 */
export function getValidScreenshots(screenshots) {
  if (!Array.isArray(screenshots)) return [];
  return screenshots.filter(screenshot => isValidMediaUrl(screenshot));
}

/**
 * Checks if a link is valid and not a placeholder
 * @param {string|null|undefined} link - The link to validate
 * @returns {boolean} - True if link is valid
 */
export function isValidLink(link) {
  return isValidMediaUrl(link); // Same validation logic
}

/**
 * Creates fallback image error handler
 * @param {object} media - The media object with fallback options
 * @param {function} onAllFailed - Callback when all images fail to load
 * @returns {function} - Error handler function
 */
export function createImageErrorHandler(media, onAllFailed) {
  return (event) => {
    const img = event.target;
    const currentSrc = img.src;
    
    // Try fallbacks in order
    if (currentSrc !== media.demo_image && isValidMediaUrl(media.demo_image)) {
      img.src = media.demo_image;
    } else if (currentSrc !== media.thumbnail && isValidMediaUrl(media.thumbnail)) {
      img.src = media.thumbnail;
    } else {
      // All images failed, hide the element
      if (onAllFailed) {
        onAllFailed(img);
      } else {
        img.style.display = 'none';
      }
    }
  };
}

/**
 * Default image error handler that hides the parent element
 */
export function hideParentOnError(event) {
  const img = event.target;
  if (img.parentElement) {
    img.parentElement.style.display = 'none';
  }
}

/**
 * Default image error handler that hides the image element
 */
export function hideImageOnError(event) {
  event.target.style.display = 'none';
}
