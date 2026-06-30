import { useRef, useState, useEffect, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { gsap, Flip } from '../../lib/gsap'
import { useT } from '../../i18n/LangContext'
import styles from './Projects.module.css'
import caseStudies, { CATEGORY_LABEL, type Category } from '../../data/case-studies'
import { FilterBar }            from './FilterBar'
import { ProjectGrid }          from './ProjectGrid'
import { useProjectsAnimation } from './useProjectsAnimation'

type FilterValue = Category | 'all'

const FILTER_PILLS: { labelKey: string; value: FilterValue }[] = [
  { labelKey: 'projects.filter.all',        value: 'all'               },
  { labelKey: 'projects.filter.academy',    value: 'digital-academy'   },
  { labelKey: 'projects.filter.onboarding', value: 'onboarding'        },
  { labelKey: 'projects.filter.product',    value: 'product-training'  },
  { labelKey: 'projects.filter.vertical',   value: 'vertical-training' },
]

export default function Projects() {
  const { t } = useT()
  const navigate = useNavigate()
  const [filter, setFilter] = useState<FilterValue>('all')

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

  function moveIndicator(newFilter: string, animate: boolean) {
    const pill      = pillRefs.current.get(newFilter)
    const bar       = filterBarRef.current
    const indicator = indicatorRef.current
    if (!pill || !bar || !indicator) return

    const state = animate ? Flip.getState(indicator) : null
    const pRect = pill.getBoundingClientRect()
    const bRect = bar.getBoundingClientRect()

    gsap.set(indicator, {
      left:  pRect.left - bRect.left,
      width: pRect.width,
    })

    if (state) {
      Flip.from(state, { duration: 0.38, ease: 'power3.out' })
    }
  }

  useEffect(() => {
    const id = requestAnimationFrame(() => moveIndicator(filter, false))
    return () => cancelAnimationFrame(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { isTransitioning } = useProjectsAnimation(
    { sectionRef, cardWrapperRefs, cardRefs, dimRefs, counterRef, progressDotRefs, progressFillRef, filterBarRef, indicatorRef, pillRefs },
    N,
    filter,
    moveIndicator,
  )

  function handleFilterChange(newFilter: FilterValue) {
    if (newFilter === filter || isTransitioning.current) return
    isTransitioning.current = true

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

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      style={{ '--card-count': N } as React.CSSProperties}
    >
      <div className={styles.sticky}>
        <div className={styles.grain} aria-hidden="true" />

        <FilterBar
          filter={filter}
          pills={FILTER_PILLS}
          onFilterChange={handleFilterChange}
          filterBarRef={filterBarRef}
          indicatorRef={indicatorRef}
          pillRefs={pillRefs}
        />

        <div className={styles.titleScreen}>
          <span className={styles.titleLabel}>{t('projects.label')}</span>
          <h2 className={styles.titleHeading}>
            {t('projects.title')}<br />
            <span className={styles.titleAccent}>{t('projects.title.accent')}</span>
          </h2>
          <p className={styles.titleSub}>{t('projects.sub')}</p>
          <Link to="/work" className={styles.viewAllLink}>
            {t('projects.longlist')}
          </Link>
          <div className={styles.titleArrow} aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M6 13l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <ProjectGrid
          projects={PROJECTS}
          n={N}
          hasMore={HAS_MORE}
          navigate={navigate}
          cardWrapperRefs={cardWrapperRefs}
          cardRefs={cardRefs}
          dimRefs={dimRefs}
          counterRef={counterRef}
          progressDotRefs={progressDotRefs}
          progressFillRef={progressFillRef}
        />
      </div>
    </section>
  )
}
