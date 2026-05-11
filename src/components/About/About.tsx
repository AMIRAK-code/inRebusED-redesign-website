import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import styles from './About.module.css'

interface AboutProps {
  scrollTo: (id: string) => void
}

const TIMELINE = [
  { year: '2003', text: 'inRebus Technologies is founded in Turin as an IT software house and consulting firm.' },
  { year: '2013', text: 'Founded inRebus Digital Learning as a dedicated business unit specialising in digital learning.' },
  { year: '2020', text: 'inRebus joins Gruppo FOS S.p.A., an innovative technology consulting and research group.' },
  { year: 'Today', text: 'A strategic business unit of Gruppo FOS S.p.A. / AUDENSIEL.' },
]

const TEAM = [
  { label: 'Project Manager',                color: '#F58220' },
  { label: 'Instructional Designer',         color: '#E8451A' },
  { label: 'Multimedia Designer',            color: '#0A1628' },
  { label: 'Graphic & UX Designer',          color: '#202020' },
  { label: 'Story & Copy Writer',            color: '#F58220' },
  { label: 'Audio-Video Producer',           color: '#E8451A' },
  { label: 'eLearning Developer',            color: '#0A1628' },
  { label: 'Trainer',                        color: '#202020' },
]

export default function About({ scrollTo }: AboutProps) {
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
        {/* Left — text + timeline */}
        <div className={styles.left}>
          <span className={styles.label}>inSide — Who We Are</span>
          <h2 className={styles.title}>
            Innovation<br />
            <span className={styles.titleAccent}>Since 2003</span>
          </h2>
          <p className={styles.bodyText}>
            inRebus Digital Learning is a strategic business unit of Gruppo FOS S.p.A. / AUDENSIEL,
            with two decades of experience in designing and producing learning experiences that are
            tailored, effective and engaging.
          </p>

          <ol className={styles.timeline}>
            {TIMELINE.map(({ year, text }) => (
              <li key={year} className={styles.timelineItem}>
                <span className={styles.timelineYear}>{year}</span>
                <span className={styles.timelineText}>{text}</span>
              </li>
            ))}
          </ol>

          <button className={styles.btn} onClick={() => scrollTo('contact')}>
            Download Brochure →
          </button>
        </div>

        {/* Right — team grid */}
        <div className={styles.right}>
          <h3 className={styles.subTitle}>
            A Team Of Expert Professionals<br />
            <span className={styles.titleAccent}>Dedicated To Every Project</span>
          </h3>
          <p className={styles.bodyText}>
            Every project is tailored and managed by a dedicated team capable of creating
            innovative experiences and content always in line with the client's culture,
            organisational model and business.
          </p>
          <div className={styles.teamGrid}>
            {TEAM.map(({ label, color }) => (
              <div key={label} className={styles.teamCard}>
                <div className={styles.teamBar} style={{ background: color }} />
                <div className={styles.teamLabel}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
