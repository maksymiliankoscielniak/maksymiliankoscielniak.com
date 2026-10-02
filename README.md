# maksymiliankoscielniak.com

Design-led portfolio of Maksymilian Kościelniak: near-black with one mint accent, a live ridgeline animation in the hero, and dimension lines as the one drawn motif.
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
| Project screenshots (16:9 crops) | `src/assets/screens/` |
| Colours and fonts | `@theme` block in `src/index.css` |

## Sections

- **Hero**: the name as a neon sign, lowered on two cables, swinging, then powering on (one letter is on its way out; see `.neon-*` in `src/index.css`), over an animated field of mint ridgelines drawn on a canvas (`src/components/HeroField.tsx`). It follows the pointer, pauses when off screen or in a background tab, and is a still frame with reduced motion. A dimension line under the name measures it and carries a caption.
- **Selected work**: one plate per project (screenshot, short description, stack, live demo and source links). Each plate has its own dimension line naming what kind of project it is.
- **Services**: what I build (four cards) and how I work (four steps). Copy lives in `services` and `process` in `src/i18n/copy.ts`.
- **About**: a short bio, the stack, and a signature.
- **Right now**: a slim strip before Contact (`now` in `copy.ts`): what I am studying, building and open to. Edit it whenever it changes.
- **Contact**: e-mail (with a copy button), GitHub, LinkedIn.
- **AI policy**: lives off the main page. A tab on the right edge (a small pill on phones, plus a link in the footer) slides in a drawer. Deep link: `/#ai`.
- **Language switch**: EN / PL in the header. The choice is remembered in `localStorage`.

`prefers-reduced-motion` is respected: the headline and dimension line simply appear and the hero field is a still frame.

## Deploy to GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and publishes on every push to `main`.

1. Publish the repository from GitHub Desktop (keep it **public**: free accounts only serve Pages from public repos), or from the command line:

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
