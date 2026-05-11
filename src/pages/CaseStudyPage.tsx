import { useRef } from 'react'
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap } from '../lib/gsap'
import Nav from '../components/Nav/Nav'
import caseStudies, { CATEGORY_LABEL } from '../data/case-studies'
import clients from '../data/clients'
import styles from './CaseStudyPage.module.css'

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const pageRef  = useRef<HTMLDivElement>(null)
  const heroRef  = useRef<HTMLDivElement>(null)
  const metaRef  = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const bodyRef  = useRef<HTMLDivElement>(null)

  const study = caseStudies.find(cs => cs.slug === slug)

  // Compute related: same category first, fallback to any other, max 3
  const sameCategory = study
    ? caseStudies.filter(cs => cs.category === study.category && cs.slug !== study.slug)
    : []
  const others = study
    ? caseStudies.filter(cs => cs.slug !== study.slug && !sameCategory.some(r => r.slug === cs.slug))
    : []
  const related = [...sameCategory, ...others].slice(0, 3)

  // Animations — run on mount and when slug changes
  useGSAP(() => {
    if (!study) return

    const tl = gsap.timeline()

    if (heroRef.current) {
      tl.from(heroRef.current, {
        opacity: 0,
        scale: 0.97,
        duration: 0.6,
        ease: 'expo.out',
      })
    }

    const metaAndTitle = [metaRef.current, titleRef.current].filter(Boolean) as HTMLElement[]
    if (metaAndTitle.length > 0) {
      tl.from(metaAndTitle, {
        opacity: 0,
        y: 30,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power3.out',
      }, '-=0.2')
    }

    if (bodyRef.current) {
      const cols = Array.from(bodyRef.current.querySelectorAll<HTMLElement>('[data-col]'))
      if (cols.length > 0) {
        gsap.from(cols, {
          opacity: 0,
          y: 24,
          stagger: 0.12,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bodyRef.current,
            start: 'top 80%',
            once: true,
          },
        })
      }
    }
  }, { scope: pageRef, dependencies: [slug] })

  if (!study) return <Navigate to="/work" replace />

  const clientData = clients.find(c => c.name === study.client)

  return (
    <div ref={pageRef} className={styles.page}>
      <Nav />
      <main className={styles.main}>

        {/* ① Back link */}
        <Link to="/work" className={styles.backLink}>← All Work</Link>

        {/* ② Hero image */}
        <div ref={heroRef} className={styles.heroImg}>
          <img src={study.image} alt={study.title} />
        </div>

        {/* ③ Meta strip */}
        <div ref={metaRef} className={styles.meta}>
          <div className={styles.metaLeft}>
            <span className={styles.categoryTag}>{CATEGORY_LABEL[study.category]}</span>
            {clientData?.logo
              ? <img src={clientData.logo} alt={study.client} className={styles.clientLogo} />
              : <span className={styles.clientName}>{study.client}</span>
            }
          </div>
          <div className={styles.metaRight}>
            <span className={styles.audienceLabel}>Audience →</span>
            <span className={styles.audienceValue}>{study.audience}</span>
          </div>
        </div>

        {/* ④ Title */}
        <h1 ref={titleRef} className={styles.title}>{study.title}</h1>

        {/* ⑤ Two-column body */}
        <div ref={bodyRef} className={styles.body}>
          <div data-col="" className={styles.bodyLeft}>
            <span className={styles.sectionLabel}>Brief</span>
            <p className={styles.brief}>{study.brief}</p>
          </div>
          <div data-col="" className={styles.bodyRight}>
            <span className={styles.sectionLabel}>Project</span>
            <p className={styles.description}>{study.description}</p>
          </div>
        </div>

        {/* ⑥ Related projects */}
        {related.length > 0 && (
          <div className={styles.related}>
            <h2 className={styles.relatedHeading}>More Work</h2>
            <div className={styles.relatedRow}>
              {related.map(cs => (
                <div
                  key={cs.slug}
                  className={styles.relatedCard}
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
                  <div className={styles.relatedImgWrap}>
                    <img src={cs.image} alt={cs.title} loading="lazy" className={styles.relatedImg} />
                    <span className={styles.relatedTag}>{CATEGORY_LABEL[cs.category]}</span>
                  </div>
                  <div className={styles.relatedBody}>
                    <span className={styles.relatedClient}>{cs.client}</span>
                    <h3 className={styles.relatedTitle}>{cs.title}</h3>
                    <p className={styles.relatedBrief}>{cs.brief}</p>
                    <span className={styles.relatedCta}>View Case Study →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  )
}
