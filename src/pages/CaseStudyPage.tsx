import { useRef } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap } from '../lib/gsap'
import Nav from '../components/Nav/Nav'
import Footer from '../components/Footer/Footer'
import caseStudies, { CATEGORY_LABEL } from '../data/case-studies'
import styles from './CaseStudyPage.module.css'

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>()
  const pageRef   = useRef<HTMLDivElement>(null)
  const heroRef   = useRef<HTMLDivElement>(null)
  const bodyRef   = useRef<HTMLDivElement>(null)
  const nextRef   = useRef<HTMLAnchorElement>(null)

  const studyIndex = caseStudies.findIndex(cs => cs.slug === slug)
  const study      = caseStudies[studyIndex]

  // Next study wraps around
  const nextStudy  = study
    ? caseStudies[(studyIndex + 1) % caseStudies.length]
    : null

  useGSAP(() => {
    if (!study) return

    // Hero block slides in from slight scale
    gsap.from(heroRef.current, {
      opacity: 0,
      scale: 0.97,
      duration: 0.7,
      ease: 'expo.out',
    })

    // Title + brief stagger
    const heroText = heroRef.current
      ? Array.from(heroRef.current.querySelectorAll<HTMLElement>('[data-hero-text]'))
      : []
    if (heroText.length) {
      gsap.from(heroText, {
        opacity: 0,
        y: 28,
        stagger: 0.09,
        duration: 0.55,
        ease: 'power3.out',
        delay: 0.15,
      })
    }

    // Two-column body on scroll
    if (bodyRef.current) {
      const cols = Array.from(bodyRef.current.querySelectorAll<HTMLElement>('[data-col]'))
      if (cols.length) {
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

    // Next study footer
    if (nextRef.current) {
      gsap.from(nextRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: nextRef.current,
          start: 'top 88%',
          once: true,
        },
      })
    }
  }, { scope: pageRef, dependencies: [slug] })

  if (!study) return <Navigate to="/work" replace />

  return (
    <div ref={pageRef} className={styles.page}>
      <Nav minimal />
      <main className={styles.main}>

        {/* Back link */}
        <Link to="/work" className={styles.backLink}>← All Work</Link>

        {/* ① Hero block: client tag · title · brief · image */}
        <div ref={heroRef} className={styles.hero}>
          <div className={styles.heroMeta}>
            <span data-hero-text="" className={styles.categoryTag}>
              {CATEGORY_LABEL[study.category]}
            </span>
            <span data-hero-text="" className={styles.heroClient}>
              {study.client}
            </span>
          </div>

          <h1 data-hero-text="" className={styles.title}>{study.title}</h1>

          <p data-hero-text="" className={styles.brief}>{study.brief}</p>

          <div className={styles.heroImg}>
            <img src={study.image} alt={study.title} />
          </div>
        </div>

        {/* ② Two-column body: left = description, right = metadata card */}
        <div ref={bodyRef} className={styles.body}>
          <div data-col="" className={styles.bodyLeft}>
            <span className={styles.sectionLabel}>Description</span>
            <p className={styles.description}>{study.description}</p>
          </div>

          <div data-col="" className={styles.bodyRight}>
            <div className={styles.metaCard}>
              <div className={styles.metaRow}>
                <span className={styles.metaKey}>Client</span>
                <span className={styles.metaVal}>{study.client}</span>
              </div>
              <div className={styles.metaDivider} />
              <div className={styles.metaRow}>
                <span className={styles.metaKey}>Audience</span>
                <span className={styles.metaVal}>{study.audience}</span>
              </div>
              <div className={styles.metaDivider} />
              <div className={styles.metaRow}>
                <span className={styles.metaKey}>Category</span>
                <span className={styles.metaVal}>{CATEGORY_LABEL[study.category]}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ③ Next case study footer */}
        {nextStudy && (
          <Link
            ref={nextRef}
            to={`/work/${nextStudy.slug}`}
            className={styles.nextStudy}
          >
            <span className={styles.nextLabel}>Next project →</span>
            <span className={styles.nextTitle}>{nextStudy.title}</span>
            <div className={styles.nextImg}>
              <img src={nextStudy.image} alt={nextStudy.title} />
              <div className={styles.nextOverlay} />
            </div>
          </Link>
        )}

      </main>
      <Footer />
    </div>
  )
}
