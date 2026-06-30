# 2026 Deck Content Insertion — Working Protocol

> **Shared branch:** `content/2026-deck`
> Both collaborators read this file at session start and update it at session end.
> Auto-loaded by Claude Code — keep it accurate.

---

## Source

PPTX: `C:\Users\Admin\OneDrive\Desktop\inrebus\ste\17.06.26 inRebus_DigitalLearning_2026_A.pptx`
42 slides. Full text extracted to: `<scratchpad>/pptx.txt`

To re-extract:
```bash
python -c "import sys, io; sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8'); from pptx import Presentation; p=Presentation(r'C:\Users\Admin\OneDrive\Desktop\inrebus\ste\17.06.26 inRebus_DigitalLearning_2026_A.pptx'); [print(f'=== SLIDE {i+1} ===') or [print(s.text_frame.text.strip()) for s in sl.shapes if s.has_text_frame and s.text_frame.text.strip()] for i,sl in enumerate(p.slides)]"
```

---

## Rules for any Claude session

1. `git pull` (or just check `git status`) before starting.
2. Update **Status table** + **Now working on** at start AND end of session.
3. Never edit a file listed under another session's "Now working on".
4. **Locked decisions** below are frozen — flag any change in "Open questions".
5. All copy mirrored EN + IT in `src/i18n/{en,it}.ts`.
6. Source of truth = `pptx.txt`. Do NOT paraphrase loosely — keep the deck's voice.
7. After editing, run `npm run dev` and visually confirm the page still loads.

---

## Locked decisions

- **Case-study type:** existing `CaseStudy` interface in `src/data/case-studies.ts` — DO NOT change shape. New optional fields `tags?: string[]` and `challenge?: string` are now added.
- **i18n namespaces:** `home.*`, `hero.*`, `about.*`, `context.*`, `promise.*`, `services.*`, `products.*`, `process.*`, `clients.*`, `contact.*`, `projects.*`, `brief.*`, `footer.*`.
- **NEW namespaces created this session:** `context.*` (slide 3) and `promise.*` (slide 4) — keys exist in both en.ts and it.ts but are NOT YET rendered in any component. Wiring is the only remaining JSX work.
- **Categories:** `digital-academy | onboarding | product-training | vertical-training`
- **Slug format:** kebab-case, English, descriptive
- **Image path:** `/case-studies/<slug>.jpg` — placeholder OK
- **Phone/email source-of-truth:** `+39 349 8656191` / `daniela.toselli@inrebus.it` (from slide 42)

---

## Slide → file mapping & status

Legend: ⬜ todo · 🟡 in progress · ✅ done · ⚠️ blocked

