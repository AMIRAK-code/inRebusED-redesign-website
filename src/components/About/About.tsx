import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { useT } from '../../i18n/LangContext'
import styles from './About.module.css'

interface AboutProps {
  scrollTo: (id: string) => void
}

const TIMELINE_KEYS = [
  { year: '2003',  textKey: 'about.timeline.2003'  },
  { year: '2013',  textKey: 'about.timeline.2013'  },
  { year: '2020',  textKey: 'about.timeline.2020'  },
  { year: 'Today', textKey: 'about.timeline.today' },
]

const TEAM_KEYS = [
  { labelKey: 'about.team.pm',      color: '#F58220' },
  { labelKey: 'about.team.id',      color: '#E8451A' },
  { labelKey: 'about.team.mm',      color: '#0A1628' },
  { labelKey: 'about.team.ux',      color: '#202020' },
  { labelKey: 'about.team.copy',    color: '#F58220' },
  { labelKey: 'about.team.av',      color: '#E8451A' },
  { labelKey: 'about.team.dev',     color: '#0A1628' },
  { labelKey: 'about.team.trainer', color: '#202020' },
]

export default function About({ scrollTo }: AboutProps) {
  const { t } = useT()
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from(`.${styles.label}`, {
      opacity: 0, y: 24, duration: 0.7, ease: 'expo',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
    })
    gsap.from(`.${styles.title}`, {
      opacity: 0, y: 32, duration: 0.9, ease: 'expo', delay: 0.08,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
    })
    gsap.from([`.${styles.bodyText}`, `.${styles.btn}`], {
      opacity: 0, y: 24, stagger: 0.1, duration: 0.7, ease: 'expo', delay: 0.18,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
    })
    gsap.from(`.${styles.timelineItem}`, {
      opacity: 0, x: -24, stagger: 0.1, duration: 0.7, ease: 'expo',
      scrollTrigger: { trigger: `.${styles.timeline}`, start: 'top 85%', once: true },
    })
    gsap.from(`.${styles.teamCard}`, {
      opacity: 0, y: 36, scale: 0.96,
      stagger: 0.06, duration: 0.7, ease: 'expo',
      scrollTrigger: { trigger: `.${styles.teamGrid}`, start: 'top 82%', once: true },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.left}>
          <span className={styles.label}>{t('about.label')}</span>
          <h2 className={styles.title}>
            {t('about.title')}<br />
            <span className={styles.titleAccent}>{t('about.title.accent')}</span>
          </h2>
          <p className={styles.bodyText}>{t('about.body')}</p>

          <ol className={styles.timeline}>
            {TIMELINE_KEYS.map(({ year, textKey }) => (
              <li key={year} className={styles.timelineItem}>
                <span className={styles.timelineYear}>{year}</span>
                <span className={styles.timelineText}>{t(textKey)}</span>
              </li>
            ))}
          </ol>

          <button className={styles.btn} onClick={() => scrollTo('contact')}>
            {t('about.btn')}
          </button>
        </div>

        <div className={styles.right}>
          <h3 className={styles.subTitle}>
            {t('about.subtitle')}<br />
            <span className={styles.titleAccent}>{t('about.subtitle.accent')}</span>
          </h3>
          <p className={styles.bodyText}>{t('about.team.body')}</p>
          <div className={styles.teamGrid}>
            {TEAM_KEYS.map(({ labelKey, color }) => (
              <div key={labelKey} className={styles.teamCard}>
                <div className={styles.teamBar} style={{ background: color }} />
                <div className={styles.teamLabel}>{t(labelKey)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
