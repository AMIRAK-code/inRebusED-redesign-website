import { useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { useT } from '../../i18n/LangContext'
import styles from './Nav.module.css'

interface NavProps {
  activeSection?: string
  scrollTo?: (id: string) => void
  minimal?: boolean
}

export default function Nav({ activeSection = '', scrollTo = () => {}, minimal = false }: NavProps) {
  const { lang, t } = useT()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const location = useLocation()
  const navigate = useNavigate()

  const isIt   = location.pathname === '/it' || location.pathname.startsWith('/it/')
  const isHome = location.pathname === '/' || location.pathname === '/it'

  const NAV_LINKS = [
    { id: 'about',    labelKey: 'nav.inside' },
    { id: 'services', labelKey: 'nav.inpractice' },
    { id: 'process',  labelKey: 'nav.inaction' },
    { id: 'clients',  labelKey: 'nav.inevolution' },
    { id: 'projects', labelKey: 'nav.inwork' },
  ]

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -24,
      opacity: 0,
      duration: 0.9,
      ease: 'expo',
      delay: 0.2,
    })

    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, { scope: navRef })

  const homeBase = isIt ? '/it' : '/'

  const handleNavClick = (id: string) => {
    setMenuOpen(false)
    if (isHome) {
      scrollTo(id)
    } else {
      window.location.href = `${homeBase}#${id}`
    }
  }

  const handleContactClick = () => {
    setMenuOpen(false)
    if (isHome) {
      scrollTo('contact')
    } else {
      window.location.href = `${homeBase}#contact`
    }
  }

  const handleCtaMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.35
    const y = (e.clientY - rect.top - rect.height / 2) * 0.35
    gsap.to(e.currentTarget, { x, y, duration: 0.3, ease: 'power2.out' })
  }

  const handleCtaMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.75)' })
  }

  const toggleLang = () => {
    const path = location.pathname
    let newPath: string
    if (lang === 'en') {
      // Switch EN → IT: add /it prefix
      newPath = path === '/' ? '/it' : `/it${path}`
    } else {
      // Switch IT → EN: strip /it prefix
      newPath = path === '/it' ? '/' : path.slice(3) || '/'
    }
    navigate(newPath + location.search + location.hash)
    try { localStorage.setItem('inrebus-lang', lang === 'en' ? 'it' : 'en') } catch { /* noop */ }
  }

  const logoContent = (
    <>
      <img
        src="/logo-wordmark-dl.png"
        alt="inRebus Digital Learning"
        className={`${styles.logoImg} ${styles.logoFull}`}
        width={134}
        height={64}
      />
      <img
        src="/logo-mark-dl.png"
        alt=""
        aria-hidden="true"
        className={`${styles.logoImg} ${styles.logoMark}`}
        width={44}
        height={44}
      />
    </>
  )

  return (
    <>
      <nav
        ref={navRef}
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
        aria-label="Main navigation"
      >
        <div className={styles.inner}>
          {/* Logo */}
          {isHome ? (
            <button
              className={styles.logo}
              onClick={() => handleNavClick('hero')}
              aria-label="inRebus home"
            >
              {logoContent}
            </button>
          ) : (
            <Link to={homeBase} className={styles.logo} aria-label="inRebus home">
              {logoContent}
            </Link>
          )}

          {/* Desktop links */}
          {minimal ? (
            <Link to="/work" className={styles.navBackLink}>
              {t('nav.back')}
            </Link>
          ) : (
            <ul className={styles.links} role="list">
              {NAV_LINKS.map(({ id, labelKey }) => {
                const label = t(labelKey)
                return (
                  <li key={id}>
                    {isHome ? (
                      <button
                        className={`${styles.link} ${activeSection === id ? styles.linkActive : ''}`}
                        onClick={() => handleNavClick(id)}
                      >
                        <span className={styles.linkIn}>in</span>{label.slice(2)}
                      </button>
                    ) : (
                      <a href={`${homeBase}#${id}`} className={styles.link}>
                        <span className={styles.linkIn}>in</span>{label.slice(2)}
                      </a>
                    )}
                  </li>
                )
              })}
            </ul>
          )}

          {/* Actions */}
          <div className={styles.actions}>
            <button
              className={styles.btnLang}
              aria-label={lang === 'en' ? 'Switch to Italian' : 'Passa all\'inglese'}
              onClick={toggleLang}
            >
              {t('nav.lang')}
            </button>
            <button
              className={styles.btnCta}
              onClick={handleContactClick}
              onMouseMove={handleCtaMouseMove}
              onMouseLeave={handleCtaMouseLeave}
            >
              {t('nav.contact')}
            </button>
            <button
              className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        {NAV_LINKS.map(({ id, labelKey }) => {
          const label = t(labelKey)
          return isHome ? (
            <button
              key={id}
              className={styles.mobileLink}
              onClick={() => handleNavClick(id)}
              tabIndex={menuOpen ? 0 : -1}
            >
              <span className={styles.linkIn}>in</span>{label.slice(2)}
            </button>
          ) : (
            <a
              key={id}
              href={`${homeBase}#${id}`}
              className={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? 0 : -1}
            >
              <span className={styles.linkIn}>in</span>{label.slice(2)}
            </a>
          )
        })}

        <button
          className={`${styles.btnCta} ${styles.mobileCta}`}
          onClick={handleContactClick}
          tabIndex={menuOpen ? 0 : -1}
        >
          {t('nav.contact')}
        </button>

        <button
          className={styles.btnLang}
          onClick={toggleLang}
          tabIndex={menuOpen ? 0 : -1}
          aria-label={lang === 'en' ? 'Switch to Italian' : 'Passa all\'inglese'}
        >
          {t('nav.lang')}
        </button>
      </div>
    </>
  )
}
