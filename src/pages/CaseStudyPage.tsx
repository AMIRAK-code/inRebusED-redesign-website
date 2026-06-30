import { useRef } from 'react'
import { useParams, Link, Navigate, useLocation } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap } from '../lib/gsap'
import Nav from '../components/Nav/Nav'
import Footer from '../components/Footer/Footer'
import caseStudies, { CATEGORY_LABEL } from '../data/case-studies'
import ResponsiveImage from '../components/ui/ResponsiveImage/ResponsiveImage'
import lqip     from '../../public/case-studies/_lqip.json'
import variants from '../../public/case-studies/_variants.json'
import Seo from '../components/ui/Seo/Seo'
import { buildOrganization, buildBreadcrumbList, buildCreativeWork } from '../lib/seo/jsonLd'
import styles from './CaseStudyPage.module.css'

const lqipKey = (src: string) => src.split('/').pop() ?? ''

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>()
  const location  = useLocation()
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

  const isIt = location.pathname.startsWith('/it')
  const homeCrumb = { name: 'Home', url: isIt ? '/it' : '/' }
  const workCrumb = { name: 'Work', url: isIt ? '/it/work' : '/work' }
  const studyCrumb = { name: study.title, url: location.pathname }

  return (
    <div ref={pageRef} className={styles.page}>
      <Seo
        title={study.title}
        description={study.brief}
        image={study.image}
        path={location.pathname}
        type="article"
        jsonLd={[
          buildOrganization(),
          buildBreadcrumbList([homeCrumb, workCrumb, studyCrumb]),
          buildCreativeWork(study),
        ]}
      />
      <Nav minimal />
      <main className={styles.main}>

        {/* Back link */}
        <Link to={isIt ? '/it/work' : '/work'} className={styles.backLink}>← All Work</Link>

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
            <ResponsiveImage
              src={study.image}
              alt={study.title}
              loading="eager"
              sizes="(min-width: 1200px) 1100px, 100vw"
              placeholder={lqip[lqipKey(study.image) as keyof typeof lqip]}
              hasVariants={variants[lqipKey(study.image) as keyof typeof variants] === true}
            />
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
            to={`${isIt ? '/it' : ''}/work/${nextStudy.slug}`}
            className={styles.nextStudy}
          >
            <span className={styles.nextLabel}>Next project →</span>
            <span className={styles.nextTitle}>{nextStudy.title}</span>
            <div className={styles.nextImg}>
              <ResponsiveImage
                src={nextStudy.image}
                alt={nextStudy.title}
                sizes="(min-width: 1200px) 1100px, 100vw"
                placeholder={lqip[lqipKey(nextStudy.image) as keyof typeof lqip]}
                hasVariants={variants[lqipKey(nextStudy.image) as keyof typeof variants] === true}
              />
              <div className={styles.nextOverlay} />
            </div>
          </Link>
        )}

      </main>
      <Footer />
    </div>
  )
}
