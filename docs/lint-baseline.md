# ESLint Baseline — 2026-05-15

**Total:** 6 errors, 0 warnings

New lint was run against `src/` with `.eslintrc.cjs` (ESLint 8 + TypeScript-ESLint 8 + react/react-hooks/jsx-a11y + prettier).
No auto-fixes were applied. Fix before merging.

## Offenders (all 6)

| # | File | Line | Rule | Severity |
|---|------|------|------|----------|
| 1 | `src/components/Clients/Clients.tsx` | 116:66 | `react/no-unescaped-entities` | error |
| 2 | `src/components/Footer/OfficeMap.tsx` | 24:11 | `@typescript-eslint/ban-ts-comment` | error |
| 3 | `src/components/Nav/Nav.tsx` | 51:7 | `react-hooks/immutability` | error |
| 4 | `src/components/Nav/Nav.tsx` | 113:13 | `jsx-a11y/no-redundant-roles` | error |
| 5 | `src/components/Products/Products.tsx` | 66:17 | `jsx-a11y/anchor-is-valid` | error |
| 6 | `src/components/Projects/Projects.tsx` | 54:28 | `react-hooks/purity` | error |

## Notes

- **`react/no-unescaped-entities`** — A `"` in JSX needs to be `&quot;` or moved into a JS string.
- **`@typescript-eslint/ban-ts-comment`** — Replace `@ts-ignore` with `@ts-expect-error`.
- **`react-hooks/immutability`** — `window.location.href` mutation inside a hook; use `navigate()` instead.
- **`jsx-a11y/no-redundant-roles`** — `<ul role="list">` is redundant; drop the `role` attribute.
- **`jsx-a11y/anchor-is-valid`** — `<a>` with empty/invalid `href`; swap for a `<button>`.
- **`react-hooks/purity`** — `Math.random()` called during render; move into `useMemo` or initialise outside render.
