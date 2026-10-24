# Sarvin M. — Portfolio

Personal portfolio built from the "Design Hub" Figma file: one scrolling page with Home, About Me,
Experience and Projects sections.
Next.js (static export) + Tailwind CSS, deployed to GitHub Pages.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
```

## Where things live

| What | Where |
| --- | --- |
| All text (bio, jobs, tasks, projects, certificates, tools) | `lib/content.ts` |
| Colors, fonts, shadows (Figma tokens) | `app/globals.css` (`@theme`) |
| Sections (in page order) | `app/page.tsx`, built from `components/sections/` and `components/ProjectDeck.tsx` |
| Nav and section tracking | `components/SiteHeader.tsx`, section list in `lib/sections.ts` |
| Images and vectors | `public/assets/` |
| CV download | `public/Sarvin-CV.pdf` |

To add an image (badge photo, company logo, tool logo, project cover), put the file in
`public/assets/…` and set its path in `lib/content.ts`. Spots still waiting for a file
show a grey placeholder and have a `TODO` comment.

## Deploy

Push to `main`. The workflow in `.github/workflows/deploy.yml` builds the site and
publishes it. One-time setup in the GitHub repo: **Settings → Pages → Source: GitHub Actions**.

The repo name decides the address: a repo called `<username>.github.io` is served at the
root, any other repo at `/<repo-name>/`. The workflow sets the right base path either way.
