import { useState, useRef, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { gsap, ScrollTrigger } from '../lib/gsap'
import Nav from '../components/Nav/Nav'
import caseStudies, { CATEGORY_LABEL, type Category } from '../data/case-studies'
import clients from '../data/clients'
import styles from './WorkPage.module.css'

const CATEGORIES: Category[] = [
  'digital-academy',
  'onboarding',
  'product-training',
  'vertical-training',
]

const FILTER_PILLS: { label: string; value: Category | 'all' }[] = [
  { label: 'All',               value: 'all'               },
  { label: 'Digital Academy',   value: 'digital-academy'   },
  { label: 'Onboarding',        value: 'onboarding'        },
  { label: 'Product Training',  value: 'product-training'  },
  { label: 'Vertical Training', value: 'vertical-training' },
]

const categoryCounts = Object.fromEntries(
  CATEGORIES.map(cat => [cat, caseStudies.filter(cs => cs.category === cat).length]),
) as Record<Category, number>

export default function WorkPage() {
  const [filter, setFilter]         = useState<Category | 'all'>('all')
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate                    = useNavigate()
  const gridRef                     = useRef<HTMLDivElement>(null)
  const isTransitioning             = useRef(false)
  const hasEnteredRef               = useRef(false)
  const isFirstFilter               = useRef(true)

  const clientFilter = searchParams.get('client')

  const filtered = clientFilter
    ? caseStudies.filter(cs => cs.client === clientFilter)
    : filter === 'all'
      ? caseStudies
      : caseStudies.filter(cs => cs.category === filter)

  function handleFilterChange(newFilter: Category | 'all') {
    if (newFilter === filter || isTransitioning.current) return
    isTransitioning.current = true

    const cards = gridRef.current
      ? Array.from(gridRef.current.querySelectorAll<HTMLElement>('[data-card]'))
      : []

    const commit = () => {
      setFilter(newFilter)
      isTransitioning.current = false
    }

    if (cards.length > 0) {
      gsap.to(cards, { opacity: 0, duration: 0.18, ease: 'power2.in', overwrite: true, onComplete: commit })
    } else {
      commit()
    }
  }

  // One-time ScrollTrigger entrance on mount
  useEffect(() => {
    const grid = gridRef.current
    if (!grid || hasEnteredRef.current) return
    hasEnteredRef.current = true

    const cards = Array.from(grid.querySelectorAll<HTMLElement>('[data-card]'))
    if (cards.length === 0) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: grid,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.from(cards, {
            opacity: 0, y: 32, stagger: 0.06, duration: 0.5, ease: 'power2.out',
          })
        },
      })
    }, grid)

    return () => ctx.revert()
  }, [])

  // Filter change — fade new cards in
  useEffect(() => {
    if (isFirstFilter.current) { isFirstFilter.current = false; return }
    const grid = gridRef.current
    if (!grid) return
    const cards = Array.from(grid.querySelectorAll<HTMLElement>('[data-card]'))
    if (cards.length === 0) return
    gsap.from(cards, { opacity: 0, y: 16, stagger: 0.04, duration: 0.3, ease: 'power2.out' })
  }, [filter])

  return (
    <div className={styles.page}>
      <Nav />
      <main className={styles.main}>

        {/* Hero strip */}
        <div className={styles.heroStrip}>
          <div className={styles.heroLeft}>
            <span className={styles.heroLabel}>Our Work</span>
            <h1 className={styles.heroHeading}>{caseStudies.length} Case Studies</h1>
          </div>
          <div className={styles.heroStats}>
            {CATEGORIES.map(cat => (
              <div key={cat} className={styles.statChip}>
                <span className={styles.statCount}>{categoryCounts[cat]}</span>
                <span className={styles.statLabel}>{CATEGORY_LABEL[cat]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filter tabs — replaced by client tag when navigated from Clients section */}
        {clientFilter ? (
          <div className={styles.clientTag}>
            <span>Showing: <strong>{clientFilter}</strong></span>
            <button
              className={styles.clientTagRemove}
              onClick={() => setSearchParams({})}
              aria-label="Clear client filter"
            >
              ×
            </button>
          </div>
        ) : (
          <div className={styles.filterRow} role="group" aria-label="Filter by category">
            {FILTER_PILLS.map(pill => (
              <button
                key={pill.value}
                className={`${styles.filterPill}${filter === pill.value ? ` ${styles.filterPillActive}` : ''}`}
                onClick={() => handleFilterChange(pill.value)}
                aria-pressed={filter === pill.value}
              >
                {pill.label}
              </button>
            ))}
          </div>
        )}

        {/* Card grid */}
        <div ref={gridRef} className={styles.grid}>
          {filtered.map(cs => {
            const clientData = clients.find(c => c.name === cs.client)
            return (
              <div
                key={cs.slug}
                data-card=""
                className={styles.card}
                role="button"
                tabIndex={0}
                aria-label={`View case study: ${cs.title}`}
                onClick={() => navigate(`/work/${cs.slug}`)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    navigate(`/work/${cs.slug}`)
                  }
                }}
              >
                <div className={styles.cardImgWrap}>
                  <img src={cs.image} alt={cs.title} loading="lazy" className={styles.cardImg} />
                  <span className={styles.cardTag}>{CATEGORY_LABEL[cs.category]}</span>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardClientRow}>
                    {clientData?.logo && (
                      <img src={clientData.logo} alt="" className={styles.cardClientLogo} />
                    )}
                    <span className={styles.cardClient}>{cs.client}</span>
                  </div>
                  <h3 className={styles.cardTitle}>{cs.title}</h3>
                  <p className={styles.cardBrief}>{cs.brief}</p>
                  <span className={styles.cardCta}>View Case Study →</span>
                </div>
              </div>
            )
          })}
        </div>

      </main>
    </div>
  )
}
