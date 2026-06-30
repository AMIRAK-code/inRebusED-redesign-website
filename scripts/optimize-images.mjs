/**
 * Optimize case-study (and any other content) images.
 *
 * For each *.jpg / *.jpeg in the target directories:
 *   - <name>.avif   (quality 60)
 *   - <name>.webp   (quality 80)
 *   - <name>.jpg    re-encoded mozjpeg, quality 82, progressive (overwrites source)
 *   - If source width > 1600px: also produce <name>-640w.{avif,webp,jpg}
 *
 * Also writes public/case-studies/_lqip.json mapping filename → base64 LQIP string.
 *
 * Usage: node scripts/optimize-images.mjs
 */

import { readdir, stat, writeFile, rename, unlink } from 'node:fs/promises'
import { join, basename, extname } from 'node:path'
import sharp from 'sharp'

const DIRS = [
  'public/case-studies',
]

const AVIF_Q    = 60
const WEBP_Q    = 80
const JPG_Q     = 82
const WIDE_BREAK = 1600
const NARROW_W  = 640
const LQIP_W    = 16
const LQIP_Q    = 30

let grandBefore = 0
let grandAfter  = 0

for (const dir of DIRS) {
  console.log(`\n── ${dir} ──`)

  const lqipMap = {}
  const variantsMap = {}
  const files = (await readdir(dir))
    .filter(f => /\.(jpe?g)$/i.test(f) && !f.startsWith('_'))
    .sort()

  for (const file of files) {
    const src    = join(dir, file)
    const name   = basename(file, extname(file))
    const { size: sizeBefore } = await stat(src)
    grandBefore += sizeBefore

    const img  = sharp(src)
    const meta = await img.metadata()
    const wide = (meta.width ?? 0) > WIDE_BREAK

    // ── default variants ────────────────────────────────────────────────────
    await Promise.all([
      sharp(src).avif({ quality: AVIF_Q }).toFile(join(dir, `${name}.avif`)),
      sharp(src).webp({ quality: WEBP_Q }).toFile(join(dir, `${name}.webp`)),
    ])

    // Re-encode JPEG: write to a temp file then rename over the original
    const tmpJpg = src + '.tmp.jpg'
    await sharp(src)
      .jpeg({ quality: JPG_Q, mozjpeg: true, progressive: true })
      .toFile(tmpJpg)
    try { await unlink(src) } catch { /* ignore */ }
    await rename(tmpJpg, src)

    // ── responsive variants (only when source > 1600 px wide) ───────────────
    variantsMap[file] = wide
    if (wide) {
      const resize2x = { width: Math.min(meta.width ?? WIDE_BREAK, WIDE_BREAK * 2), withoutEnlargement: true }
      await Promise.all([
        sharp(src).resize({ width: NARROW_W }).avif({ quality: AVIF_Q }).toFile(join(dir, `${name}-640w.avif`)),
        sharp(src).resize({ width: NARROW_W }).webp({ quality: WEBP_Q }).toFile(join(dir, `${name}-640w.webp`)),
        sharp(src).resize({ width: NARROW_W }).jpeg({ quality: JPG_Q, mozjpeg: true, progressive: true }).toFile(join(dir, `${name}-640w.jpg`)),
        // @2x — just the re-encoded AVIF/WebP at original resolution
        sharp(src).resize(resize2x).avif({ quality: AVIF_Q }).toFile(join(dir, `${name}@2x.avif`)),
        sharp(src).resize(resize2x).webp({ quality: WEBP_Q }).toFile(join(dir, `${name}@2x.webp`)),
      ])
    }

    // ── LQIP ────────────────────────────────────────────────────────────────
    const lqipBuf = await sharp(src)
      .resize({ width: LQIP_W })
      .jpeg({ quality: LQIP_Q })
      .toBuffer()
    lqipMap[file] = `data:image/jpeg;base64,${lqipBuf.toString('base64')}`

    const { size: sizeAfter } = await stat(src)
    grandAfter += sizeAfter

    const saving = ((sizeBefore - sizeAfter) / sizeBefore * 100).toFixed(1)
    console.log(
      `  ✓  ${file.padEnd(48)}  ${kb(sizeBefore).padStart(8)} → ${kb(sizeAfter).padStart(8)}  (jpg ${saving}%${wide ? '  +640w/@2x' : ''})`,
    )
  }

  // Write LQIP manifest
  const manifestPath = join(dir, '_lqip.json')
  await writeFile(manifestPath, JSON.stringify(lqipMap, null, 2) + '\n', 'utf8')
  console.log(`\n  LQIP manifest → ${manifestPath}  (${Object.keys(lqipMap).length} entries)`)

  // Write variants manifest (tracks which images have -640w/@2x variants)
  const variantsPath = join(dir, '_variants.json')
  await writeFile(variantsPath, JSON.stringify(variantsMap, null, 2) + '\n', 'utf8')
  console.log(`  Variants manifest → ${variantsPath}  (${Object.values(variantsMap).filter(Boolean).length} wide images)`)
}

const totalSaving = ((grandBefore - grandAfter) / grandBefore * 100).toFixed(1)
console.log('\n────────────────────────────────────────────────────────────────')
console.log(`  Total JPG before : ${kb(grandBefore)}`)
console.log(`  Total JPG after  : ${kb(grandAfter)}`)
console.log(`  Net saving (JPG) : ${kb(grandBefore - grandAfter)}  (${totalSaving}%)`)
console.log('  (AVIF/WebP variants are additional savings on top)')

function kb(bytes) {
  return (bytes / 1024).toFixed(1) + ' KB'
}
