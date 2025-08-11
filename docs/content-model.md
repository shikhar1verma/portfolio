### Content model

All editable data lives under `content/` as JSON. Below are the expected shapes and where each file is used.

#### site.json
Used by `src/app/layout.js` and `src/components/Navbar.js`.
```json
{
  "title": "Your Name",
  "description": "Short site description",
  "navOrder": ["home", "about", "experience", "projects", "skills", "contact"]
}
```

#### profile.json
Used by `src/app/page.js`.
```json
{
  "name": "Your Name",
  "avatar": "/avatar.jpg",
  "tagline": "Job title or tagline",
  "about": "Short bio paragraph.",
  "social": {
    "github": "https://github.com/you",
    "linkedin": "https://www.linkedin.com/in/you",
    "twitter": "https://twitter.com/you"
  }
}
```

#### projects.json
Used by `src/app/projects/page.js` and `src/app/projects/[slug]/page.js`.
```json
[
  {
    "slug": "my-project",
    "name": "My Project",
    "summary": "One‑line summary.",
    "links": { "live": "https://example.com", "caseStudy": "/case-study" },
    "technologies": ["Next.js", "Tailwind CSS"]
  }
]
```

#### experience.json
Used by `src/app/experience/page.js` and `src/app/experience/[slug]/page.js`.
```json
[
  {
    "slug": "acme-inc",
    "company": "Acme Inc.",
    "role": "Senior Engineer",
    "period": { "from": "Jan 2022", "to": "Present" },
    "overview": "Lead developer on X.",
    "highlights": ["Shipped Y", "Improved Z"],
    "stack": ["Node.js", "React"]
  }
]
```

#### skills.json
Used by `src/app/skills/page.js`.
```json
{
  "languages": ["JavaScript", "TypeScript"],
  "frameworks": ["Next.js", "React"],
  "tools": ["Jest", "ESLint", "Prettier"]
}
```

#### education.json
Used by `src/app/about/page.js`.
```json
[
  {
    "institution": "University",
    "degree": "B.Tech",
    "period": { "from": "2018", "to": "2022" }
  }
]
```

Notes
- Slugs must be unique, lowercase, and URL-safe. See `lib/slugify.js` for the transformation.
- Keep arrays small to ensure fast static generation. 