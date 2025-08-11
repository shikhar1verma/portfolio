# Portfolio Site Generator (Next.js 14 + Tailwind CSS)

A JSON‑driven portfolio scaffold built with Next.js App Router and Tailwind CSS. All copy and data live in `content/*.json`, so you can fork, edit JSON, and deploy quickly.

### Highlights
- **JSON content**: edit `content/*.json` to update pages
- **Next.js App Router**: server components for data reading, static params for dynamic routes
- **Dark mode**: class-based toggling persisted to `localStorage`
- **Responsive UI**: Tailwind with a small custom color palette under `brand`
- **SEO**: optional sitemap/robots via `next-sitemap.js`
- **Testing**: Jest setup with a basic utility test

## Quick start
```bash
npm install
npm run dev
# open http://localhost:3000
```

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
    layout.js         # global layout + metadata from content/site.json
    page.js           # home page from content/profile.json
  components/         # Navbar (server+client), ThemeToggle, Footer, VersionCheck
  styles/             # Tailwind entry + global utilities
content/              # All editable site data (JSON)
lib/                  # Utilities (slugify, dateFormat)
public/               # Static assets (avatar, resume) + build.json (auto-generated)
```

## Editing content
Update these JSON files in `content/`:
- `site.json`: site title, description, and `navOrder`
- `profile.json`: name, avatar path, tagline, about, social links
- `projects.json`: array of projects with `slug`, `name`, `summary`, `links`, `technologies`
- `experience.json`: array with `slug`, `company`, `role`, `period`, `overview`, `highlights`, `stack`
- `skills.json`: languages/tools categories (consumed by `src/app/skills`)
- `education.json`: education timeline (consumed by `src/app/about`)

Then run locally or merge to `main` to trigger CI/CD. Each deployment ships updated pages.

## Theming
- Tailwind dark mode is `class`-based and toggled via `ThemeToggle`.
- Custom brand palette in `tailwind.config.js` under `theme.extend.colors.brand`.
See `docs/theming-and-ui.md`.

## Testing
```bash
npm test
```
- Jest + JSDOM configured; example test at `tests/home.test.js`.
See `docs/testing-and-quality.md`.

## Deployment
- Works out-of-the-box on Vercel.
- Optionally configure `next-sitemap.js` for sitemap/robots.
- Clients auto-refresh after deployments (and at most every ~30 days) via a lightweight `build.json` version check.
See `docs/deployment.md`.

## Docs
- `docs/architecture.md` – high-level architecture and data flow (with diagrams)
- `docs/content-model.md` – content JSON schemas and examples
- `docs/theming-and-ui.md` – Tailwind setup, dark mode, component notes
- `docs/testing-and-quality.md` – testing, linting, formatting
- `docs/deployment.md` – Vercel and environment configuration

## License
MIT
