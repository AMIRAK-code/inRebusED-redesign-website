import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import styles from './Nav.module.css'

interface NavProps {
  activeSection: string
  scrollTo: (id: string) => void
}

const NAV_LINKS = [
  { id: 'hero',     label: 'inVideo' },
  { id: 'about',    label: 'inSide' },
  { id: 'services', label: 'inPractice' },
  { id: 'process',  label: 'inAction' },
  { id: 'clients',  label: 'inEvolution' },
  { id: 'projects', label: 'inWork' },
]

export default function Nav({ activeSection, scrollTo }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    // Nav entrance
    gsap.from(navRef.current, {
      y: -24,
      opacity: 0,
      duration: 0.9,
      ease: 'expo',
      delay: 0.2,
    })

    // Scroll watcher
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, { scope: navRef })

  const handleNavClick = (id: string) => {
    setMenuOpen(false)
    scrollTo(id)
  }

  // Magnetic CTA effect
  const handleCtaMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.35
    const y = (e.clientY - rect.top - rect.height / 2) * 0.35
    gsap.to(e.currentTarget, { x, y, duration: 0.3, ease: 'power2.out' })
  }

  const handleCtaMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.75)' })
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
        aria-label="Main navigation"
      >
        <div className={styles.inner}>
          {/* Logo */}
          <button className={styles.logo} onClick={() => handleNavClick('hero')} aria-label="inRebus home">
            <span className={styles.logoIn}>in</span>Rebus
            <span className={styles.logoSub}>educational</span>
          </button>

          {/* Desktop links */}
          <ul className={styles.links} role="list">
            {NAV_LINKS.map(({ id, label }) => (
              <li key={id}>
                <button
                  className={`${styles.link} ${activeSection === id ? styles.linkActive : ''}`}
                  onClick={() => handleNavClick(id)}
                >
                  <span className={styles.linkIn}>in</span>{label.slice(2)}
                </button>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className={styles.actions}>
            <button className={styles.btnLang} aria-label="Language">EN</button>
            <button
              className={styles.btnCta}
              onClick={() => handleNavClick('contact')}
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
        {NAV_LINKS.map(({ id, label }) => (
          <button
            key={id}
            className={styles.mobileLink}
            onClick={() => handleNavClick(id)}
            tabIndex={menuOpen ? 0 : -1}
          >
            <span className={styles.linkIn}>in</span>{label.slice(2)}
          </button>
        ))}
        <button
          className={`${styles.btnCta} ${styles.mobileCta}`}
          onClick={() => handleNavClick('contact')}
          tabIndex={menuOpen ? 0 : -1}
        >
          Contact Us
        </button>
      </div>
    </>
  )
}
