import { useRef, useEffect } from 'react'
import styles from './Hero.module.css'

const VIDEO_SRC = '/hero.mp4'
const WEBM_SRC  = '/hero.webm'
const GIF_SRC   = '/hero.gif'

export default function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    // Programmatic play handles React StrictMode double-mount and
    // browsers that silently ignore the autoPlay attribute
    v.play().catch(() => {
      // Autoplay blocked or file missing — reveal GIF layer behind it
      v.style.display = 'none'
    })
  }, [])

  return (
    <div className={styles.heroBgMedia}>
      <video
        ref={videoRef}
        className={styles.heroBgAsset}
        muted
        loop
        playsInline
        disablePictureInPicture
        preload="auto"
        aria-hidden="true"
      >
        <source src={WEBM_SRC} type="video/webm" />
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* GIF / static image fallback — visible only if video is hidden */}
      <img
        src={GIF_SRC}
        alt=""
        aria-hidden="true"
        className={`${styles.heroBgAsset} ${styles.heroBgGif}`}
        loading="eager"
        decoding="async"
      />

      {/* Directional scrim — keeps left-side text legible over any background */}
      <div className={styles.heroBgScrim} aria-hidden="true" />
    </div>
  )
}
