import { useState, useRef, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import clients, { type Industry } from '../../data/clients'
import caseStudies from '../../data/case-studies'
import styles from './IndustryAccordion.module.css'

// ── Industry display metadata ──────────────────────────────────────────────

function IndustryIcon({ industry }: { industry: Industry }) {
  switch (industry) {
    case 'automotive':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 17H3v-5l2.5-5h13L21 12v5h-2" />
          <circle cx="7.5" cy="17.5" r="2.5" />
          <circle cx="16.5" cy="17.5" r="2.5" />
          <path d="M5 12h14" />
        </svg>
      )
    case 'aerospace-defense':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
        </svg>
      )
    case 'finance':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18M3 18h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7M3 11l9-8 9 8" />
        </svg>
      )
    case 'retail-lifestyle':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
      )
    case 'industrial-services':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="14" width="20" height="7" rx="1" />
          <path d="M6 14V9l4-4 4 4v5" />
          <path d="M2 14l4-9h12l4 9" />
          <path d="M10 21v-4h4v4" />
        </svg>
      )
    case 'public-sector':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 22h18M4 11v9M8 11v9M12 11v9M16 11v9M20 11v9M3 11h18M12 2L3 9h18L12 2z" />
        </svg>
      )
  }
}

const INDUSTRY_LABELS: Record<Industry, string> = {
  'automotive':          'Automotive',
  'aerospace-defense':   'Aerospace & Defense',
  'finance':             'Finance',
  'retail-lifestyle':    'Retail & Lifestyle',
  'industrial-services': 'Industrial Services',
  'public-sector':       'Public Sector',
}

// ── Group and sort ─────────────────────────────────────────────────────────

type Group = { industry: Industry; list: typeof clients }

const groups: Group[] = (
  Object.entries(
    clients.reduce<Record<string, typeof clients>>((acc, c) => {
      if (!acc[c.industry]) acc[c.industry] = []
      acc[c.industry].push(c)
      return acc
    }, {})
  ) as [Industry, typeof clients][]
)
  .map(([industry, list]) => ({ industry, list }))
  .sort((a, b) => b.list.length - a.list.length)

// ── Component ──────────────────────────────────────────────────────────────

export default function IndustryAccordion() {
  const navigate    = useNavigate()
  const [open, setOpen] = useState<Set<Industry>>(() => new Set([groups[0]?.industry]))
  const bodyRefs = useRef<Map<Industry, HTMLDivElement | null>>(new Map())

  // Set initial visibility before first paint.
  useLayoutEffect(() => {
    groups.forEach((g, i) => {
      const el = bodyRefs.current.get(g.industry)
      if (!el) return
      if (i === 0) {
        // Open: no maxHeight constraint so late-loading images aren't clipped
        el.style.maxHeight = 'none'
        el.style.opacity   = '1'
      } else {
        el.style.maxHeight = '0px'
        el.style.opacity   = '0'
      }
    })
  }, [])

  const toggle = (industry: Industry) => {
    const body = bodyRefs.current.get(industry)
    if (!body) return
    const isOpen = open.has(industry)

    if (isOpen) {
      // Pin to current height → force reflow → animate to 0 (CSS transition fires)
      body.style.maxHeight = `${body.scrollHeight}px`
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      body.offsetHeight
      body.style.maxHeight = '0px'
      body.style.opacity   = '0'
      setOpen(prev => { const next = new Set(prev); next.delete(industry); return next })
    } else {
      body.style.maxHeight = `${body.scrollHeight}px`
      body.style.opacity   = '1'
      // After transition completes, remove constraint so content can grow freely
      const onEnd = () => {
        body.style.maxHeight = 'none'
        body.removeEventListener('transitionend', onEnd)
      }
      body.addEventListener('transitionend', onEnd)
      setOpen(prev => new Set([...prev, industry]))
    }
  }

  const projectCount = (name: string) =>
    caseStudies.filter(cs => cs.client === name).length

  return (
    <div className={styles.accordion}>
      {groups.map(({ industry, list }) => {
        const isOpen   = open.has(industry)
        const logoList = list.filter(c => c.logo !== null)
        const chipList = list.filter(c => c.logo === null)

        return (
          <div key={industry} className={styles.group}>
            <button
              className={`${styles.header} ${isOpen ? styles.headerOpen : ''}`}
              onClick={() => toggle(industry)}
              aria-expanded={isOpen}
            >
              <div className={styles.headerLeft}>
                <span className={styles.icon}>
                  <IndustryIcon industry={industry} />
                </span>
                <span className={styles.industryLabel}>
                  {INDUSTRY_LABELS[industry]}
                </span>
                <span className={styles.count}>{list.length}</span>
              </div>
              <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 6l4 4 4-4" />
                </svg>
              </span>
            </button>

            <div
              ref={el => { bodyRefs.current.set(industry, el) }}
              className={styles.body}
            >
              <div className={styles.bodyInner}>
                {logoList.length > 0 && (
                  <div className={styles.logoStrip}>
                    {logoList.map(c => {
                      const count     = projectCount(c.name)
                      const clickable = count > 0
                      return (
                        <button
                          key={c.name}
                          className={`${styles.logoTile}${c.lightBg ? ` ${styles.logoTileLight}` : ''} ${clickable ? styles.clickable : ''}`}
                          onClick={clickable
                            ? e => { e.stopPropagation(); navigate(`/work?client=${encodeURIComponent(c.name)}`) }
                            : undefined
                          }
                          title={c.name}
                        >
                          <img
                            src={c.logo!}
                            alt={c.name}
                            className={styles.logoImg}
                            loading="lazy"
                          />
                        </button>
                      )
                    })}
                  </div>
                )}

                {chipList.length > 0 && (
                  <div className={styles.chipStrip}>
                    {chipList.map(c => {
                      const count     = projectCount(c.name)
                      const clickable = count > 0
                      return (
                        <button
                          key={c.name}
                          className={`${styles.chip} ${clickable ? styles.clickable : ''}`}
                          onClick={clickable
                            ? e => { e.stopPropagation(); navigate(`/work?client=${encodeURIComponent(c.name)}`) }
                            : undefined
                          }
                        >
                          {c.name}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
