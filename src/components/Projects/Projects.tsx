import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import styles from './Projects.module.css'

import infografiaImg       from '../../images/Infografia.webp'
import minecraftImg        from '../../images/Minecraft Behind Bars.webp'
import resourcesImg        from '../../images/One of The Best - Resources of creativity Design.webp'
import downloadImg         from '../../images/download (1).webp'
import polaroidImg         from '../../images/Polaroid Poster.jpg'
import cinemaImg           from '../../images/cinema paradiso polaroid poster.webp'
import taxiDriverImg       from '../../images/TAXI DRIVER.jpg'

const PROJECTS = [
  { title: 'Infographics',           tag: 'Motion Design',         img: infografiaImg },
  { title: 'Minecraft Behind Bars',  tag: 'E-Learning',            img: minecraftImg },
  { title: 'Resources of Creativity',tag: 'Instructional Design',  img: resourcesImg },
  { title: 'Interactive Module',     tag: 'Digital Learning',      img: downloadImg },
  { title: 'Polaroid Poster',        tag: 'Visual Design',         img: polaroidImg },
  { title: 'Cinema Paradiso',        tag: 'Creative Direction',    img: cinemaImg },
  { title: 'Taxi Driver',            tag: 'Visual Design',         img: taxiDriverImg },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const track = trackRef.current
    if (!track) return

    const getDistance = () => track.scrollWidth - track.offsetWidth

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: () => `+=${getDistance()}`,
      scrub: 1.2,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        gsap.set(track, { x: -getDistance() * self.progress })
      },
    })

    return () => st.kill()
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Header — visible while track slides */}
      <div className={styles.header}>
        <span className={styles.label}>Our Work</span>
        <h2 className={styles.title}>
          Selected<br />
          <span className={styles.titleAccent}>Projects</span>
        </h2>
        <p className={styles.sub}>Scroll to explore</p>
        <div className={styles.scrollArrow} aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Scrolling track */}
      <div className={styles.viewport}>
        <div ref={trackRef} className={styles.track}>
          {PROJECTS.map((p, i) => (
            <div key={p.title} className={styles.card}>
              <img src={p.img} alt={p.title} className={styles.cardImg} loading="lazy" />
              <div className={styles.cardOverlay}>
                <span className={styles.cardTag}>{p.tag}</span>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <span className={styles.cardIndex}>{String(i + 1).padStart(2, '0')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress indicator */}
      <div className={styles.progressBar} aria-hidden="true">
        <div className={styles.progressTrack}>
          {PROJECTS.map((p) => (
            <div key={p.title} className={styles.progressDot} />
          ))}
        </div>
      </div>
    </section>
  )
}
