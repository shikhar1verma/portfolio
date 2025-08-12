### Content model

All editable data lives under `content/` as JSON. Below are the expected shapes and where each file is used.

#### Required files
- `profile.json`: Powers Home, About, and Contact sections.
- `site.json`: Powers global site metadata and navigation order.

If a required file is missing, the app will fail to render correctly.

#### Optional files (tabs are shown only when the file exists)
- `projects.json` → `/projects`, `/projects/[slug]`
- `experience.json` → `/experience`, `/experience/[slug]`
- `achievements.json` → `/achievements`, `/achievements/[slug]`
- `skills.json` → `/skills`

The navbar automatically hides these tabs when their corresponding JSON file is absent.

#### site.json
Used by `src/app/layout.js` and `src/components/Navbar.js`.
```json
{
  "title": "Your Name",
  "description": "Short site description",
  "navOrder": ["home", "about", "experience", "projects", "achievements", "skills", "contact"]
}
```

#### profile.json
Used by `src/app/page.js` and `src/app/about/page.js`.
```json
{
  "name": "Your Name",
  "avatar": "/avatar.jpg",
  "tagline": "Job title or tagline",
  "about": "Short bio paragraph. You can include {{experience_years}} to auto-fill years.",
  "experience_started_at": "2019-06-01", // optional ISO date; preferred for dynamic years
  "years_of_experience": 6,                // optional number; used if start date missing/invalid
  "social": {
    "github": "https://github.com/you",
    "linkedin": "https://www.linkedin.com/in/you",
    "twitter": "https://twitter.com/you"
  }
}
```

Notes for `about` templating
- **Placeholder**: Use `{{experience_years}}` anywhere inside `about`. It will be replaced at build time.
- **Precedence**: If `experience_started_at` (ISO date) is provided, years are computed from that date to now (rounded down). Otherwise, `years_of_experience` is used if present. If neither is provided, the text is left unchanged.

#### achievements.json
Used by `src/app/achievements/page.js` and `src/app/achievements/[slug]/page.js`.
```json
[
  {
    "slug": "edison-award",
    "name": "Edison Award",
    "summary": "Recognized with the Edison Award for innovation.",
    "year": 2020,
    "links": { "external": "https://example.com/edison-award" },
    "description": "Optional long description."
  }
]
```

- **Fields**: `slug` (required, unique), `name` (required), `summary` (required), `year` (optional), `links.external` (optional), `description` (optional)
- **List page**: Cards like Projects with link to detail and optional external link.
- **Detail page**: Renders name, year, summary, description, and external link if provided.

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