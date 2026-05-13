import { useRef, useState, useEffect, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, Flip } from '../../lib/gsap'
import styles from './Projects.module.css'
import caseStudies, { CATEGORY_LABEL, type Category } from '../../data/case-studies'

const FILTER_PILLS: { label: string; value: Category | 'all' }[] = [
  { label: 'All',               value: 'all'               },
  { label: 'Digital Academy',   value: 'digital-academy'   },
  { label: 'Onboarding',        value: 'onboarding'        },
  { label: 'Product Training',  value: 'product-training'  },
  { label: 'Vertical Training', value: 'vertical-training' },
]

const rotDir = (i: number) => (i % 2 === 0 ? 1 : -1)

export default function Projects() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<Category | 'all'>('all')

  const filteredStudies = useMemo(() => {
    const studies = filter === 'all'
      ? caseStudies
      : caseStudies.filter(cs => cs.category === filter)
      
    const shuffled = [...studies]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }, [filter])

  const PROJECTS = filteredStudies.slice(0, 10).map(cs => ({
    title:  cs.title,
    client: cs.client,
    tag:    CATEGORY_LABEL[cs.category],
    desc:   cs.brief,
    img:    cs.image,
    slug:   cs.slug,
  }))

  const HAS_MORE = filteredStudies.length > 10
  const N        = PROJECTS.length + (HAS_MORE ? 1 : 0)

  const sectionRef      = useRef<HTMLElement>(null)
  const cardWrapperRefs = useRef<(HTMLDivElement | null)[]>([])
  const cardRefs        = useRef<(HTMLDivElement | null)[]>([])
  const dimRefs         = useRef<(HTMLDivElement | null)[]>([])
  const counterRef      = useRef<HTMLSpanElement>(null)
  const progressDotRefs = useRef<(HTMLDivElement | null)[]>([])
  const progressFillRef = useRef<HTMLDivElement>(null)
  const filterBarRef    = useRef<HTMLDivElement>(null)
  const indicatorRef    = useRef<HTMLDivElement>(null)
  const pillRefs        = useRef<Map<string, HTMLButtonElement>>(new Map())
  const isTransitioning = useRef(false)

  // Position tab indicator over the active pill (with GSAP Flip)
  function moveIndicator(newFilter: string, animate: boolean) {
    const pill      = pillRefs.current.get(newFilter)
    const bar       = filterBarRef.current
    const indicator = indicatorRef.current
    if (!pill || !bar || !indicator) return

    const state  = animate ? Flip.getState(indicator) : null
    const pRect  = pill.getBoundingClientRect()
    const bRect  = bar.getBoundingClientRect()

    gsap.set(indicator, {
      left:  pRect.left - bRect.left,
      width: pRect.width,
    })

    if (state) {
      Flip.from(state, { duration: 0.38, ease: 'power3.out' })
    }
  }

  // Initialize indicator on mount (after first paint)
  useEffect(() => {
    const id = requestAnimationFrame(() => moveIndicator(filter, false))
    return () => cancelAnimationFrame(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleFilterChange(newFilter: Category | 'all') {
    if (newFilter === filter || isTransitioning.current) return
    isTransitioning.current = true

    // Animate tab indicator with GSAP Flip
    moveIndicator(newFilter, true)

    const wrappers = cardWrapperRefs.current.filter(Boolean) as HTMLDivElement[]
    const commit = () => {
      setFilter(newFilter)
      isTransitioning.current = false
    }

    if (wrappers.length > 0) {
      gsap.to(wrappers, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        overwrite: true,
        onComplete: commit,
      })
    } else {
      commit()
    }
  }

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return

    // Reset CSS custom props left over from previous filter
    cardWrapperRefs.current.forEach(w => {
      if (!w) return
      w.style.opacity = ''
      w.style.removeProperty('--ty')
      w.style.removeProperty('--sc')
      w.style.removeProperty('--rot')
    })
    dimRefs.current.forEach(d => {
      if (d) d.style.removeProperty('--dim')
    })
    if (counterRef.current) counterRef.current.textContent = '01'
    if (progressFillRef.current) progressFillRef.current.style.width = '0%'
    if (filterBarRef.current) {
      filterBarRef.current.style.opacity      = '1'
      filterBarRef.current.style.pointerEvents = 'auto'
    }

    // Re-position indicator after filter re-render
    requestAnimationFrame(() => moveIndicator(filter, false))

    const vh = () => window.innerHeight
    const triggers: ScrollTrigger[] = []
    const cleanups: (() => void)[] = []

    for (let i = 0; i < N; i++) {
      const idx = i

      // 3-D hover tilt
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

      // Scroll-linked stacking
      const st = ScrollTrigger.create({
        trigger: section,
        start: () => `top+=${idx * vh()} top`,
        end:   () => `top+=${(idx + 1) * vh()} top`,
        scrub: 0.5,
        invalidateOnRefresh: true,

        onUpdate(self) {
          const p = self.progress

          if (idx === 0 && filterBarRef.current) {
            const op = 1 - p
            filterBarRef.current.style.opacity       = String(op)
            filterBarRef.current.style.pointerEvents = op < 0.05 ? 'none' : 'auto'
          }

          const w0 = cardWrapperRefs.current[idx]
          if (w0) w0.style.setProperty('--ty', String((1 - p) * 115))

          const w1 = cardWrapperRefs.current[idx - 1]
          if (w1) {
            w1.style.setProperty('--sc',  String(1 - 0.06 * p))
            w1.style.setProperty('--rot', String(rotDir(idx - 1) * 1.8 * p))
          }
          const d1 = dimRefs.current[idx - 1]
          if (d1) d1.style.setProperty('--dim', String(0.3 * p))

          const w2 = cardWrapperRefs.current[idx - 2]
          if (w2) {
            w2.style.setProperty('--sc',  String(0.94 - 0.06 * p))
            w2.style.setProperty('--rot', String(rotDir(idx - 2) * (1.8 + 1.8 * p)))
          }
          const d2 = dimRefs.current[idx - 2]
          if (d2) d2.style.setProperty('--dim', String(0.3 + 0.25 * p))

          if (p >= 0.5 && counterRef.current) {
            counterRef.current.textContent = String(idx + 1).padStart(2, '0')
          }

          progressDotRefs.current.forEach((dot, j) => {
            if (!dot) return
            const active    = j < idx || (j === idx && p >= 0.5)
            const isCurrent = active && (j === idx || (j === idx - 1 && p < 0.5))
            dot.style.background = active ? 'var(--orange)' : 'rgba(255,255,255,0.18)'
            dot.style.height     = isCurrent ? `${28 + p * 10}px` : active ? '36px' : '20px'
          })

          if (progressFillRef.current) {
            progressFillRef.current.style.width = `${((idx + p) / N) * 100}%`
          }
        },
      })

      triggers.push(st)
    }

    ScrollTrigger.refresh()

    return () => {
      triggers.forEach(st => st.kill())
      cleanups.forEach(fn => fn())
    }
  }, { scope: sectionRef, dependencies: [filter] })

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      style={{ '--card-count': N } as React.CSSProperties}
    >
      <div className={styles.sticky}>

        {/* Grain texture */}
        <div className={styles.grain} aria-hidden="true" />

        {/* Filter bar with GSAP Flip sliding indicator */}
        <div
          ref={filterBarRef}
          className={styles.filterBar}
          role="group"
          aria-label="Filter by category"
        >
          {FILTER_PILLS.map(pill => (
            <button
              key={pill.value}
              ref={el => { if (el) pillRefs.current.set(pill.value, el) }}
              className={`${styles.filterPill}${filter === pill.value ? ` ${styles.filterPillActive}` : ''}`}
              onClick={() => handleFilterChange(pill.value)}
              aria-pressed={filter === pill.value}
            >
              {pill.label}
            </button>
          ))}
          {/* Sliding indicator driven by GSAP Flip */}
          <div ref={indicatorRef} className={styles.filterIndicator} aria-hidden="true" />
        </div>

        {/* Title screen */}
        <div className={styles.titleScreen}>
          <span className={styles.titleLabel}>Our Work</span>
          <h2 className={styles.titleHeading}>
            Selected<br />
            <span className={styles.titleAccent}>Projects</span>
          </h2>
          <p className={styles.titleSub}>This is the short list.</p>
          <Link to="/work" className={styles.viewAllLink}>
            The long list →
          </Link>
          <div className={styles.titleArrow} aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M6 13l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Left flank */}
        <div className={styles.leftFlank} aria-hidden="true">
          <div className={styles.counterBlock}>
            <span ref={counterRef} className={styles.counterNum}>01</span>
          </div>
          <span className={styles.flankLabel}>Our Work</span>
        </div>

        {/* Right flank */}
        <div className={styles.rightFlank} aria-hidden="true">
          <div className={styles.pips}>
            {Array.from({ length: N }).map((_, i) => (
              <div
                key={i}
                ref={el => { progressDotRefs.current[i] = el }}
                className={styles.pip}
              />
            ))}
          </div>
        </div>

        {/* Stacking cards — click → /work/[slug] */}
        {PROJECTS.map((p, i) => (
          <div
            key={p.slug}
            ref={el => { cardWrapperRefs.current[i] = el }}
            className={styles.cardWrapper}
            style={{ zIndex: i + 1 }}
          >
            <div
              ref={el => { cardRefs.current[i] = el }}
              className={styles.card}
              role="button"
              tabIndex={0}
              aria-label={`View project: ${p.title}`}
              onClick={() => navigate(`/work/${p.slug}`)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  navigate(`/work/${p.slug}`)
                }
              }}
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
                    {String(i + 1).padStart(2, '0')}
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

              <div ref={el => { dimRefs.current[i] = el }} className={styles.dim} />
            </div>
          </div>
        ))}

        {/* CTA card — when > 10 studies match the current filter */}
        {HAS_MORE && (
          <div
            ref={el => { cardWrapperRefs.current[PROJECTS.length] = el }}
            className={styles.cardWrapper}
            style={{ zIndex: PROJECTS.length + 1 }}
          >
            <div
              className={`${styles.card} ${styles.ctaCard}`}
              role="button"
              tabIndex={0}
              aria-label="View all case studies"
              onClick={() => navigate('/work')}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  navigate('/work')
                }
              }}
            >
              <h2 className={styles.ctaHeading}>STILL<br />HUNGRY?</h2>
              <p className={styles.ctaSub}>The list keeps going.</p>
              <span className={styles.ctaArrow}>→ Long list this way</span>
            </div>
          </div>
        )}

        {/* Progress bar */}
        <div className={styles.progressTrack} aria-hidden="true">
          <div ref={progressFillRef} className={styles.progressFill} />
        </div>

      </div>
    </section>
  )
}
