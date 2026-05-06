import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import styles from './Clients.module.css'

const CLIENTS = [
  'Jeep', 'Alfa Romeo', 'Unicredit', 'Maserati', 'Reale',
  'Mopar', 'Intesa Sanpaolo', 'Iveco', 'Lancia', 'CNHi',
  'Esselunga', 'FCA', 'FTP', 'Magneti Marelli', 'Daikin',
  'Fiat', 'Abarth', 'SKP', 'Finmeccanica', 'Sky',
]

export default function Clients() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from([`.${styles.label}`, `.${styles.title}`, `.${styles.desc}`], {
      opacity: 0, y: 28, stagger: 0.08, duration: 0.8, ease: 'expo',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
    })
    gsap.from(`.${styles.quoteBanner}`, {
      opacity: 0, y: 40, duration: 0.9, ease: 'expo',
      scrollTrigger: { trigger: `.${styles.quoteBanner}`, start: 'top 84%', once: true },
    })
    gsap.from(`.${styles.chip}`, {
      opacity: 0, scale: 0.9,
      stagger: 0.04,
      duration: 0.5,
      ease: 'back.out(1.5)',
      scrollTrigger: { trigger: `.${styles.chipsGrid}`, start: 'top 84%', once: true },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <span className={styles.label}>inEvolution — Our Clients</span>
          <h2 className={styles.title}>
            Trusted by Industry<br />
            <span className={styles.titleAccent}>Leaders</span>
          </h2>
          <p className={styles.desc}>
            Each client is a world with its own geography, population and culture.
            Each encounter enriches us and inspires us towards always more creative
            and effective solutions.
          </p>
        </div>

        {/* Quote banner */}
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

        {/* Client chips */}
        <div className={styles.chipsGrid}>
          {CLIENTS.map((name) => (
            <span key={name} className={styles.chip}>{name}</span>
          ))}
        </div>

      </div>
    </section>
  )
}
