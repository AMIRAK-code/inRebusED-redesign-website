/**
 * Optimize client logo PNGs: resize to max 400px wide, write WebP + optimised PNG.
 * Skip files already under 30 KB.
 *
 * Usage: node scripts/optimize-client-logos.mjs
 */

import { readdir, stat } from 'node:fs/promises'
import { join, basename, extname } from 'node:path'
import sharp from 'sharp'

const LOGOS_DIR   = 'public/clients'
const MAX_WIDTH   = 400
const SKIP_BELOW  = 30 * 1024   // 30 KB
const WEBP_Q      = 85
const PNG_LEVEL   = 9

const files = (await readdir(LOGOS_DIR))
  .filter(f => extname(f).toLowerCase() === '.png')
  .sort()

let totalBefore = 0
let totalAfter  = 0

for (const file of files) {
  const srcPath  = join(LOGOS_DIR, file)
  const name     = basename(file, '.png')
  const webpPath = join(LOGOS_DIR, `${name}.webp`)
  const pngPath  = srcPath          // overwrite in-place

  const { size: sizeBefore } = await stat(srcPath)
  totalBefore += sizeBefore

  if (sizeBefore < SKIP_BELOW) {
    totalAfter += sizeBefore
    console.log(`  skip  ${file.padEnd(12)}  ${kb(sizeBefore)} — already small`)
    continue
  }

  const src = sharp(srcPath)
  const meta = await src.metadata()
  const shouldResize = (meta.width ?? 0) > MAX_WIDTH

  // WebP output
  await sharp(srcPath)
    .resize(shouldResize ? { width: MAX_WIDTH, withoutEnlargement: true } : undefined)
    .webp({ quality: WEBP_Q })
    .toFile(webpPath)

  // Re-encode PNG in-place (use a temp buffer to avoid sharp file-lock)
  const pngBuf = await sharp(srcPath)
    .resize(shouldResize ? { width: MAX_WIDTH, withoutEnlargement: true } : undefined)
    .png({ compressionLevel: PNG_LEVEL, palette: true })
    .toBuffer()

  await sharp(pngBuf).png({ compressionLevel: PNG_LEVEL, palette: true }).toFile(pngPath)

  const [{ size: webpSize }, { size: pngSize }] = await Promise.all([
    stat(webpPath),
    stat(pngPath),
  ])

  const best = Math.min(webpSize, pngSize)
  totalAfter += pngSize  // PNG is what the <img> fallback uses

  const saving = ((sizeBefore - best) / sizeBefore * 100).toFixed(1)
  console.log(
    `  ✓  ${file.padEnd(12)}  ${kb(sizeBefore).padStart(9)} → png ${kb(pngSize).padStart(7)} / webp ${kb(webpSize).padStart(7)}  (${saving}% saved on best)`,
  )
}

const totalSaving = ((totalBefore - totalAfter) / totalBefore * 100).toFixed(1)
console.log('\n────────────────────────────────────────────────────────')
console.log(`  Total before : ${kb(totalBefore)}`)
console.log(`  Total after  : ${kb(totalAfter)}  (PNG fallbacks only)`)
console.log(`  Net saving   : ${kb(totalBefore - totalAfter)}  (${totalSaving}%)`)

function kb(bytes) {
  return (bytes / 1024).toFixed(1) + ' KB'
}
