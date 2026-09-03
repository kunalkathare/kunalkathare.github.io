# Kunal A. Kathare — Portfolio Website

A single-page static portfolio. No build step, no dependencies, no framework —
open `index.html` and it works.

```
portfolio/
├── index.html      all content lives here
├── css/style.css   design tokens, layout, light + dark themes
├── js/main.js      theme toggle, scroll reveal, active nav
├── add-photo.sh    installs your profile photo into assets/
├── assets/
│   ├── profile.jpg      ← add your photo here (see below)
│   └── teasers/         placeholder paper thumbnails
└── README.md
```

## Run it locally

```bash
# simplest — just open the file
xdg-open index.html          # or: open index.html  (macOS)

# or serve it (needed if you later add fetch/JSON)
python3 -m http.server 8000
# → http://localhost:8000
```

## Deploy

**GitHub Pages** — push this folder to a repo, then Settings → Pages → deploy from
branch. For a personal site, name the repo `<username>.github.io` and put these
files at its root.

**Netlify / Vercel / Cloudflare Pages** — drag the folder into the dashboard, or
point it at the repo. Build command: *(none)*. Publish directory: `.`

## Content sourced from

Everything on the page was taken from public sources, not invented:

- **Google Scholar** (`gYsxZHgAAAAJ`) — the four publications, venues, author
  lists, and the citation / h-index figures.
- **IEEE Xplore** — canonical links for the WACV, SPCOM and CSITSS papers.
- **Project pages** — `maaf-4dgs.github.io` and `kunalkathare.github.io/instructive3d`.
- **arXiv** — abstracts for *Instructive3D* (2501.04374) and
  *Towards Alias-Free 4D Gaussian Representations* (2608.21828).
- **IISc Vision & AI Lab people page** — Project Assistant role, Oct 2024 – Jul 2025.
- **Public search results** — PES University affiliation and the C-programming
  teaching-assistant role.

LinkedIn blocks automated reading (HTTP 999), so nothing was scraped from it —
only the profile link itself is used. The AR-glasses focus, the research areas and
the Samsung internship came directly from you.

## Your photo

`assets/profile.png` — your original 800×800 upload, shown as-is in a circle at
the top of the hero. No cartoon, no hover effect, no second image.

It is a full upper-body shot, so inside a 148px circle the face sits fairly
small. If you want it tighter without editing the file, zoom with CSS in
`css/style.css`:

```css
.avatar__photo {
  transform: scale(1.9);        /* zoom toward the face */
  object-position: 50% 22%;     /* and shift the framing upward */
}
```

**To replace the photo**, run `./add-photo.sh <path>` or just save a file into
`assets/` — the JS probes 24 candidate paths (`profile`, `photo`, `kunal`, `me`,
`avatar`, `headshot` × `.jpg/.jpeg/.png/.webp`). If none decode, the avatar is
hidden entirely and the hero simply starts at your name.

## Publication teaser images

The thumbnails in `assets/teasers/` are **placeholders I generated** — abstract
SVGs suggesting each paper's idea. Replace them with real teasers whenever you
like; keep the filenames:

```
maaf-before.svg / maaf-after.svg               ECCV 2026
depth-before.svg / depth-after.svg             SPCOM 2026
instructive-before.svg / instructive-after.svg WACV 2025
robot-before.svg / robot-after.svg             CSITSS 2024
```

Like the reference site, the `-before` image crossfades to `-after` on hover —
good for input/output or baseline/ours pairs. If you only have one image per
paper, use the same file for both (or point both `<img src>` at it) and hover
simply does nothing. `.png`/`.jpg` work as well as `.svg` — update the `src`
attributes in `index.html` to match.

## Worth checking / filling in

Dates, titles and grades throughout News, Experience and Education are the ones
you gave me, so they should be right. Two small things remain:

- **Email** is deliberately left off rather than guessed. To add one, drop another
  `.clink` block into `#contact`:
  ```html
  <a class="clink" href="mailto:you@example.com">
    <span class="clink__k">Email</span>
    <span class="clink__v">you@example.com</span>
  </a>
  ```
- **Citation counts** are hard-coded in the hero stats (7 citations, h-index 1)
  and will go stale.

## Customising

Colours, fonts and spacing are all CSS custom properties at the top of
`css/style.css`. To change the accent everywhere, edit two lines:

```css
:root              { --accent: #9c4a2f; }  /* light mode — rust */
[data-theme="dark"]{ --accent: #e3906b; }  /* dark mode  — lighter, for contrast */
```

Sections run: About, News, Research, Publications, Experience, Education,
Contact — numbered 01–07 in the `.label` markers. Adding or reordering a section
means updating those numbers and the `.nav__links` list by hand.

Publications are grouped under `<p class="pub__year-head">` year headings.
Adding one means copying an `<li class="pub">` block into the right year group;
wrap your own name in `<strong>` so it stays bolded. Adding a news item means
copying one `<li class="news__item">`.

The layout follows the classic academic template (year headers, teaser on the
left, bracketed `[project page] [paper]` links) as on cs-mshah.github.io.

## Notes

- Theme follows the visitor's OS setting until they click the toggle, after which
  the choice is remembered in `localStorage`.
- Respects `prefers-reduced-motion` — animations are disabled rather than reduced.
- Prints cleanly (nav, toggle and background drop out), so `Ctrl+P → Save as PDF`
  gives a usable one-page CV.
- Keyboard accessible: skip link, visible focus rings, real landmarks.
- Content is visible without JavaScript: the entrance animation only hides things
  once `html.js` is set, so a script failure can never blank the page.
