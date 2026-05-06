# inRebus Design System

## Overview

**inRebus Educational** is a Turin-based (Italy) EdTech company founded in 2003, originally as a software house, that evolved to include a dedicated e-learning business line. Their tagline is **"E-Learning Outside the Box"** — which doubles as a brand philosophy: creative, unconventional, and professionally rigorous digital learning.

**Source:** Website scraped from https://www.inrebus.education/ (April 2026). No Figma link or codebase was provided — this design system is built from the live website content, brand copy analysis, and the editorial redesign brief supplied by the client.

### Products & Services
- **Customized Courses** — tailor-made digital learning experiences
- **Ready-Made Courses** — licensed catalogue courses developed with certified experts
- **Smart Videos (SV)** — proprietary interactive video product line
- **LMS Solutions** — standard and custom, including SaaS with help desk
- **Gamification & Serious Games**
- **Assessment Apps**

### Clients (Notable)
Jeep, Alfa Romeo, Unicredit, Maserati, Intesa Sanpaolo, Iveco, FCA, Esselunga, Sky, Lancia, CNHi, Daikin, Finmeccanica, SKP, Reale Assicurazioni, FTP, Mopar, Magneti Marelli, Abarth.

---

## CONTENT FUNDAMENTALS

### Tone & Voice
- **Professional but playful** — uses terms like "SPICY" and "Outside the Box" while serving Fortune 500 clients
- **Bilingual** — Italian primary, English secondary; copy exists in both languages
- **Confident and direct** — short punchy sentences, strong claims without qualifiers
- **Philosophical** — includes quotes from Seneca and Donna J. Abernathy; intellectual without being academic
- **"in" wordplay** — every section/product/nav item uses the "in" prefix: *inSide, inPractice, inFacts, inAction, inEvolution, inContact, inVideo*

### Casing
- **ALL CAPS** for major headlines (H1, hero)
- **Title Case** for section headers and service names
- **Sentence case** for body copy
- No emoji in body copy — brand uses custom illustrations instead

### Writing Examples
> *"E-LEARNING OUTSIDE THE BOX"* — hero headline
> *"NO GREAT MIND HAS EVER EXISTED WITHOUT A TOUCH OF MADNESS"* — pull quote (Seneca)
> *"Online learning is not the next big thing, is the now big thing"* — pull quote (Donna J. Abernathy)
> *"We are project managers, instructional designers, graphic designers, illustrators, video makers and developers."*

### Perspective
- Uses **"we"** for the company and **"you/your"** for the client
- Direct address: *"Your requests become our guidelines"*

---

## VISUAL FOUNDATIONS

### Color System
> **Colors confirmed via Google Stitch extraction from inrebus.education (April 2026)**

- **Navy** `#0A1628` — primary dark background
- **Charcoal** `#202020` — secondary dark, cards, sections
- **Orange** `#F58220` — **primary brand accent**; CTAs, active states, logo "in" prefix, highlights
- **Orange Light** `#FFA04D` — hover state
- **Orange Dark** `#C8620A` — pressed/active state
- **Red** `#CC2200` — secondary accent for errors, urgent callouts
- **White** `#FFFFFF` — primary foreground on dark
- **Off-white** `#F7F7F7` — section backgrounds, light mode base
- **Mid-grey** `#6B7480` — secondary text, captions
- **Light border** `#E5E5E5` — dividers, card strokes on light backgrounds

### Typography
- **Display / Hero**: `Barlow Condensed` — Bold (700/900), ALL CAPS, very large. Editorial. Evokes tension and scale.
- **Heading**: `Barlow Condensed` — SemiBold (600), Title Case or ALL CAPS
- **Body**: `Lexend` — Regular (400) and Medium (500); clean, modern, humanist
- **Mono / Code**: `JetBrains Mono` — used for technical labels, version numbers, data
- Scale: 12 / 14 / 16 / 20 / 24 / 32 / 48 / 64 / 80 / 120px

### Backgrounds & Texture
- **Dark sections**: solid navy or charcoal — no heavy gradients; subtle radial glow at most
- **Light sections**: clean off-white `#F7F7F7`
- **Accent dividers**: 1px violet or orange horizontal lines
- **No stock photo backgrounds** — brand uses custom illustrations and abstract decorative elements
- **Glassmorphism cards** on dark backgrounds for feature callouts (per redesign brief)

