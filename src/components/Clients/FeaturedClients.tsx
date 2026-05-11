import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import clients from '../../data/clients'
import caseStudies from '../../data/case-studies'
import styles from './FeaturedClients.module.css'

const INDUSTRY_LABELS: Record<string, string> = {
  'automotive':          'Automotive',
  'aerospace-defense':   'Aerospace & Defense',
  'finance':             'Finance',
  'retail-lifestyle':    'Retail & Lifestyle',
  'industrial-services': 'Industrial Services',
  'public-sector':       'Public Sector',
}

function countProjects(name: string) {
  return caseStudies.filter(cs => cs.client === name).length
}

function firstStudyImage(name: string) {
  return caseStudies.find(cs => cs.client === name)?.image ?? null
}

// Top 6 by project count; ties broken by original appearance order in clients array
const featured = clients
  .map((c, idx) => ({ ...c, count: countProjects(c.name), idx }))
  .filter(c => c.count > 0)
  .sort((a, b) => b.count - a.count || a.idx - b.idx)
  .slice(0, 6)

export default function FeaturedClients() {
  const navigate = useNavigate()
  const gridRef  = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from(`.${styles.card}`, {
      opacity: 0,
      y: 32,
      stagger: 0.06,
      duration: 0.7,
      ease: 'expo',
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 82%',
        once: true,
      },
    })
  }, { scope: gridRef })

  return (
    <div ref={gridRef} className={styles.grid}>
      {featured.map(c => {
        const bg = firstStudyImage(c.name)
        return (
          <button
            key={c.name}
            className={styles.card}
            onClick={() => navigate(`/work?client=${encodeURIComponent(c.name)}`)}
            aria-label={`${c.name} — view ${c.count} project${c.count !== 1 ? 's' : ''}`}
          >
            {bg && (
              <div
                className={styles.backdrop}
                style={{ backgroundImage: `url(${bg})` }}
              />
            )}
            <div className={styles.overlay} />
            <div className={styles.content}>
              {c.logo && (
                <div className={styles.logoPanel}>
                  <img src={c.logo} alt={c.name} className={styles.logoImg} />
                </div>
              )}
              <div className={styles.meta}>
                <span className={styles.name}>{c.name}</span>
                <div className={styles.badges}>
                  <span className={styles.countBadge}>
                    {c.count} Project{c.count !== 1 ? 's' : ''}
                  </span>
                  <span className={styles.industryTag}>
                    {INDUSTRY_LABELS[c.industry]}
                  </span>
                </div>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
