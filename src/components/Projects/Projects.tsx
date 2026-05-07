import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import styles from './Projects.module.css'

import infografiaImg  from '../../images/Infografia.webp'
import minecraftImg   from '../../images/Minecraft Behind Bars.webp'
import resourcesImg   from '../../images/One of The Best - Resources of creativity Design.webp'
import downloadImg    from '../../images/download (1).webp'
import polaroidImg    from '../../images/Polaroid Poster.jpg'
import cinemaImg      from '../../images/cinema paradiso polaroid poster.webp'
import taxiDriverImg  from '../../images/TAXI DRIVER.jpg'

const PROJECTS = [
  {
    title: 'Supply Chain Academy',
    client: 'Piedmont Region',
    tag: 'Digital Academy',
    desc: '11 regional supply chain academies coordinating training for employed and unemployed workers across Piedmont.',
    img: infografiaImg,
  },
  {
    title: 'Digital Liguria',
    client: 'Liguria Digitale',
    tag: 'Digital Academy',
    desc: 'A free e-learning platform offering reskilling and digital-literacy courses to all residents of the Liguria Region.',
    img: resourcesImg,
  },
  {
    title: 'Dussmann Academy',
    client: 'Dussmann Services',
    tag: 'Digital Academy',
    desc: 'Corporate academy reaching 17,000 Italian employees with role-tailored e-learning, webinars and managerial training.',
    img: downloadImg,
  },
  {
    title: 'Marelli Campus',
    client: 'Marelli',
    tag: 'Digital Academy',
    desc: 'Ninety-plus online modules digitising classroom training for the Magneti Marelli authorised service network — running since 2014.',
    img: minecraftImg,
  },
  {
    title: 'Esselunga Onboarding',
    client: 'Esselunga',
    tag: 'Onboarding',
    desc: 'New recruits ride the iconic Esselunga van through historical scenes, exploring company history, campaigns and product innovations.',
    img: polaroidImg,
  },
  {
    title: 'Maserati History',
    client: 'Maserati',
    tag: 'Onboarding',
    desc: 'A century of Italian sports-car heritage organised by decade, immersing global sales staff in one of motoring’s most iconic brands.',
    img: cinemaImg,
  },
  {
    title: 'Clienteling Training',
    client: 'Gucci',
    tag: 'Product Training',
    desc: 'Mobile-first digital learning programme for Gucci stores and e-commerce teams, in line with the brand’s intercultural style.',
    img: taxiDriverImg,
  },
  {
    title: 'IVECO eDaily',
    client: 'IVECO',
    tag: 'Product Training',
    desc: 'Gamified, animated-film inspired module guiding the sales network through the features of the new electric Daily.',
    img: infografiaImg,
  },
  {
    title: 'Anti-Money Laundering Web Series',
    client: 'Intesa Sanpaolo',
    tag: 'Vertical Training',
    desc: 'Crime-comic mini-series presenting complex money-laundering cases as detective stories — released episode-by-episode.',
    img: minecraftImg,
  },
  {
    title: 'M-346 / C-27J Familiarisation',
    client: 'Leonardo Aircraft Division',
    tag: 'Product Training',
    desc: 'Online familiarisation modules with 360° on-board video and ATA-chapter coverage for Leonardo staff and international clients.',
    img: resourcesImg,
  },
]

const N = PROJECTS.length

// Alternate rotation direction per card so the pile looks organic
const rotDir = (i: number) => (i % 2 === 0 ? 1 : -1)

