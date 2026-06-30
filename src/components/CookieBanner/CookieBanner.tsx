import { useRef, useState, useEffect } from 'react'
import { gsap } from '../../lib/gsap'
import { useT } from '../../i18n/LangContext'
import { getConsent, setConsent } from '../../lib/consent'
import styles from './CookieBanner.module.css'

export default function CookieBanner() {
  const { t } = useT()
  const bannerRef = useRef<HTMLDivElement>(null)
  const modalRef  = useRef<HTMLDivElement>(null)
  const [visible,    setVisible]    = useState(false)
  const [showModal,  setShowModal]  = useState(false)
  const [analytics,  setAnalytics]  = useState(false)
  const [marketing,  setMarketing]  = useState(false)

  useEffect(() => {
    if (!getConsent()) setVisible(true)
  }, [])

  // Slide up from below on first render
  useEffect(() => {
    if (!visible || !bannerRef.current) return
    gsap.fromTo(
      bannerRef.current,
      { y: '100%', opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out', delay: 0.5 },
    )
  }, [visible])

  // ESC closes the modal (not the banner)
  useEffect(() => {
    if (!showModal) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowModal(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [showModal])

  // Hard focus trap inside the modal
  useEffect(() => {
    if (!showModal || !modalRef.current) return
    const focusable = Array.from(
      modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ),
    )
    focusable[0]?.focus()

    const onTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const first = focusable[0]
      const last  = focusable[focusable.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus() }
      }
    }
    document.addEventListener('keydown', onTab)
    return () => document.removeEventListener('keydown', onTab)
  }, [showModal])

  const dismiss = (choiceCallback: () => void) => {
    choiceCallback()
    if (bannerRef.current) {
      gsap.to(bannerRef.current, {
        y: '120%', opacity: 0, duration: 0.3, ease: 'power3.in',
        onComplete: () => { setVisible(false); setShowModal(false) },
      })
    } else {
      setVisible(false)
      setShowModal(false)
    }
  }

  const handleAcceptAll = () => dismiss(() => setConsent({ analytics: true, marketing: true }))
  const handleReject    = () => dismiss(() => setConsent({ analytics: false, marketing: false }))
  const handleSaveCustom = () => dismiss(() => setConsent({ analytics, marketing }))

  if (!visible) return null

  return (
    <>
      <div ref={bannerRef} className={styles.banner} role="region" aria-label={t('cookie.title')}>
        <div className={styles.bannerInner}>
          <div className={styles.copy}>
            <p className={styles.title}>{t('cookie.title')}</p>
            <p className={styles.body}>{t('cookie.body')}</p>
          </div>
          <div className={styles.actions}>
            <button
              className={styles.btnAccept}
              onClick={handleAcceptAll}
              aria-label={t('cookie.accept')}
            >
              {t('cookie.accept')}
            </button>
            <button
              className={styles.btnReject}
              onClick={handleReject}
              aria-label={t('cookie.reject')}
            >
              {t('cookie.reject')}
            </button>
            <button
              className={styles.btnCustomize}
              onClick={() => setShowModal(true)}
              aria-label={t('cookie.customize')}
            >
              {t('cookie.customize')}
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className={styles.overlay} role="presentation" onClick={e => { if (e.target === e.currentTarget) setShowModal(false) }}>
          <div
            ref={modalRef}
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-modal-title"
          >
            <h2 id="cookie-modal-title" className={styles.modalTitle}>
              {t('cookie.modal.title')}
            </h2>

            {/* Essential — always on, disabled */}
            <div className={styles.toggleRow}>
              <div className={styles.toggleInfo}>
                <span className={styles.toggleLabel}>{t('cookie.essential.label')}</span>
                <p className={styles.toggleDesc}>{t('cookie.essential.desc')}</p>
              </div>
              <div
                className={styles.toggleTrack}
                data-active="true"
                data-disabled="true"
                aria-label={t('cookie.essential.label')}
              >
                <div className={styles.toggleThumb} />
              </div>
            </div>

            {/* Analytics */}
            <div className={styles.toggleRow}>
              <div className={styles.toggleInfo}>
                <span className={styles.toggleLabel}>{t('cookie.analytics.label')}</span>
                <p className={styles.toggleDesc}>{t('cookie.analytics.desc')}</p>
              </div>
              <button
                role="switch"
                aria-checked={analytics}
                aria-label={t('cookie.analytics.label')}
                className={styles.toggleTrack}
                data-active={analytics}
                onClick={() => setAnalytics(v => !v)}
              >
                <div className={styles.toggleThumb} />
              </button>
            </div>

            {/* Marketing */}
            <div className={styles.toggleRow}>
              <div className={styles.toggleInfo}>
                <span className={styles.toggleLabel}>{t('cookie.marketing.label')}</span>
                <p className={styles.toggleDesc}>{t('cookie.marketing.desc')}</p>
              </div>
              <button
                role="switch"
                aria-checked={marketing}
                aria-label={t('cookie.marketing.label')}
                className={styles.toggleTrack}
                data-active={marketing}
                onClick={() => setMarketing(v => !v)}
              >
                <div className={styles.toggleThumb} />
              </button>
            </div>

            <div className={styles.modalActions}>
              <button
                className={styles.btnAccept}
                onClick={handleSaveCustom}
                aria-label={t('cookie.modal.save')}
              >
                {t('cookie.modal.save')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
