# maksymiliankoscielniak.com

Cinema-and-theatre portfolio of Maksymilian Kościelniak.
Vite + React + TypeScript + Tailwind CSS v4 + framer-motion + lucide-react.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve dist/ locally
```

## Where things live

| What | Where |
| --- | --- |
| All copy, EN + PL (English is the default) | `src/i18n/copy.ts` |
| Project list, descriptions, links | `src/data/projects.ts` |
| GitHub, LinkedIn, e-mail | `src/data/site.ts` |
| Poster artwork (SVG, one per project) | `src/components/PosterArt.tsx` |
| Colours and fonts | `@theme` block in `src/index.css` |

## Still to fill in

- `src/data/site.ts`: real GitHub / LinkedIn URLs and e-mail (currently placeholders).
- `src/data/projects.ts`: `href` for each project link (links with an empty `href` are hidden).
- `src/i18n/copy.ts`: read through the About and AI-policy text, it is a first draft.

## Sections

- **Curtain**: opens on load (or on click / key press) and settles into the drapes that frame the page.
- **About**: a scroll-driven trailer with title cards, then a lectern with a short bio and stack.
- **Projects ("Now showing")**: one CRT television per project; click a screen for the full poster.
- **AI policy**: lives off the main page. A stage door on the right edge (and the nav link) rolls in the prompter's box from the side. Deep link: `/#ai`.
- **Credits**: GitHub, LinkedIn, e-mail.
- **Language switch**: a strip of film that advances one frame (EN / PL). The choice is remembered in `localStorage`.

`prefers-reduced-motion` is respected: no curtain, static trailer cards, no flicker or grain.

## Deploy to GitHub Pages

The workflow builds and publishes on every push to `main`. It ships as `deploy-workflow.yml` in the project root;
GitHub only reads workflows from `.github/workflows/`, so move it there before the first push:

```bash
mkdir -p .github/workflows
mv deploy-workflow.yml .github/workflows/deploy.yml
```

1. Create an empty repository on GitHub (any name), then from this folder:

   ```bash
   git init -b main
   git add .
   git commit -m "Initial commit"
   git remote add origin git@github.com:<your-user>/<repo>.git
   git push -u origin main
   ```

2. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The first run publishes the site at `https://<your-user>.github.io/<repo>/`.
   The workflow sets the base path to `/<repo>/` automatically.

### Moving to maksymiliankoscielniak.com

1. Add a file `public/CNAME` containing one line: `maksymiliankoscielniak.com`.
   With that file present the workflow builds with base `/`.
2. At your DNS provider point the apex domain to GitHub Pages with four `A` records:
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   and (optional) a `CNAME` record `www` → `<your-user>.github.io`.
3. **Settings → Pages → Custom domain**: enter the domain, wait for the DNS check, then tick **Enforce HTTPS**.

GitHub's current instructions: <https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site>
