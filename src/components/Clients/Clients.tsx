import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { useT } from '../../i18n/LangContext'
import styles from './Clients.module.css'
import clients from '../../data/clients'
import LogoMarquee from './LogoMarquee'
import FeaturedClients from './FeaturedClients'
import IndustryAccordion from './IndustryAccordion'

const STATS = [
  { key: 'studies',    labelKey: 'clients.stat.shortlist',  value: null },
  { key: 'clients',    labelKey: 'clients.stat.clients',    value: clients.length },
  { key: 'years',      labelKey: 'clients.stat.years',      value: 23 },
  { key: 'categories', labelKey: 'clients.stat.categories', value: 4 },
]

const enableParallax =
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Clients() {
  const { t } = useT()
  const sectionRef  = useRef<HTMLElement>(null)
  const statNumRefs = useRef<(HTMLSpanElement | null)[]>([])
  const rafRef      = useRef<number | null>(null)

  const handleMouseMove = enableParallax
    ? (e: React.MouseEvent<HTMLElement>) => {
        if (rafRef.current !== null) return
        const rect = e.currentTarget.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        rafRef.current = requestAnimationFrame(() => {
          sectionRef.current?.style.setProperty('--mouse-x', x.toFixed(1))
          sectionRef.current?.style.setProperty('--mouse-y', y.toFixed(1))
          rafRef.current = null
        })
      }
    : undefined

  useGSAP(() => {
    gsap.from([`.${styles.label}`, `.${styles.title}`, `.${styles.desc}`], {
      opacity: 0, y: 28, stagger: 0.08, duration: 0.8, ease: 'expo',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
    })
    gsap.from(`.${styles.quoteBanner}`, {
      opacity: 0, y: 40, duration: 0.9, ease: 'expo',
      scrollTrigger: { trigger: `.${styles.quoteBanner}`, start: 'top 84%', once: true },
    })
    gsap.from(`.${styles.statsStrip}`, {
      opacity: 0, y: 32, duration: 0.8, ease: 'expo',
      scrollTrigger: { trigger: `.${styles.statsStrip}`, start: 'top 88%', once: true },
    })
    ScrollTrigger.create({
      trigger: `.${styles.statsStrip}`,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        statNumRefs.current.forEach((el, i) => {
          if (!el) return
          const target = STATS[i].value
          if (target === null) return
          const obj = { val: 0 }
          gsap.to(obj, {
            val: target,
            duration: 1.4,
            ease: 'power2.out',
            onUpdate: () => { el.textContent = String(Math.round(obj.val)) },
          })
        })
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      onMouseMove={handleMouseMove}
    >
      <div className={styles.container}>

        <div className={`${styles.header} ${styles.block}`}>
          <span className={styles.label}>{t('clients.label')}</span>
          <h2 className={styles.title}>
            {t('clients.title')}<br />
            <span className={styles.titleAccent}>{t('clients.title.accent')}</span>
          </h2>
          <p className={styles.desc}>{t('clients.desc')}</p>
        </div>

        <div className={`${styles.statsStrip} ${styles.block}`}>
          {STATS.map((stat, i) => (
            <div key={stat.key} className={styles.statCard}>
              <span
                ref={el => { statNumRefs.current[i] = el }}
                className={styles.statNum}
              >
                {stat.value === null ? caseStudies.length : '0'}
              </span>
              <span className={styles.statLabel}>{t(stat.labelKey)}</span>
            </div>
          ))}
        </div>

        <div className={styles.block}><LogoMarquee /></div>
        <div className={styles.block}><FeaturedClients /></div>
        <div className={styles.block}><IndustryAccordion /></div>

        <div className={styles.quoteBanner}>
          <div className={styles.quoteOrb} aria-hidden="true" />
          <div className={styles.quoteContent}>
            <div className={styles.quoteIcon} aria-hidden="true">"</div>
            <p className={styles.quoteText}>
              {t('clients.quote').split(t('clients.quote.accent')).map((part, i, arr) =>
                i < arr.length - 1
                  ? [part, <span key={i} className={styles.quoteAccent}>{t('clients.quote.accent')}</span>]
                  : part
              )}
            </p>
            <cite className={styles.quoteAttr}>{t('clients.quote.attr')}</cite>
          </div>
        </div>

      </div>
    </section>
  )
}
