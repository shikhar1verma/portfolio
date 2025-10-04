'use client';

/**
 * Client Component for handling project images with fallback logic
 * This component handles the onError event which requires client-side JavaScript
 */
export default function ProjectImage({ 
  media, 
  projectName, 
  className = "w-full h-auto",
  priority = ['demo_gif', 'demo_image', 'thumbnail'],
  hideParentOnError = false 
}) {
  // Helper function to check if a media URL is valid
  const isValidMediaUrl = (url) => {
    return url && typeof url === 'string' && url.trim() !== '' && url !== null;
  };

  // Get the first available image source based on priority
  const getInitialSrc = () => {
    for (const type of priority) {
      if (isValidMediaUrl(media?.[type])) {
        return media[type];
      }
    }
    return null;
  };

  // Create error handler that tries fallbacks in order
  const handleImageError = (event) => {
    const img = event.target;
    const currentSrc = img.src;
    
    // Try each fallback in order
    for (const type of priority) {
      const fallbackSrc = media?.[type];
      if (isValidMediaUrl(fallbackSrc) && currentSrc !== fallbackSrc) {
        img.src = fallbackSrc;
        return;
      }
    }
    
    // All images failed - hide element based on configuration
    if (hideParentOnError && img.parentElement) {
      img.parentElement.style.display = 'none';
    } else {
      img.style.display = 'none';
    }
  };

  const initialSrc = getInitialSrc();
  
  // Don't render anything if no valid image source is available
  if (!initialSrc) {
    return null;
  }

  return (
    <img 
      src={initialSrc}
      alt={`${projectName} demo`}
      className={className}
      onError={handleImageError}
    />
  );
}
