### Deployment

#### Vercel (recommended)
1. Push your repository to GitHub/GitLab/Bitbucket.
2. Import the repo in Vercel.
3. Set Environment Variable `REVALIDATE_SECRET` (Production and Preview).
4. Deploy.

After deployment, you can call `/api/revalidate` to refresh pages on demand. See `docs/revalidation.md`.

#### Domains and SEO
- Configure your custom domain in Vercel.
- Update `next-sitemap.js` `siteUrl` to your domain if generating sitemaps/robots.

#### Other platforms
- Any Node.js hosting that supports Next.js 14 should work.
- Ensure environment variables are set and that the platform supports the App Router. 