# inRebus Website UI Kit

A high-fidelity React component kit for the inRebus Educational marketing website, built to the modern editorial redesign brief.

## Design Width
1440px desktop. Sections use `max-width: 1280px` containers with `48px` side padding.

## Components
| File | Description |
|---|---|
| `Nav.jsx` | Fixed navigation with scroll-aware background blur, "in" prefix links |
| `Hero.jsx` | Full-viewport hero with animated headline, stats row, decorative orbs |
| `Services.jsx` | 3-column grid of all 9 service disciplines with hover states |
| `Process.jsx` | 8-step process with sticky left column and interactive accordion |
| `Clients.jsx` | Client grid as pill chips + full-width pull quote banner |
| `Footer.jsx` | CTA banner + footer grid with contact info |

## Screens in index.html
1. **Hero** — Full-viewport headline entrance
2. **inSide / About** — Two-column layout with skill cards
3. **inPractice / Services** — 9-service grid
4. **inAction / Process** — 8-step hover accordion
5. **inEvolution / Clients** — Client pills + quote
6. **inContact / Footer** — CTA + footer

## Usage
Open `index.html` directly in a browser. All components load via `<script type="text/babel" src="...">` — no build step required.

## Fonts
- `Barlow Condensed` 700/900 — display headlines
- `Plus Jakarta Sans` 400/500/600/700 — body
- `JetBrains Mono` 400/500 — labels, metadata

Loaded from Google Fonts CDN.
