import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import styles from './Services.module.css'

interface Service {
  tag: string
  title: string
  desc: string
}

const SERVICES: Service[] = [
  { tag: 'Custom',   title: 'Educational Projects',    desc: 'Tailor-made digital learning experiences designed around your specific needs, brand, and learner profile.' },
  { tag: 'Design',   title: 'Graphic Design',          desc: 'Visual identity and interface design for courses, platforms and educational materials.' },
  { tag: 'Creative', title: 'Creative Communication',  desc: 'Outside-the-box approaches to knowledge transfer — we break the conventions of corporate e-learning.' },
  { tag: 'Strategy', title: 'Instructional Design',    desc: 'Structuring learning objectives, assessments, and paths that deliver measurable outcomes.' },
  { tag: 'Build',    title: 'Courses Development',     desc: 'Full production of SCORM/xAPI-compliant courses optimised across all devices and LMS platforms.' },
  { tag: 'Tech',     title: 'Web/App Programming',     desc: 'Assessment apps, custom LMS, SaaS platforms and deep integrations with your existing ecosystem.' },
  { tag: 'Visual',   title: 'Illustration',            desc: 'Original illustration style that gives inRebus courses a recognisable, human, and engaging quality.' },
  { tag: 'Media',    title: 'Smart Video',             desc: 'Our proprietary SV line — interactive video that turns passive watching into active learning.' },
  { tag: 'Global',   title: 'Translation & Voice',     desc: 'Multilingual courses with professional voice-over in multiple European and global languages.' },
]

function ServiceCard({ tag, title, desc }: Service) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${hovered ? styles.cardHovered : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.cardTag}>{tag}</div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDesc}>{desc}</p>
      <span className={`${styles.cardArrow} ${hovered ? styles.cardArrowHovered : ''}`} aria-hidden="true">→</span>
    </div>
  )
}

export default function Services() {
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
      opacity: 0, y: 40,
      stagger: 0.06,
      duration: 0.75,
      ease: 'expo',
      scrollTrigger: { trigger: `.${styles.grid}`, start: 'top 82%', once: true },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>inPractice — Our Services</span>
          <h2 className={styles.title}>
            All The Necessary<br />
            <span className={styles.titleAccent}>Skills</span>
          </h2>
          <p className={styles.desc}>
            We cover every phase — from training needs analysis to results evaluation —
            in-house, with a trusted network when needed.
          </p>
        </div>

        <div className={styles.grid}>
          {SERVICES.map((sv) => (
            <ServiceCard key={sv.title} {...sv} />
          ))}
        </div>
      </div>
    </section>
  )
}
