import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { useT } from '../../i18n/LangContext'
import styles from './Hero.module.css'
import HeroMedia from './HeroMedia'

interface HeroProps {
  scrollTo: (id: string) => void
}

const STATS = [
  { key: 'founded',   num: '2013', labelKey: 'hero.stat.founded.label' },
  { key: 'years',     num: `${new Date().getFullYear() - 2013}+`, labelKey: 'hero.stat.years.label' },
  { key: 'solutions', num: '100%', labelKey: 'hero.stat.solutions.label' },
]

function parseStatNum(s: string): { value: number; suffix: string } {
  const m = s.match(/^(\d+)(.*)$/)
  return m ? { value: parseInt(m[1]), suffix: m[2] } : { value: 0, suffix: s }
}

// ── Scroll-flip headline ──────────────────────────────────────────────────
// Three spans scrub-flip their text content as the section scrolls past.
// Final state matches the brand tagline: "LEARNING OUTSIDE THE BOX".
const INITIAL: [string, string, string] = ['CREATIVE', 'LEARNING', '']
const FINAL:   [string, string, string] = ['LEARNING', 'OUTSIDE', 'THE BOX']

export default function Hero({ scrollTo }: HeroProps) {
  const { t } = useT()
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    // ── Entrance ────────────────────────────────────────────────────────
    const tl = gsap.timeline({ delay: 0.2, defaults: { ease: 'expo' } })

    tl.set(`.${styles.headline}`, { opacity: 1 }, 0)
    tl.from(
      ['.sfh-word-0', '.sfh-word-1'],
      {
        opacity: 0, y: 48, rotateX: -40,
        stagger: 0.15, duration: 0.9,
        transformPerspective: 800, display: 'inline-block',
      },
      0,
    )
    tl.to(`.${styles.sub}`,        { opacity: 1, y: 0, duration: 0.7 }, 0.4)
    tl.to(`.${styles.ctas}`,       { opacity: 1, y: 0, duration: 0.55 }, 0.5)
    tl.to(`.${styles.statsRow}`,   { opacity: 1, duration: 0.5 }, 0.6)
    tl.to(`.${styles.scrollHint}`, { opacity: 1, y: 0, duration: 0.4 }, 0.7)
    tl.to(`.${styles.flipWord}`,   { opacity: 1, duration: 0.6 }, 0.6)

    tl.add(() => {
      const els = Array.from(
        sectionRef.current!.querySelectorAll<HTMLElement>(`.${styles.statNum}`)
      )
      els.forEach((el, i) => {
        const { value, suffix } = parseStatNum(STATS[i].num)
        const obj = { val: 0 }
        gsap.to(obj, {
          val: value, duration: 1.0, ease: 'power2.out', snap: { val: 1 },
          onUpdate: () => { el.textContent = String(Math.round(obj.val)) + suffix },
        })
      })
    }, 0.6)

    // ── Cursor parallax on background orbs ──────────────────────────────
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    type OrbSetter = { sx: ReturnType<typeof gsap.quickTo>; sy: ReturnType<typeof gsap.quickTo>; factor: number }
    let orbSetters: OrbSetter[] = []
    let onPointer: ((e: PointerEvent) => void) | null = null

    if (!reducedMotion && sectionRef.current) {
      const wraps = sectionRef.current.querySelectorAll<HTMLElement>('[data-orb-factor]')
      orbSetters = Array.from(wraps).map(el => ({
        sx: gsap.quickTo(el, 'x', { duration: 1.1, ease: 'power3.out' }),
        sy: gsap.quickTo(el, 'y', { duration: 1.1, ease: 'power3.out' }),
        factor: parseFloat(el.dataset.orbFactor || '24'),
      }))

      onPointer = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth  - 0.5
        const ny = e.clientY / window.innerHeight - 0.5
        for (const { sx, sy, factor } of orbSetters) {
          sx(nx * factor)
          sy(ny * factor)
        }
      }
      window.addEventListener('pointermove', onPointer, { passive: true })
    }

    // ── Sticky scroll-scrub text flip ───────────────────────────────────
    // Outer section is 400vh; inner is sticky 100vh. As the user scrolls,
    // the three words swap content via TextPlugin and the sub paragraph
    // fades. CTAs / stats / scroll-hint stay pinned with the sticky inner.
    if (!reducedMotion) {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.4,
        animation: gsap.timeline()
          // word-0: turns orange, text becomes FINAL[0]
          .to('.sfh-word-0', { color: 'var(--orange)', duration: 0.15 }, 0.1)
          .to('.sfh-word-0', { text: FINAL[0], duration: 0.3, ease: 'none' }, 0.1)
          // word-1: back to inherit (white), text becomes FINAL[1]
          .to('.sfh-word-1', { color: 'inherit', duration: 0.15 }, 0.1)
          .to('.sfh-word-1', { text: FINAL[1], duration: 0.3, ease: 'none' }, 0.1)
          // word-2: empty outline fills with FINAL[2]
          .to('.sfh-word-2', { text: FINAL[2], duration: 0.3, ease: 'none' }, 0.4)
          // sub fades as the headline locks into its final form
          .to(`.${styles.sub}`, { opacity: 0, y: -32, ease: 'none' }, 0.85),
      })
    } else {
      // Reduced motion: skip the scrub, show the final state.
      const w0 = sectionRef.current!.querySelector<HTMLElement>('.sfh-word-0')
      const w1 = sectionRef.current!.querySelector<HTMLElement>('.sfh-word-1')
      const w2 = sectionRef.current!.querySelector<HTMLElement>('.sfh-word-2')
      if (w0) { w0.textContent = FINAL[0]; w0.style.color = 'var(--orange)' }
      if (w1) { w1.textContent = FINAL[1]; w1.style.color = 'inherit' }
      if (w2) { w2.textContent = FINAL[2] }
    }

    return () => {
      if (onPointer) window.removeEventListener('pointermove', onPointer)
    }
  }, { scope: sectionRef })

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
      <div className={styles.sticky}>

        <div className={styles.bg} aria-hidden="true">
          <HeroMedia />
          <div className={`${styles.orbWrap} ${styles.orbOrangeWrap}`} data-orb-factor="22">
            <div className={styles.orbOrange} />
          </div>
          <div className={`${styles.orbWrap} ${styles.orbSpicyWrap}`} data-orb-factor="36">
            <div className={styles.orbSpicy} />
          </div>
          <div className={`${styles.orbWrap} ${styles.orbBlueWrap}`} data-orb-factor="16">
            <div className={styles.orbBlue} />
          </div>
          <div className={styles.gridLines} />
        </div>

        <div className={styles.inner}>
          <h1 className={styles.headline}>
            <span className={`sfh-word-0 ${styles.word0}`}>{INITIAL[0]}</span>
            <br />
            <span className={`sfh-word-1 ${styles.word1}`}>{INITIAL[1]}</span>
            <br />
            <span className={`sfh-word-2 ${styles.headlineOutline}`}>{INITIAL[2]}</span>
          </h1>

          <p className={styles.sub}>{t('hero.sub')}</p>

          <div className={styles.ctas}>
            <button
              className={styles.btnPrimary}
              onClick={() => scrollTo('services')}
              onMouseMove={onMagMove}
              onMouseLeave={onMagLeave}
            >
              {t('hero.cta.services')}
            </button>
            <Link to="/work" className={styles.btnWork}>
              {t('hero.cta.work')}
            </Link>
          </div>

          <div className={styles.statsRow}>
            {STATS.map(({ key, num, labelKey }) => (
              <div key={key} className={styles.stat}>
                <div className={styles.statNum}>{num}</div>
                <div className={styles.statLabel}>{t(labelKey)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.flipWord} aria-hidden="true">TORINO</div>

        <div className={styles.scrollHint} aria-hidden="true">
          <div className={styles.scrollLine} />
          <span className={styles.scrollText}>{t('hero.scroll')}</span>
        </div>

      </div>
    </section>
  )
}