export default function Projects() {
  const sectionRef      = useRef<HTMLElement>(null)
  const cardRefs        = useRef<(HTMLDivElement | null)[]>([])
  const dimRefs         = useRef<(HTMLDivElement | null)[]>([])
  const counterRef      = useRef<HTMLSpanElement>(null)
  const progressDotRefs = useRef<(HTMLDivElement | null)[]>([])
  const progressFillRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return

    const vh = () => window.innerHeight

    // ── Initial state: all cards below viewport ──────────────────────────
    cardRefs.current.forEach(card => {
      if (card) gsap.set(card, { yPercent: 115 })
    })

    const triggers: ScrollTrigger[] = []
    const cleanups: (() => void)[] = []

    for (let i = 0; i < N; i++) {
      const idx = i

      // ── Hover tilt (3-D perspective tilt on current card) ──────────────
      const card = cardRefs.current[idx]
      if (card) {
        const onMove = (e: MouseEvent) => {
          const r = card.getBoundingClientRect()
          const x = (e.clientX - r.left  - r.width  / 2) / (r.width  / 2)
          const y = (e.clientY - r.top   - r.height / 2) / (r.height / 2)
          gsap.to(card, { rotateY: x * 7, rotateX: -y * 7, duration: 0.35, ease: 'power2.out', overwrite: 'auto' })
        }
        const onLeave = () => {
          gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'elastic.out(1,0.5)', overwrite: 'auto' })
        }
        card.addEventListener('mousemove', onMove)
        card.addEventListener('mouseleave', onLeave)
        cleanups.push(
          () => card.removeEventListener('mousemove', onMove),
          () => card.removeEventListener('mouseleave', onLeave),
        )
      }

      // ── Scroll-linked stacking transitions ─────────────────────────────
      const st = ScrollTrigger.create({
        trigger: section,
        start: () => `top+=${idx * vh()} top`,
        end:   () => `top+=${(idx + 1) * vh()} top`,
        scrub: 1.2,
        invalidateOnRefresh: true,

        onUpdate(self) {
          const p = self.progress

          // Card idx — slides up from below
          const c0 = cardRefs.current[idx]
          if (c0) gsap.set(c0, { yPercent: (1 - p) * 115 })

          // Card idx-1 — depth 0 → depth 1 (scale + rotate + dim)
          const c1  = cardRefs.current[idx - 1]
          const d1  = dimRefs.current[idx - 1]
          if (c1) gsap.set(c1, {
            scale:    1 - 0.06 * p,
            rotation: rotDir(idx - 1) * 1.8 * p,
            filter:   `blur(${(p * 1.5).toFixed(2)}px)`,
          })
          if (d1) gsap.set(d1, { opacity: 0.3 * p })

          // Card idx-2 — depth 1 → depth 2 (deepen further)
          const c2 = cardRefs.current[idx - 2]
          const d2 = dimRefs.current[idx - 2]
          if (c2) gsap.set(c2, {
            scale:    0.94 - 0.06 * p,
            rotation: rotDir(idx - 2) * (1.8 + 1.8 * p),
          })
          if (d2) gsap.set(d2, { opacity: 0.3 + 0.25 * p })

          // ── Flank updates ────────────────────────────────────────────────
          // Counter: flip to new card at 50% progress
          if (p >= 0.5 && counterRef.current) {
            counterRef.current.textContent = String(idx + 1).padStart(2, '0')
          }

          // Progress pips
          progressDotRefs.current.forEach((dot, j) => {
            if (!dot) return
            const active = j < idx || (j === idx && p >= 0.5)
            const isCurrent = active && (j === idx || (j === idx - 1 && p < 0.5))
            dot.style.background = active ? 'var(--orange)' : 'rgba(255,255,255,0.18)'
            dot.style.height     = isCurrent ? `${28 + p * 10}px` : active ? '36px' : '20px'
          })

          // Progress fill bar
          if (progressFillRef.current) {
            progressFillRef.current.style.width = `${((idx + p) / N) * 100}%`
          }
        },
      })

      triggers.push(st)
    }

    return () => {
      triggers.forEach(st => st.kill())
      cleanups.forEach(fn => fn())
    }
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      style={{ '--card-count': N } as React.CSSProperties}
    >
      <div className={styles.sticky}>

        {/* ── Grain texture overlay ──────────────────────────────────── */}
        <div className={styles.grain} aria-hidden="true" />

        {/* ── Title screen (z-index 0, behind all cards) ─────────────── */}
        <div className={styles.titleScreen}>
          <span className={styles.titleLabel}>Our Work</span>
          <h2 className={styles.titleHeading}>
            Selected<br />
            <span className={styles.titleAccent}>Projects</span>
          </h2>
          <p className={styles.titleSub}>{String(N).padStart(2, '0')} case studies</p>
          <div className={styles.titleArrow} aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M6 13l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* ── Left flank ─────────────────────────────────────────────── */}
        <div className={styles.leftFlank} aria-hidden="true">
          <div className={styles.counterBlock}>
            <span ref={counterRef} className={styles.counterNum}>01</span>
            <span className={styles.counterTotal}>/{String(N).padStart(2, '0')}</span>
          </div>
          <span className={styles.flankLabel}>Our Work</span>
        </div>

        {/* ── Right flank ────────────────────────────────────────────── */}
        <div className={styles.rightFlank} aria-hidden="true">
          <div className={styles.pips}>
            {PROJECTS.map((_, i) => (
              <div
                key={i}
                ref={el => { progressDotRefs.current[i] = el }}
                className={styles.pip}
              />
            ))}
          </div>
        </div>

        {/* ── Stacking cards ─────────────────────────────────────────── */}
        {PROJECTS.map((p, i) => (
          <div
            key={p.title}
            className={styles.cardWrapper}
            style={{ zIndex: i + 1 }}
          >
            <div
              ref={el => { cardRefs.current[i] = el }}
              className={styles.card}
              role="button"
              tabIndex={0}
              aria-label={`View project: ${p.title}`}
              onClick={() => {/* navigate to project */ }}
            >
              <img
                src={p.img}
                alt={p.title}
                className={styles.cardImg}
                loading={i < 2 ? 'eager' : 'lazy'}
                onLoad={() => ScrollTrigger.refresh()}
              />

              <div className={styles.gradient} />

              <div className={styles.cardContent}>
                <div className={styles.cardTop}>
                  <span className={styles.cardTag}>{p.tag}</span>
                  <span className={styles.cardCount}>
                    {String(i + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(N).padStart(2, '0')}
                  </span>
                </div>

                <div className={styles.cardBottom}>
                  <span className={styles.cardClient}>{p.client}</span>
                  <h3 className={styles.cardTitle}>{p.title}</h3>
                  <p className={styles.cardDesc}>{p.desc}</p>
                  <span className={styles.cardCta}>
                    View Project
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </div>

              {/* Dim overlay — GSAP sets opacity as next card enters */}
              <div ref={el => { dimRefs.current[i] = el }} className={styles.dim} />
            </div>
          </div>
        ))}

        {/* ── Bottom progress bar ────────────────────────────────────── */}
        <div className={styles.progressTrack} aria-hidden="true">
          <div ref={progressFillRef} className={styles.progressFill} />
        </div>

      </div>
    </section>
  )
}
