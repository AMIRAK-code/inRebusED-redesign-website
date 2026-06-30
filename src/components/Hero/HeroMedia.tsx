import { useRef, useEffect, useState, useMemo } from 'react'
import styles from './Hero.module.css'

const VIDEOS = ['/hero-1.mp4', '/hero-2.mp4']
const POSTER = '/hero-poster.jpg'

const prefersReducedMotion =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

// Fisher–Yates shuffle — returns a new array
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Build a shuffled playlist once per mount. Repeat cycles re-shuffle for variety.
  const playlist = useMemo(() => shuffle(VIDEOS), [])
  const [index, setIndex] = useState(0)

  const currentSrc = playlist[index]

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.play().catch(() => {
      v.style.display = 'none'
    })
  }, [currentSrc])

  const handleEnded = () => {
    setIndex((i) => (i + 1) % playlist.length)
  }

  return (
    <div className={styles.heroBgMedia}>
      {prefersReducedMotion ? (
        <img
          src={POSTER}
          alt=""
          aria-hidden="true"
          className={styles.heroBgAsset}
          loading="eager"
          decoding="async"
        />
      ) : (
        <video
          ref={videoRef}
          key={currentSrc}
          src={currentSrc}
          className={styles.heroBgAsset}
          poster={POSTER}
          muted
          playsInline
          autoPlay
          disablePictureInPicture
          preload="metadata"
          aria-hidden="true"
          onEnded={handleEnded}
        />
      )}

      {/* Directional scrim — keeps left-side text legible over any background */}
      <div className={styles.heroBgScrim} aria-hidden="true" />
    </div>
  )
}
