# Portfolio Site Generator (JavaScript edition)

This repo scaffolds a JSON-driven portfolio using **Next.js 14** with the App Router and **Tailwind CSS**. All copy lives in `content/*.json` so you can fork and deploy quickly.

## Getting Started

```bash
npm install
npm run dev
```

Edit the JSON files in `content/` to update your profile, experience, projects and skills.

## Deployment

[Deploy to Vercel](https://vercel.com/new) and set `REVALIDATE_SECRET` in your environment variables.

## Adding Content

- Add experience entries in `content/experience.json`.
- Add project entries in `content/projects.json`.
- Update `public/resume.pdf` with your résumé.

## Revalidation

POST to `/api/revalidate` with `{ "secret": "REVALIDATE_SECRET", "tag": "/" }` to trigger a rebuild.
