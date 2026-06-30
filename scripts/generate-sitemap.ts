import { writeFileSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import caseStudies from '../src/data/case-studies.ts'

const BASE = 'https://www.inrebus.education'
const BUILD_DATE = new Date().toISOString().split('T')[0]

function mtime(relPath: string): string {
  try {
    const abs = resolve(import.meta.dirname, '..', relPath)
    return statSync(abs).mtime.toISOString().split('T')[0]
  } catch {
    return BUILD_DATE
  }
}

interface UrlEntry {
  path: string
  changefreq: string
  priority: string
  lastmod: string
}

const enPages: UrlEntry[] = [
  { path: '/',       changefreq: 'weekly',  priority: '1.0', lastmod: mtime('src/pages/HomePage.tsx') },
  { path: '/work',   changefreq: 'weekly',  priority: '0.8', lastmod: mtime('src/pages/WorkPage.tsx') },
  { path: '/brief',          changefreq: 'monthly', priority: '0.5', lastmod: mtime('src/pages/BriefPage.tsx') },
  { path: '/privacy',        changefreq: 'yearly',  priority: '0.3', lastmod: mtime('src/pages/PrivacyPage.tsx') },
  { path: '/cookies',        changefreq: 'yearly',  priority: '0.3', lastmod: mtime('src/pages/CookiesPage.tsx') },
  { path: '/sustainability',  changefreq: 'yearly',  priority: '0.4', lastmod: mtime('src/pages/SustainabilityPage.tsx') },
  ...caseStudies.map(cs => ({
    path: `/work/${cs.slug}`,
    changefreq: 'monthly',
    priority: '0.6',
    lastmod: mtime(`public/case-studies/${cs.image.split('/').pop()}`),
  })),
  // /insights/:slug — placeholder, uncomment when insights pages exist
  // ...insightSlugs.map(slug => ({ path: `/insights/${slug}`, changefreq: 'monthly', priority: '0.6', lastmod: BUILD_DATE })),
]

function hreflang(enPath: string): string {
  const itPath = enPath === '/' ? '/it' : `/it${enPath}`
  return [
    `      <xhtml:link rel="alternate" hreflang="en" href="${BASE}${enPath}"/>`,
    `      <xhtml:link rel="alternate" hreflang="it" href="${BASE}${itPath}"/>`,
    `      <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}${enPath}"/>`,
  ].join('\n')
}

function urlEntry(entry: UrlEntry): string {
  const itPath = entry.path === '/' ? '/it' : `/it${entry.path}`
  const enBlock = `  <url>
    <loc>${BASE}${entry.path}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
${hreflang(entry.path)}
  </url>`

  const itBlock = `  <url>
    <loc>${BASE}${itPath}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
${hreflang(entry.path)}
  </url>`

  return enBlock + '\n' + itBlock
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${enPages.map(urlEntry).join('\n')}
</urlset>
`

const outPath = resolve(import.meta.dirname, '../public/sitemap.xml')
writeFileSync(outPath, xml, 'utf-8')
console.log(`✓ sitemap.xml written — ${enPages.length * 2} URLs (${enPages.length} EN + ${enPages.length} IT)`)
