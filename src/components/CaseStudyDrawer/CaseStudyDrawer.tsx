import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import allCaseStudies, { CATEGORY_LABEL, type CaseStudy } from '../../data/case-studies'
import clients from '../../data/clients'
import styles from './CaseStudyDrawer.module.css'

interface Props {
  study: CaseStudy
  onClose: () => void
  caseStudies: CaseStudy[]
  onNavigate: (study: CaseStudy) => void
}

export default function CaseStudyDrawer({ study, onClose, caseStudies, onNavigate }: Props) {
  const navigate     = useNavigate()
  const overlayRef   = useRef<HTMLDivElement>(null)
  const leftRef      = useRef<HTMLDivElement>(null)
  const rightRef     = useRef<HTMLDivElement>(null)
  const closeBtnRef  = useRef<HTMLButtonElement>(null)
  const isClosing    = useRef(false)
  const isFirstStudy = useRef(true)

  const currentIndex = caseStudies.findIndex(s => s.slug === study.slug)
  const clientData   = clients.find(c => c.name === study.client)
  // Related studies from the full dataset (not just the visible 10)
  const related      = allCaseStudies.filter(cs => cs.client === study.client && cs.slug !== study.slug)

  // Mutable ref guards stale closure in the keydown handler (mounted once)
  const drawerStateRef = useRef({ currentIndex, caseStudies })
  drawerStateRef.current = { currentIndex, caseStudies }

  // Keep callbacks fresh without re-mounting the key listener
  const callbacksRef = useRef({ onClose, onNavigate })
  callbacksRef.current = { onClose, onNavigate }

  // ── Body scroll lock ────────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // ── Fade right panel in whenever study prop changes (skip first mount) ──
  useEffect(() => {
    if (isFirstStudy.current) { isFirstStudy.current = false; return }
    gsap.fromTo(
      rightRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.25, ease: 'power2.out' },
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [study.slug])

  // ── Focus trap + Escape + Arrow navigation ──────────────────────────────
  useEffect(() => {
    closeBtnRef.current?.focus()

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { handleClose(); return }

      if (e.key === 'ArrowLeft') {
        const { currentIndex: ci, caseStudies: cs } = drawerStateRef.current
        if (ci > 0) handleNav(cs[ci - 1])
        return
      }
      if (e.key === 'ArrowRight') {
        const { currentIndex: ci, caseStudies: cs } = drawerStateRef.current
        if (ci < cs.length - 1) handleNav(cs[ci + 1])
        return
      }

      if (e.key !== 'Tab') return
      const drawer = overlayRef.current
      if (!drawer) return
      const focusable = Array.from(
        drawer.querySelectorAll<HTMLElement>(
          'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])',
        ),
      ).filter(el => !el.hasAttribute('disabled'))
      if (!focusable.length) return
      const first = focusable[0]
      const last  = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus()
      }
    }

    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Entrance animation ──────────────────────────────────────────────────
  useGSAP(() => {
    gsap.timeline()
      .from(overlayRef.current,  { opacity: 0, duration: 0.3, ease: 'none' })
      .from(leftRef.current,     { x: -60, opacity: 0, duration: 0.55, ease: 'expo.out' }, '-=0.15')
      .from(rightRef.current,    { x:  60, opacity: 0, duration: 0.55, ease: 'expo.out' }, '<0.08')
      .from(`.${styles.textBlock}`, { y: 20, opacity: 0, stagger: 0.06, duration: 0.4, ease: 'expo.out' }, '-=0.35')
  })

  // ── Handlers ────────────────────────────────────────────────────────────

  function handleNav(target: CaseStudy) {
    gsap.to(rightRef.current, {
      opacity: 0, x: 30, duration: 0.18, ease: 'power2.in',
      onComplete: () => callbacksRef.current.onNavigate(target),
    })
  }

  function handleClose() {
    if (isClosing.current) return
    isClosing.current = true
    gsap.timeline({ onComplete: () => callbacksRef.current.onClose() })
      .to([rightRef.current], { x:  60, opacity: 0, duration: 0.25, ease: 'power2.in' }, 0)
      .to([leftRef.current],  { x: -60, opacity: 0, duration: 0.25, ease: 'power2.in' }, 0)
      .to(overlayRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in' }, 0.05)
  }

  function handleCloseAndNavigate(path: string) {
    if (isClosing.current) return
    isClosing.current = true
    const cb = callbacksRef.current
    gsap.timeline({ onComplete: () => { cb.onClose(); navigate(path) } })
      .to([rightRef.current], { x:  60, opacity: 0, duration: 0.25, ease: 'power2.in' }, 0)
      .to([leftRef.current],  { x: -60, opacity: 0, duration: 0.25, ease: 'power2.in' }, 0)
      .to(overlayRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in' }, 0.05)
  }

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={`Case study: ${study.title}`}
    >
      <div className={styles.accentBar} aria-hidden="true" />

      {/* ── Prev / Next / Close controls ───────────────────────────────── */}
      <div className={styles.navBtns}>
        <button
          className={styles.navBtn}
          onClick={() => {
            const { currentIndex: ci, caseStudies: cs } = drawerStateRef.current
            if (ci > 0) handleNav(cs[ci - 1])
          }}
          disabled={currentIndex <= 0}
          aria-label="Previous case study"
        >
          ‹
        </button>
        <button
          className={styles.navBtn}
          onClick={() => {
            const { currentIndex: ci, caseStudies: cs } = drawerStateRef.current
            if (ci < cs.length - 1) handleNav(cs[ci + 1])
          }}
          disabled={currentIndex >= caseStudies.length - 1}
          aria-label="Next case study"
        >
          ›
        </button>
        <button
          ref={closeBtnRef}
          className={styles.closeBtn}
          onClick={handleClose}
          aria-label="Close case study"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* ── Image panel ────────────────────────────────────────────────── */}
      <div ref={leftRef} className={styles.imagePanel}>
        <img src={study.image} alt={study.title} className={styles.image} />
        <div className={styles.imageGradient} aria-hidden="true" />
      </div>

      {/* ── Content panel ──────────────────────────────────────────────── */}
      <div ref={rightRef} className={styles.contentPanel}>

        {/* Category + client logo / name */}
        <div className={styles.textBlock}>
          <span className={styles.categoryTag}>{CATEGORY_LABEL[study.category]}</span>
          {clientData?.logo ? (
            <div className={styles.clientLogoWrap}>
              <img src={clientData.logo} alt={clientData.name} className={styles.clientLogoImg} />
            </div>
          ) : (
            <span className={styles.clientName}>{study.client}</span>
          )}
        </div>

        {/* Title */}
        <div className={styles.textBlock}>
          <h2 className={styles.title}>{study.title}</h2>
        </div>

        <div className={styles.divider} aria-hidden="true" />

        {/* Brief */}
        <div className={styles.textBlock}>
          <span className={styles.fieldLabel}>Brief</span>
          <p className={styles.fieldText}>{study.brief}</p>
        </div>

        <div className={styles.divider} aria-hidden="true" />

        {/* Description */}
        <div className={styles.textBlock}>
          <span className={styles.fieldLabel}>Description</span>
          <p className={styles.fieldText}>{study.description}</p>
        </div>

        <div className={styles.divider} aria-hidden="true" />

        {/* Audience */}
        <div className={styles.textBlock}>
          <span className={styles.fieldLabel}>Audience</span>
          <p className={styles.fieldText}>{study.audience}</p>
        </div>

        {/* ── View Full Case Study CTA ──────────────────────────────────── */}
        <button
          className={styles.fullLink}
          onClick={() => handleCloseAndNavigate(`/work/${study.slug}`)}
        >
          View Full Case Study →
        </button>

        {/* ── More from this client ─────────────────────────────────────── */}
        {related.length > 0 && (
          <>
            <div className={styles.divider} aria-hidden="true" />
            <div className={styles.textBlock}>
              <span className={styles.fieldLabel}>More from {study.client}</span>
              <div className={styles.relatedList}>
                {related.map(rs => (
                  <button
                    key={rs.slug}
                    className={styles.relatedThumb}
                    onClick={() => handleNav(rs)}
                    aria-label={`View ${rs.title}`}
                  >
                    <img src={rs.image} alt={rs.title} className={styles.relatedImg} />
                    <p className={styles.relatedTitle}>{rs.title}</p>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  )
}
