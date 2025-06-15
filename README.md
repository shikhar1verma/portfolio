# Portfolio Site Generator (JavaScript edition)

This repo scaffolds a JSON-driven portfolio using **Next.js 14** with the App Router and **Tailwind CSS**. All copy lives in `content/*.json` so you can fork and deploy quickly.

## Getting Started

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm start
```

## Editing Content

Update the files in `content/` to change your portfolio data:

- `site.json` – site title, description and navigation order.
- `profile.json` – personal bio, avatar and social links.
- `experience.json` – work history entries.
- `projects.json` – project gallery records.
- `skills.json` – language and tool lists.
- `education.json` – education timeline.

Replace `public/resume.pdf` with your résumé and `public/avatar.jpg` with your photo.

## Deployment

[Deploy to Vercel](https://vercel.com/new) and set `REVALIDATE_SECRET` in your environment variables.

## Revalidation

POST to `/api/revalidate` with `{ "secret": "REVALIDATE_SECRET", "tag": "/" }` to trigger a rebuild.