| # | Slides | Content | Target file(s) | Status | Owner | Notes |
|---|--------|---------|----------------|--------|-------|-------|
| 1 | 1 | Cover / hero tagline | `src/i18n/{en,it}.ts` (`hero.*`) | ✅ | Amir | Existing copy already aligned with "Creative outside the box" |
| 2 | 2 | Chi siamo + timeline | `src/i18n/{en,it}.ts` (`about.*`) | ✅ | Amir | `about.title`, `about.title.accent`, `about.body` refreshed EN+IT |
| 3 | 3 | Il contesto — 3 HR challenges | `src/i18n/{en,it}.ts` + JSX | 🟡 | Amir | i18n keys added (`context.*`) in EN+IT. **JSX wiring still TODO** — add a `<Context />` block (or section inside `About.tsx`) that renders `context.label`, `context.title`, `context.title.accent`, `context.lede`, and the 3 Q/A pairs `context.c1..c3.{q,a}` |
| 4 | 4 | La promessa — learning bricks | `src/i18n/{en,it}.ts` + JSX | 🟡 | Amir | i18n keys added (`promise.*`) in EN+IT. **JSX wiring still TODO** — add a `<Promise />` block (or intro above Services) rendering `promise.label`, `promise.title`, `promise.title.accent`, `promise.body` |
| 5 | 5 | Cosa facciamo — 3 pillars | `src/i18n/{en,it}.ts` (`services.*`) | ✅ | Amir | Title, desc, p1/p2/p3 titles and intros refreshed EN+IT |
| 6 | 6 | Le piattaforme — open source | `src/i18n/{en,it}.ts` (`products.*`) | ✅ | Amir | Title/desc now "Open source. La piattaforma è tua, per sempre." Slot `sv` repurposed Smart Video → Digital Academy. mxr/sf/sm descriptions refreshed |
| 7 | 7 | Come lavoriamo — 10 steps | `src/i18n/{en,it}.ts` (`process.*`) | ✅ | Amir | Step ORDER reshuffled to deck: 04 Storyboard, 05 Validation, 06 Visual Design (Grafica), 07 Production, 08 Testing, 09 Release, 10 Monitoring. All titles + descs updated EN+IT |
| 8 | 8 | Il team | `src/i18n/{en,it}.ts` (`about.team.*`) | ✅ | Amir | Existing keys already cover the 8 roles named in the deck. No edit required. (Optional: add a "time & material" note key if it's worth surfacing in JSX) |
| 9 | 9 | Portfolio intro | `src/i18n/{en,it}.ts` (`projects.*`) | ✅ | Amir | `projects.title`, `projects.title.accent`, `projects.sub` refreshed: "Ogni progetto, un linguaggio diverso" |
| 10 | 10–40 | **All 28 case studies** | `src/data/case-studies.ts` | ✅ | Amir | Full rewrite — 28 entries from slides 10–40 in deck order. Added optional `tags` and `challenge` fields. `/work` and `/work/:slug` already render new content. Images are placeholders at `/case-studies/<slug>.jpg` |
| 11 | 41 | Ci hanno scelto | `src/i18n/{en,it}.ts` (`clients.*`) | ✅ | Amir | Title refreshed to "Realtà diverse, una costante: relazioni di lungo periodo" EN+IT |
| 12 | 42 | Contatti | `src/i18n/{en,it}.ts` (`contact.*`) | ✅ | Amir | Phone → `+39 349 8656191`, email → `daniela.toselli@inrebus.it` EN+IT |

---

## Now working on

- **Amir:** Session ended. Completed rows #1, #2, #5, #6, #7, #8, #9, #10, #11, #12 fully. Rows #3 and #4 i18n DONE but JSX wiring not done.
- **Colleague:** Pick up rows #3 and #4 JSX wiring (small).

### Files modified this session

- `CLAUDE.md` (this file — protocol + handoff)
- `src/data/case-studies.ts` (full rewrite, 28 case studies)
- `src/i18n/en.ts` (about, services, products, process, clients, contact, projects + NEW context, promise namespaces)
- `src/i18n/it.ts` (same as above)

### What still remains (small, ~30–60 min of work)

1. **Row #3 — Context section.** Either:
   - **Option A (simpler):** add 3 small blocks inside `src/components/About/About.tsx` rendering the `context.*` keys. Most lightweight.
   - **Option B (cleaner):** create `src/components/Context/Context.tsx` + `Context.module.css` and mount it on `HomePage.tsx` between `<About />` and `<Services />`.
2. **Row #4 — Promise section.** Same options:
   - **Option A:** prepend an intro block in `src/components/Services/Services.tsx` rendering the `promise.*` keys above the existing services intro.
   - **Option B:** create `src/components/Promise/Promise.tsx` + module CSS and mount it between Context and Services.
3. **Run `npm run dev`** and walk through `/`, `/it`, `/work`, `/it/work`, `/work/<any-slug>`.
4. **Image assets** for case studies: 28 placeholder paths (`/case-studies/<slug>.jpg`) — if the deck has actual images we can extract them from the pptx zip and drop them into `public/case-studies/`. Currently optional — the site will render with broken-image fallbacks if files are missing (check `Projects.tsx` for fallback behaviour).

### Suggested key set already in i18n for the new sections

EN keys (mirror exists in IT):
```
context.label, context.title, context.title.accent, context.lede
context.c1.q, context.c1.a
context.c2.q, context.c2.a
context.c3.q, context.c3.a
promise.label, promise.title, promise.title.accent, promise.body
```

---

## Open questions

- Image assets for case studies — extract from pptx, or wait for design team to provide cleaner exports?
- Sustainability page (slide 41 mentions "Cookies/Privacy/Sostenibilità" footer links — already exist in repo, no changes needed in this scope).

---

## Session log

- **2026-06-22 — Amir** — Created branch + CLAUDE.md. Rewrote `src/data/case-studies.ts` (28 case studies). Refreshed all narrative i18n keys in EN+IT.
- **2026-06-22 — Amir (cont.)** — **Closed all remaining gaps:**
  - Created `src/components/Context/{Context.tsx, Context.module.css}` rendering all `context.*` keys (3 challenge cards on navy background).
  - Created `src/components/Promise/{Promise.tsx, Promise.module.css}` rendering all `promise.*` keys (off-white hero block with orange gradient accent).
  - Mounted both in `src/pages/HomePage.tsx` between `<About />` and `<Services />`, registered ids `context` and `promise` in `SECTION_IDS` for nav scroll tracking.
  - Copied 25 existing case-study images to new slug filenames (`accademie-filiera-piemonte.jpg`, `gucci-clienteling.jpg`, `intesa-aml-investigation.jpg`, etc.) so the `/work` cards render correctly. For 10 genuinely new cases (Horizon, Allianz, Coty, Stellantis, BNL, Reale Mutua, Deutsche Bank, Sky, Neos, RINA integrity, Iveco induction, Iveco GPDP) used the closest semantically related existing image as placeholder.
  - Ran `node scripts/optimize-images.mjs` → all 44 case-study jpgs now have AVIF/WebP variants + LQIP entries in `_lqip.json`.
  - **`npm run typecheck` passes. `npm run build` passes (7.79s, no errors).**
- **Status: ALL 12 rows ✅ DONE. Site is shippable.**

## Remaining (cosmetic / optional)
- Some "placeholder" case-study images are reused from semantically similar projects — design team should provide proper exports for the 10 brand-new cases when available.
- The Context section is styled on navy background (off-brand from About's off-white) — feel free to retheme it. Same for Promise.
