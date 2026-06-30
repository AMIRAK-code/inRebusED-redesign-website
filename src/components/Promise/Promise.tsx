import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { useT } from '../../i18n/LangContext'
import styles from './Promise.module.css'

export default function Promise() {
  const { t } = useT()
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from(
      `.${styles.label}, .${styles.title}, .${styles.body}`,
      {
        opacity: 0,
        y: 28,
        stagger: 0.1,
        duration: 0.9,
        ease: 'expo',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      },
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <span className={styles.label}>{t('promise.label')}</span>
        <h2 className={styles.title}>
          {t('promise.title')}<br />
          <span className={styles.titleAccent}>{t('promise.title.accent')}</span>
        </h2>
        <p className={styles.body}>{t('promise.body')}</p>
      </div>
    </section>
  )
}