### Layout
- **High whitespace** — generous padding, content never feels crowded
- **Oversized typography** — headlines often 80–120px on desktop
- **Modular grid** — 12-column, 1400px max-width container
- **Staggered reveal** sections — content enters with slight vertical offset stagger

### Animation (GSAP-first)
- **Hero**: split-text reveal on headline + fade-and-scale-up on CTA
- **ScrollTrigger**: reveal-on-scroll with stagger for card grids
- **Magnetic buttons**: hover micro-interaction on primary CTAs
- **Parallax**: background decorative elements offset at 0.3–0.5x scroll speed
- **Page transitions**: fade-out / fade-in between sections
- **Easing**: `power3.out` for reveals, `elastic.out(1, 0.75)` for magnetic snaps
- **Duration**: 0.6–1.0s for major reveals; 0.2–0.3s for micro-interactions

### Hover & Press States
- **Buttons**: violet → lighter violet (`#FFA04D`), subtle `translateY(-2px)` lift
- **Cards**: slight `scale(1.02)` + shadow deepens
- **Nav links**: underline slides in from left
- **Press**: `scale(0.97)` press-down feel

### Shadows & Elevation
- **sm**: `0 1px 3px rgba(0,0,0,0.12)`
- **md**: `0 4px 16px rgba(0,0,0,0.16)`
- **lg**: `0 12px 40px rgba(0,0,0,0.24)`
- **glow-orange**: `0 0 32px rgba(245,130,32,0.4)`
- **glow-orange**: `0 0 24px rgba(232,69,26,0.35)`

### Corner Radii
- **xs**: 2px — tags, badges
- **sm**: 6px — buttons, inputs
- **md**: 12px — cards
- **lg**: 24px — large panels, hero pills
- **full**: 999px — pill buttons, avatar chips

### Cards
- Dark cards: `background: #202020`, `border: 1px solid rgba(255,255,255,0.08)`, radius md, shadow lg
- Light cards: `background: #FFFFFF`, `border: 1px solid #E5E5E5`, radius md, shadow sm
- Glass cards: `background: rgba(255,255,255,0.06)`, `backdrop-filter: blur(16px)`, violet glow

### Iconography
See ICONOGRAPHY section below.

### Imagery Vibe
- Professional, collaborative learning environments
- Cool-to-neutral color grading
- Abstract 3D glassmorphism shapes as decorative elements
- Custom flat/semi-flat illustrations (brand's own style)

---

## ICONOGRAPHY

The brand uses **custom flat illustrations** (PNG assets at `/img/elementi-*.png`) for skill/service icons, and **PNG process icons** (`/img/ico_processo-*.png`) for workflow diagrams. No SVG icon font was found.

For the redesign direction, we substitute with **Lucide Icons** (CDN: `https://unpkg.com/lucide@latest`) — a clean, consistent 24px stroke icon set that matches the modern editorial aesthetic.

**Usage rules:**
- Stroke weight: 1.5px (default Lucide)
- Size: 20px UI / 24px feature / 32px hero callouts
- Color: inherit from text or use `var(--accent-orange)`
- No emoji as icons; no Unicode substitutes

---

## FILE INDEX

```
README.md                        ← this file
SKILL.md                         ← agent skill definition
colors_and_type.css              ← CSS custom properties for all tokens
assets/
  logo.svg                       ← inRebus wordmark (reconstructed)
preview/
  colors-brand.html              ← Brand color swatches
  colors-semantic.html           ← Semantic / UI color tokens
  type-display.html              ← Display & heading specimens
  type-body.html                 ← Body & mono specimens
  type-scale.html                ← Full type scale
  spacing-tokens.html            ← Spacing + radii tokens
  shadow-elevation.html          ← Shadow & elevation system
  buttons.html                   ← Button variants & states
  cards.html                     ← Card variants (dark/light/glass)
  badges-tags.html               ← Badges, tags, chips
  nav.html                       ← Navigation bar component
  forms.html                     ← Input fields & form controls
ui_kits/
  website/
    README.md
    index.html                   ← Full marketing website prototype
    Nav.jsx
    Hero.jsx
    Services.jsx
    Process.jsx
    Clients.jsx
    Footer.jsx
```
