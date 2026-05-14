import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { useT } from '../../i18n/LangContext'
import styles from './Process.module.css'

const STEP_KEYS = [
  { num: '01', titleKey: 'process.s01.title', descKey: 'process.s01.desc' },
  { num: '02', titleKey: 'process.s02.title', descKey: 'process.s02.desc' },
  { num: '03', titleKey: 'process.s03.title', descKey: 'process.s03.desc' },
  { num: '04', titleKey: 'process.s04.title', descKey: 'process.s04.desc' },
  { num: '05', titleKey: 'process.s05.title', descKey: 'process.s05.desc' },
  { num: '06', titleKey: 'process.s06.title', descKey: 'process.s06.desc' },
  { num: '07', titleKey: 'process.s07.title', descKey: 'process.s07.desc' },
  { num: '08', titleKey: 'process.s08.title', descKey: 'process.s08.desc' },
  { num: '09', titleKey: 'process.s09.title', descKey: 'process.s09.desc' },
  { num: '10', titleKey: 'process.s10.title', descKey: 'process.s10.desc' },
]

export default function Process() {
  const { t } = useT()
  const [active, setActive] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const bigNumRef  = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from(`.${styles.left}`, {
      opacity: 0, x: -40, duration: 1, ease: 'expo',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
    })
    gsap.from(`.${styles.stepRow}`, {
      opacity: 0, x: 40,
      stagger: 0.07,
      duration: 0.7,
      ease: 'expo',
      scrollTrigger: { trigger: `.${styles.right}`, start: 'top 82%', once: true },
    })
  }, { scope: sectionRef })

  useGSAP(() => {
    if (!bigNumRef.current) return
    gsap.fromTo(
      bigNumRef.current,
      { clipPath: 'inset(100% 0% 0% 0%)', y: 32, opacity: 0 },
      { clipPath: 'inset(0% 0% 0% 0%)', y: 0, opacity: 1, duration: 0.55, ease: 'expo.out' },
    )
  }, { scope: sectionRef, dependencies: [active] })

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>

        <div className={styles.left}>
          <span className={styles.label}>{t('process.label')}</span>
          <h2 className={styles.title}>
            {t('process.title')}<br />
            <span className={styles.titleAccent}>{t('process.title.accent')}</span>
          </h2>
          <p className={styles.desc}>{t('process.desc')}</p>

          <blockquote className={styles.quote}>
            <div className={styles.quoteBar} />
            <div>
              <p className={styles.quoteText}>{t('process.quote')}</p>
              <cite className={styles.quoteAuthor}>{t('process.quote.author')}</cite>
            </div>
          </blockquote>

          <div className={styles.bigNumWrap} aria-hidden="true">
            <div ref={bigNumRef} className={styles.bigNum}>
              {STEP_KEYS[active].num}
            </div>
            <div className={styles.bigNumLabel}>{t(STEP_KEYS[active].titleKey)}</div>
          </div>
        </div>

        <div className={styles.right}>
          {STEP_KEYS.map((step, i) => (
            <div
              key={step.num}
              className={`${styles.stepRow} ${active === i ? styles.stepActive : ''}`}
              onMouseEnter={() => setActive(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setActive(i)}
              aria-expanded={active === i}
            >
              <span className={`${styles.stepNum} ${active === i ? styles.stepNumActive : ''}`}>
                {step.num}
              </span>
              <div className={styles.stepContent}>
                <div className={`${styles.stepTitle} ${active === i ? styles.stepTitleActive : ''}`}>
                  {t(step.titleKey)}
                </div>
                <div className={`${styles.stepDesc} ${active === i ? styles.stepDescActive : ''}`}>
                  {t(step.descKey)}
                </div>
              </div>
              <div className={`${styles.stepDot} ${active === i ? styles.stepDotActive : ''}`} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
