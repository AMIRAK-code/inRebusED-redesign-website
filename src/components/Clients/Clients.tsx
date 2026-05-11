import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import styles from './Clients.module.css'
import clients from '../../data/clients'
import caseStudies from '../../data/case-studies'
import LogoMarquee from './LogoMarquee'
import FeaturedClients from './FeaturedClients'
import IndustryAccordion from './IndustryAccordion'

const STATS = [
  { key: 'studies',    label: 'Case Studies', value: caseStudies.length },
  { key: 'clients',    label: 'Clients',       value: clients.length },
  { key: 'years',      label: 'Years',         value: 23 },
  { key: 'categories', label: 'Categories',    value: 4 },
]

const enableParallax =
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Clients() {
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
          const obj    = { val: 0 }
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

        {/* ① Header */}
        <div className={`${styles.header} ${styles.block}`}>
          <span className={styles.label}>inEvolution — Who Has Chosen Us</span>
          <h2 className={styles.title}>
            Trusted by Industry<br />
            <span className={styles.titleAccent}>Leaders</span>
          </h2>
          <p className={styles.desc}>
            Every client is unique, with their own specific geography, population and
            culture. Every encounter enriches us and inspires us to find better solutions.
          </p>
        </div>

        {/* ② Stats strip */}
        <div className={`${styles.statsStrip} ${styles.block}`}>
          {STATS.map((stat, i) => (
            <div key={stat.key} className={styles.statCard}>
              <span
                ref={el => { statNumRefs.current[i] = el }}
                className={styles.statNum}
              >
                0
              </span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* ③ Logo marquee */}
        <div className={styles.block}>
          <LogoMarquee />
        </div>

        {/* ④ Featured client grid */}
        <div className={styles.block}>
          <FeaturedClients />
        </div>

        {/* ⑤ Industry accordion */}
        <div className={styles.block}>
          <IndustryAccordion />
        </div>

        {/* ⑥ Quote banner */}
        <div className={styles.quoteBanner}>
          <div className={styles.quoteOrb} aria-hidden="true" />
          <div className={styles.quoteContent}>
            <div className={styles.quoteIcon} aria-hidden="true">"</div>
            <p className={styles.quoteText}>
              Online learning is not the next big thing,
              <br />it is the <span className={styles.quoteAccent}>now big thing</span>
            </p>
            <cite className={styles.quoteAttr}>— Donna J. Abernathy</cite>
          </div>
        </div>

      </div>
    </section>
  )
}
