import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { useT } from '../../i18n/LangContext'
import styles from './Services.module.css'

const PILLAR_ACCENTS = ['var(--orange)', 'var(--spicy)', 'var(--navy)']

const PILLARS = [
  {
    num: '01',
    tagKey:   'services.p1.tag',
    titleKey: 'services.p1.title',
    introKey: 'services.p1.intro',
    items: [
      { nameKey: 'services.p1.i1.name', descKey: 'services.p1.i1.desc' },
      { nameKey: 'services.p1.i2.name', descKey: 'services.p1.i2.desc' },
      { nameKey: 'services.p1.i3.name', descKey: 'services.p1.i3.desc' },
      { nameKey: 'services.p1.i4.name', descKey: 'services.p1.i4.desc' },
      { nameKey: 'services.p1.i5.name', descKey: 'services.p1.i5.desc' },
      { nameKey: 'services.p1.i6.name', descKey: 'services.p1.i6.desc' },
      { nameKey: 'services.p1.i7.name', descKey: 'services.p1.i7.desc' },
    ],
  },
  {
    num: '02',
    tagKey:   'services.p2.tag',
    titleKey: 'services.p2.title',
    introKey: 'services.p2.intro',
    items: [
      { nameKey: 'services.p2.i1.name', descKey: 'services.p2.i1.desc' },
      { nameKey: 'services.p2.i2.name', descKey: 'services.p2.i2.desc' },
      { nameKey: 'services.p2.i3.name', descKey: 'services.p2.i3.desc' },
      { nameKey: 'services.p2.i4.name', descKey: 'services.p2.i4.desc' },
    ],
  },
  {
    num: '03',
    tagKey:   'services.p3.tag',
    titleKey: 'services.p3.title',
    introKey: 'services.p3.intro',
    items: [
      { nameKey: 'services.p3.i1.name', descKey: 'services.p3.i1.desc' },
      { nameKey: 'services.p3.i2.name', descKey: 'services.p3.i2.desc' },
      { nameKey: 'services.p3.i3.name', descKey: 'services.p3.i3.desc' },
      { nameKey: 'services.p3.i4.name', descKey: 'services.p3.i4.desc' },
      { nameKey: 'services.p3.i5.name', descKey: 'services.p3.i5.desc' },
      { nameKey: 'services.p3.i6.name', descKey: 'services.p3.i6.desc' },
    ],
  },
]

export default function Services() {
  const { t } = useT()
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from(`.${styles.label}`, {
      opacity: 0, y: 20, duration: 0.7, ease: 'expo',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
    })
    gsap.from(`.${styles.title}`, {
      opacity: 0, y: 32, duration: 0.9, ease: 'expo', delay: 0.08,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
    })
    gsap.from(`.${styles.desc}`, {
      opacity: 0, y: 20, duration: 0.7, ease: 'expo', delay: 0.16,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
    })
    gsap.from(`.${styles.pillar}`, {
      opacity: 0, y: 48,
      stagger: 0.12,
      duration: 0.85,
      ease: 'expo',
      scrollTrigger: { trigger: `.${styles.pillarsGrid}`, start: 'top 82%', once: true },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>{t('services.label')}</span>
          <h2 className={styles.title}>
            {t('services.title')}<br />
            <span className={styles.titleAccent}>{t('services.title.accent')}</span>
          </h2>
          <p className={styles.desc}>{t('services.desc')}</p>
        </div>

        <div className={styles.pillarsGrid}>
          {PILLARS.map((p, i) => (
            <article
              key={p.num}
              className={styles.pillar}
              style={{ '--i': i, '--pillar-accent': PILLAR_ACCENTS[i] } as React.CSSProperties}
            >
              <div className={styles.pillarHead}>
                <div className={styles.pillarNum}>{p.num}</div>
                <div className={styles.pillarHeadText}>
                  <div className={styles.pillarTag}>{t(p.tagKey)}</div>
                  <h3 className={styles.pillarTitle}>{t(p.titleKey)}</h3>
                </div>
              </div>
              <p className={styles.pillarIntro}>{t(p.introKey)}</p>
              <ul className={styles.pillarList}>
                {p.items.map(it => (
                  <li key={it.nameKey} className={styles.pillarItem}>
                    <span className={styles.pillarItemDot} aria-hidden="true">→</span>
                    <div>
                      <div className={styles.pillarItemName}>{t(it.nameKey)}</div>
                      <div className={styles.pillarItemDesc}>{t(it.descKey)}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
