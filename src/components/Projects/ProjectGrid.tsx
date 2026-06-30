import { useT } from '../../i18n/LangContext'
import { ScrollTrigger } from '../../lib/gsap'
import ResponsiveImage from '../ui/ResponsiveImage/ResponsiveImage'
import lqip     from '../../../public/case-studies/_lqip.json'
import variants from '../../../public/case-studies/_variants.json'
import styles from './ProjectGrid.module.css'

const lqipKey = (src: string) => src.split('/').pop() ?? ''

interface ProjectItem {
  title: string
  client: string
  tag: string
  desc: string
  img: string
  slug: string
}

interface ProjectGridProps {
  projects: ProjectItem[]
  n: number
  hasMore: boolean
  navigate: (path: string) => void
  cardWrapperRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  dimRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  counterRef: React.MutableRefObject<HTMLSpanElement | null>
  progressDotRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  progressFillRef: React.MutableRefObject<HTMLDivElement | null>
}

export function ProjectGrid({
  projects, n, hasMore, navigate,
  cardWrapperRefs, cardRefs, dimRefs,
  counterRef, progressDotRefs, progressFillRef,
}: ProjectGridProps) {
  const { t } = useT()

  return (
    <>
      <div className={styles.leftFlank} aria-hidden="true">
        <div className={styles.counterBlock}>
          <span ref={counterRef} className={styles.counterNum}>01</span>
        </div>
        <span className={styles.flankLabel}>{t('projects.label')}</span>
      </div>

      <div className={styles.rightFlank} aria-hidden="true">
        <div className={styles.pips}>
          {Array.from({ length: n }).map((_, i) => (
            <div
              key={i}
              ref={el => { progressDotRefs.current[i] = el }}
              className={styles.pip}
            />
          ))}
        </div>
      </div>

      {projects.map((p, i) => (
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
            <ResponsiveImage
              src={p.img}
              alt={p.title}
              loading={i < 2 ? 'eager' : 'lazy'}
              sizes="100vw"
              placeholder={lqip[lqipKey(p.img) as keyof typeof lqip]}
              hasVariants={variants[lqipKey(p.img) as keyof typeof variants] === true}
              imgClassName={styles.cardImg}
              onLoad={() => ScrollTrigger.refresh()}
            />
            <div className={styles.gradient} />
            <div className={styles.cardContent}>
              <div className={styles.cardTop}>
                <span className={styles.cardTag}>{p.tag}</span>
                <span className={styles.cardCount}>{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className={styles.cardBottom}>
                <span className={styles.cardClient}>{p.client}</span>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardDesc}>{p.desc}</p>
                <span className={styles.cardCta}>
                  {t('projects.view')}
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

      {hasMore && (
        <div
          ref={el => { cardWrapperRefs.current[projects.length] = el }}
          className={styles.cardWrapper}
          style={{ zIndex: projects.length + 1 }}
        >
          <div
            ref={el => { cardRefs.current[projects.length] = el }}
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
            <h2 className={styles.ctaHeading}>{t('projects.cta.heading')}</h2>
            <p className={styles.ctaSub}>{t('projects.cta.sub')}</p>
            <span className={styles.ctaArrow}>{t('projects.cta.arrow')}</span>
          </div>
        </div>
      )}

      <div className={styles.progressTrack} aria-hidden="true">
        <div ref={progressFillRef} className={styles.progressFill} />
      </div>
    </>
  )
}
