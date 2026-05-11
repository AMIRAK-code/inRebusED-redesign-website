import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import styles from './Services.module.css'

interface Pillar {
  num: string
  tag: string
  title: string
  intro: string
  items: { name: string; desc?: string }[]
}

const PILLARS: Pillar[] = [
  {
    num: '01',
    tag: 'Training Projects',
    title: 'Learning Experiences',
    intro: 'We create learning experiences that are tailored, effective and engaging.',
    items: [
      { name: 'eLearning courses',          desc: 'Bespoke and off-the-shelf' },
      { name: 'Digitisation',               desc: 'Of traditional training materials' },
      { name: 'Virtual classrooms',         desc: 'Multilingual webinars' },
      { name: 'Blended learning',           desc: 'For an integrated experience' },
      { name: 'Virtual coaching',           desc: 'For trainers and teams' },
      { name: 'Video training',             desc: 'Traditional, 360° and AI-powered' },
      { name: 'Immersive experiences',      desc: 'Augmented and virtual reality' },
    ],
  },
  {
    num: '02',
    tag: 'Classroom → Digital',
    title: 'Platforms & Ecosystems',
    intro: 'We design and develop intuitive, scalable digital platforms for managing and delivering training.',
    items: [
      { name: 'Digital Academy',            desc: 'Digital learning ecosystems' },
      { name: 'MoodleXR AI',                desc: 'AI-powered immersive open-source LMS' },
      { name: 'SkillFrame',                 desc: 'Competence & skills certification' },
      { name: 'SkillMatch',                 desc: 'Talent & skills matching platform' },
    ],
  },
  {
    num: '03',
    tag: 'Consultancy & Support',
    title: 'Lifecycle Services',
    intro: 'We support organisations throughout the entire training lifecycle — at their premises as well.',
    items: [
      { name: 'LMS administration',         desc: 'Operational platform management' },
      { name: 'Content management',         desc: 'Uploading, updating, mapping' },
      { name: 'Monitoring & analytics',     desc: 'Tracking, reporting, KPIs' },
      { name: 'Technical support',          desc: 'Helpdesk and troubleshooting' },
      { name: 'Online course design',       desc: 'Interactive digital content' },
      { name: 'Multimedia production',      desc: 'Presentations and videos' },
    ],
  },
]

function PillarCard({ p, index }: { p: Pillar; index: number }) {
  return (
    <article className={styles.pillar} style={{ '--i': index } as React.CSSProperties}>
      <div className={styles.pillarHead}>
        <div className={styles.pillarNum}>{p.num}</div>
        <div className={styles.pillarHeadText}>
          <div className={styles.pillarTag}>{p.tag}</div>
          <h3 className={styles.pillarTitle}>{p.title}</h3>
        </div>
      </div>
      <p className={styles.pillarIntro}>{p.intro}</p>
      <ul className={styles.pillarList}>
        {p.items.map((it) => (
          <li key={it.name} className={styles.pillarItem}>
            <span className={styles.pillarItemDot} aria-hidden="true">→</span>
            <div>
              <div className={styles.pillarItemName}>{it.name}</div>
              {it.desc && <div className={styles.pillarItemDesc}>{it.desc}</div>}
            </div>
          </li>
        ))}
      </ul>
    </article>
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
          <span className={styles.label}>inPractice — What We Do</span>
          <h2 className={styles.title}>
            1, 2, 3…<br />
            <span className={styles.titleAccent}>What We Do</span>
          </h2>
          <p className={styles.desc}>
            An effective framework for designing learning experiences through a modular
            approach based on interactive, combinable learning modules.
          </p>
        </div>

        <div className={styles.pillarsGrid}>
          {PILLARS.map((p, i) => (
            <PillarCard key={p.num} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
