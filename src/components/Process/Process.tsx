import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import styles from './Process.module.css'

const STEPS = [
  { num: '01', title: 'Briefing',      desc: 'Definition of guidelines with the client.' },
  { num: '02', title: 'Research',      desc: 'Document analysis and deep subject-matter investigation.' },
  { num: '03', title: 'Project',       desc: 'Definition of structure and delivery method.' },
  { num: '04', title: 'Feedback',      desc: 'First validation cycle with the client.' },
  { num: '05', title: 'Storyboarding', desc: 'Content mapping, scripts and visual narrative for every module.' },
  { num: '06', title: 'Visual Design', desc: 'Graphic interface designed to project specifications.' },
  { num: '07', title: 'Validation',    desc: 'Sign-off of the visual design and storyboard.' },
  { num: '08', title: 'Production',    desc: 'Course development with validated graphics and storyboard.' },
  { num: '09', title: 'Testing',       desc: 'Quality control, accessibility and cross-platform validation.' },
  { num: '10', title: 'Delivery',      desc: 'Final release with deployment and monitoring support.' },
]

export default function Process() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const bigNumRef = useRef<HTMLDivElement>(null)

  // Scroll-in entrance animations
  useGSAP(() => {
    gsap.from(`.${styles.left}`, {
      opacity: 0, x: -40, duration: 1, ease: 'expo',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
    })
    gsap.from(`.${styles.stepRow}`, {
      opacity: 0, x: 40,
      stagger: 0.07,
      duration: 0.7,
      ease: 'expo',
      scrollTrigger: { trigger: `.${styles.right}`, start: 'top 82%', once: true },
    })
  }, { scope: sectionRef })

  // Number change animation — fires whenever active step changes
  useGSAP(() => {
    if (!bigNumRef.current) return
    gsap.fromTo(
      bigNumRef.current,
      { clipPath: 'inset(100% 0% 0% 0%)', y: 32, opacity: 0 },
      { clipPath: 'inset(0% 0% 0% 0%)', y: 0, opacity: 1, duration: 0.55, ease: 'expo.out' },
    )
  }, { scope: sectionRef, dependencies: [active] })

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>

        {/* Left — sticky info */}
        <div className={styles.left}>
          <span className={styles.label}>inAction — How We Work</span>
          <h2 className={styles.title}>
            Everything<br />
            <span className={styles.titleAccent}>Under Control</span>
          </h2>
          <p className={styles.desc}>
            Every stage of every project is under control — from the first briefing to
            final deployment, with feedback loops at every checkpoint.
          </p>

          <blockquote className={styles.quote}>
            <div className={styles.quoteBar} />
            <div>
              <p className={styles.quoteText}>
                "No great mind has ever existed without a touch of madness"
              </p>
              <cite className={styles.quoteAuthor}>— Seneca</cite>
            </div>
          </blockquote>

          {/* Large animated step number */}
          <div className={styles.bigNumWrap} aria-hidden="true">
            <div ref={bigNumRef} className={styles.bigNum}>
              {STEPS[active].num}
            </div>
            <div className={styles.bigNumLabel}>{STEPS[active].title}</div>
          </div>
        </div>

        {/* Right — accordion list */}
        <div className={styles.right}>
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className={`${styles.stepRow} ${active === i ? styles.stepActive : ''}`}
              onMouseEnter={() => setActive(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setActive(i)}
              aria-expanded={active === i}
            >
              <span className={`${styles.stepNum} ${active === i ? styles.stepNumActive : ''}`}>
                {step.num}
              </span>
              <div className={styles.stepContent}>
                <div className={`${styles.stepTitle} ${active === i ? styles.stepTitleActive : ''}`}>
                  {step.title}
                </div>
                <div className={`${styles.stepDesc} ${active === i ? styles.stepDescActive : ''}`}>
                  {step.desc}
                </div>
              </div>
              <div className={`${styles.stepDot} ${active === i ? styles.stepDotActive : ''}`} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
