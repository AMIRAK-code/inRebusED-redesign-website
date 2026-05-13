import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { useT } from '../../i18n/LangContext'
import styles from './Products.module.css'

const PRODUCTS = [
  { tagKey: 'products.sv.tag',  nameKey: 'products.sv.name',  descKey: 'products.sv.desc',  accent: 'var(--orange)' },
  { tagKey: 'products.mxr.tag', nameKey: 'products.mxr.name', descKey: 'products.mxr.desc', accent: 'var(--spicy)'  },
  { tagKey: 'products.sf.tag',  nameKey: 'products.sf.name',  descKey: 'products.sf.desc',  accent: 'var(--orange)' },
  { tagKey: 'products.sm.tag',  nameKey: 'products.sm.name',  descKey: 'products.sm.desc',  accent: 'var(--spicy)'  },
]

export default function Products() {
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
    gsap.from(`.${styles.card}`, {
      opacity: 0, y: 56,
      stagger: 0.12,
      duration: 0.9,
      ease: 'expo',
      scrollTrigger: { trigger: `.${styles.grid}`, start: 'top 82%', once: true },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="products" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>{t('products.label')}</span>
          <h2 className={styles.title}>
            {t('products.title')}<br />
            <span className={styles.titleAccent}>{t('products.title.accent')}</span>
          </h2>
          <p className={styles.desc}>{t('products.desc')}</p>
        </div>

        <div className={styles.grid}>
          {PRODUCTS.map(p => (
            <article
              key={p.nameKey}
              className={styles.card}
              style={{ '--card-accent': p.accent } as React.CSSProperties}
            >
              <div className={styles.cardInner}>
                <div className={styles.cardTop}>
                  <span className={styles.cardTag}>{t(p.tagKey)}</span>
                  <div className={styles.cardDot} aria-hidden="true" />
                </div>
                <h3 className={styles.cardName}>{t(p.nameKey)}</h3>
                <p className={styles.cardDesc}>{t(p.descKey)}</p>
                <a href="#" className={styles.cardLink} aria-label={`${t('products.learnmore')} ${t(p.nameKey)}`}>
                  {t('products.learnmore')}
                </a>
              </div>
              <div className={styles.cardGlow} aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
