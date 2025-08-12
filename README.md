# Portfolio Site Generator (Next.js 14 + Tailwind CSS)

A JSON‑driven portfolio scaffold built with Next.js App Router and Tailwind CSS. All copy and data live in `content/*.json`, so you can fork, edit JSON, and deploy quickly.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fshikhar1verma%2Fportfolio&project-name=portfolio&repository-name=portfolio)

> Tip: Fork this repo first so you can commit your own content, then click the button above.

### Highlights
- **JSON content**: edit `content/*.json` to update pages
- **Next.js App Router**: server components for data reading, static params for dynamic routes
- **Dark mode**: defaults to dark; users can toggle, preference saved to `localStorage`
- **Responsive UI**: Tailwind with a small custom color palette under `brand`
- **SEO**: app routes for `sitemap.xml` and `robots.txt`
- **Testing**: Jest + RTL

## Quick start
```bash
# 1) Fork and clone your fork, then:
npm install

# 2) Bootstrap sample content (optional but recommended for first run)
npm run setup

# 3) Start dev server
npm run dev
# open http://localhost:3000
```

## Environment
Copy `.env.sample` to `.env.local` and adjust:
```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Content sources
The app looks first in `content/`, and if a file is missing, it falls back to `content-sample/` so the site looks full on first launch.

- `site.json`: site title, description, and `navOrder`
- `profile.json`: name, avatar path, tagline, about, social links
- `projects.json`: array of projects with `slug`, `name`, `summary`, `links`, `technologies`
- `experience.json`: array with `slug`, `company`, `role`, `period`, `overview`, `highlights`, `stack`
- `skills.json`: languages/tools categories (consumed by `src/app/skills`)
- `education.json`: education timeline (consumed by `src/app/education`)
- `achievements.json`: awards and recognitions

Notes:
- To hide a tab, remove both the real file in `content/` and the sample file in `content-sample/` so the navbar auto‑hides it.
- `npm run setup` copies sample files into `content/` only if they don’t exist yet.

## Build & run
```bash
npm run build
npm start
```

## Project structure
```
src/
  app/                # App Router pages
    projects/         # list + [slug] dynamic route
    experience/       # list + [slug] dynamic route
    education/        # list route
    achievements/     # list + [slug] dynamic route
    layout.js         # global layout + metadata from content/site.json
    page.js           # home page from content/profile.json
  components/         # Navbar (server+client), ThemeToggle, Footer, VersionCheck
  styles/             # Tailwind entry + global utilities
content/              # Your site data (JSON)
content-sample/       # Fallback sample data (used if content/ missing)
lib/                  # Utilities (slugify, dateFormat)
public/               # Static assets (avatar, resume) + build.json (auto-generated)
```

## Theming
- Tailwind dark mode is `class`-based and toggled via `ThemeToggle`.
- Default theme is dark; user preference persists to `localStorage`.
- Custom brand palette in `tailwind.config.js` under `theme.extend.colors.brand`.

## Testing
```bash
npm test
```
- Jest + JSDOM configured; see tests under `tests/` (components, integration, unit).

## Deployment
- Works out-of-the-box on Vercel.
- Set `NEXT_PUBLIC_SITE_URL` for correct metadata and sitemap/robots.
- Clients auto-refresh after deployments via a lightweight `build.json` version check.

## License
MIT
