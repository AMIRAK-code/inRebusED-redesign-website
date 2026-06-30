import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { useT } from '../../i18n/LangContext'
import styles from './Footer.module.css'
import caseStudies, { type Category } from '../../data/case-studies'
import OfficeMap, { OFFICE_LAT, OFFICE_LNG } from './OfficeMap'
import { NewsletterForm }  from './NewsletterForm'
import { PartnersLockup } from './PartnersLockup'

const CATS: Category[] = ['digital-academy', 'onboarding', 'product-training', 'vertical-training']
const FEATURED_WORK = CATS.map(cat => caseStudies.find(cs => cs.category === cat)).filter(Boolean) as typeof caseStudies

interface FooterProps {
  scrollTo?: (id: string) => void
}

const NAV_SECTION_MAP: { labelKey: string; section: string }[] = [
  { labelKey: 'nav.inside',      section: 'about'    },
  { labelKey: 'nav.inpractice',  section: 'services' },
  { labelKey: 'nav.inaction',    section: 'process'  },
  { labelKey: 'nav.inevolution', section: 'clients'  },
]

export default function Footer({ scrollTo = () => {} }: FooterProps) {
  const { t } = useT()
  const navigate  = useNavigate()
  const footerRef = useRef<HTMLElement>(null)

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
    gsap.from(`.${styles.findUsLabel}`, {
      opacity: 0, y: 20, duration: 0.7, ease: 'expo',
      scrollTrigger: { trigger: `.${styles.findUs}`, start: 'top 80%', once: true },
    })
    gsap.from(`.${styles.findUsAddress}`, {
      opacity: 0, x: -40, duration: 0.9, ease: 'expo', delay: 0.1,
      scrollTrigger: { trigger: `.${styles.findUs}`, start: 'top 80%', once: true },
    })
    gsap.from(`.${styles.findUsMapWrap}`, {
      opacity: 0, x: 40, duration: 0.9, ease: 'expo', delay: 0.18,
      scrollTrigger: { trigger: `.${styles.findUs}`, start: 'top 80%', once: true },
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

      {/* Find Us */}
      <div className={styles.findUs}>
        <div className={styles.findUsInner}>
          <span className={styles.findUsLabel}>{t('contact.address.heading')}</span>
          <div className={styles.findUsCols}>
            <address className={styles.findUsAddress}>
              <div className={styles.findUsRow}>
                <svg className={styles.findUsIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 2C8.134 2 5 5.134 5 9c0 6.627 7 13 7 13s7-6.373 7-13c0-3.866-3.134-7-7-7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                  <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.6"/>
                </svg>
                <div>
                  <p>{t('contact.address.street')}</p>
                  <p>{t('contact.address.city')}</p>
                </div>
              </div>
              <div className={styles.findUsRow}>
                <svg className={styles.findUsIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C9.39 21 3 14.61 3 7a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                </svg>
                <a href={`tel:${t('contact.phone').replace(/\s/g, '')}`} className={styles.findUsLink}>
                  {t('contact.phone')}
                </a>
              </div>
              <div className={styles.findUsRow}>
                <svg className={styles.findUsIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                  <path d="M2 8l10 6 10-6" stroke="currentColor" strokeWidth="1.6"/>
                </svg>
                <a href={`mailto:${t('contact.email')}`} className={styles.findUsLink}>
                  {t('contact.email')}
                </a>
              </div>
              <a
                href={`https://maps.google.com/?q=${OFFICE_LAT},${OFFICE_LNG}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.findUsDirections}
              >
                {t('contact.directions')}
              </a>
            </address>
            <div className={styles.findUsMapWrap}>
              <OfficeMap />
            </div>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className={styles.bottom}>
        <div className={styles.bottomGrid}>
          <div className={styles.brandCol}>
            <button className={styles.logo} onClick={() => scrollTo('hero')} aria-label="inRebus Digital Learning — back to top">
              <img src="/logo-wordmark-dl.png" alt="inRebus Digital Learning" className={styles.logoImg} width={134} height={64} />
            </button>
            <PartnersLockup />
          </div>

          <nav aria-label={t('footer.nav.label')}>
            <ul className={styles.footLinks}>
              {NAV_SECTION_MAP.map(({ labelKey, section }) => (
                <li key={section}>
                  <button className={styles.footLink} onClick={() => scrollTo(section)}>
                    {t(labelKey)}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t('footer.work.label')}>
            <p className={styles.columnTitle}>{t('footer.work.label')}</p>
            <ul className={styles.footLinks}>
              {FEATURED_WORK.map(cs => (
                <li key={cs.slug}>
                  <Link to={`/work/${cs.slug}`} className={styles.footLink}>{cs.title}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.newsletterCol}>
            <p className={styles.columnTitle}>{t('footer.newsletter.label')}</p>
            <NewsletterForm />
          </div>

          <div className={styles.copyBlock}>
            <p>© 2003–{new Date().getFullYear()} inRebus® Technologies S.r.l.</p>
            <p>P.IVA 08678030019</p>
          </div>
        </div>

        <div className={styles.legal}>
          <Link to="/privacy" className={styles.legalLink}>{t('footer.privacy')}</Link>
          <span className={styles.legalDot}>·</span>
          <Link to="/cookies" className={styles.legalLink}>{t('footer.cookie')}</Link>
          <span className={styles.legalDot}>·</span>
          <Link to="/sustainability" className={styles.legalLink}>{t('footer.sustainability')}</Link>
          <span className={styles.legalDot}>·</span>
          <a
            href="https://www.websitecarbon.com/website/www.inrebus.education/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.carbonBadge}
            title={t('footer.carbon.tooltip')}
            aria-label={t('footer.carbon.tooltip')}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={styles.carbonLeaf}>
              <path d="M17 8C8 10 5.9 16.17 3.82 19.31A1 1 0 004.2 21a17.63 17.63 0 0013.4-4.32A8 8 0 0021 8.77C19.1 8.22 17 8 17 8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
              <path d="M3 21c0-4 2-7 5-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            {t('footer.carbon.label')}
          </a>
        </div>
      </div>

    </footer>
  )
}
