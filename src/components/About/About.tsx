import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import styles from './About.module.css'

interface AboutProps {
  scrollTo: (id: string) => void
}

const TEAM = [
  { label: 'Project Managers',       color: '#F58220' },
  { label: 'Instructional Designers', color: '#E8451A' },
  { label: 'Graphic Designers',       color: '#0A1628' },
  { label: 'Video Makers',            color: '#202020' },
  { label: 'Illustrators',            color: '#F58220' },
  { label: 'Developers',              color: '#E8451A' },
]

export default function About({ scrollTo }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    // Left column
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

    // Team cards stagger
    gsap.from(`.${styles.teamCard}`, {
      opacity: 0, y: 36, scale: 0.96,
      stagger: 0.08, duration: 0.7, ease: 'expo',
      scrollTrigger: { trigger: `.${styles.teamGrid}`, start: 'top 82%', once: true },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        {/* Left — text */}
        <div className={styles.left}>
          <span className={styles.label}>inSide — About Us</span>
          <h2 className={styles.title}>
            Research &amp;<br />
            <span className={styles.titleAccent}>Development</span>
            <br />Since 2003
          </h2>
          <p className={styles.bodyText}>
            inRebus was born in Turin in 2003 as a software house and consulting company,
            following a development path in the IT sector started in the&nbsp;90s.
          </p>
          <p className={styles.bodyText}>
            A few years ago we raised as a challenge the idea of starting a business line
            devoted to e-learning training — and rapidly transformed that challenge into
            a vital and constantly evolving reality.
          </p>
          <button className={styles.btn} onClick={() => scrollTo('contact')}>
            Download Brochure →
          </button>
        </div>

        {/* Right — team grid */}
        <div className={styles.teamGrid}>
          {TEAM.map(({ label, color }) => (
            <div key={label} className={styles.teamCard}>
              <div className={styles.teamBar} style={{ background: color }} />
              <div className={styles.teamLabel}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
