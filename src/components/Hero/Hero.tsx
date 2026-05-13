import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, SplitText } from '../../lib/gsap'
import { useT } from '../../i18n/LangContext'
import styles from './Hero.module.css'
import HeroMedia from './HeroMedia'

interface HeroProps {
  scrollTo: (id: string) => void
}

const STATS = [
  { key: 'founded',   num: '2003', labelKey: 'hero.stat.founded.label' },
  { key: 'years',     num: `${new Date().getFullYear() - 2003}+`, labelKey: 'hero.stat.years.label' },
  { key: 'clients',   num: '40+',  labelKey: 'hero.stat.clients.label' },
  { key: 'solutions', num: '100%', labelKey: 'hero.stat.solutions.label' },
]

function parseStatNum(s: string): { value: number; suffix: string } {
  const m = s.match(/^(\d+)(.*)$/)
  return m ? { value: parseInt(m[1]), suffix: m[2] } : { value: 0, suffix: s }
}

export default function Hero({ scrollTo }: HeroProps) {
  const { t } = useT()
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2, defaults: { ease: 'expo' } })

    tl.to(`.${styles.overline}`, { opacity: 1, y: 0, duration: 0.6 })

    tl.set(`.${styles.headline}`, { opacity: 1 }, '<')
    const split = SplitText.create(`.${styles.headline}`, { type: 'words' })
    tl.from(
      split.words,
      { opacity: 0, y: 48, rotateX: -40, stagger: 0.06, duration: 0.9, transformPerspective: 800 },
      '<',
    )

    tl.to(`.${styles.sub}`,        { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
    tl.to(`.${styles.ctas}`,       { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
    tl.to(`.${styles.statsRow}`,   { opacity: 1, duration: 0.8 },        '-=0.2')
    tl.to(`.${styles.scrollHint}`, { opacity: 1, y: 0, duration: 0.6 }, '-=0.2')

    tl.add(() => {
      const els = Array.from(
        sectionRef.current!.querySelectorAll<HTMLElement>(`.${styles.statNum}`)
      )
      els.forEach((el, i) => {
        const { value, suffix } = parseStatNum(STATS[i].num)
        const obj = { val: 0 }
        gsap.to(obj, {
          val: value, duration: 1.8, ease: 'power2.out', snap: { val: 1 },
          onUpdate: () => { el.textContent = String(Math.round(obj.val)) + suffix },
        })
      })
    }, '-=0.6')

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.4,
      animation: gsap.timeline()
        .to(`.${styles.heroBgMedia}`, { scale: 0.86, opacity: 0.18, ease: 'none' }, 0)
        .to([`.${styles.orbOrange}`, `.${styles.orbSpicy}`, `.${styles.orbBlue}`], { opacity: 0, ease: 'none' }, 0)
        .to(`.${styles.scrollHint}`, { opacity: 0, ease: 'none' }, 0)
        .to(`.${styles.overline}`,   { opacity: 0, y: -48, ease: 'none' }, 0.05)
        .to(`.${styles.headline}`,   { opacity: 0, y: -80, ease: 'none' }, 0.05)
        .to(`.${styles.sub}`,        { opacity: 0, y: -48, ease: 'none' }, 0.12)
        .to(`.${styles.ctas}`,       { opacity: 0, y: -36, ease: 'none' }, 0.18)
        .to(`.${styles.statsRow}`,   { opacity: 0, y: -24, ease: 'none' }, 0.22),
    })
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
          <div className={styles.orbOrange} />
          <div className={styles.orbSpicy} />
          <div className={styles.orbBlue} />
          <div className={styles.gridLines} />
        </div>

        <div className={styles.inner}>
          <p className={styles.overline}>
            <span className={styles.overlineDot}>●</span>
            {t('hero.overline')}
          </p>

          <h1 className={styles.headline}>
            <span className={styles.headlineAccent}>{t('hero.headline.accent')}</span>
            <br />{t('hero.headline.line2')}
            <br /><span className={styles.headlineOutline}>{t('hero.headline.outline')}</span>
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
            <button
              className={styles.btnSecondary}
              onClick={() => scrollTo('contact')}
            >
              {t('hero.cta.brochure')}
            </button>
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

        <div className={styles.scrollHint} aria-hidden="true">
          <div className={styles.scrollLine} />
          <span className={styles.scrollText}>{t('hero.scroll')}</span>
        </div>

      </div>
    </section>
  )
}
