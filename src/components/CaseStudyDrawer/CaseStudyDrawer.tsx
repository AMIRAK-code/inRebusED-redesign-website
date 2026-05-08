import { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import type { CaseStudy } from '../../data/case-studies'
import styles from './CaseStudyDrawer.module.css'

const CATEGORY_LABEL: Record<string, string> = {
  'digital-academy':   'Digital Academy',
  'onboarding':        'Onboarding',
  'product-training':  'Product Training',
  'vertical-training': 'Vertical Training',
}

interface Props {
  study: CaseStudy
  onClose: () => void
}

export default function CaseStudyDrawer({ study, onClose }: Props) {
  const overlayRef  = useRef<HTMLDivElement>(null)
  const leftRef     = useRef<HTMLDivElement>(null)
  const rightRef    = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const isClosing   = useRef(false)

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Focus trap + Escape
  useEffect(() => {
    closeBtnRef.current?.focus()

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { handleClose(); return }
      if (e.key !== 'Tab') return

      const drawer = overlayRef.current
      if (!drawer) return
      const focusable = Array.from(
        drawer.querySelectorAll<HTMLElement>(
          'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
        )
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

  // Entrance
  useGSAP(() => {
    gsap.timeline()
      .from(overlayRef.current,  { opacity: 0, duration: 0.3, ease: 'none' })
      .from(leftRef.current,     { x: -60, opacity: 0, duration: 0.55, ease: 'expo.out' }, '-=0.15')
      .from(rightRef.current,    { x:  60, opacity: 0, duration: 0.55, ease: 'expo.out' }, '<0.08')
      .from(`.${styles.textBlock}`, { y: 20, opacity: 0, stagger: 0.06, duration: 0.4, ease: 'expo.out' }, '-=0.35')
  })

  function handleClose() {
    if (isClosing.current) return
    isClosing.current = true
    gsap.timeline({ onComplete: onClose })
      .to([rightRef.current], { x: 60,  opacity: 0, duration: 0.25, ease: 'power2.in' }, 0)
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

      {/* Image panel */}
      <div ref={leftRef} className={styles.imagePanel}>
        <img src={study.image} alt={study.title} className={styles.image} />
        <div className={styles.imageGradient} aria-hidden="true" />
      </div>

      {/* Content panel */}
      <div ref={rightRef} className={styles.contentPanel}>

        <div className={styles.textBlock}>
          <span className={styles.categoryTag}>{CATEGORY_LABEL[study.category]}</span>
          <span className={styles.clientName}>{study.client}</span>
        </div>

        <div className={styles.textBlock}>
          <h2 className={styles.title}>{study.title}</h2>
        </div>

        <div className={styles.divider} aria-hidden="true" />

        <div className={styles.textBlock}>
          <span className={styles.fieldLabel}>Brief</span>
          <p className={styles.fieldText}>{study.brief}</p>
        </div>

        <div className={styles.divider} aria-hidden="true" />

        <div className={styles.textBlock}>
          <span className={styles.fieldLabel}>Description</span>
          <p className={styles.fieldText}>{study.description}</p>
        </div>

        <div className={styles.divider} aria-hidden="true" />

        <div className={styles.textBlock}>
          <span className={styles.fieldLabel}>Audience</span>
          <p className={styles.fieldText}>{study.audience}</p>
        </div>

      </div>
    </div>
  )
}
