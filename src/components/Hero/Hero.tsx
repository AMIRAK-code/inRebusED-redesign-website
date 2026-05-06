import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText } from '../../lib/gsap'
import styles from './Hero.module.css'

interface HeroProps {
  scrollTo: (id: string) => void
}

const STATS = [
  { num: '2003', label: 'Founded in Turin' },
  { num: '20+',  label: 'Major clients' },
  { num: '3',    label: 'Language pairs' },
  { num: '100%', label: 'Custom solutions' },
]

export default function Hero({ scrollTo }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    // Elements start opacity:0 via CSS — animate TO visible
    const tl = gsap.timeline({ delay: 0.2, defaults: { ease: 'expo' } })

    tl.to(`.${styles.overline}`, { opacity: 1, y: 0, duration: 0.6 })

    // Headline: make container visible, split words animate in
    tl.set(`.${styles.headline}`, { opacity: 1 }, '<')
    const split = SplitText.create(`.${styles.headline}`, { type: 'words' })
    tl.from(
      split.words,
      { opacity: 0, y: 48, rotateX: -40, stagger: 0.06, duration: 0.9, transformPerspective: 800 },
      '<',
    )

    tl.to(`.${styles.sub}`,      { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
    tl.to(`.${styles.ctas}`,     { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
    tl.to(`.${styles.statsRow}`, { opacity: 1, duration: 0.8 },        '-=0.2')
    tl.to(`.${styles.scrollHint}`, { opacity: 1, y: 0, duration: 0.6 }, '-=0.2')

    // Orb parallax
    gsap.to(`.${styles.orbOrange}`, {
      y: -120,
      scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1.5 },
    })
    gsap.to(`.${styles.orbSpicy}`, {
      y: -70,
      scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 2 },
    })
  }, { scope: sectionRef })

  // Magnetic buttons
  const onMagMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width / 2) * 0.3
    const y = (e.clientY - r.top - r.height / 2) * 0.3
    gsap.to(e.currentTarget, { x, y, duration: 0.35, ease: 'power2.out' })
  }
  const onMagLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.75)' })
  }

  return (
    <section ref={sectionRef} className={styles.section} aria-label="Hero">
      {/* Background */}
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.orbOrange} />
        <div className={styles.orbSpicy} />
        <div className={styles.gridLines} />
      </div>

      {/* Content */}
      <div className={styles.inner}>
        <p className={styles.overline}>
          <span className={styles.overlineDot}>●</span>
          E-learning outside the box
        </p>

        <h1 className={styles.headline}>
          <span className={styles.headlineAccent}>Digital</span>
          <br />Learning
          <br /><span className={styles.headlineOutline}>Re-imagined</span>
        </h1>

        <p className={styles.sub}>
          We are project managers, instructional designers, illustrators,
          <br />video makers and developers. Based in Turin since 2003.
        </p>

        <div className={styles.ctas}>
          <button
            className={styles.btnPrimary}
            onClick={() => scrollTo('services')}
            onMouseMove={onMagMove}
            onMouseLeave={onMagLeave}
          >
            Explore Services
          </button>
          <button
            className={styles.btnSecondary}
            onClick={() => scrollTo('contact')}
          >
            Download Brochure
          </button>
        </div>

        {/* Stats */}
        <div className={styles.statsRow}>
          {STATS.map(({ num, label }) => (
            <div key={num} className={styles.stat}>
              <div className={styles.statNum}>{num}</div>
              <div className={styles.statLabel}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className={styles.scrollHint} aria-hidden="true">
        <div className={styles.scrollLine} />
        <span className={styles.scrollText}>scroll</span>
      </div>
    </section>
  )
}
