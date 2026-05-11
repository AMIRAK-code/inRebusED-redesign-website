import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import clients from '../../data/clients'
import styles from './LogoMarquee.module.css'

const allLogoClients = clients.filter(c => c.logo !== null)
const mid   = Math.ceil(allLogoClients.length / 2)
const half1 = allLogoClients.slice(0, mid)
const half2 = allLogoClients.slice(mid)

export default function LogoMarquee() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)
  const tl1Ref  = useRef<gsap.core.Timeline | null>(null)
  const tl2Ref  = useRef<gsap.core.Timeline | null>(null)

  const prefersReduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  useGSAP(() => {
    if (prefersReduced || !row1Ref.current || !row2Ref.current) return

    tl1Ref.current = gsap
      .timeline({ repeat: -1 })
      .fromTo(row1Ref.current, { x: '0%' }, { x: '-50%', duration: 80, ease: 'none' })

    tl2Ref.current = gsap
      .timeline({ repeat: -1 })
      .fromTo(row2Ref.current, { x: '-50%' }, { x: '0%', duration: 110, ease: 'none' })
  }, { scope: wrapRef })

  const pause  = () => { tl1Ref.current?.pause();  tl2Ref.current?.pause()  }
  const resume = () => { tl1Ref.current?.resume(); tl2Ref.current?.resume() }

  if (prefersReduced) {
    return (
      <div className={styles.staticGrid}>
        {allLogoClients.map(c => (
          <div key={c.name} className={styles.tile}>
            <img src={c.logo!} alt={c.name} className={styles.logo} loading="lazy" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div ref={wrapRef} className={styles.wrap} onMouseEnter={pause} onMouseLeave={resume}>
      {/* Row 1 — scrolls right-to-left */}
      <div className={styles.track}>
        <div ref={row1Ref} className={styles.row}>
          {[...half1, ...half1].map((c, i) => (
            <div key={`r1-${i}`} className={styles.tile}>
              <img src={c.logo!} alt={c.name} className={styles.logo} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls left-to-right */}
      <div className={styles.track}>
        <div ref={row2Ref} className={styles.row}>
          {[...half2, ...half2].map((c, i) => (
            <div key={`r2-${i}`} className={styles.tile}>
              <img src={c.logo!} alt={c.name} className={styles.logo} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
