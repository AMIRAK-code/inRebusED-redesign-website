import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { useT } from '../../i18n/LangContext'
import styles from './Context.module.css'

const CHALLENGES = [
  { qKey: 'context.c1.q', aKey: 'context.c1.a' },
  { qKey: 'context.c2.q', aKey: 'context.c2.a' },
  { qKey: 'context.c3.q', aKey: 'context.c3.a' },
]

export default function Context() {
  const { t } = useT()
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from(`.${styles.label}, .${styles.title}, .${styles.lede}`, {
      opacity: 0, y: 24, stagger: 0.08, duration: 0.8, ease: 'expo',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
    })
    gsap.from(`.${styles.card}`, {
      opacity: 0, y: 32, stagger: 0.1, duration: 0.7, ease: 'expo', delay: 0.2,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <span className={styles.label}>{t('context.label')}</span>
        <h2 className={styles.title}>
          {t('context.title')}<br />
          <span className={styles.titleAccent}>{t('context.title.accent')}</span>
        </h2>
        <p className={styles.lede}>{t('context.lede')}</p>

        <div className={styles.grid}>
          {CHALLENGES.map((c, i) => (
            <article key={i} className={styles.card}>
              <div className={styles.num}>0{i + 1}</div>
              <h3 className={styles.q}>{t(c.qKey)}</h3>
              <p className={styles.a}>{t(c.aKey)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
