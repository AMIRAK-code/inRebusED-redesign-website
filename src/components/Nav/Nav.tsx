import { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import styles from './Nav.module.css'

interface NavProps {
  activeSection?: string
  scrollTo?: (id: string) => void
  minimal?: boolean
}

const NAV_LINKS = [
  { id: 'about',    label: 'inSide' },
  { id: 'services', label: 'inPractice' },
  { id: 'process',  label: 'inAction' },
  { id: 'clients',  label: 'inEvolution' },
  { id: 'projects', label: 'inWork' },
]

export default function Nav({ activeSection = '', scrollTo = () => {}, minimal = false }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const location = useLocation()

  const isHome = location.pathname === '/'
  const isWork = location.pathname.startsWith('/work')

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -24,
      opacity: 0,
      duration: 0.9,
      ease: 'expo',
      delay: 0.2,
    })

    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, { scope: navRef })

  const handleNavClick = (id: string) => {
    setMenuOpen(false)
    if (isHome) {
      scrollTo(id)
    } else {
      window.location.href = `/#${id}`
    }
  }

  const handleContactClick = () => {
    setMenuOpen(false)
    if (isHome) {
      scrollTo('contact')
    } else {
      window.location.href = '/#contact'
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

  const logoContent = (
    <>
      <span className={styles.logoIn}>in</span>Rebus
      <span className={styles.logoSub}>educational</span>
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
            <Link to="/" className={styles.logo} aria-label="inRebus home">
              {logoContent}
            </Link>
          )}

          {/* Desktop links */}
          {minimal ? (
            <Link to="/work" className={styles.navBackLink}>
              ← Back to work
            </Link>
          ) : (
            <ul className={styles.links} role="list">
              {/* Work — always a React Router link */}
              <li>
                <Link
                  to="/work"
                  className={`${styles.link} ${isWork ? styles.linkActive : ''}`}
                >
                  <span className={styles.linkIn}>in</span>Work
                </Link>
              </li>

              {NAV_LINKS.map(({ id, label }) => (
                <li key={id}>
                  {isHome ? (
                    <button
                      className={`${styles.link} ${activeSection === id ? styles.linkActive : ''}`}
                      onClick={() => handleNavClick(id)}
                    >
                      <span className={styles.linkIn}>in</span>{label.slice(2)}
                    </button>
                  ) : (
                    <a href={`/#${id}`} className={styles.link}>
                      <span className={styles.linkIn}>in</span>{label.slice(2)}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          )}

          {/* Actions */}
          <div className={styles.actions}>
            <button className={styles.btnLang} aria-label="Language">EN</button>
            <button
              className={styles.btnCta}
              onClick={handleContactClick}
              onMouseMove={handleCtaMouseMove}
              onMouseLeave={handleCtaMouseLeave}
            >
              Contact Us
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
        {/* Work link at top of mobile menu */}
        <Link
          to="/work"
          className={`${styles.mobileLink} ${isWork ? styles.mobileLinkActive : ''}`}
          onClick={() => setMenuOpen(false)}
          tabIndex={menuOpen ? 0 : -1}
        >
          <span className={styles.linkIn}>in</span>Work
        </Link>

        {NAV_LINKS.map(({ id, label }) =>
          isHome ? (
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
              href={`/#${id}`}
              className={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? 0 : -1}
            >
              <span className={styles.linkIn}>in</span>{label.slice(2)}
            </a>
          ),
        )}

        <button
          className={`${styles.btnCta} ${styles.mobileCta}`}
          onClick={handleContactClick}
          tabIndex={menuOpen ? 0 : -1}
        >
          Contact Us
        </button>
      </div>
    </>
  )
}
