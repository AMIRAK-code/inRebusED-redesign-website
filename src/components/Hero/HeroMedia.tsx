import styles from './Hero.module.css'

/**
 * Drop your background asset into /public/:
 *   hero.mp4  — recommended (full colour, GPU-accelerated, tiny file)
 *   hero.webm — optional second source for older Firefox
 *   hero.gif  — works but expect large file size & 256-colour limit
 *
 * The component renders whichever file is present.
 * If none are found the canvas-style orb gradient background shows through.
 */

// Vite resolves /public files at the root path at runtime — no import needed.
const VIDEO_SRC  = '/hero.mp4'
const WEBM_SRC   = '/hero.webm'
const GIF_SRC    = '/hero.gif'

export default function HeroMedia() {
  return (
    <div className={styles.heroBgMedia}>
      {/* ── Try video first (MP4 / WebM) ───────────────────────────── */}
      <video
        className={styles.heroBgAsset}
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        aria-hidden="true"
        // If the browser can't play video at all it skips to the <img> below
        onError={e => { (e.currentTarget as HTMLVideoElement).style.display = 'none' }}
      >
        <source src={WEBM_SRC} type="video/webm" />
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* ── GIF fallback ────────────────────────────────────────────── */}
      <img
        src={GIF_SRC}
        alt=""
        aria-hidden="true"
        className={`${styles.heroBgAsset} ${styles.heroBgGif}`}
        loading="eager"
        decoding="async"
      />

      {/* ── Dark scrim so headline text stays legible ────────────────── */}
      <div className={styles.heroBgScrim} aria-hidden="true" />
    </div>
  )
}
