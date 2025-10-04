# Project Media Files

This directory contains media files for portfolio projects:

## Directory Structure
```
/public/images/projects/
├── project-slug/
│   ├── thumbnail.png          # Card thumbnail (recommended: 400x300px)
│   ├── demo.png              # Main demo image (recommended: 1200x800px)
│   ├── demo.gif              # Animated demo (recommended: max 2MB)
│   ├── screenshot-1.png      # Additional screenshots
│   ├── screenshot-2.png
│   └── ...
└── README.md
```

## File Naming Convention
- Use kebab-case for project slugs (e.g., `pqai`, `kpi-manager`)
- Use descriptive names for screenshots (e.g., `dashboard.png`, `search-results.png`)
- Keep file sizes reasonable (images < 500KB, GIFs < 2MB)

## Supported Formats
- **Images**: PNG, JPG, WebP
- **Animated**: GIF, WebP
- **Videos**: YouTube, Vimeo, or other external hosting (no local video files)

## Image Guidelines
- **Thumbnails**: 400x300px (4:3 aspect ratio)
- **Demo Images**: 1200x800px or 1920x1080px
- **Screenshots**: Variable, but maintain consistent aspect ratios
- Use high-quality images that showcase your work clearly
- Consider dark/light theme compatibility

## Usage in projects.json
```json
{
  "media": {
    "thumbnail": "/images/projects/project-slug/thumbnail.png",
    "demo_image": "/images/projects/project-slug/demo.png",
    "demo_gif": "/images/projects/project-slug/demo.gif",
    "video_url": "https://www.youtube.com/watch?v=...",
    "screenshots": [
      "/images/projects/project-slug/screenshot-1.png",
      "/images/projects/project-slug/screenshot-2.png"
    ]
  }
}
```
