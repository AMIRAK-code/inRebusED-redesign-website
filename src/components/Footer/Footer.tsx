import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { useT } from '../../i18n/LangContext'
import styles from './Footer.module.css'
import caseStudies, { type Category } from '../../data/case-studies'

const CATS: Category[] = ['digital-academy', 'onboarding', 'product-training', 'vertical-training']
const FEATURED_WORK = CATS.map(cat => caseStudies.find(cs => cs.category === cat)).filter(Boolean) as typeof caseStudies

interface FooterProps {
  scrollTo?: (id: string) => void
}

const NAV_SECTION_MAP: { labelKey: string; section: string }[] = [
  { labelKey: 'nav.inside',     section: 'about'    },
  { labelKey: 'nav.inpractice', section: 'services' },
  { labelKey: 'nav.inaction',   section: 'process'  },
  { labelKey: 'nav.inevolution', section: 'clients'  },
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Footer({ scrollTo = () => {} }: FooterProps) {
  const { t } = useT()
  const navigate  = useNavigate()
  const footerRef = useRef<HTMLElement>(null)

  const [newsletter, setNewsletter]       = useState('')
  const [newsletterStatus, setNlStatus]   = useState<'idle' | 'ok' | 'err'>('idle')
  const [nlSubmitting, setNlSubmitting]   = useState(false)

  useGSAP(() => {
    gsap.from(`.${styles.ctaOverline}`, {
      opacity: 0, y: 20, duration: 0.7, ease: 'expo',
      scrollTrigger: { trigger: footerRef.current, start: 'top 82%', once: true },
    })
    gsap.from(`.${styles.ctaTitle}`, {
      opacity: 0, y: 32, duration: 0.9, ease: 'expo', delay: 0.08,
      scrollTrigger: { trigger: footerRef.current, start: 'top 82%', once: true },
    })
    gsap.from([`.${styles.ctaDesc}`, `.${styles.ctaActions}`], {
      opacity: 0, y: 20, stagger: 0.1, duration: 0.7, ease: 'expo', delay: 0.16,
      scrollTrigger: { trigger: footerRef.current, start: 'top 82%', once: true },
    })
  }, { scope: footerRef })

  const onMagMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width / 2) * 0.3
    const y = (e.clientY - r.top - r.height / 2) * 0.3
    gsap.to(e.currentTarget, { x, y, duration: 0.35, ease: 'power2.out' })
  }
  const onMagLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.75)' })
  }

  async function handleNewsletter(e: React.FormEvent) {
    e.preventDefault()
    if (!EMAIL_RE.test(newsletter) || nlSubmitting) return
    setNlSubmitting(true)

    const endpoint = import.meta.env.VITE_FORMSPREE_NEWSLETTER_ENDPOINT as string | undefined
    if (!endpoint) {
      console.info('[Newsletter] No VITE_FORMSPREE_NEWSLETTER_ENDPOINT set.')
      setNlStatus('ok')
      setNlSubmitting(false)
      return
    }

    try {
      const res = await fetch(endpoint, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email: newsletter }),
      })
      setNlStatus(res.ok ? 'ok' : 'err')
    } catch {
      setNlStatus('err')
    } finally {
      setNlSubmitting(false)
    }
  }

  return (
    <footer ref={footerRef} className={styles.footer}>

      {/* CTA Banner */}
      <div className={styles.ctaBanner}>
        <div className={styles.ctaOrb} aria-hidden="true" />
        <div className={styles.ctaInner}>
          <span className={styles.ctaOverline}>{t('footer.cta.overline')}</span>
          <h2 className={styles.ctaTitle}>
            {t('footer.cta.title')}<br />
            <span className={styles.ctaAccent}>{t('footer.cta.title.accent')}</span>
          </h2>
          <p className={styles.ctaDesc}>{t('footer.cta.desc')}</p>
          <div className={styles.ctaActions}>
            <button
              className={styles.ctaBtn}
              onClick={() => navigate('/brief')}
              onMouseMove={onMagMove}
              onMouseLeave={onMagLeave}
            >
              {t('footer.cta.btn')}
            </button>
            <a href="mailto:info.educational@inrebus.it" className={styles.ctaEmail}>
              {t('contact.email')}
            </a>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className={styles.bottom}>
        <div className={styles.bottomGrid}>
          {/* Brand + Partners */}
          <div className={styles.brandCol}>
            <button className={styles.logo} onClick={() => scrollTo('hero')}>
              <span className={styles.logoIn}>in</span>Rebus
              <span className={styles.logoSub}>educational</span>
            </button>

            {/* Gruppo FOS / AUDENSIEL lockup */}
            <div className={styles.partners}>
              <span className={styles.partnersLabel}>{t('footer.partners.label')}</span>
              <div className={styles.partnerLogos}>
                <PartnerLogo
                  src="/partners/gruppo-fos.svg"
                  alt="Gruppo FOS"
                  fallback="Gruppo FOS"
                />
                <span className={styles.partnerSep}>/</span>
                <PartnerLogo
                  src="/partners/audensiel.svg"
                  alt="AUDENSIEL"
                  fallback="AUDENSIEL"
                />
              </div>
            </div>
          </div>

          {/* Contact */}
          <address className={styles.address}>
            <p>{t('contact.address.street')}, {t('contact.address.city')}</p>
            <p>Tel. <a href={`tel:${t('contact.phone').replace(/\s/g,'')}`}>{t('contact.phone')}</a></p>
            <p><a href={`mailto:${t('contact.email')}`}>{t('contact.email')}</a></p>
          </address>

          {/* Nav */}
          <nav aria-label={t('footer.nav.label')}>
            <ul className={styles.footLinks}>
              {NAV_SECTION_MAP.map(({ labelKey, section }) => (
                <li key={section}>
                  <button
                    className={styles.footLink}
                    onClick={() => scrollTo(section)}
                  >
                    {t(labelKey)}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Featured Work */}
          <nav aria-label={t('footer.work.label')}>
            <p className={styles.columnTitle}>{t('footer.work.label')}</p>
            <ul className={styles.footLinks}>
              {FEATURED_WORK.map(cs => (
                <li key={cs.slug}>
                  <Link to={`/work/${cs.slug}`} className={styles.footLink}>
                    {cs.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Newsletter */}
          <div className={styles.newsletterCol}>
            <p className={styles.columnTitle}>{t('footer.newsletter.label')}</p>
            {newsletterStatus === 'ok' ? (
              <p className={styles.nlSuccess}>{t('footer.newsletter.success')}</p>
            ) : (
              <form className={styles.nlForm} onSubmit={handleNewsletter} noValidate>
                <input
                  type="email"
                  className={styles.nlInput}
                  placeholder={t('footer.newsletter.placeholder')}
                  value={newsletter}
                  onChange={e => setNewsletter(e.target.value)}
                  aria-label={t('footer.newsletter.placeholder')}
                  required
                />
                <button
                  type="submit"
                  className={styles.nlBtn}
                  disabled={nlSubmitting}
                  aria-label={t('footer.newsletter.btn')}
                >
                  {nlSubmitting ? '…' : t('footer.newsletter.btn')}
                </button>
              </form>
            )}
            {newsletterStatus === 'err' && (
              <p className={styles.nlError}>{t('footer.newsletter.error')}</p>
            )}
          </div>

          {/* Legal */}
          <div className={styles.copyBlock}>
            <p>© 2003–{new Date().getFullYear()} inRebus® Technologies S.r.l.</p>
            <p>P.IVA 08678030019</p>
          </div>
        </div>

        <div className={styles.legal}>
          <button className={styles.legalLink}>{t('footer.privacy')}</button>
          <span className={styles.legalDot}>·</span>
          <button className={styles.legalLink}>{t('footer.cookie')}</button>
        </div>
      </div>

    </footer>
  )
}

function PartnerLogo({ src, alt, fallback }: { src: string; alt: string; fallback: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className={styles.partnerImg}
      onError={e => {
        const el = e.currentTarget
        el.style.display = 'none'
        const span = document.createElement('span')
        span.textContent = fallback
        span.className = styles.partnerFallback ?? ''
        el.parentNode?.insertBefore(span, el.nextSibling)
      }}
    />
  )
}
